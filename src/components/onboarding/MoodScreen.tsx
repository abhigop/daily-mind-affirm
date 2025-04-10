
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type Mood = 'awesome' | 'good' | 'neutral' | 'bad' | 'terrible' | 'other';

const moods: { id: Mood; label: string; emoji: string }[] = [
  { id: 'awesome', label: 'Awesome', emoji: '😁' },
  { id: 'good', label: 'Good', emoji: '🙂' },
  { id: 'neutral', label: 'Neutral', emoji: '😐' },
  { id: 'bad', label: 'Bad', emoji: '😔' },
  { id: 'terrible', label: 'Terrible', emoji: '😞' },
  { id: 'other', label: 'Other', emoji: '🤔' },
];

const MoodScreen = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUser();
  const [selected, setSelected] = useState<Mood | null>(null);

  const handleSelection = (mood: Mood) => {
    setSelected(mood);
  };

  const handleContinue = () => {
    if (selected) {
      updateUserData({ mood: selected });
      navigate('/onboarding/mood-factors');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">How have you been feeling lately, {userData.name}?</h1>
      <p className="onboarding-subtitle">Choose a mood to personalize your content</p>
      
      <div className="w-full max-w-md space-y-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`option-button ${selected === mood.id ? 'selected' : ''}`}
            onClick={() => handleSelection(mood.id)}
          >
            <span className="mr-3 text-xl">{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>
      
      <div className="mt-auto pt-8 w-full max-w-md">
        <Button 
          className="w-full bg-affirm-primary hover:bg-affirm-secondary"
          disabled={!selected}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MoodScreen;
