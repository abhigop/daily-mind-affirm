
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type Experience = 'new' | 'occasional' | 'regular';

const experiences: { id: Experience; label: string }[] = [
  { id: 'new', label: 'This is new for me' },
  { id: 'occasional', label: 'I\'ve used them occasionally' },
  { id: 'regular', label: 'I use them regularly' },
];

const ExperienceScreen = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUser();
  const [selected, setSelected] = useState<Experience | null>(null);

  const handleSelection = (experience: Experience) => {
    setSelected(experience);
  };

  const handleContinue = () => {
    if (selected) {
      updateUserData({ affirmationExperience: selected });
      navigate('/onboarding/time-commitment');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">How familiar are you with affirmations, {userData.name}?</h1>
      <p className="onboarding-subtitle">Your experience will be adjusted according to your answer</p>
      
      <div className="w-full max-w-md space-y-3">
        {experiences.map((experience) => (
          <button
            key={experience.id}
            className={`option-button ${selected === experience.id ? 'selected' : ''}`}
            onClick={() => handleSelection(experience.id)}
          >
            {experience.label}
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

export default ExperienceScreen;
