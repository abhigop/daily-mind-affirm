
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Check } from 'lucide-react';

type Factor = 'family' | 'friends' | 'work' | 'health' | 'love' | 'other';

const factors: { id: Factor; label: string; icon: string }[] = [
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'Friends', icon: '👥' },
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'love', label: 'Love', icon: '❤️' },
  { id: 'other', label: 'Other', icon: '📝' },
];

const MoodFactorsScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selectedFactors, setSelectedFactors] = useState<Factor[]>([]);

  const toggleFactor = (factor: Factor) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter(f => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  const handleContinue = () => {
    if (selectedFactors.length > 0) {
      updateUserData({ moodFactors: selectedFactors });
      navigate('/onboarding/improvement-areas');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">What's making you feel that way?</h1>
      <p className="onboarding-subtitle">You can select more than one option</p>
      
      <div className="w-full max-w-md">
        <div className="grid grid-cols-2 gap-3">
          {factors.map((factor) => (
            <button
              key={factor.id}
              className={`option-button h-16 relative ${selectedFactors.includes(factor.id) ? 'selected' : ''}`}
              onClick={() => toggleFactor(factor.id)}
            >
              {selectedFactors.includes(factor.id) && (
                <span className="absolute right-2 top-2">
                  <Check className="h-4 w-4" />
                </span>
              )}
              <span className="mr-2 text-xl">{factor.icon}</span>
              {factor.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-8 w-full max-w-md">
        <Button 
          className="w-full bg-affirm-primary hover:bg-affirm-secondary"
          disabled={selectedFactors.length === 0}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MoodFactorsScreen;
