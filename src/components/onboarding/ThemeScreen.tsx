
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { themes } from '@/data/affirmations';

const ThemeScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selectedTheme, setSelectedTheme] = useState('');

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const handleContinue = () => {
    if (selectedTheme) {
      updateUserData({ theme: selectedTheme });
      navigate('/onboarding/mood');
    }
  };

  const renderThemeItem = (theme: typeof themes[0]) => {
    if (theme.type === 'gradient') {
      return (
        <div 
          key={theme.id}
          className={`h-32 rounded-xl cursor-pointer border-2 transition-all duration-200 ${selectedTheme === theme.id ? 'border-affirm-primary scale-105' : 'border-transparent'}`}
          style={{ background: theme.source }}
          onClick={() => handleThemeSelect(theme.id)}
        />
      );
    } else if (theme.type === 'image') {
      return (
        <div 
          key={theme.id}
          className={`h-32 rounded-xl cursor-pointer border-2 transition-all duration-200 bg-cover bg-center ${selectedTheme === theme.id ? 'border-affirm-primary scale-105' : 'border-transparent'}`}
          style={{ backgroundImage: `url(${theme.source})` }}
          onClick={() => handleThemeSelect(theme.id)}
        />
      );
    }
    return null;
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">Which theme would you like to start with?</h1>
      <p className="onboarding-subtitle">Choose from a larger selection of themes or create your own later</p>
      
      <div className="w-full max-w-md">
        <div className="grid grid-cols-2 gap-4">
          {themes.filter(t => !t.isPremium).map(renderThemeItem)}
        </div>
      </div>
      
      <div className="mt-auto pt-8 w-full max-w-md">
        <Button 
          className="w-full bg-affirm-primary hover:bg-affirm-secondary"
          disabled={!selectedTheme}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ThemeScreen;
