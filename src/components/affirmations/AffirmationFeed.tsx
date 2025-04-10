
import React, { useState, useEffect } from 'react';
import { affirmations, getAffirmationsByTopics } from '@/data/affirmations';
import AffirmationCard from './AffirmationCard';
import { useUser } from '@/context/UserContext';

const AffirmationFeed: React.FC = () => {
  const { userData } = useUser();
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [feedAffirmations, setFeedAffirmations] = useState(affirmations);
  
  // Update affirmations when followed topics change
  useEffect(() => {
    if (userData.followedTopics.length > 0) {
      const filteredAffirmations = getAffirmationsByTopics(userData.followedTopics);
      setFeedAffirmations(filteredAffirmations.length > 0 ? filteredAffirmations : affirmations);
    } else {
      setFeedAffirmations(affirmations);
    }
  }, [userData.followedTopics]);
  
  const handleNextAffirmation = () => {
    setCurrentAffirmationIndex((prevIndex) => {
      // If we're at the last affirmation, loop back to the first one
      if (prevIndex >= feedAffirmations.length - 1) {
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
