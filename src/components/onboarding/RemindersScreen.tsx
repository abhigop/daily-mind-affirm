
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Slider } from '@/components/ui/slider';
import { Bell } from 'lucide-react';

const RemindersScreen = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [count, setCount] = useState(3);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('21:00');

  const handleSliderChange = (value: number[]) => {
    setCount(value[0]);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleContinue = () => {
    updateUserData({
      reminders: {
        count,
        startTime,
        endTime,
      }
    });
    
    // In a real app, we would request notification permissions here
    navigate('/onboarding/theme');
  };

  return (
    <div className="onboarding-card">
      <h1 className="onboarding-title">Set up your reminders</h1>
      <p className="onboarding-subtitle">We'll remind you to practice affirmations</p>
      
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            How many reminders per day? ({count}x)
          </label>
          <Slider
            defaultValue={[3]}
            max={20}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Start at
            </label>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              className="w-full rounded-md border border-input bg-white px-3 py-2"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              End at
            </label>
            <input
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              className="w-full rounded-md border border-input bg-white px-3 py-2"
            />
          </div>
        </div>
        
        <div className="bg-affirm-light rounded-lg p-4 flex items-center space-x-3">
          <Bell className="h-6 w-6 text-affirm-primary" />
          <div>
            <p className="font-medium">Your notification will look like this</p>
            <p className="text-sm text-gray-600">It's time for your daily affirmation!</p>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-8 w-full max-w-md">
        <Button 
          className="w-full bg-affirm-primary hover:bg-affirm-secondary"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RemindersScreen;
