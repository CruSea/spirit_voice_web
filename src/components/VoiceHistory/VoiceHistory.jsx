import { useState } from 'react'
import './VoiceHistory.css'
import { useNavigate } from 'react-router-dom'

const VoiceHistory = () => {
  const navigate = useNavigate()
  
  const [conversations] = useState([
    {
      id: 1,
      date: 'Today',
      time: '8:30 AM',
      duration: '2:34',
      emotion: 'Grateful',
      emotionEmoji: '🙏',
      text: 'Thank you, Lord, for this beautiful morning and for all the blessings in my life. I feel your presen...',
      guidance: {
        text: "Your gratitude fills My heart with joy. Continue to give thanks in all circumstances, for this is My will for you in Christ Jesus.",
        verse: "1 Thessalonians 5:18"
      }
    },
    {
      id: 2,
      date: 'Yesterday',
      time: '6:15 PM',
      duration: '3:12',
      emotion: 'Peaceful',
      emotionEmoji: '😌',
      text: "I'm feeling anxious about tomorrow's meeting, but I know You are with me. Help me to trust in Your p...",
      guidance: {
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. My peace will guard your heart and mind.",
        verse: "Philippians 4:6-7"
      }
    },
    {
      id: 3,
      date: '2 days ago',
      time: '7:00 AM',
      duration: '1:45',
      emotion: 'Hopeful',
      emotionEmoji: '🌅',
      text: "Lord, I'm starting this new chapter in my life and I need Your guidance. Show me the path You want m...",
      guidance: {
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to Him, and He will make your paths straight.",
        verse: "Proverbs 3:5-6"
      }
    },
    {
      id: 4,
      date: '3 days ago',
      time: '9:20 PM',
      duration: '4:01',
      emotion: 'Joyful',
      emotionEmoji: '😊',
      text: "I can't thank You enough for answering my prayer today! You are so faithful and Your love overwhelms...",
      guidance: {
        text: "Give thanks to the Lord, for He is good; His love endures forever. Your joy fills heaven with celebration. Continue to rejoice in Me always.",
        verse: "Psalm 107:1"
      }
    },
    {
      id: 5,
      date: '1 week ago',
      time: '3:30 PM',
      duration: '2:56',
      emotion: 'Anxious',
      emotionEmoji: '😰',
      text: "Father, I'm struggling with worry about my family's health. I know You are in control, but my heart ...",
      guidance: {
        text: "Cast all your anxiety on Me because I care for you. I am close to the brokenhearted and save those who are crushed in spirit. Trust in My healing power.",
        verse: "1 Peter 5:7"
      }
    }
  ])
  
  const [stats] = useState({
    conversations: 47,
    guidance: 156,
    days: 23
  })
  
  const [insights] = useState({
    emotion: 'Gratitude',
    emotionEmoji: '🙏',
    emotionPercentage: 68,
    favoriteVerse: 'Trust in the Lord with all your heart...',
    favoriteVerseRef: 'Proverbs 3:5-6',
    favoriteVerseCount: 12,
    bestTime: 'Morning',
    bestTimeEmoji: '🌅',
    bestTimeRange: '6:00 AM - 8:00 AM'
  })

  return (
    <div className="voice-history">
      <header className="history-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Your Voice History</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="history-content">
        <p className="history-description">
          Journey through your past conversations with God, guided by your AI spiritual companion
        </p>

        <div className="verse-highlight">
          <p>📖 "I will never forget your precepts, for by them you have given me life" - Psalm 119:93</p>
        </div>

        <div className="companion-section">
          <h2>Meet Your Spiritual Companion</h2>
          <p>Your AI avatar remembers every conversation and provides personalized biblical guidance</p>
          
          <div className="companion-card">
            <div className="companion-avatar">👼</div>
            <div className="companion-info">
              <h3>Faith</h3>
              <p>Your AI spiritual companion who listens, remembers, and guides you with biblical wisdom. Every voice recording is analyzed to provide personalized encouragement and scripture.</p>
              <button className="start-button">Start Conversation</button>
            </div>
          </div>
        </div>

        <div className="guidance-section">
          <h2>Today's Guidance</h2>
          <div className="guidance-card">
            <div className="guidance-emoji">✨</div>
            <p className="guidance-text">"I noticed you've been feeling anxious about your future lately. Remember, I know the plans I have for you - plans to prosper you and give you hope. Trust in My timing and continue to seek Me in prayer."</p>
            <p className="guidance-verse">Jeremiah 29:11</p>
            <p className="guidance-source">Based on your voice recording from yesterday</p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.conversations}</div>
              <div className="stat-label">Conversations</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.guidance}</div>
              <div className="stat-label">Guidance Given</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.days}</div>
              <div className="stat-label">Days Together</div>
            </div>
          </div>
        </div>

        <div className="journey-section">
          <h2>Your Spiritual Journey</h2>
          <p>Explore your conversations with God through time</p>
          
          <div className="conversations-list">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="conversation-card">
                <div className="conversation-header">
                  <div className="conversation-date">{conversation.date}</div>
                  <div className="conversation-emotion">
                    <span className="emotion-emoji">{conversation.emotionEmoji}</span>
                    <span className="emotion-name">{conversation.emotion}</span>
                  </div>
                </div>
                
                <div className="conversation-content">
                  <div className="play-icon">▶️</div>
                  <div className="conversation-time">{conversation.time} • {conversation.duration}</div>
                </div>
                
                <div className="conversation-text">
                  <p>{conversation.text}</p>
                </div>
                
                <div className="ai-guidance">
                  <div className="guidance-icon">✨</div>
                  <div className="guidance-content">
                    <p className="guidance-text">"{conversation.guidance.text}"</p>
                    <p className="guidance-verse">{conversation.guidance.verse}</p>
                  </div>
                </div>
                
                <div className="conversation-actions">
                  <button className="action-button share-button">📤 Share</button>
                  <button className="action-button save-button">❤️ Save</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="featured-section">
          <h2>Featured Conversations</h2>
          <p>Relive your most meaningful spiritual moments</p>
          {/* Featured content would go here */}
        </div>

        <div className="insights-section">
          <h2>Your Voice Insights</h2>
          <p>Discover patterns in your spiritual conversations</p>
          
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">🎤</div>
              <h3>Most Common Emotion</h3>
              <div className="insight-value">
                <span className="emotion-emoji">{insights.emotionEmoji}</span>
                <span className="emotion-name">{insights.emotion}</span>
              </div>
              <p>Appears in {insights.emotionPercentage}% of your conversations</p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">📖</div>
              <h3>Favorite Verse</h3>
              <p className="insight-value">"{insights.favoriteVerse}"</p>
              <p>{insights.favoriteVerseRef}</p>
              <p>Referenced {insights.favoriteVerseCount} times</p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">⏰</div>
              <h3>Best Prayer Time</h3>
              <div className="insight-value">
                <span className="time-emoji">{insights.bestTimeEmoji}</span>
                <span className="time-name">{insights.bestTime}</span>
              </div>
              <p>{insights.bestTimeRange}</p>
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

export default VoiceHistory