import { useState } from 'react'
import './settings.css'
import { useNavigate } from 'react-router-dom'

const Settings = ({ user, onLogout }) => {
  const navigate = useNavigate()
  
  const [userSettings, setUserSettings] = useState({
    name: user?.name || 'User',
    email: user?.email || '',
    notifications: true,
    darkMode: false,
    autoSave: true,
    language: 'en',
    privacy: 'private'
  })

  const handleUserSettingChange = (setting, value) => {
    setUserSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className="settings">
      <header className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Settings</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="settings-content">
        <div className="settings-columns">
          <div className="settings-column left-column">
            <div className="settings-section user-settings">
              <h2>User Settings</h2>
              
              <div className="setting-item">
                <label>Name</label>
                <input 
                  type="text" 
                  value={userSettings.name}
                  onChange={(e) => handleUserSettingChange('name', e.target.value)}
                />
              </div>
              
              <div className="setting-item">
                <label>Email</label>
                <input 
                  type="email" 
                  value={userSettings.email}
                  onChange={(e) => handleUserSettingChange('email', e.target.value)}
                />
              </div>
              
              <div className="setting-item">
                <label>Language</label>
                <select 
                  value={userSettings.language}
                  onChange={(e) => handleUserSettingChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="am">Amharic</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              
              <div className="setting-item toggle-setting">
                <label>Notifications</label>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="notifications"
                    checked={userSettings.notifications}
                    onChange={(e) => handleUserSettingChange('notifications', e.target.checked)}
                  />
                  <label htmlFor="notifications" className="toggle-label">
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item toggle-setting">
                <label>Dark Mode</label>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="darkMode"
                    checked={userSettings.darkMode}
                    onChange={(e) => handleUserSettingChange('darkMode', e.target.checked)}
                  />
                  <label htmlFor="darkMode" className="toggle-label">
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item toggle-setting">
                <label>Auto Save Recordings</label>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="autoSave"
                    checked={userSettings.autoSave}
                    onChange={(e) => handleUserSettingChange('autoSave', e.target.checked)}
                  />
                  <label htmlFor="autoSave" className="toggle-label">
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <label>Privacy</label>
                <select 
                  value={userSettings.privacy}
                  onChange={(e) => handleUserSettingChange('privacy', e.target.value)}
                >
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-column right-column">
            <div className="settings-section account-actions">
              <h2>Account Actions</h2>
              
              <button className="action-button change-password">Change Password</button>
              <button className="action-button export-data">Export Data</button>
              <button className="action-button delete-account">Delete Account</button>
              <button className="action-button logout" onClick={onLogout}>Logout</button>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="save-button" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  )
}

export default Settings