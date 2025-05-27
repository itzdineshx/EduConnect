import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY || '');

// AI Models configuration
const AI_MODEL = 'gemini-pro';

// Get the model instance
const model = genAI.getGenerativeModel({ model: AI_MODEL });

// Helper function to parse JSON safely
const safeJSONParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Failed to parse AI response');
  }
};

/**
 * Gets an AI response for the chatbot
 */
export async function getAIResponse(message: string): Promise<string> {
  try {
    const result = await model.generateContent(`
      As an educational AI assistant, respond to the following message:
      
      ${message}
      
      Provide a helpful, informative, and engaging response while maintaining a professional tone.
    `);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get AI response');
  }
}

/**
 * Generates a summary with key points and flashcards
 */
export async function generateSummary(content: string) {
  try {
    const result = await model.generateContent(`
      Analyze the following educational content and generate a comprehensive summary:
      
      ${content}
      
      Generate:
      1. A concise summary (max 3 paragraphs)
      2. 5-7 key points
      3. 3-5 flashcards with questions and detailed answers
      
      Format the response in JSON:
      {
        "summary": "...",
        "keyPoints": ["...", "..."],
        "flashcards": [
          {
            "question": "...",
            "answer": "...",
            "tags": ["..."]
          }
        ]
      }
    `);
    const response = await result.response;
    return safeJSONParse(response.text());
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary');
  }
}

/**
 * Generates flashcards from content
 */
export async function generateFlashcards(content: string) {
  try {
    const result = await model.generateContent(`
      Create educational flashcards from the following content:
      
      ${content}
      
      Generate 5 flashcards that:
      - Cover key concepts
      - Include detailed explanations
      - Progress from basic to advanced topics
      - Include relevant formulas or examples
      - Tag with relevant subjects
      
      Format as JSON:
      {
        "flashcards": [
          {
            "question": "...",
            "answer": "...",
            "tags": ["..."],
            "difficulty": "basic|intermediate|advanced"
          }
        ]
      }
    `);
    const response = await result.response;
    return safeJSONParse(response.text());
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw new Error('Failed to generate flashcards');
  }
}

/**
 * Generates a quiz from flashcards
 */
export async function generateQuiz(flashcards: any[]) {
  try {
    const result = await model.generateContent(`
      Create a quiz using these flashcards:
      
      ${JSON.stringify(flashcards, null, 2)}
      
      Generate:
      1. Multiple choice questions
      2. Detailed explanations for each answer
      3. Difficulty levels
      
      Format as JSON:
      {
        "quiz": {
          "title": "...",
          "description": "...",
          "questions": [
            {
              "question": "...",
              "options": ["..."],
              "correctAnswer": 0,
              "explanation": "...",
              "difficulty": "basic|intermediate|advanced"
            }
          ]
        }
      }
    `);
    const response = await result.response;
    return safeJSONParse(response.text());
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz');
  }
}

/**
 * Text-to-speech function using browser's Web Speech API
 */
export async function textToSpeech(text: string, language: 'en-US' | 'ta-IN'): Promise<void> {
  return new Promise((resolve, reject) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);
    window.speechSynthesis.speak(utterance);
  });
} 