
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type Relationship = 'happy-relationship' | 'challenging-relationship' | 'happily-single' | 'single-open' | 'not-interested';

const relationships: { id: Relationship; label: string }[] = [
  { id: 'happy-relationship', label: 'In a happy relationship' },
  { id: 'challenging-relationship', label: 'In a challenging relationship' },
  { id: 'happily-single', label: 'Happily single' },
  { id: 'single-open', label: 'Single and open to connection' },
  { id: 'not-interested', label: 'Not interested in this topic' },
];

const RelationshipScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selected, setSelected] = useState<Relationship | null>(null);

  const handleSelection = (relationship: Relationship) => {
    setSelected(relationship);
  };

  const handleContinue = () => {
    if (selected) {
      updateUserData({ relationship: selected });
      navigate('/onboarding/experience');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">Get affirmations that fit your relationship status</h1>
      <p className="onboarding-subtitle">Choose the option that describes it the best</p>
      
      <div className="w-full max-w-md space-y-3">
        {relationships.map((relationship) => (
          <button
            key={relationship.id}
            className={`option-button ${selected === relationship.id ? 'selected' : ''}`}
            onClick={() => handleSelection(relationship.id)}
          >
            {relationship.label}
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

export default RelationshipScreen;
