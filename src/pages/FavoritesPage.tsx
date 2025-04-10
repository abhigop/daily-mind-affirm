
import React from 'react';
import { affirmations, personalizeAffirmation } from '@/data/affirmations';
import { useUser } from '@/context/UserContext';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FavoritesPage = () => {
  const { userData, removeFavoriteAffirmation } = useUser();
  
  const favoriteAffirmations = affirmations.filter(aff => 
    userData.favoritedAffirmations.includes(aff.id)
  );
  
  const handleRemoveFavorite = (id: string) => {
    removeFavoriteAffirmation(id);
  };
  
  return (
    <div className="app-container pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
        
        {favoriteAffirmations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">
              You don't have any favorite affirmations yet.
              <br />
              Heart the ones you like to save them here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteAffirmations.map(aff => (
              <div 
                key={aff.id}
                className="bg-white rounded-lg p-5 shadow-sm relative"
              >
                <p className="text-lg font-medium mb-4">
                  {personalizeAffirmation(aff.text, userData.name)}
                </p>
                
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFavorite(aff.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Heart className="h-4 w-4 fill-current mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default FavoritesPage;
