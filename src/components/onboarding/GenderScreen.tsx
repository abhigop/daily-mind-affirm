
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type Gender = 'female' | 'male' | 'other' | 'prefer-not-to-say';

const genders: { id: Gender; label: string }[] = [
  { id: 'female', label: 'Female' },
  { id: 'male', label: 'Male' },
  { id: 'other', label: 'Others' },
  { id: 'prefer-not-to-say', label: 'Prefer not to say' },
];

const GenderScreen = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUser();
  const [selected, setSelected] = useState<Gender | null>(null);

  const handleSelection = (gender: Gender) => {
    setSelected(gender);
  };

  const handleContinue = () => {
    if (selected) {
      updateUserData({ gender: selected });
      navigate('/onboarding/age');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">Which option represents you best, {userData.name}?</h1>
      <p className="onboarding-subtitle">Some affirmations will use your gender or pronouns</p>
      
      <div className="w-full max-w-md space-y-3">
        {genders.map((gender) => (
          <button
            key={gender.id}
            className={`option-button ${selected === gender.id ? 'selected' : ''}`}
            onClick={() => handleSelection(gender.id)}
          >
            {gender.label}
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

export default GenderScreen;
