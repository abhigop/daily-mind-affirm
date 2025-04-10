
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

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
  referralSource?: string; // Added for storing referral source
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
  referralSource: '',
};

// Create context
type UserContextType = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
  addFavoriteAffirmation: (id: string) => void;
  removeFavoriteAffirmation: (id: string) => void;
  toggleFollowTopic: (topic: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  user: any; // Supabase user object
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Check if user data exists in localStorage
    const savedData = localStorage.getItem('affirmUser');
    return savedData ? JSON.parse(savedData) : defaultUserData;
  });
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchUserData(session.user.id);
        logAnalyticsEvent('auth_state_change', { event, user_id: session.user.id });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Initial session check
    checkUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      await fetchUserData(session.user.id);
    }
    setIsLoading(false);
  };

  // Fetch user data from Supabase
  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }

      if (data) {
        // Convert Supabase data to our UserData format
        const formattedData: UserData = {
          name: data.name || '',
          gender: data.gender || '',
          age: data.age || '',
          religious: data.religious || '',
          relationship: data.relationship || '',
          affirmationExperience: data.affirmation_experience || '',
          timeCommitment: data.time_commitment || '',
          theme: data.theme || 'default',
          mood: data.mood || '',
          moodFactors: data.mood_factors || [],
          improvementAreas: data.improvement_areas || [],
          goals: data.goals || '',
          achievements: data.achievements || [],
          reminders: data.reminders || {
            count: 3,
            startTime: '09:00',
            endTime: '21:00',
          },
          onboardingComplete: data.onboarding_complete || false,
          favoritedAffirmations: data.favorited_affirmations || [],
          followedTopics: data.followed_topics || [],
          referralSource: data.referral_source || '',
        };

        setUserData(formattedData);
        localStorage.setItem('affirmUser', JSON.stringify(formattedData));
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error);
    }
  };

  // Log analytics events to Supabase
  const logAnalyticsEvent = async (event_name: string, event_data: any = {}) => {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .insert([
          {
            user_id: user?.id || 'anonymous',
            event_name,
            event_data,
            timestamp: new Date(),
          },
        ]);

      if (error) {
        console.error('Error logging analytics event:', error);
      }
    } catch (error) {
      console.error('Error in logAnalyticsEvent:', error);
    }
  };

  // Update user data and save to Supabase if authenticated
  const updateUserData = async (data: Partial<UserData>) => {
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    localStorage.setItem('affirmUser', JSON.stringify(updatedData));

    // Log this update as an analytics event
    logAnalyticsEvent('update_user_data', { fields: Object.keys(data) });

    // If authenticated, save to Supabase
    if (user) {
      try {
        // Convert our data format to Supabase column format (snake_case)
        const supabaseData = {
          name: updatedData.name,
          gender: updatedData.gender,
          age: updatedData.age,
          religious: updatedData.religious,
          relationship: updatedData.relationship,
          affirmation_experience: updatedData.affirmationExperience,
          time_commitment: updatedData.timeCommitment,
          theme: updatedData.theme,
          mood: updatedData.mood,
          mood_factors: updatedData.moodFactors,
          improvement_areas: updatedData.improvementAreas,
          goals: updatedData.goals,
          achievements: updatedData.achievements,
          reminders: updatedData.reminders,
          onboarding_complete: updatedData.onboardingComplete,
          favorited_affirmations: updatedData.favoritedAffirmations,
          followed_topics: updatedData.followedTopics,
          referral_source: updatedData.referralSource,
          updated_at: new Date(),
        };

        const { error } = await supabase
          .from('user_profiles')
          .upsert({
            user_id: user.id,
            ...supabaseData,
          });

        if (error) {
          console.error('Error updating user data in Supabase:', error);
          toast({
            title: "Error saving data",
            description: "Your changes couldn't be saved to the cloud",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error in updateUserData:', error);
      }
    }
  };

  // Reset user data
  const resetUserData = () => {
    setUserData(defaultUserData);
    localStorage.removeItem('affirmUser');
    
    // Log this reset as an analytics event
    logAnalyticsEvent('reset_user_data');

    // If authenticated, delete from Supabase
    if (user) {
      // We don't actually delete the profile, just reset its fields
      updateUserData(defaultUserData);
    }
  };

  // Add favorite affirmation
  const addFavoriteAffirmation = (id: string) => {
    if (!userData.favoritedAffirmations.includes(id)) {
      const updated = [...userData.favoritedAffirmations, id];
      updateUserData({ favoritedAffirmations: updated });
      
      // Log this action as an analytics event
      logAnalyticsEvent('add_favorite_affirmation', { affirmation_id: id });
    }
  };

  // Remove favorite affirmation
  const removeFavoriteAffirmation = (id: string) => {
    const updated = userData.favoritedAffirmations.filter(item => item !== id);
    updateUserData({ favoritedAffirmations: updated });
    
    // Log this action as an analytics event
    logAnalyticsEvent('remove_favorite_affirmation', { affirmation_id: id });
  };

  // Toggle follow status for a topic
  const toggleFollowTopic = (topic: string) => {
    let updated;
    let eventName;
    
    if (userData.followedTopics.includes(topic)) {
      updated = userData.followedTopics.filter(item => item !== topic);
      eventName = 'unfollow_topic';
    } else {
      updated = [...userData.followedTopics, topic];
      eventName = 'follow_topic';
    }
    
    updateUserData({ followedTopics: updated });
    
    // Log this action as an analytics event
    logAnalyticsEvent(eventName, { topic });
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
      
      logAnalyticsEvent('sign_in_success');
      return { error: null };
    } catch (error: any) {
      console.error('Error in signIn:', error);
      return { error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Account created",
        description: "Please check your email to confirm your account",
      });
      
      logAnalyticsEvent('sign_up_success');
      return { error: null };
    } catch (error: any) {
      console.error('Error in signUp:', error);
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      
      logAnalyticsEvent('sign_out');
    } catch (error) {
      console.error('Error in signOut:', error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      updateUserData, 
      resetUserData,
      addFavoriteAffirmation,
      removeFavoriteAffirmation,
      toggleFollowTopic,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signUp,
      signOut,
      user
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
