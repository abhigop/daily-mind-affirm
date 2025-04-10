
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Textarea } from '@/components/ui/textarea';

const MAX_LENGTH = 250;

const GoalsScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [goals, setGoals] = useState('');

  const handleGoalsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setGoals(e.target.value);
    }
  };

  const handleContinue = () => {
    updateUserData({ goals });
    navigate('/onboarding/achievements');
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">What are your goals right now?</h1>
      <p className="onboarding-subtitle">The more you share, the more personalized your affirmations will be</p>
      
      <div className="w-full max-w-md">
        <Textarea
          value={goals}
          onChange={handleGoalsChange}
          placeholder="E.g., I want to be more confident, reduce anxiety, improve my relationships..."
          className="min-h-[150px] mb-2"
        />
        <div className="text-xs text-right text-muted-foreground">
          {goals.length}/{MAX_LENGTH} characters
        </div>
      </div>
      
      <div className="mt-auto pt-8 w-full max-w-md">
        <Button 
          className="w-full bg-affirm-primary hover:bg-affirm-secondary"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GoalsScreen;
