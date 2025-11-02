import { useState } from "react";
import "./MoodTracker.css";

const MoodTracker = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: 1, emoji: "😊", label: "Happy" },
    { id: 2, emoji: "😐", label: "Okay" },
    { id: 3, emoji: "😔", label: "Sad" },
    { id: 4, emoji: "😤", label: "Stressed" },
    { id: 5, emoji: "😇", label: "Peaceful" },
  ];

  const handleMoodClick = (mood) => {
    setSelectedMood(mood.id);
    if (onMoodSelect) onMoodSelect(mood.label);
  };

  return (
    <div className="mood-tracker">
      <h2 className="mood-title">How are you feeling today?</h2>
      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`mood-btn ${selectedMood === mood.id ? "selected" : ""}`}
            onClick={() => handleMoodClick(mood)}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
