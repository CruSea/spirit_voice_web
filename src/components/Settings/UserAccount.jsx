import { useState } from 'react'
import './UserAccount.css'

const UserAccount = ({ user, recordings, onBackToHome, onLogout }) => {
  const [activeTab, setActiveTab] = useState('recordings') // Changed default to 'recordings'
  const [showMenu, setShowMenu] = useState(false)

  // Sample user data - in a real app, this would come from an API
  const userData = {
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    joinDate: 'January 2023',
    totalRecordings: recordings?.length || 0,
    favoriteEmotion: 'Peaceful',
    mostActiveDay: 'Sunday'
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const handleMenuClick = (action) => {
    closeMenu()
    switch (action) {
      case 'home':
        onBackToHome()
        break
      case 'logout':
        onLogout()
        break
      default:
        break
    }
  }

  return (
    <div className="user-account">
      <header className="account-header">
        <button className="back-button" onClick={onBackToHome}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <div className="logo">Wedaj 🌿</div>
        <button className="hamburger-button" onClick={toggleMenu}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
      </header>

      {showMenu && (
        <div className="menu-overlay" onClick={closeMenu}>
          <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
            <button className="menu-item" onClick={() => handleMenuClick('home')}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              Home
            </button>
            <button className="menu-item" onClick={() => handleMenuClick('logout')}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}

      <div className="account-content">
        <div className="account-header-section">
          <div className="profile-avatar">
            <span className="avatar-letter">{userData.name.charAt(0)}</span>
          </div>
          <h1>{userData.name}</h1>
          <p>{userData.email}</p>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <div className="profile-info">
                <div className="info-item">
                  <span className="info-label">Member Since:</span>
                  <span className="info-value">{userData.joinDate}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Recordings:</span>
                  <span className="info-value">{userData.totalRecordings}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Favorite Emotion:</span>
                  <span className="info-value">{userData.favoriteEmotion}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Most Active Day:</span>
                  <span className="info-value">{userData.mostActiveDay}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recordings' && (
            <div className="recordings-tab">
              <h2>My Recordings</h2>
              {recordings && recordings.length > 0 ? (
                <div className="recordings-list">
                  {recordings.map((recording) => (
                    <div key={recording.id} className="recording-item">
                      <div className="recording-header">
                        <div className="recording-timestamp">{recording.timestamp}</div>
                      </div>
                      <div className="recording-preview">
                        {recording.response.substring(0, 100)}...
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-recordings">
                  <p>You haven't made any recordings yet.</p>
                  <button className="primary-button" onClick={onBackToHome}>
                    Start Recording
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserAccount