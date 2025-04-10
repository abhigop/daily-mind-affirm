
import React from 'react';
import { useUser } from '@/context/UserContext';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight, Clock, Share2, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { userData, resetUserData } = useUser();
  const navigate = useNavigate();
  
  const handleResetAndRestart = () => {
    resetUserData();
    navigate('/');
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'daily affirmations',
        text: 'Transform your mindset with daily affirmations',
        url: window.location.origin,
      }).catch(error => {
        console.log('Error sharing:', error);
      });
    } else {
      // Fallback
      toast('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.origin);
    }
  };
  
  return (
    <div className="app-container pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-3">Profile</h2>
            <div className="bg-white rounded-lg divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-affirm-primary mr-3" />
                  <span>Name</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">{userData.name}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-3">Reminders</h2>
            <div className="bg-white rounded-lg divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-affirm-primary mr-3" />
                  <span>Daily Reminders</span>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-affirm-primary mr-3" />
                  <div>
                    <span className="block">Reminder Time</span>
                    <span className="text-xs text-gray-500">
                      {userData.reminders.count}x daily, {userData.reminders.startTime} - {userData.reminders.endTime}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-3">Share</h2>
            <div className="bg-white rounded-lg">
              <button 
                className="p-4 w-full flex items-center" 
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 text-affirm-primary mr-3" />
                <span>Share with friends</span>
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-3">Support</h2>
            <div className="bg-white rounded-lg divide-y">
              <div className="p-4 flex items-center">
                <Star className="h-5 w-5 text-affirm-primary mr-3" />
                <span>Rate this app</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleResetAndRestart}
            >
              Reset & Restart Onboarding
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-500 pt-4">
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;
