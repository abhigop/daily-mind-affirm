
import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Affirmation, personalizeAffirmation, themes } from '@/data/affirmations';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AffirmationCardProps {
  affirmation: Affirmation;
  onNext: () => void;
}

const AffirmationCard: React.FC<AffirmationCardProps> = ({ affirmation, onNext }) => {
  const { userData, addFavoriteAffirmation, removeFavoriteAffirmation } = useUser();
  const [isFavorited, setIsFavorited] = useState(userData.favoritedAffirmations.includes(affirmation.id));
  
  // Find the current theme
  const currentTheme = themes.find(t => t.id === userData.theme) || themes[0];
  
  // Personalize the affirmation text
  const personalizedText = personalizeAffirmation(
    affirmation.text.replace('[Name]', userData.name), 
    userData.name
  );
  
  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavoriteAffirmation(affirmation.id);
      setIsFavorited(false);
    } else {
      addFavoriteAffirmation(affirmation.id);
      setIsFavorited(true);
      toast('Added to favorites');
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Affirmation',
        text: personalizedText,
      }).catch(error => {
        console.log('Error sharing:', error);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast('Copied to clipboard!');
      navigator.clipboard.writeText(personalizedText);
    }
  };
  
  const getBackgroundStyle = () => {
    if (currentTheme.type === 'gradient') {
      return { background: currentTheme.source };
    } else if (currentTheme.type === 'image') {
      return { 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentTheme.source})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return {};
  };

  return (
    <div 
      className="affirmation-card"
      style={getBackgroundStyle()}
      onClick={onNext}
    >
      <div className="affirmation-text">
        {personalizedText}
      </div>
      
      <div className="absolute bottom-8 w-full flex justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-none"
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteToggle();
          }}
        >
          <Heart className={`h-6 w-6 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-none"
          onClick={(e) => {
            e.stopPropagation();
            handleShare();
          }}
        >
          <Share2 className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default AffirmationCard;
