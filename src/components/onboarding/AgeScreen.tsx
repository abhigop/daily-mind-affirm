
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type AgeRange = '13-17' | '18-24' | '25-34' | '35-44' | '45-54' | '55+';

const ageRanges: { id: AgeRange; label: string }[] = [
  { id: '13-17', label: '13 to 17' },
  { id: '18-24', label: '18 to 24' },
  { id: '25-34', label: '25 to 34' },
  { id: '35-44', label: '35 to 44' },
  { id: '45-54', label: '45 to 54' },
  { id: '55+', label: '55+' },
];

const AgeScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selected, setSelected] = useState<AgeRange | null>(null);

  const handleSelection = (age: AgeRange) => {
    setSelected(age);
  };

  const handleContinue = () => {
    if (selected) {
      updateUserData({ age: selected });
      navigate('/onboarding/religious');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">How old are you?</h1>
      <p className="onboarding-subtitle">Your age is used to personalize your content</p>
      
      <div className="w-full max-w-md space-y-3">
        {ageRanges.map((age) => (
          <button
            key={age.id}
            className={`option-button ${selected === age.id ? 'selected' : ''}`}
            onClick={() => handleSelection(age.id)}
          >
            {age.label}
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

export default AgeScreen;
