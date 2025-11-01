import { useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'

const SignupForm = ({ onSignup, onSwitchToLogin, onBackToHome }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

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
  }

  const navigate = useNavigate()

  const handleClose = () => {
    if (typeof onBackToHome === 'function') return onBackToHome()
    navigate('/')
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <div className="auth-header">
          <h2>Sign Up</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <Link to="/">
          <button type="submit" className="auth-button">Sign Up</button>
          </Link>
        </form>
        <div className="auth-switch">
          <p>Already have an account? <Link to='/login'><button onClick={onSwitchToLogin} className="switch-button">Login</button></Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignupForm