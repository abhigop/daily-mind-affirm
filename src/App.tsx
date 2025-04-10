
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";

// Landing & Onboarding
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import ReferralSourceScreen from "@/components/onboarding/ReferralSourceScreen";
import NameInputScreen from "@/components/onboarding/NameInputScreen";
import GenderScreen from "@/components/onboarding/GenderScreen";
import AgeScreen from "@/components/onboarding/AgeScreen";
import ReligiousScreen from "@/components/onboarding/ReligiousScreen";
import RelationshipScreen from "@/components/onboarding/RelationshipScreen";
import ExperienceScreen from "@/components/onboarding/ExperienceScreen";
import TimeCommitmentScreen from "@/components/onboarding/TimeCommitmentScreen";
import RemindersScreen from "@/components/onboarding/RemindersScreen";
import ThemeScreen from "@/components/onboarding/ThemeScreen";
import MoodScreen from "@/components/onboarding/MoodScreen";
import MoodFactorsScreen from "@/components/onboarding/MoodFactorsScreen";
import ImprovementAreasScreen from "@/components/onboarding/ImprovementAreasScreen";
import GoalsScreen from "@/components/onboarding/GoalsScreen";
import AchievementsScreen from "@/components/onboarding/AchievementsScreen";

// Main App Pages
import HomePage from "@/pages/HomePage";
import ThemesPage from "@/pages/ThemesPage";
import TopicsPage from "@/pages/TopicsPage";
import FavoritesPage from "@/pages/FavoritesPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="app-container">
            <Routes>
              {/* Landing & Onboarding Routes */}
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/onboarding/referral" element={<ReferralSourceScreen />} />
              <Route path="/onboarding/name" element={<NameInputScreen />} />
              <Route path="/onboarding/gender" element={<GenderScreen />} />
              <Route path="/onboarding/age" element={<AgeScreen />} />
              <Route path="/onboarding/religious" element={<ReligiousScreen />} />
              <Route path="/onboarding/relationship" element={<RelationshipScreen />} />
              <Route path="/onboarding/experience" element={<ExperienceScreen />} />
              <Route path="/onboarding/time-commitment" element={<TimeCommitmentScreen />} />
              <Route path="/onboarding/reminders" element={<RemindersScreen />} />
              <Route path="/onboarding/theme" element={<ThemeScreen />} />
              <Route path="/onboarding/mood" element={<MoodScreen />} />
              <Route path="/onboarding/mood-factors" element={<MoodFactorsScreen />} />
              <Route path="/onboarding/improvement-areas" element={<ImprovementAreasScreen />} />
              <Route path="/onboarding/goals" element={<GoalsScreen />} />
              <Route path="/onboarding/achievements" element={<AchievementsScreen />} />
              
              {/* Main App Routes */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/themes" element={<ThemesPage />} />
              <Route path="/topics" element={<TopicsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              
              {/* Catch-all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
