import { useState } from 'react'
import './AiInteraction.css'
import VoiceRecorder from '../Recording/VoiceRecorder'

const ResponsePage = ({ response, onRecordAnother, onViewHistory, onLoginClick, onSignupClick }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayResponse = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would play the actual audio response
    console.log("Playing AI response audio")
  }

  return (
    <div className="response-page">
      <header className="response-header">
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

      <div className="response-content">
        <div className="ai-response-container">
          <h2>Spiritual Guidance</h2>
          <div className="response-text">
            {response}
          </div>
          
          <button className="play-button" onClick={handlePlayResponse}>
            {isPlaying ? (
              <div className="pause-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <rect x="6" y="4" width="4" height="16" fill="white"/>
                  <rect x="14" y="4" width="4" height="16" fill="white"/>
                </svg>
              </div>
            ) : (
              <div className="play-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <polygon points="5,3 19,12 5,21" fill="white"/>
                </svg>
              </div>
            )}
            <span>{isPlaying ? "Pause" : "Play Response"}</span>
          </button>
        </div>

        <div className="actions-section">
          <button className="secondary-button" onClick={onRecordAnother}>
            Record Another Message
          </button>
          <button className="primary-button" onClick={onViewHistory}>
            View History
          </button>
        </div>
      </div>

      {/* Nested recording component for "Record Another" */}
      <div className="nested-recorder">
        <VoiceRecorder 
          onRecordingComplete={() => {}} // Will be handled by parent
          onLoginClick={onLoginClick}
          onSignupClick={onSignupClick}
        />
      </div>
    </div>
  )
}

export default ResponsePage