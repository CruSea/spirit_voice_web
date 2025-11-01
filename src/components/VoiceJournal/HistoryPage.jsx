import { useState } from 'react'
import './HistoryPage.css'

const HistoryPage = ({ recordings, onBackToHome, onLoginClick, onSignupClick }) => {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handlePlay = (id) => {
    // In a real app, this would play the actual audio
    console.log(`Playing recording ${id}`)
  }

  const handleDownload = (id) => {
    // In a real app, this would download the audio file
    console.log(`Downloading recording ${id}`)
  }

  const handleDelete = (id) => {
    // In a real app, this would delete the recording
    console.log(`Deleting recording ${id}`)
  }

  return (
    <div className="history-page">
      <header className="history-header">
        <button className="back-button" onClick={onBackToHome}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <div className="logo">Voice History</div>
        <div className="auth-buttons">
          <button className="login-button" onClick={onLoginClick}>
            Login
          </button>
          <button className="signup-button" onClick={onSignupClick}>
            Sign Up
          </button>
        </div>
      </header>

      <div className="history-content">
        <h1>Recording History</h1>
        
        {recordings.length === 0 ? (
          <div className="empty-state">
            <p>No recordings yet. Start by recording your first voice message.</p>
            <button className="primary-button" onClick={onBackToHome}>
              Record Now
            </button>
          </div>
        ) : (
          <div className="history-list">
            {recordings.map((recording) => (
              <div key={recording.id} className="history-item">
                <div className="history-item-header">
                  <div className="timestamp">{recording.timestamp}</div>
                  <button 
                    className="expand-button" 
                    onClick={() => toggleExpand(recording.id)}
                  >
                    {expandedId === recording.id ? '−' : '+'}
                  </button>
                </div>
                
                {expandedId === recording.id && (
                  <div className="history-item-content">
                    <div className="response-preview">
                      {recording.response}
                    </div>
                    <div className="history-actions">
                      <button 
                        className="action-button play-button" 
                        onClick={() => handlePlay(recording.id)}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                        </svg>
                      </button>
                      <button 
                        className="action-button download-button" 
                        onClick={() => handleDownload(recording.id)}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                      </button>
                      <button 
                        className="action-button delete-button" 
                        onClick={() => handleDelete(recording.id)}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPage