// components/Layout/Navbar.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const NAV_ITEMS = [
  { key: 'mentor', label: 'Mentor Guidance', icon: '🧑‍🏫', path: '/MentorGuidance' },
  { key: 'bible', label: 'Bible Guidance', icon: '📖', path: '/BibleGuidance' },
  { key: 'mood', label: 'Mood Tracker', icon: '🧭', path: '/Moodtracker' },
  { key: 'journal', label: 'Voice Journal', icon: '🎙️', path: '/VoiceJournal' },
  { key: 'prayer', label: 'Prayer Request', icon: '🙏', path: '/PrayerRequest' },
  { key: 'settings', label: 'User Settings', icon: '⚙️', path: '/Settings' },
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
        aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'}
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
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
