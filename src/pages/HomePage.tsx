
import React, { useEffect, useState } from 'react';
import AffirmationFeed from '@/components/affirmations/AffirmationFeed';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAffirmationGenerator } from '@/lib/geminiService';
import { useToast } from '@/components/ui/use-toast';
import { Affirmation } from '@/data/affirmations';
import { Loader2 } from 'lucide-react';

const HomePage = () => {
  const { userData, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const { generatePersonalizedAffirmations } = useAffirmationGenerator();
  const { toast } = useToast();
  const [generatedAffirmations, setGeneratedAffirmations] = useState<Affirmation[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // Redirect to onboarding if not completed
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // If not authenticated, go to welcome screen
        navigate('/');
      } else if (!userData.onboardingComplete) {
        // If authenticated but onboarding not complete
        navigate('/onboarding/referral');
      } else {
        // If authenticated and onboarding complete, generate affirmations
        generateAffirmations();
      }
    }
  }, [userData, navigate, isLoading, isAuthenticated]);
  
  const generateAffirmations = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      const result = await generatePersonalizedAffirmations({
        name: userData.name,
        gender: userData.gender,
        age: userData.age,
        religious: userData.religious,
        relationship: userData.relationship,
        mood: userData.mood,
        moodFactors: userData.moodFactors,
        improvementAreas: userData.improvementAreas,
        goals: userData.goals,
        achievements: userData.achievements,
        count: 5, // Generate 5 affirmations at a time
        topic: userData.followedTopics.length > 0 ? userData.followedTopics[0] : undefined
      });
      
      if (result.success && result.data?.affirmations) {
        // Convert the generated affirmations to our Affirmation type
        const newAffirmations = result.data.affirmations.map((text: string, index: number) => ({
          id: `generated-${Date.now()}-${index}`,
          text,
          topics: userData.followedTopics.slice(0, 3), // Associate with user's followed topics
          isPremium: false
        }));
        
        setGeneratedAffirmations(prev => [...prev, ...newAffirmations]);
      }
    } catch (error) {
      console.error('Error generating affirmations:', error);
      toast({
        title: "Error",
        description: "Failed to generate personalized affirmations",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="app-container pb-16">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-affirm-primary" />
          <span className="ml-2">Loading your affirmations...</span>
        </div>
      ) : (
        <>
          <AffirmationFeed 
            customAffirmations={generatedAffirmations}
            onEndReached={generateAffirmations}
          />
          <BottomNavigation />
        </>
      )}
    </div>
  );
};

export default HomePage;
