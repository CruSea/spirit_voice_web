// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Auth/LoginForm';
import Signup from './components/Auth/SignupForm';
import VoiceRecorder from './components/Recording/VoiceRecorder';
import UserAccount from './components/Settings/UserAccount';
import HistoryPage from './components/VoiceJournal/HistoryPage';
import MoodTracker from './components/MoodTracker/MoodTracker';
import BibleGuidance from './components/BibleGuidance/BibleGuidance';
import VoiceHistory from './components/VoiceHistory/VoiceHistory';
import Settings from './components/Settings/Settings';
import logo from './assets/wedaj.png'; 

function App() {
  const [user, setUser] = useState(null);
  // Sample recordings data for the user account page
  const [recordings] = useState([
    {
      id: 1,
      timestamp: '2023-05-15 14:30',
      response: 'I understand you\'re feeling overwhelmed today. Remember that it\'s okay to feel this way, and taking time for yourself is important. Perhaps try a short walk or some deep breathing exercises.'
    },
    {
      id: 2,
      timestamp: '2023-05-10 09:15',
      response: 'It sounds like you had a meaningful conversation with a friend. Cherishing these connections is vital for our well-being. Consider expressing gratitude for their presence in your life.'
    }
  ]);

  // initialize user from localStorage (if present)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('loggedInUser');
      if (stored) setUser(JSON.parse(stored) || stored);
    } catch (e) {
      // fallback: use raw value
      const raw = localStorage.getItem('loggedInUser');
      if (raw) setUser(raw);
    }
  }, []);

  const handleLogin = (userData) => {
    try {
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
    } catch (e) {
      localStorage.setItem('loggedInUser', userData?.email || userData || '');
    }
    setUser(userData);
  };

  const handleSignup = (userData) => {
    try {
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
    } catch (e) {
      localStorage.setItem('loggedInUser', userData?.email || userData || '');
    }
    setUser(userData);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('loggedInUser');
    } catch (e) {}
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VoiceRecorder user={user} onLogout={handleLogout} />} />
        <Route path="/log-in" element={<Login onLogin={(u) => { handleLogin(u); }} />} />
        <Route path="/sign-up" element={<Signup onSignup={(u) => { handleSignup(u); }} />} />
        <Route path="/account" element={<UserAccount user={user} recordings={recordings} onLogout={handleLogout} />} />
        <Route path="/records" element={<HistoryPage recordings={recordings} user={user} onLogout={handleLogout} onBackToHome={() => window.location.href='/'} />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/bible-guidance" element={<BibleGuidance />} />
        <Route path="/voice-history" element={<VoiceHistory />} />
        <Route path="/settings" element={<Settings user={user} onLogout={handleLogout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;