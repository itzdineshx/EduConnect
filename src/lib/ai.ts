import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBif5c4kQOeJKpo-aRNQva86h1ldss_ggE');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function getAIResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Error:', error);
    throw new Error('Failed to get AI response');
  }
}

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