import { useState } from 'react'
import './Auth.css'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({ onSignup, onSwitchToLogin, onBackToHome }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    localStorage.setItem('loggedInUser', email);

    
    // In a real app, this would call an API
    // For now, we'll just simulate a successful signup
    onSignup({ name, email })
    
    // Redirect to the records page after successful signup
    navigate('/records');
  }

  const handleClose = () => {
    if (typeof onBackToHome === 'function') return onBackToHome()
    navigate('/')
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <div className="auth-header">
          <h2>ይመዝገቡ</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">ሙሉ ስም</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ሙሉ ስምህን አስገባ"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">ኢሜል</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ኢሜልህን አስገባ"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">የይለፍ ቃል</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="የይለፍ ቃልህን አስገባ"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">የይለፍ ቃል ያረጋግጡ</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="የይለፍ ቃልህን አረጋግጥ"
            />
          </div>
          <button type="submit" className="auth-button">ይመዝገቡ</button>
        </form>
        <div className="auth-switch">
          <p>ተመዝግበዋል? <button onClick={onSwitchToLogin} className="switch-button">ግባ</button></p>
        </div>
      </div>
    </div>
  )
}

export default SignupForm