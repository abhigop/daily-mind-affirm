
/**
 * This file defines the interface for generating affirmations using Google's Gemini AI.
 * The actual implementation is in a Supabase Edge Function.
 */

import { supabase } from './supabase';
import { useToast } from '@/components/ui/use-toast';

type AffirmationRequest = {
  name?: string;
  gender?: string;
  age?: string;
  religious?: string;
  relationship?: string;
  mood?: string;
  moodFactors?: string[];
  improvementAreas?: string[];
  goals?: string;
  achievements?: string[];
  count?: number;
  topic?: string;
};

export async function generateAffirmations(request: AffirmationRequest) {
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('generate-affirmations', {
      body: JSON.stringify(request),
    });

    if (error) {
      console.error('Error calling generate-affirmations function:', error);
      return { 
        success: false, 
        data: null, 
        error: error.message || 'Failed to generate affirmations'
      };
    }

    return { 
      success: true, 
      data: data, 
      error: null 
    };
  } catch (error: any) {
    console.error('Exception in generateAffirmations:', error);
    return { 
      success: false, 
      data: null, 
      error: error.message || 'An unexpected error occurred'
    };
  }
}

// Hook for using the affirmation generator in components
export const useAffirmationGenerator = () => {
  const { toast } = useToast();

  const generatePersonalizedAffirmations = async (request: AffirmationRequest) => {
    try {
      const result = await generateAffirmations(request);
      
      if (!result.success) {
        toast({
          title: "Failed to generate affirmations",
          description: result.error || "Please try again later",
          variant: "destructive"
        });
      }
      
      return result;
    } catch (error: any) {
      console.error('Error in generatePersonalizedAffirmations:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate affirmations",
        variant: "destructive"
      });
      
      return { 
        success: false, 
        data: null, 
        error: error.message 
      };
    }
  };

  return { generatePersonalizedAffirmations };
};
