import './SettingsModal.css'

const SettingsModal = ({ onClose, onPageChange, onBackToHome }) => {
  const menuItems = [
    { id: 'profile', icon: '👤', label: 'Profile', description: 'User profile section' },
    { id: 'record', icon: '🎤', label: 'Record', description: 'Return to main recording screen' },
    { id: 'mood', icon: '😊', label: 'Mood Tracker', description: 'Track emotional state' },
    { id: 'history', icon: '📚', label: 'Voice History', description: 'View all past recordings' },
    { id: 'bible', icon: '📖', label: 'Bible Guidance', description: 'Access spiritual content' },
    { id: 'prayer', icon: '🙏', label: 'Prayer Request', description: 'Submit prayer requests' },
    { id: 'settings', icon: '⚙️', label: 'Settings', description: 'App preferences' }
  ]

  const handleMenuClick = (id) => {
    switch (id) {
      case 'record':
        onPageChange('home')
        onClose()
        break
      case 'history':
        onPageChange('history')
        onClose()
        break
      case 'profile':
      case 'mood':
      case 'bible':
      case 'prayer':
      case 'settings':
        // In a real app, these would navigate to their respective pages
        alert(`Navigating to ${id} page`)
        break
      default:
        break
    }
  }

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Menu</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="menu-items">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="menu-item"
              onClick={() => handleMenuClick(item.id)}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-content">
                <div className="menu-label">{item.label}</div>
                <div className="menu-description">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="logout-section">
          <button className="logout-button" onClick={onBackToHome}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal