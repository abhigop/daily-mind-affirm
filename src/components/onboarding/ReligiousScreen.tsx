
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type Religious = 'yes' | 'no' | 'spiritual';

const options: { id: Religious; label: string }[] = [
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
  { id: 'spiritual', label: 'Spiritual but not religious' },
];

const ReligiousScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selected, setSelected] = useState<Religious | null>(null);

  const handleSelection = (option: Religious) => {
    setSelected(option);
  };

  const handleContinue = () => {
    if (selected) {
      updateUserData({ religious: selected });
      navigate('/onboarding/relationship');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">Are you religious?</h1>
      <p className="onboarding-subtitle">This information will be used to tailor your affirmations to your beliefs</p>
      
      <div className="w-full max-w-md space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            className={`option-button ${selected === option.id ? 'selected' : ''}`}
            onClick={() => handleSelection(option.id)}
          >
            {option.label}
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

export default ReligiousScreen;
