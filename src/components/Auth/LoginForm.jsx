import { useState } from 'react'
import './Auth.css'

const LoginForm = ({ onLogin, onSwitchToSignup, onBackToHome }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    // In a real app, this would call an API
    // For now, we'll just simulate a successful login
    onLogin({ email })
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <div className="auth-header">
          <h2>Login</h2>
          <button className="close-button" onClick={onBackToHome}>×</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="auth-button">Login</button>
        </form>
        <div className="auth-switch">
          <p>Don't have an account? <button onClick={onSwitchToSignup} className="switch-button">Sign Up</button></p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm