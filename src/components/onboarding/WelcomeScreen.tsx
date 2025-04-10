
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-card gradient-primary text-white">
      <h1 className="text-4xl font-bold mb-2">daily affirmations</h1>
      <p className="text-xl mb-8">Transform your mindset with daily affirmations</p>
      
      <div className="text-center mb-10">
        <p className="text-2xl font-semibold mb-1">+20 million</p>
        <p className="text-sm">Lives changed</p>
      </div>
      
      <div className="flex space-x-1 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 fill-current text-yellow-400" 
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <div className="text-center mb-10">
        <p className="italic text-sm mb-1">"This app has completely changed my outlook on life."</p>
        <p className="text-xs">- Sarah M.</p>
      </div>
      
      <Button 
        className="w-full bg-white text-affirm-primary hover:bg-gray-100 text-lg py-6"
        onClick={() => navigate('/onboarding/referral')}
      >
        Get Started
      </Button>
    </div>
  );
};

export default WelcomeScreen;
