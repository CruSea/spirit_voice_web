// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Auth/LoginForm';
import Signup from './components/Auth/SignupForm';
import VoiceRecorder from './components/Recording/VoiceRecorder';



function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);
  const handleSignup = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <VoiceRecorder />
          }
        />
        <Route path="/log-in" element={<Login onLogin={(u) => { handleLogin(u); }} />} />
        <Route path="/sign-up" element={<Signup onSignup={(u) => { handleSignup(u); }} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
