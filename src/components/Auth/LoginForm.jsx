import { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin, onSwitchToSignup, onBackToHome }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) {
      setError("እባክህ ሁሉንም መስኮች ሙላ");
      return;
    }

    localStorage.setItem("loggedInUser", email);

    // In a real app, this would call an API
    // For now, we'll just simulate a successful login
    onLogin({ email });
    
    // Redirect to the records page after successful login
    navigate('/records');
  };

  const handleClose = () => {
    if (typeof onBackToHome === 'function') return onBackToHome()
    navigate('/')
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <div className="auth-header">
          <h2>ግባ</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="email">ኢሜል</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder= "ኢሜሎትን አስገቡ"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">የይለፍ ቃል</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="የይለፍ ቃልዎን አስገቡ"
            />
          </div>
          <button
            type="submit"
            className="auth-button"
          >
            ግባ
          </button>
        </form>
        <div className="auth-switch">
          <p>
           አልተመዘገቡም?
            <button onClick={onSwitchToSignup} className="switch-button">
              ይመዝገቡ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;