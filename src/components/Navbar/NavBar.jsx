// components/Layout/Navbar.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

const NAV_ITEMS = [
  { key: 'mentor', label: 'የአማካሪ መመሪያ', icon: '🧑‍🏫', path: '/MentorGuidance' },
  { key: 'bible', label: 'የቅዱስ መጽሐፍ መምሪያ', icon: '📖', path: '/BibleGuidance' },
  { key: 'mood', label: 'የስሜት መዳረጊያ', icon: '🧭', path: '/Moodtracker' },
  { key: 'journal', label: 'የድምጽ መዝገብ', icon: '🎙️', path: '/VoiceJournal' },
  { key: 'prayer', label: 'የጸሎት ጥያቄ', icon: '🙏', path: '/PrayerRequest' },
  { key: 'settings', label: 'የተጠቃሚ ቅንብሮች', icon: '⚙️', path: '/Settings' },
]

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(true)

  const handleLogout = () => {
    try {
      localStorage.removeItem('loggedInUser')
    } catch (e) {}
    if (typeof onLogout === 'function') onLogout()
    navigate('/login')
  }

  return (
    <nav className={`navbar vertical ${expanded ? 'expanded' : 'collapsed'}`} aria-hidden={false}>
      <button
        className="nav-toggle"
        aria-label={expanded ? 'አሰሳ አጥብቅ' : 'አሰሳ አሰፋ'}
        onClick={() => setExpanded((s) => !s)}
      >
        {expanded ? '‹' : '›'}
      </button>

      <ul className="nav-links">
        {NAV_ITEMS.map((it) => (
          <li key={it.key} className="nav-item" onClick={() => navigate(it.path)}>
            <span className="nav-icon" aria-hidden>{it.icon}</span>
            <span className="nav-text">{it.label}</span>
          </li>
        ))}
      </ul>

      <div className="navbar-bottom">
        <button className="logout-btn" onClick={handleLogout}>ውጣ</button>
      </div>
    </nav>
  )
}

export default Navbar
