
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type ReferralSource = 'tiktok' | 'instagram' | 'facebook' | 'google-play' | 'web-search' | 'friend-family' | 'other';

const sources: { id: ReferralSource; label: string }[] = [
  { id: 'tiktok', label: 'TikTok' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'google-play', label: 'Google Play' },
  { id: 'web-search', label: 'Web search' },
  { id: 'friend-family', label: 'Friend/family' },
  { id: 'other', label: 'Other' }
];

const ReferralSourceScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selected, setSelected] = useState<ReferralSource | null>(null);

  const handleSelection = (source: ReferralSource) => {
    setSelected(source);
  };

  const handleContinue = () => {
    if (selected) {
      updateUserData({ referralSource: selected });
      navigate('/onboarding/name');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">How did you hear about us?</h1>
      <p className="onboarding-subtitle">Select an option to continue</p>
      
      <div className="w-full max-w-md space-y-3">
        {sources.map((source) => (
          <button
            key={source.id}
            className={`option-button ${selected === source.id ? 'selected' : ''}`}
            onClick={() => handleSelection(source.id)}
          >
            {source.label}
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

export default ReferralSourceScreen;
