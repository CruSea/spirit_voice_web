import { useState, useEffect, useRef } from 'react'
import { voiceApi } from '../../services/voice.js'
import './Recording.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar'

// ResponseDisplay Component
const ResponseDisplay = ({
  isProcessing,
  error,
  responseText,
  audioUrl,
  audioRef,
  isPlayingResponse,
  onPlayResponse,
  onAskMore
}) => {
  if (isProcessing) {
    return (
      <div className="processing-state">
        <p>Processing your voice... please wait 🌸</p>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-state">
        <p>⚠️ {error}</p>
        <button className="retry-button" onClick={onAskMore}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="response-content">
      {responseText && responseText.trim().length > 0 && (
        <div className="text-response">
          <p className="response-label">Response:</p>
          <div className="response-text-container">
            <p className="response-text-content amharic-text">{responseText}</p>
          </div>
        </div>
      )}
      
      {audioUrl && audioRef.current ? (
        <div className="audio-response-controls">
          <button 
            className="play-audio-button" 
            onClick={onPlayResponse}
            disabled={!audioRef.current}
            aria-label={isPlayingResponse ? "Pause audio" : "Play audio"}
          >
            {isPlayingResponse ? (
              <>
                <span>⏸️</span> Pause
              </>
            ) : (
              <>
                <span>▶️</span> Play Audio
              </>
            )}
          </button>
        </div>
      ) : null}
      
      {!responseText && !audioUrl && (
        <div className="audio-response-ready">
          <p>Your response is ready! 🌿</p>
        </div>
      )}
    </div>
  )
}

// ResponseOptions Component
const ResponseOptions = ({
  audioUrl,
  audioRef,
  isPlayingResponse,
  onPlayResponse,
  onAskMore
}) => {
  return (
    <div className="post-recording-info">
      <p className="instructions-small">What would you like to do next?</p>
      <div className="recording-options-container">
        <div className="recording-options">
          {audioUrl && audioRef.current ? (
            <button 
              className="option-button read-response" 
              onClick={onPlayResponse}
              disabled={!audioRef.current}
            >
              {isPlayingResponse ? (
                "⏸️ Pause"
              ) : (
                "▶️ Play Audio"
              )}
            </button>
          ) : null}
          <button className="option-button ask-more" onClick={onAskMore}>
            Ask More 🌼
          </button>
        </div>
      </div>
    </div>
  )
}

// Main VoiceRecorder Component
const VoiceRecorder = ({
  onRecordingComplete,
  onLoginClick,
  onSignupClick,
}) => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showGreeting, setShowGreeting] = useState(true)
  const [isPlayingResponse, setIsPlayingResponse] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [responseText, setResponseText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [hasPermission, setHasPermission] = useState(null) // null = not checked, true = granted, false = denied
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (isRecording && recordingTime >= 110 && recordingTime < 120) {
      setShowWarning(true)
    } else if (recordingTime >= 120) {
      stopRecording()
    }
  }, [recordingTime, isRecording])

  // Check microphone permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      try {
        // Check if getUserMedia is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setHasPermission(false)
          setError('Microphone access is not supported on this device/browser')
          return
        }

        // Try to check permission status if supported
        if (navigator.permissions && navigator.permissions.query) {
          try {
            const result = await navigator.permissions.query({ name: 'microphone' })
            setHasPermission(result.state === 'granted')
            result.onchange = () => {
              setHasPermission(result.state === 'granted')
            }
          } catch (e) {
            // Permission query not supported, will check on first use
            setHasPermission(null)
          }
        } else {
          // Fallback: permission will be checked when user tries to record
          setHasPermission(null)
        }
      } catch (error) {
        console.error('Error checking microphone permission:', error)
        setHasPermission(null)
      }
    }
    checkPermission()
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      // Stop recording if active
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop()
        } catch (e) {
          console.error('Error stopping recorder:', e)
        }
      }
      
      // Stop all media tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
      
      // Clean up audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
      
    }
  }, [])

  const startRecording = async () => {
    try {
      setError('') // Clear previous errors
      setResponseText('') // Clear previous response
      setAudioUrl('') // Clear previous audio
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      })
      
      streamRef.current = stream
      setHasPermission(true)
      
      // Determine the best MIME type supported
      let mimeType = 'audio/webm'
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus'
      } else if (MediaRecorder.isTypeSupported('audio/webm')) {
        mimeType = 'audio/webm'
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4'
      } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
        mimeType = 'audio/ogg'
      }
      
      const options = { mimeType }
      mediaRecorderRef.current = new MediaRecorder(stream, options)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' })
        handleRecordingComplete(audioBlob)
        setShowOptions(true)
        
        // Stop all tracks to release microphone
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
          streamRef.current = null
        }
      }

      mediaRecorderRef.current.onerror = (event) => {
        console.error('MediaRecorder error:', event.error)
        setError('Error during recording. Please try again.')
        stopRecording()
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
      setShowWarning(false)
      setShowOptions(false)
      setShowGreeting(false)

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setHasPermission(false)
      
      // Provide user-friendly error messages
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setError('Microphone permission denied. Please allow microphone access in your browser settings.')
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setError('No microphone found. Please connect a microphone and try again.')
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setError('Microphone is already in use by another application.')
      } else {
        setError('Could not access microphone. Please check your device permissions and try again.')
      }
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop()
        }
      } catch (error) {
        console.error('Error stopping recording:', error)
      }
      setIsRecording(false)
      clearInterval(timerRef.current)
    }
  }

  const handleRecordingComplete = async (audioBlob) => {
    setIsProcessing(true)
    setError('')
    setResponseText('')
    setAudioUrl('')
    
    try {
      // Validate audio blob
      if (!audioBlob || audioBlob.size === 0) {
        throw new Error('Recording is empty. Please try recording again.')
      }

      console.log('Audio blob details:', {
        size: audioBlob.size,
        type: audioBlob.type
      });

      // Convert Blob to ArrayBuffer for the voiceApi service
      const arrayBuffer = await audioBlob.arrayBuffer()
      
      if (arrayBuffer.byteLength === 0) {
        throw new Error('Recording file is empty. Please try recording again.')
      }
      
      console.log('ArrayBuffer size:', arrayBuffer.byteLength);
      
      // Upload audio and get both text and audio response
      const response = await voiceApi.uploadVoice(arrayBuffer, `recording-${Date.now()}.${audioBlob.type.includes('webm') ? 'webm' : 'wav'}`)
      
      console.log('API Response received:', response);
      console.log('Response text value:', response.text);
      console.log('Response text type:', typeof response.text);
      console.log('Response text length:', response.text?.length || 0);
      
      // Display text response immediately - check for truthy value and non-empty string
      if (response.text && typeof response.text === 'string' && response.text.trim().length > 0) {
        console.log('Setting response text:', response.text);
        setResponseText(response.text.trim())
      } else {
        console.warn('No valid text in response. Response object:', response);
        // Still set empty string to show that we got a response but no text
        if (response.text === '' || response.text === null || response.text === undefined) {
          console.warn('Text field exists but is empty/null/undefined');
        }
      }
      
      // Set up audio playback (if audio URL is provided)
      if (response.audioUrl) {
        setAudioUrl(response.audioUrl)
        
        // Create audio element for playing the AI response
        const audio = new Audio(response.audioUrl)
        audioRef.current = audio
        
        // Set up audio event listeners
        audio.onplay = () => {
          // Playing state is set by handlePlayResponse
        }
        audio.onended = () => {
          setIsPlayingResponse(false)
        }
        audio.onpause = () => {
          setIsPlayingResponse(false)
        }
        audio.onerror = (e) => {
          console.error('Audio playback error:', e)
          setIsPlayingResponse(false)
          setError('Error loading audio response. Text response is still available.')
        }
      }
      
    } catch (error) {
      console.error('Error in handleRecordingComplete:', error)
      
      // Provide user-friendly error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setError('Network error. Please check your internet connection and try again.')
      } else if (error.message.includes('Upload failed')) {
        setError(`Server error: ${error.message}. Please try again later.`)
      } else {
        setError(`Failed to process recording: ${error.message}`)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePlayResponse = async () => {
    if (isPlayingResponse) {
      // Pause audio playback
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlayingResponse(false)
    } else {
      // Start audio playback
      setIsPlayingResponse(true)
      
      try {
        if (audioRef.current) {
          await audioRef.current.play()
        } else {
          setError('No audio response available to play')
          setIsPlayingResponse(false)
        }
      } catch (error) {
        console.error('Error playing audio:', error)
        setError('Error playing audio response')
        setIsPlayingResponse(false)
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleReadResponse = () => {
    handlePlayResponse()
  }

  const handleAskMore = () => {
    // Clean up audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    
    setIsPlayingResponse(false)
    setShowOptions(false)
    setResponseText('')
    setAudioUrl('')
    setError('')
    setShowGreeting(true)
  }

  return (
    <div className="voice-recorder">
      {/* HEADER */}
      <header className="recorder-header">
        <div className="logo">ወዳጅ</div>
        <div className="auth-buttons">
          <button className="login-button" onClick={() =>navigate('log-in')}>Login</button>
          <button className="signup-button" onClick={()=> navigate('sign-up')}>Sign Up</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="recorder-content">
        {/* GREETING - only at the beginning */}
        {showGreeting && (
          <div className="greeting">
          ሰላም ዛሬ እንዴት ነህ? 🌿
          </div>
        )}

        {/* ERROR DISPLAY */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {!showOptions ? (
          <div className="timer-display">{formatTime(recordingTime)}</div>
        ) : (
          <div className="response-section">
            <div className="response-display">
              <div className="response-text">
                <ResponseDisplay
                  isProcessing={isProcessing}
                  error={error}
                  responseText={responseText}
                  audioUrl={audioUrl}
                  audioRef={audioRef}
                  isPlayingResponse={isPlayingResponse}
                  onPlayResponse={handlePlayResponse}
                  onAskMore={handleAskMore}
                />
              </div>
            </div>
            
            {!error && !isProcessing && (
              <ResponseOptions
                audioUrl={audioUrl}
                audioRef={audioRef}
                isPlayingResponse={isPlayingResponse}
                onPlayResponse={handlePlayResponse}
                onAskMore={handleAskMore}
              />
            )}
          </div>
        )}

        {/* RECORDING BUTTON */}
        {!showOptions && (
          <div className="recording-container">
            <button
              className={`record-button ${isRecording ? 'recording' : ''} ${showWarning ? 'warning' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
            >
              {isRecording ? (
                <div className="stop-icon"></div>
              ) : (
                <div className="mic-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="white" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path fill="white" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </div>
              )}
              {isRecording && <div className="recording-ring"></div>}
            </button>
          </div>
        )}

        {/* WARNINGS + INSTRUCTIONS */}
        {showWarning && (
          <div className="warning-message">
            ⏳ Recording will stop in {120 - recordingTime} seconds
          </div>
        )}

        <div className="instructions">
          {isRecording ? (
            <p>እየሰማሁ ነው... በነጻነት ተናገሩ 💬</p>
          ) : showOptions ? null : (
            <p>ይረጋጉ እና ሀሳብዎን ያካፍሉ ✨</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default VoiceRecorder