import { useState, useEffect, useRef } from 'react'
import './App.css'
import VoiceRecorder from './components/Recording/VoiceRecorder'
import ResponsePage from './components/AiInteraction/AiResponse'
import HistoryPage from './components/VoiceJournal/HistoryPage'
import LoginForm from './components/Auth/LoginForm'
import SignupForm from './components/Auth/SignupForm'

function App() {
  const [currentPage, setCurrentPage] = useState('home') // home, processing, response, history, login, signup
  const [currentResponse, setCurrentResponse] = useState('')
  const [recordings, setRecordings] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isPlayingResponse, setIsPlayingResponse] = useState(false)
  const speechSynthesisRef = useRef(null)

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleRecordingComplete = (audioBlob) => {
    // Simulate AI processing
    setTimeout(() => {
      // Mock AI response
      const mockResponse = "Thank you for sharing your thoughts. I understand you're feeling contemplative today. Remember that it's okay to take time for yourself and reflect on what matters most to you."
      setCurrentResponse(mockResponse)
      
      // Save recording to history
      const newRecording = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        audio: audioBlob,
        response: mockResponse
      }
      setRecordings(prev => [newRecording, ...prev])
    }, 3000)
  }

  const handleRecordAnother = () => {
    setCurrentPage('home')
  }

  const handleViewHistory = () => {
    setCurrentPage('history')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  const handleShowResponse = () => {
    setCurrentPage('response')
  }

  const handlePlayResponse = () => {
    if (isPlayingResponse) {
      // Pause playback
      window.speechSynthesis.cancel()
      setIsPlayingResponse(false)
    } else {
      // Start playback
      if (currentResponse) {
        const utterance = new SpeechSynthesisUtterance(currentResponse)
        utterance.rate = 1.0
        utterance.pitch = 1.0
        utterance.volume = 1.0
        
        utterance.onstart = () => {
          setIsPlayingResponse(true)
        }
        
        utterance.onend = () => {
          setIsPlayingResponse(false)
        }
        
        utterance.onerror = () => {
          setIsPlayingResponse(false)
        }
        
        window.speechSynthesis.speak(utterance)
        speechSynthesisRef.current = utterance
      }
    }
  }

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setCurrentUser(userData)
    setCurrentPage('home')
  }

  const handleSignup = (userData) => {
    setIsAuthenticated(true)
    setCurrentUser(userData)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  const showLogin = () => {
    setCurrentPage('login')
  }

  const showSignup = () => {
    setCurrentPage('signup')
  }

  const showHome = () => {
    setCurrentPage('home')
  }

  return (
    <div className="app">
      {!isAuthenticated && currentPage === 'login' && (
        <LoginForm 
          onLogin={handleLogin}
          onSwitchToSignup={showSignup}
          onBackToHome={showHome}
        />
      )}
      
      {!isAuthenticated && currentPage === 'signup' && (
        <SignupForm 
          onSignup={handleSignup}
          onSwitchToLogin={showLogin}
          onBackToHome={showHome}
        />
      )}
      
      {!isAuthenticated && currentPage === 'home' && (
        <VoiceRecorder 
          onRecordingComplete={handleRecordingComplete}
          onLoginClick={showLogin}
          onSignupClick={showSignup}
          onShowResponse={handleShowResponse}
          onAskMore={handleRecordAnother}
          currentResponse={currentResponse}
          isPlayingResponse={isPlayingResponse}
          onPlayResponse={handlePlayResponse}
        />
      )}
      
      {isAuthenticated && currentPage === 'home' && (
        <VoiceRecorder 
          onRecordingComplete={handleRecordingComplete}
          onLoginClick={showLogin}
          onSignupClick={showSignup}
          onShowResponse={handleShowResponse}
          onAskMore={handleRecordAnother}
          currentResponse={currentResponse}
          isPlayingResponse={isPlayingResponse}
          onPlayResponse={handlePlayResponse}
        />
      )}
      
      {isAuthenticated && currentPage === 'response' && (
        <ResponsePage 
          response={currentResponse}
          onRecordAnother={handleRecordAnother}
          onViewHistory={handleViewHistory}
          onLoginClick={showLogin}
          onSignupClick={showSignup}
        />
      )}
      
      {isAuthenticated && currentPage === 'history' && (
        <HistoryPage 
          recordings={recordings}
          onBackToHome={handleBackToHome}
          onLoginClick={showLogin}
          onSignupClick={showSignup}
        />
      )}
    </div>
  )
}

export default App