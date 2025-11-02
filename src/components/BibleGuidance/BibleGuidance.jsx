import { useState } from 'react'
import './BibleGuidance.css'
import { useNavigate } from 'react-router-dom'

const BibleGuidance = () => {
  const navigate = useNavigate()
  
  const [emotions] = useState([
    { emoji: '😰', name: 'Anxiety' },
    { emoji: '🕊️', name: 'Peace' },
    { emoji: '😊', name: 'Joy' },
    { emoji: '🙏', name: 'Gratitude' },
    { emoji: '😢', name: 'Sadness' },
    { emoji: '🌅', name: 'Hope' },
    { emoji: '😨', name: 'Fear' },
    { emoji: '💝', name: 'Love' },
    { emoji: '😠', name: 'Anger' },
    { emoji: '✨', name: 'Faith' },
    { emoji: '😔', name: 'Loneliness' },
    { emoji: '💪', name: 'Strength' }
  ])
  
  const [verses] = useState([
    {
      id: 1,
      type: 'Personal',
      emoji: '🤍',
      text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      reference: "Proverbs 3:5-6",
      description: "Perfect for times of uncertainty and decision-making",
      category: 'trust'
    },
    {
      id: 2,
      type: 'Personal',
      emoji: '🤍',
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      reference: "Romans 8:28",
      description: "A reminder of God's sovereignty in every situation",
      category: 'sovereignty'
    },
    {
      id: 3,
      type: 'Personal',
      emoji: '🤍',
      text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      reference: "Proverbs 3:5-6",
      description: "Perfect for times of uncertainty and decision-making",
      category: 'trust'
    },
    {
      id: 4,
      type: 'Personal',
      emoji: '🤍',
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      reference: "Romans 8:28",
      description: "A reminder of God's sovereignty in every situation",
      category: 'sovereignty'
    }
  ])
  
  const [libraryVerses] = useState([
    {
      id: 5,
      category: 'anxiety',
      emoji: '🤍',
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      reference: "Philippians 4:6",
      description: "Perfect for moments of worry and stress"
    },
    {
      id: 6,
      category: 'anxiety',
      emoji: '🤍',
      text: "Cast all your anxiety on him because he cares for you.",
      reference: "1 Peter 5:7",
      description: "A reminder of God's personal care for your worries"
    },
    {
      id: 7,
      category: 'anxiety',
      emoji: '🤍',
      text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      reference: "John 14:27",
      description: "Jesus' promise of supernatural peace"
    },
    {
      id: 8,
      category: 'peace',
      emoji: '🤍',
      text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      reference: "Philippians 4:7",
      description: "God's peace that goes beyond human comprehension"
    },
    {
      id: 9,
      category: 'peace',
      emoji: '🤍',
      text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
      reference: "Isaiah 26:3",
      description: "The connection between trust and peace"
    },
    {
      id: 10,
      category: 'joy',
      emoji: '🤍',
      text: "Rejoice in the Lord always. I will say it again: Rejoice!",
      reference: "Philippians 4:4",
      description: "A call to find joy in God's character"
    },
    {
      id: 11,
      category: 'joy',
      emoji: '🤍',
      text: "The joy of the Lord is your strength.",
      reference: "Nehemiah 8:10",
      description: "Joy as a source of spiritual strength"
    },
    {
      id: 12,
      category: 'gratitude',
      emoji: '🤍',
      text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
      reference: "1 Thessalonians 5:18",
      description: "God's will for a grateful heart"
    },
    {
      id: 13,
      category: 'gratitude',
      emoji: '🤍',
      text: "Give thanks to the Lord, for he is good; his love endures forever.",
      reference: "Psalm 107:1",
      description: "The foundation of all gratitude - God's goodness"
    }
  ])
  
  const [favorites] = useState([])
  
  const handleEmotionClick = (emotion) => {
    alert(`Showing verses for ${emotion.name}`)
  }
  
  const handleFavorite = (verseId) => {
    alert(`Added verse ${verseId} to favorites`)
  }
  
  return (
    <div className="bible-guidance">
      <header className="bible-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>AI Bible Guidance</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="bible-content">
        <p className="bible-description">
          Discover personalized Bible verses and spiritual insights tailored to your emotional needs and life circumstances
        </p>

        <div className="verse-highlight">
          <h2>Verse of the Day</h2>
          <p className="verse-text">"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."</p>
          <p className="verse-reference">Proverbs 3:5-6</p>
        </div>

        <div className="emotions-section">
          <h2>Find Verses by Emotion</h2>
          <p>Select how you're feeling to receive personalized biblical guidance</p>
          
          <div className="emotions-grid">
            {emotions.map((emotion, index) => (
              <button 
                key={index} 
                className="emotion-button"
                onClick={() => handleEmotionClick(emotion)}
              >
                <span className="emotion-emoji">{emotion.emoji}</span>
                <span className="emotion-name">{emotion.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="verses-section">
          <h2>Verses for You</h2>
          <p>Based on your recent mood analysis and spiritual needs</p>
          
          <div className="verses-list">
            {verses.map((verse) => (
              <div key={verse.id} className="verse-card">
                <div className="verse-header">
                  <span className="verse-type">{verse.type}</span>
                  <button 
                    className="favorite-button" 
                    onClick={() => handleFavorite(verse.id)}
                  >
                    {favorites.includes(verse.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="verse-emoji">{verse.emoji}</div>
                <p className="verse-text">"{verse.text}"</p>
                <p className="verse-reference">{verse.reference}</p>
                <p className="verse-description">{verse.description}</p>
                <div className="verse-actions">
                  <button className="action-button listen-button">🔊 Listen</button>
                  <button className="action-button share-button">📤 Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="library-section">
          <h2>Complete Verse Library</h2>
          <p>Explore our comprehensive collection of biblical wisdom</p>
          
          <div className="library-grid">
            {libraryVerses.map((verse) => (
              <div key={verse.id} className="library-verse">
                <div className="verse-category">{verse.category}</div>
                <div className="verse-emoji">{verse.emoji}</div>
                <p className="verse-text">"{verse.text}"</p>
                <p className="verse-reference">{verse.reference}</p>
                <p className="verse-description">{verse.description}</p>
                <div className="verse-actions">
                  <button className="action-button listen-button">🔊 Listen</button>
                  <button className="action-button share-button">📤 Share</button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="load-more-button">Load More Verses</button>
        </div>

        <div className="prayer-section">
          <h2>Prayer Suggestions</h2>
          <p>Let these prayers guide your conversation with God</p>
          {/* Prayer content would go here */}
        </div>

        <div className="favorites-section">
          <h2>My Favorite Verses</h2>
          <p>Your personally saved collection of meaningful scriptures</p>
          
          {favorites.length > 0 ? (
            <div className="favorites-list">
              {/* Favorite verses would be displayed here */}
            </div>
          ) : (
            <div className="no-favorites">
              <div className="favorites-emoji">📖</div>
              <p>No Favorites Yet</p>
              <p>Start exploring verses and click the ❤️ to save your favorites here.</p>
            </div>
          )}
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

export default BibleGuidance