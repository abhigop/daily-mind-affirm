
export type Affirmation = {
  id: string;
  text: string;
  topics: string[];
  isPremium: boolean;
};

export type Topic = {
  id: string;
  name: string;
  description: string;
  isPopular: boolean;
  isPremium: boolean;
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  type: 'image' | 'video' | 'gradient';
  source: string;
  isPremium: boolean;
};

// Topics data
export const topics: Topic[] = [
  {
    id: 'personal-growth',
    name: 'Personal Growth',
    description: 'Affirmations for self-improvement and development',
    isPopular: true,
    isPremium: false,
  },
  {
    id: 'positive-thinking',
    name: 'Positive Thinking',
    description: 'Affirmations to foster optimism and positive mindset',
    isPopular: true,
    isPremium: false,
  },
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Affirmations for improving connections with others',
    isPopular: true,
    isPremium: false,
  },
  {
    id: 'happiness',
    name: 'Happiness',
    description: 'Affirmations to cultivate joy and contentment',
    isPopular: true,
    isPremium: false,
  },
  {
    id: 'stress-anxiety',
    name: 'Stress & Anxiety',
    description: 'Affirmations to calm your mind and reduce stress',
    isPopular: true,
    isPremium: false,
  },
  {
    id: 'gratitude',
    name: 'Being Thankful',
    description: 'Affirmations to practice gratitude daily',
    isPopular: false,
    isPremium: false,
  },
  {
    id: 'self-love',
    name: 'Loving Myself',
    description: 'Affirmations for self-acceptance and self-love',
    isPopular: false,
    isPremium: false,
  },
  {
    id: 'body-positivity',
    name: 'Loving My Body',
    description: 'Affirmations for body positivity and acceptance',
    isPopular: false,
    isPremium: false,
  },
  {
    id: 'confidence',
    name: 'Confidence',
    description: 'Affirmations to boost self-confidence',
    isPopular: true,
    isPremium: false,
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    description: 'Affirmations to be more present and aware',
    isPopular: false,
    isPremium: true,
  },
  {
    id: 'career-success',
    name: 'Career Success',
    description: 'Affirmations for professional growth and success',
    isPopular: false,
    isPremium: true,
  },
];

// Themes data
export const themes: Theme[] = [
  {
    id: 'sunset',
    name: 'Sunset Calm',
    description: 'Peaceful sunset gradient',
    type: 'gradient',
    source: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    isPremium: false,
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Calming blue ocean gradient',
    type: 'gradient',
    source: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    isPremium: false,
  },
  {
    id: 'forest',
    name: 'Forest Green',
    description: 'Refreshing forest gradient',
    type: 'gradient',
    source: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    isPremium: false,
  },
  {
    id: 'lavender',
    name: 'Lavender Dreams',
    description: 'Soothing lavender gradient',
    type: 'gradient',
    source: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    isPremium: false,
  },
  {
    id: 'mountain',
    name: 'Mountain Peaks',
    description: 'Inspiring mountain vista',
    type: 'image',
    source: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000',
    isPremium: false,
  },
  {
    id: 'night-sky',
    name: 'Night Sky',
    description: 'Starry night sky for reflection',
    type: 'image',
    source: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=1000',
    isPremium: true,
  },
];

// Affirmations data - these would normally be many more
export const affirmations: Affirmation[] = [
  {
    id: 'aff1',
    text: 'I am capable of achieving my goals and dreams.',
    topics: ['personal-growth', 'positive-thinking'],
    isPremium: false,
  },
  {
    id: 'aff2',
    text: 'I am worthy of love and respect.',
    topics: ['self-love', 'relationships'],
    isPremium: false,
  },
  {
    id: 'aff3',
    text: 'I am grateful for all the blessings in my life.',
    topics: ['gratitude', 'happiness'],
    isPremium: false,
  },
  {
    id: 'aff4',
    text: 'I am at peace with my past and excited for my future.',
    topics: ['personal-growth', 'mindfulness'],
    isPremium: false,
  },
  {
    id: 'aff5',
    text: 'I am in control of my thoughts and emotions.',
    topics: ['stress-anxiety', 'mindfulness'],
    isPremium: false,
  },
  {
    id: 'aff6',
    text: 'I am becoming the best version of myself every day.',
    topics: ['personal-growth', 'self-love'],
    isPremium: false,
  },
  {
    id: 'aff7',
    text: 'I am confident in my abilities and talents.',
    topics: ['confidence', 'positive-thinking'],
    isPremium: false,
  },
  {
    id: 'aff8',
    text: 'I am deserving of happiness and success.',
    topics: ['happiness', 'self-love'],
    isPremium: false,
  },
  {
    id: 'aff9',
    text: 'I am resilient and can overcome any challenge.',
    topics: ['confidence', 'stress-anxiety'],
    isPremium: false,
  },
  {
    id: 'aff10',
    text: 'I am surrounded by loving and supportive people.',
    topics: ['relationships', 'gratitude'],
    isPremium: false,
  },
  {
    id: 'aff11',
    text: 'I am proud of my body and all it does for me.',
    topics: ['body-positivity', 'self-love'],
    isPremium: false,
  },
  {
    id: 'aff12',
    text: 'I am creating a life filled with joy and purpose.',
    topics: ['happiness', 'personal-growth'],
    isPremium: false,
  },
  {
    id: 'aff13',
    text: 'I am attracting abundance and prosperity.',
    topics: ['career-success', 'positive-thinking'],
    isPremium: true,
  },
  {
    id: 'aff14',
    text: 'I am embracing each moment with mindfulness and gratitude.',
    topics: ['mindfulness', 'gratitude'],
    isPremium: true,
  },
  {
    id: 'aff15',
    text: 'I am capable of creating positive change in my life.',
    topics: ['personal-growth', 'positive-thinking'],
    isPremium: false,
  },
];

// Function to personalize an affirmation with user name
export const personalizeAffirmation = (text: string, name: string): string => {
  if (!name) return text;
  return text.replace('[Name]', name);
};

// Function to get affirmations by topics
export const getAffirmationsByTopics = (topicIds: string[], includeAll = false): Affirmation[] => {
  if (topicIds.length === 0 && includeAll) {
    return affirmations;
  }
  
  return affirmations.filter(aff => 
    aff.topics.some(topic => topicIds.includes(topic))
  );
};

// Function to get random affirmation
export const getRandomAffirmation = (topicIds: string[] = []): Affirmation => {
  const filtered = topicIds.length > 0 
    ? getAffirmationsByTopics(topicIds)
    : affirmations;
    
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};
