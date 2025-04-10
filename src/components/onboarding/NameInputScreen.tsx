
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const NameInputScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [name, setName] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleContinue = () => {
    if (name.trim()) {
      updateUserData({ name: name.trim() });
      navigate('/onboarding/gender');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">What do you want to be called?</h1>
      <p className="onboarding-subtitle">Your name will appear in your affirmations</p>
      
      <div className="w-full max-w-md">
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="mb-6 h-12 text-lg"
        />
      </div>
      
      <div className="mt-auto pt-8 w-full max-w-md">
        <Button 
          className="w-full bg-affirm-primary hover:bg-affirm-secondary"
          disabled={!name.trim()}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default NameInputScreen;
