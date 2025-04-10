
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type TimeCommitment = '1' | '3' | '10';

const commitments: { id: TimeCommitment; label: string }[] = [
  { id: '1', label: '1 minute a day' },
  { id: '3', label: '3 minutes a day' },
  { id: '10', label: '10 minutes a day' },
];

const TimeCommitmentScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selected, setSelected] = useState<TimeCommitment | null>(null);

  const handleSelection = (commitment: TimeCommitment) => {
    setSelected(commitment);
  };

  const handleContinue = () => {
    if (selected) {
      updateUserData({ timeCommitment: selected });
      navigate('/onboarding/reminders');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">How much time will you devote to affirmations?</h1>
      <p className="onboarding-subtitle">You can change your goal later</p>
      
      <div className="w-full max-w-md space-y-3">
        {commitments.map((commitment) => (
          <button
            key={commitment.id}
            className={`option-button ${selected === commitment.id ? 'selected' : ''}`}
            onClick={() => handleSelection(commitment.id)}
          >
            {commitment.label}
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

export default TimeCommitmentScreen;
