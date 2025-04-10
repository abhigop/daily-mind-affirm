
// Supabase Edge Function for generating affirmations using Google Gemini 2.5
// Deploy this to your Supabase project

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

interface AffirmationRequest {
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
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
  }[];
}

serve(async (req) => {
  try {
    // Check for API key
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Gemini API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse request
    const requestData: AffirmationRequest = await req.json();
    
    // Validate request
    if (!requestData) {
      return new Response(
        JSON.stringify({ error: "Invalid request data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a prompt for Gemini based on user data
    const prompt = createAffirmationPrompt(requestData);
    
    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate affirmations", details: errorText }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const geminiResponse: GeminiResponse = await response.json();
    
    // Extract affirmations from response
    let affirmationText = "";
    if (geminiResponse.candidates && geminiResponse.candidates.length > 0) {
      affirmationText = geminiResponse.candidates[0].content.parts[0].text;
    }

    // Parse affirmations (assuming Gemini returned a numbered list)
    const affirmations = parseAffirmationsFromText(affirmationText, requestData.count || 5);

    return new Response(
      JSON.stringify({ 
        affirmations,
        prompt, // Include prompt for debugging
        rawResponse: affirmationText // Include raw response for debugging
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-affirmations function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

function createAffirmationPrompt(data: AffirmationRequest): string {
  const {
    name,
    gender,
    age,
    religious,
    relationship,
    mood,
    moodFactors = [],
    improvementAreas = [],
    goals,
    achievements = [],
    count = 5,
    topic,
  } = data;

  // Build a contextual prompt based on available user data
  let prompt = `Generate ${count} unique, positive, and empowering affirmations`;
  
  if (name) {
    prompt += ` personalized for ${name}`;
  }
  
  if (gender) {
    prompt += `, who identifies as ${gender}`;
  }
  
  if (age) {
    prompt += ` and is in the age range of ${age}`;
  }

  // Add more context based on available data
  if (religious) {
    prompt += `. In terms of religious belief, they consider themselves ${religious}`;
  }
  
  if (relationship) {
    prompt += `. Their relationship status is: ${relationship}`;
  }
  
  if (mood) {
    prompt += `. They've been feeling ${mood} lately`;
    
    if (moodFactors.length > 0) {
      prompt += ` due to factors related to ${moodFactors.join(", ")}`;
    }
  }
  
  if (improvementAreas.length > 0) {
    prompt += `. They want to improve in these areas: ${improvementAreas.join(", ")}`;
  }
  
  if (goals) {
    prompt += `. Their personal goal is: "${goals}"`;
  }
  
  if (achievements.length > 0) {
    prompt += `. They hope to achieve: ${achievements.join(", ")} through affirmations`;
  }
  
  if (topic) {
    prompt += `. Focus specifically on affirmations related to ${topic}`;
  }

  prompt += `.

Format each affirmation as a powerful, present-tense "I am" statement or a direct, empowering statement about self. Each affirmation should be 1-2 sentences, be meaningful, specific, and emotional. Avoid generic statements.

Each affirmation should be presented in this exact format:
1. [Affirmation text]
2. [Affirmation text]

Don't include any explanations, introductions, or conclusions. Just provide the numbered list of affirmations.`;

  return prompt;
}

function parseAffirmationsFromText(text: string, expectedCount: number): string[] {
  // Look for numbered pattern like "1. [text]" or "1) [text]"
  const affirmationRegex = /\d+[\.\)]\s*(.+?)(?=\n\d+[\.\)]|$)/gs;
  const matches = [...text.matchAll(affirmationRegex)];
  
  // Extract the captured groups (the affirmation text)
  const affirmations = matches.map(match => match[1].trim());
  
  // If we didn't find structured affirmations, split by newlines and filter
  if (affirmations.length === 0) {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('```') && line.length > 10)
      .slice(0, expectedCount);
  }
  
  return affirmations;
}
