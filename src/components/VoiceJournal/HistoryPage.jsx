import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HistoryPage.css'
import logo from '../../assets/wedaj.png'; 

const HistoryPage = ({ onLoginClick, onSignupClick, user, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

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
        navigate('/')
        break
      case 'record':
        navigate('/')
        break
      case 'mood':
        // Navigate to mood tracker
        navigate('/mood-tracker')
        break
      case 'bible':
        // Navigate to bible guidance
        navigate('/bible-guidance')
        break
      case 'prayer':
        // Navigate to prayer request
        alert('Navigating to Prayer Request')
        break
      case 'settings':
        // Navigate to settings
        alert('Navigating to Settings')
        break
      case 'logout':
        if (onLogout) onLogout()
        break
      default:
        break
    }
  }

  return (
    <div className="history-page">
      <header className="history-header">
       <div className="logo">
              <img src={logo} alt="Wedaj logo" className="logo-image" width="50px" />
              </div>
  
        {user ? (
          <button className="hamburger-button" onClick={toggleMenu}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="#4b3cc4" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        ) : (
          <div className="auth-buttons">
            <button className="login-button" onClick={() =>navigate('log-in')}>ግባ</button>
          <button className="signup-button" onClick={()=> navigate('sign-up')}>ይመዝገቡ</button>
          </div>
        )}
      </header>

      {showMenu && user && (
        <div className="menu-overlay" onClick={closeMenu}>
          <div className="sidebar-menu" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <h2>ማውጫ</h2>
              <button className="close-button" onClick={closeMenu}>×</button>
            </div>
            <ul className="sidebar-nav">
              <li className="sidebar-item" onClick={() => handleMenuClick('home')}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span>ዋና ገጽ</span>
              </li>
              <li className="sidebar-item" onClick={() => handleMenuClick('record')}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                <span>የድምጽ ቅጂ</span>
              </li>
              <li className="sidebar-item" onClick={() => handleMenuClick('mood')}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm4 4h-4v4h4v-4z"/>
                </svg>
                <span>የስሜት መከታተያ</span>
              </li>
              <li className="sidebar-item" onClick={() => handleMenuClick('bible')}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/>
                </svg>
                <span>የመጽሐፍ ቅዱስ መመሪያ</span>
              </li>
              <li className="sidebar-item" onClick={() => handleMenuClick('prayer')}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/>
                </svg>
                <span>የጸሎት ጥያቄ</span>
              </li>
              <li className="sidebar-item" onClick={() => handleMenuClick('settings')}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.09-.61l-1.92-3.32c-.14-.23-.42-.31-.66-.19l-2.37 1.01c-.48-.38-.99-.72-1.54-1.01l-.33-2.53c-.03-.24-.24-.42-.49-.42h-3.84c-.25 0-.46.18-.49.42l-.33 2.53c-.55.29-1.06.63-1.54 1.01l-2.37-1.01c-.24-.12-.52-.04-.66.19l-1.92 3.32c-.14.23-.09.5.09.61l2.03 1.58c-.05.3-.09.61-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.09.61l1.92 3.32c.14.23.42.31.66.19l2.37-1.01c.48.38.99.72 1.54 1.01l.33 2.53c.03.24.24.42.49.42h3.84c.25 0 .46-.18.49-.42l.33-2.53c.55-.29 1.06-.63 1.54-1.01l2.37 1.01c.24.12.52.04.66-.19l1.92-3.32c.14-.23.09-.5-.09-.61l-2.03-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                </svg>
                <span>ማስትካክያ</span>
              </li>
              <li className="sidebar-item logout-item" onClick={() => handleMenuClick('logout')}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                <span>ይውጡ</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="recorder-content">
        {/* GREETING - only at the beginning */}
        <div className="greeting">
          ሰላም ዛሬ እንዴት ነህ?
        </div>

        {/* Recording button for quick access */}
        {user && (
          <div className="recording-container">
            <button 
              className="record-button" 
              onClick={() => navigate('/')}
            >
              <div className="mic-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path fill="white" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path fill="white" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </div>
            </button>
          </div>
        )}

        <div className="instructions">
          <p>Take a deep breath and start sharing your thoughts ✨</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage