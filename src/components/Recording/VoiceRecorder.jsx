import { useState, useEffect, useRef } from 'react'
import './Recording.css'

const VoiceRecorder = ({ onRecordingComplete, onLoginClick, onSignupClick, onShowResponse, onAskMore, currentResponse, isPlayingResponse, onPlayResponse }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)

  useEffect(() => {
    if (isRecording && recordingTime >= 110 && recordingTime < 120) {
      setShowWarning(true)
    } else if (recordingTime >= 120) {
      stopRecording();
    }
  }, [recordingTime, isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        onRecordingComplete(audioBlob)
        setShowOptions(true)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
      setShowWarning(false)
      setShowOptions(false)

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      clearInterval(timerRef.current)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleReadResponse = () => {
    onPlayResponse()
  }

  const handleAskMore = () => {
    setShowOptions(false)
  }

  return (
    <div className="voice-recorder">
      <header className="recorder-header">
        <div className="logo">Spirit Voice</div>
        <div className="auth-buttons">
          <button className="login-button" onClick={onLoginClick}>
            Login
          </button>
          <button className="signup-button" onClick={onSignupClick}>
            Sign Up
          </button>
        </div>
      </header>

      <div className="recorder-content">
        {!showOptions ? (
          <div className="timer-display">{formatTime(recordingTime)}</div>
        ) : (
          <div className="response-section">
            <div className="response-display">
              <h3>AI Response:</h3>
              <div className="response-text">{currentResponse || "Processing your voice..."}</div>
            </div>
            <div className="post-recording-info">
              <p className="instructions-small">Recording complete. Choose an option below.</p>
              <div className="recording-options-container">
                <div className="recording-options">
                  <button className="option-button read-response" onClick={handleReadResponse}>
                    {isPlayingResponse ? "Pause" : "Play Response"}
                  </button>
                  <button className="option-button ask-more" onClick={handleAskMore}>
                    Ask More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!showOptions && (
          <div className="recording-container">
            <button
              className={`record-button ${isRecording ? 'recording' : ''} ${showWarning ? 'warning' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
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
              {isRecording && (
                <div className="recording-ring"></div>
              )}
            </button>
          </div>
        )}
        
        {showWarning && (
          <div className="warning-message">
            Recording will stop in {120 - recordingTime} seconds
          </div>
        )}
        
        <div className="instructions">
          {isRecording ? (
            <p>Recording... Click to stop</p>
          ) : showOptions ? null : (
            <p>Click the button to start recording</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default VoiceRecorder