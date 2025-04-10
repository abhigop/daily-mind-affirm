
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const navigate = useNavigate();
  const { userData, isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    // First, check if user is authenticated and has completed onboarding
    if (!isLoading) {
      if (isAuthenticated) {
        if (userData.onboardingComplete) {
          navigate("/home");
        } else {
          navigate("/onboarding/referral");
        }
      } else {
        // Not authenticated, go to welcome screen
        navigate("/");
      }
    }
  }, [navigate, isAuthenticated, userData, isLoading]);

  return null;
};

export default Index;
