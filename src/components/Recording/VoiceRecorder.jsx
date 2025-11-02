import { useState, useEffect, useRef } from 'react'
import { voiceApi } from '../../services/voice.js'
import './Recording.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar'
import logo from '../../assets/wedaj.png'; 

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
  const mediaRecorderRef = useRef(null)
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

  const startRecording = async () => {
    try {
      setError('') // Clear previous errors
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        handleRecordingComplete(audioBlob)
        setShowOptions(true)
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
      setError('ድምጽ ስርዓቱን መጠቀም አልቻለም። እባክዎ ፍቃዶችን ይፈትሹ።')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      clearInterval(timerRef.current)
      
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  const handleRecordingComplete = async (audioBlob) => {
    setIsProcessing(true)
    setError('')
    
    try {
      console.log('Audio blob details:', {
        size: audioBlob.size,
        type: audioBlob.type
      });

      // Convert Blob to ArrayBuffer for the voiceApi service
      const arrayBuffer = await audioBlob.arrayBuffer()
      
      console.log('ArrayBuffer size:', arrayBuffer.byteLength);
      
      // Use the actual voiceApi service to upload the audio and get the AI response URL
      const audioUrl = await voiceApi.uploadVoice(arrayBuffer, `recording-${Date.now()}.wav`)
      
      console.log('Received audio URL:', audioUrl);
      
      // Create audio element for playing the AI response
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      
      // Set up audio event listeners
      audio.onplay = () => setIsPlayingResponse(true)
      audio.onended = () => setIsPlayingResponse(false)
      audio.onpause = () => setIsPlayingResponse(false)
      audio.onerror = (e) => {
        console.error('Audio playback error:', e)
        setIsPlayingResponse(false)
        setError('Error playing AI response audio')
      }
      
      // Test if the audio can play
      await audio.play().catch(e => {
        console.error('Initial audio play failed:', e)
        setError('የአርቲፊሻል ኢንተሊጀንስ ምላሽ ደርሷል ግን ድምጽ መጫወት አልቻለም')
      });
      
    } catch (error) {
      console.error('Error in handleRecordingComplete:', error)
      setError(`መዝገብን ማስተናገድ አልቻለም: ${error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePlayResponse = async () => {
    if (isPlayingResponse) {
      // Pause playback
      audioRef.current?.pause()
      setIsPlayingResponse(false)
    } else {
      // Start playback
      try {
        if (audioRef.current) {
          await audioRef.current.play()
        }
      } catch (error) {
        console.error('Error playing audio:', error)
        setError('የአርቲፊሻል ኢንተሊጀንስ ምላሽ መጫወት አልቻለም')
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
      audioRef.current = null
    }
    setIsPlayingResponse(false)
    setShowOptions(false)
    setError('')
  }

  return (
    <div className="voice-recorder">
      {/* HEADER */}
      <header className="recorder-header">
        <div className="logo">
       <img src={logo} alt="Wedaj logo" className="logo-image" width="50px" />
       </div>

        <div className="auth-buttons">
          <button className="login-button" onClick={() =>navigate('log-in')}>ግባ</button>
          <button className="signup-button" onClick={()=> navigate('sign-up')}>ይመዝገቡ</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="recorder-content">
        {/* GREETING - only at the beginning */}
        {showGreeting && (
          <div className="greeting">
             ሰላም ዛሬ እንዴት ነህ?
          </div>
        )}

        {/* ERROR DISPLAY */}
        {error && (
          <div className="error-message">
              ⚠️ ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።
          </div>
        )}

        {!showOptions ? (
          <div className="timer-display">{formatTime(recordingTime)}</div>
        ) : (
          <div className="response-section">
            <div className="response-display">
              <h3>የወዳጅ ምላሽ💬</h3>
              <div className="response-text">
                {isProcessing ? (
                  "ድምጽህን እያሰለስኩ ነው... እባክህ ጠብቅ 🌸"
                ) : error ? (
                  <div className="error-state">
                    <p>የመዝገብን በማስተናገድ ላይ ችግር ተፈጥሯል።</p>
                    <button className="retry-button" onClick={handleAskMore}>
                      እንደገና ሞክር
                    </button>
                  </div>
                ) : (
                  <div className="audio-response-ready">
                    <p>የአርቲፊሻል ኢንተሊጀንስ ምላሽዎ ዝግጁ ነው! ለመስማት "ምላሽን አጫውት" ይጫኑ። 🎵</p>
                    <p className="response-note">ድምጽህን አዳምጨውዋለው እና አንተን ለመደገፍ እዚህ ነኝ። </p>
                  </div>
                )}
              </div>
            </div>
            
            {!error && (
              <div className="post-recording-info">
                <p className="instructions-small">የተመላሽ ነጻጆት ዝግጁ ነው። ቀጣይ ምን ማድረግ ይፈልጋሉ?</p>
                <div className="recording-options-container">
                  <div className="recording-options">
                    <button 
                      className="option-button read-response" 
                      onClick={handleReadResponse}
                      disabled={isProcessing || !audioRef.current || error}
                    >
                      {isPlayingResponse ? "ምላሽን አቁም" : "ምላሽን አጫውት"}
                    </button>
                    <button className="option-button ask-more" onClick={handleAskMore}>
                      {error ? "እንደገና ሞክር" : "ተጨማሪ ጥያቄ🌼"}
                    </button>
                  </div>
                </div>
              </div>
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
            ⏳ መዝገብ በ {120 - recordingTime} ሰከንዶች ውስጥ ይቆማል
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