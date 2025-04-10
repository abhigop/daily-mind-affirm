
import React from 'react';
import { themes } from '@/data/affirmations';
import { useUser } from '@/context/UserContext';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

const ThemesPage = () => {
  const { userData, updateUserData } = useUser();
  
  const handleThemeSelect = (themeId: string, isPremium: boolean) => {
    if (isPremium) {
      toast('Premium themes require a subscription', {
        description: 'Upgrade to Premium to unlock all themes.'
      });
      return;
    }
    
    updateUserData({ theme: themeId });
    toast('Theme updated');
  };
  
  const renderThemeItem = (theme: typeof themes[0]) => {
    const isSelected = userData.theme === theme.id;
    
    if (theme.type === 'gradient') {
      return (
        <div 
          key={theme.id}
          className={`relative h-40 rounded-xl cursor-pointer border-2 transition-all duration-200 ${isSelected ? 'border-affirm-primary scale-105' : 'border-transparent'}`}
          style={{ background: theme.source }}
          onClick={() => handleThemeSelect(theme.id, theme.isPremium)}
        >
          {theme.isPremium && (
            <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
              <Lock className="h-4 w-4 text-white" />
            </div>
          )}
          <div className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow-md">
            {theme.name}
          </div>
        </div>
      );
    } else if (theme.type === 'image') {
      return (
        <div 
          key={theme.id}
          className={`relative h-40 rounded-xl cursor-pointer border-2 transition-all duration-200 bg-cover bg-center ${isSelected ? 'border-affirm-primary scale-105' : 'border-transparent'}`}
          style={{ backgroundImage: `url(${theme.source})` }}
          onClick={() => handleThemeSelect(theme.id, theme.isPremium)}
        >
          {theme.isPremium && (
            <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
              <Lock className="h-4 w-4 text-white" />
            </div>
          )}
          <div className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow-md">
            {theme.name}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-container pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Themes</h1>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Free Themes</h2>
          <div className="grid grid-cols-2 gap-4">
            {themes.filter(t => !t.isPremium).map(renderThemeItem)}
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Premium Themes</h2>
          <div className="grid grid-cols-2 gap-4">
            {themes.filter(t => t.isPremium).map(renderThemeItem)}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ThemesPage;
