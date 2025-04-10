
import React from 'react';
import AffirmationFeed from '@/components/affirmations/AffirmationFeed';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  
  // Redirect to onboarding if not completed
  React.useEffect(() => {
    if (!userData.onboardingComplete) {
      navigate('/');
    }
  }, [userData, navigate]);
  
  return (
    <div className="app-container pb-16">
      <AffirmationFeed />
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
