
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { userData, isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    // First, check if user is authenticated and has completed onboarding
    if (!isLoading) {
      if (isAuthenticated) {
        if (userData.onboardingComplete) {
          // Redirect to home page if onboarding is complete
          navigate("/home");
        } else {
          // Redirect to onboarding flow if not complete
          navigate("/onboarding/referral");
        }
      } else {
        // Not authenticated, go to welcome screen
        navigate("/welcome");
      }
    }
  }, [navigate, isAuthenticated, userData, isLoading]);

  return null;
};

export default Index;
