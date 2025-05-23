import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Volume2, StopCircle, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { getAIResponse, textToSpeech } from '../../lib/ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type Language = 'en-US' | 'ta-IN';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en-US');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      // Automatically speak the response
      await textToSpeech(response, selectedLanguage);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setError(null);
  };

  const speakMessage = async (text: string) => {
    try {
      setError(null);
      setIsSpeaking(true);
      await textToSpeech(text, selectedLanguage);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Text to speech failed';
      setError(errorMessage);
      console.error('Text to speech error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Open AI Chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-primary-600 text-white">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">AI Study Assistant</h3>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className="bg-primary-700 text-white text-sm rounded px-2 py-1 border border-primary-500"
                >
                  <option value="en-US">English</option>
                  <option value="ta-IN">Tamil</option>
                </select>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 text-sm">
                {error}
              </div>
            )}

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 relative group ${
                      message.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex">
                      {isSpeaking ? (
                        <button
                          onClick={stopSpeaking}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          aria-label="Stop speaking"
                        >
                          <StopCircle className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => speakMessage(message.content)}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          aria-label="Speak message"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask in ${selectedLanguage === 'en-US' ? 'English' : 'Tamil'}...`}
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}