
-- This is a SQL script to create the necessary tables in your Supabase project
-- Run this in the Supabase SQL editor

-- User profiles table to store user data
CREATE TABLE user_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  gender TEXT,
  age TEXT,
  religious TEXT,
  relationship TEXT,
  affirmation_experience TEXT,
  time_commitment TEXT,
  theme TEXT DEFAULT 'default',
  mood TEXT,
  mood_factors TEXT[] DEFAULT '{}',
  improvement_areas TEXT[] DEFAULT '{}',
  goals TEXT,
  achievements TEXT[] DEFAULT '{}',
  reminders JSONB DEFAULT '{"count": 3, "startTime": "09:00", "endTime": "21:00"}',
  onboarding_complete BOOLEAN DEFAULT false,
  favorited_affirmations TEXT[] DEFAULT '{}',
  followed_topics TEXT[] DEFAULT '{}',
  referral_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their own data
CREATE POLICY "Users can view their own profile" 
  ON user_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own data
CREATE POLICY "Users can insert their own profile" 
  ON user_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own data
CREATE POLICY "Users can update their own profile" 
  ON user_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Analytics events table to track user behavior
CREATE TABLE analytics_events (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on analytics events
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow any authenticated user to insert into analytics events
CREATE POLICY "Authenticated users can insert analytics events" 
  ON analytics_events 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create an index on user_id for faster queries
CREATE INDEX idx_analytics_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_timestamp ON analytics_events(timestamp);

-- Generated affirmations table to store AI-generated content
CREATE TABLE generated_affirmations (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  topics TEXT[] DEFAULT '{}',
  is_favorited BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on generated affirmations
ALTER TABLE generated_affirmations ENABLE ROW LEVEL SECURITY;

-- Allow users to select their own generated affirmations
CREATE POLICY "Users can view their own generated affirmations" 
  ON generated_affirmations 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow users to insert their own generated affirmations
CREATE POLICY "Users can insert their own generated affirmations" 
  ON generated_affirmations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own generated affirmations (e.g., to mark as favorited)
CREATE POLICY "Users can update their own generated affirmations" 
  ON generated_affirmations 
  FOR UPDATE 
  USING (auth.uid() = user_id);
