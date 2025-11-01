import { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin, onSwitchToSignup, onBackToHome }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    localStorage.setItem("loggedInUser", email);

    // In a real app, this would call an API
    // For now, we'll just simulate a successful login
    onLogin({ email });
  };

  const navigate = useNavigate();

  const handleClose = () => {
    if (typeof onBackToHome === 'function') return onBackToHome()
    navigate('/')
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <div className="auth-header">
          <h2>Login</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={login}>
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
          <Link to="/">
            <button
              type="submit"
              className="auth-button"
              onClick={login}
            >
              Login
            </button>
          </Link>
        </form>
        <div className="auth-switch">
          <p>
            Don't have an account?
            <Link to="/signup">
              {" "}
              <button onClick={onSwitchToSignup} className="switch-button">
                Sign Up
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
