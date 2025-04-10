
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Check } from 'lucide-react';
import { topics } from '@/data/affirmations';

const ImprovementAreasScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const toggleArea = (topicId: string) => {
    if (selectedAreas.includes(topicId)) {
      setSelectedAreas(selectedAreas.filter(area => area !== topicId));
    } else {
      setSelectedAreas([...selectedAreas, topicId]);
    }
  };

  const handleContinue = () => {
    if (selectedAreas.length > 0) {
      updateUserData({ 
        improvementAreas: selectedAreas,
        followedTopics: selectedAreas // Also follow these topics by default
      });
      navigate('/onboarding/goals');
    }
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">What do you want to improve?</h1>
      <p className="onboarding-subtitle">Choose at least one to tailor your content so it resonates with you</p>
      
      <div className="w-full max-w-md max-h-96 overflow-y-auto pr-2">
        <div className="space-y-3">
          {topics.filter(t => !t.isPremium).map((topic) => (
            <button
              key={topic.id}
              className={`option-button relative text-left ${selectedAreas.includes(topic.id) ? 'selected' : ''}`}
              onClick={() => toggleArea(topic.id)}
            >
              {selectedAreas.includes(topic.id) && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Check className="h-4 w-4" />
                </span>
              )}
              <div>
                <div className="font-medium">{topic.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{topic.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-8 w-full max-w-md">
        <Button 
          className="w-full bg-affirm-primary hover:bg-affirm-secondary"
          disabled={selectedAreas.length === 0}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ImprovementAreasScreen;
