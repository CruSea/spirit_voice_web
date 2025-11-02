import { useState, useRef } from 'react'
import './MoodTracker.css'
import { useNavigate } from 'react-router-dom'

const MoodTracker = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcription, setTranscription] = useState('Your words will appear here...')
  const [emotions, setEmotions] = useState([
    { emoji: '😊', name: 'Peace', value: 85 },
    { emoji: '😊', name: 'Joy', value: 72 },
    { emoji: '🙏', name: 'Gratitude', value: 91 },
    { emoji: '💝', name: 'Love', value: 78 }
  ])
  const [verses, setVerses] = useState([
    {
      title: "For Your Current Emotions",
      text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      reference: "John 14:27",
      description: "This verse speaks directly to the peace we detected in your voice, reminding you of Jesus' gift of perfect peace."
    },
    {
      title: "For Spiritual Growth",
      text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      reference: "Philippians 4:7",
      description: "Your grateful heart is perfectly positioned to receive God's transcendent peace that guards and protects."
    }
  ])
  const [stats, setStats] = useState({
    peacefulDays: 23,
    prayersRecorded: 47,
    versesReceived: 156
  })
  
  const navigate = useNavigate()
  const timerRef = useRef(null)

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    setTranscription('Listening...')
    
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    clearInterval(timerRef.current)
    
    // Simulate transcription
    setTranscription("I've been feeling really grateful today. The morning started with a beautiful sunrise, and I felt such a deep sense of peace. It reminded me of how blessed I am to be part of this community. I'm also excited about the upcoming events and how we can grow together in faith.")
  }

  return (
    <div className="mood-tracker">
      <header className="mood-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Voice Mood Tracker</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="mood-content">
        <p className="mood-description">
          Speak your heart and discover how you're feeling with AI-powered emotional analysis and biblical guidance
        </p>

        <div className="verse-highlight">
          <p>🎯 "Be still and know that I am God" - Psalm 46:10</p>
        </div>

        <div className="recording-section">
          <h2>Record Your Voice</h2>
          <div className="mic-container">
            <button 
              className={`record-button ${isRecording ? 'recording' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              🎤
            </button>
          </div>
          <div className="timer">
            {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:
            {(recordingTime % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="transcription-section">
          <h3>Voice Transcription:</h3>
          <div className="transcription-box">
            <p>{transcription}</p>
          </div>
        </div>

        <div className="emotions-section">
          <h2>Emotional Analysis</h2>
          <div className="emotions-grid">
            {emotions.map((emotion, index) => (
              <div key={index} className="emotion-card">
                <div className="emotion-emoji">{emotion.emoji}</div>
                <div className="emotion-name">{emotion.name}</div>
                <div className="emotion-value">{emotion.value}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="guidance-section">
          <h2>Your Personalized Biblical Guidance</h2>
          <p>Based on your emotional analysis, here are verses chosen just for you</p>
          
          {verses.map((verse, index) => (
            <div key={index} className="verse-card">
              <div className="verse-emoji">📖</div>
              <h3>{verse.title}</h3>
              <p className="verse-text">"{verse.text}"</p>
              <p className="verse-reference">{verse.reference}</p>
              <p className="verse-description">{verse.description}</p>
            </div>
          ))}
          
          <button className="explore-button">Explore More Verses</button>
        </div>

        <div className="journey-section">
          <h2>Your Emotional Journey</h2>
          <p>Track your spiritual and emotional growth over time</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-emoji">🕊️</div>
              <div className="stat-value">{stats.peacefulDays}</div>
              <div className="stat-label">Peaceful Days</div>
              <div className="stat-sublabel">This month</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-emoji">🙏</div>
              <div className="stat-value">{stats.prayersRecorded}</div>
              <div className="stat-label">Prayers Recorded</div>
              <div className="stat-sublabel">Total prayers</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-emoji">📖</div>
              <div className="stat-value">{stats.versesReceived}</div>
              <div className="stat-label">Verses Received</div>
              <div className="stat-sublabel">Personalized verses</div>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <div className="faith-icon">✝</div>
          <p className="faith-message">Voice of Faith<br />Bringing biblical wisdom and modern technology together for your spiritual journey</p>
          <p className="copyright">© 2024 Voice of Faith. Created with love for the Christian community.</p>
        </div>
      </div>
    </div>
  )
}

export default MoodTracker