
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const achievements = [
  { id: 'positive-mindset', label: 'Develop a positive mindset' },
  { id: 'self-confidence', label: 'Feel more self-confident' },
  { id: 'self-love', label: 'Learn to love myself' },
  { id: 'personal-growth', label: 'Personal growth' },
  { id: 'mental-health', label: 'Improve my mental health' },
  { id: 'be-present', label: 'Be more present and enjoy life' },
  { id: 'other', label: 'Other' },
];

const AchievementsScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const { toast } = useToast();
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([]);

  const toggleAchievement = (achievementId: string) => {
    if (selectedAchievements.includes(achievementId)) {
      setSelectedAchievements(selectedAchievements.filter(a => a !== achievementId));
    } else {
      setSelectedAchievements([...selectedAchievements, achievementId]);
    }
  };

  const handleComplete = () => {
    if (selectedAchievements.length > 0) {
      // Update user data and mark onboarding as complete
      updateUserData({ 
        achievements: selectedAchievements,
        onboardingComplete: true 
      });
      
      // Show toast notification
      toast({
        title: "Onboarding complete!",
        description: "Enjoy your personalized affirmations",
      });
      
      // Redirect to home page
      navigate('/home');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">What do you want to achieve with daily affirmations?</h1>
      <p className="onboarding-subtitle">Choose at least one to see affirmations based on your goals</p>
      
      <div className="w-full max-w-md space-y-3">
        {achievements.map((achievement) => (
          <button
            key={achievement.id}
            className={`option-button relative ${selectedAchievements.includes(achievement.id) ? 'selected' : ''}`}
            onClick={() => toggleAchievement(achievement.id)}
          >
            {selectedAchievements.includes(achievement.id) && (
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Check className="h-4 w-4" />
              </span>
            )}
            {achievement.label}
          </button>
        ))}
      </div>
      
      <div className="mt-auto pt-8 w-full max-w-md">
        <Button 
          className="w-full bg-affirm-primary hover:bg-affirm-secondary"
          disabled={selectedAchievements.length === 0}
          onClick={handleComplete}
        >
          Complete
        </Button>
      </div>
    </div>
  );
};

export default AchievementsScreen;
