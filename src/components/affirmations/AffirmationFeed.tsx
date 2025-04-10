
import React, { useState, useEffect } from 'react';
import { affirmations, getAffirmationsByTopics, Affirmation } from '@/data/affirmations';
import AffirmationCard from './AffirmationCard';
import { useUser } from '@/context/UserContext';

interface AffirmationFeedProps {
  customAffirmations?: Affirmation[];
  onEndReached?: () => void;
}

const AffirmationFeed: React.FC<AffirmationFeedProps> = ({ 
  customAffirmations,
  onEndReached
}) => {
  const { userData } = useUser();
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [feedAffirmations, setFeedAffirmations] = useState<Affirmation[]>(customAffirmations || affirmations);
  
  // Update affirmations when followed topics or custom affirmations change
  useEffect(() => {
    if (customAffirmations && customAffirmations.length > 0) {
      setFeedAffirmations(customAffirmations);
    } else if (userData.followedTopics.length > 0) {
      const filteredAffirmations = getAffirmationsByTopics(userData.followedTopics);
      setFeedAffirmations(filteredAffirmations.length > 0 ? filteredAffirmations : affirmations);
    } else {
      setFeedAffirmations(affirmations);
    }
  }, [userData.followedTopics, customAffirmations]);
  
  const handleNextAffirmation = () => {
    setCurrentAffirmationIndex((prevIndex) => {
      // If we're at the last affirmation, loop back to the first one and call onEndReached if provided
      if (prevIndex >= feedAffirmations.length - 1) {
        if (onEndReached) {
          onEndReached();
        }
        return 0;
      }
      return prevIndex + 1;
    });
  };
  
  if (feedAffirmations.length === 0) {
    return <div className="flex items-center justify-center h-[85vh]">Loading affirmations...</div>;
  }
  
  return (
    <div className="relative h-full">
      <AffirmationCard 
        affirmation={feedAffirmations[currentAffirmationIndex]} 
        onNext={handleNextAffirmation}
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white">
        Swipe up for next
      </div>
    </div>
  );
};

export default AffirmationFeed;
