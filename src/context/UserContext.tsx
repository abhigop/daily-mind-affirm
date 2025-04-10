
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for user data
type UserData = {
  name: string;
  gender: 'female' | 'male' | 'other' | 'prefer-not-to-say' | '';
  age: '13-17' | '18-24' | '25-34' | '35-44' | '45-54' | '55+' | '';
  religious: 'yes' | 'no' | 'spiritual' | '';
  relationship: 'happy-relationship' | 'challenging-relationship' | 'happily-single' | 'single-open' | 'not-interested' | '';
  affirmationExperience: 'new' | 'occasional' | 'regular' | '';
  timeCommitment: '1' | '3' | '10' | '';
  theme: string;
  mood: 'awesome' | 'good' | 'neutral' | 'bad' | 'terrible' | 'other' | '';
  moodFactors: string[];
  improvementAreas: string[];
  goals: string;
  achievements: string[];
  reminders: {
    count: number;
    startTime: string;
    endTime: string;
  };
  onboardingComplete: boolean;
  favoritedAffirmations: string[];
  followedTopics: string[];
};

// Default user data
const defaultUserData: UserData = {
  name: '',
  gender: '',
  age: '',
  religious: '',
  relationship: '',
  affirmationExperience: '',
  timeCommitment: '',
  theme: 'default',
  mood: '',
  moodFactors: [],
  improvementAreas: [],
  goals: '',
  achievements: [],
  reminders: {
    count: 3,
    startTime: '09:00',
    endTime: '21:00',
  },
  onboardingComplete: false,
  favoritedAffirmations: [],
  followedTopics: [],
};

// Create context
type UserContextType = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
  addFavoriteAffirmation: (id: string) => void;
  removeFavoriteAffirmation: (id: string) => void;
  toggleFollowTopic: (topic: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Check if user data exists in localStorage
    const savedData = localStorage.getItem('affirmUser');
    return savedData ? JSON.parse(savedData) : defaultUserData;
  });

  // Update user data and save to localStorage
  const updateUserData = (data: Partial<UserData>) => {
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    localStorage.setItem('affirmUser', JSON.stringify(updatedData));
  };

  // Reset user data
  const resetUserData = () => {
    setUserData(defaultUserData);
    localStorage.removeItem('affirmUser');
  };

  // Add favorite affirmation
  const addFavoriteAffirmation = (id: string) => {
    if (!userData.favoritedAffirmations.includes(id)) {
      const updated = [...userData.favoritedAffirmations, id];
      updateUserData({ favoritedAffirmations: updated });
    }
  };

  // Remove favorite affirmation
  const removeFavoriteAffirmation = (id: string) => {
    const updated = userData.favoritedAffirmations.filter(item => item !== id);
    updateUserData({ favoritedAffirmations: updated });
  };

  // Toggle follow status for a topic
  const toggleFollowTopic = (topic: string) => {
    if (userData.followedTopics.includes(topic)) {
      const updated = userData.followedTopics.filter(item => item !== topic);
      updateUserData({ followedTopics: updated });
    } else {
      const updated = [...userData.followedTopics, topic];
      updateUserData({ followedTopics: updated });
    }
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      updateUserData, 
      resetUserData,
      addFavoriteAffirmation,
      removeFavoriteAffirmation,
      toggleFollowTopic
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
