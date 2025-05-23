import { useState, useEffect } from "react";

interface TutoringSessionProps {
  sessionId: string;
  studentId: string;
  subject: string;
  type: 'text' | 'voice' | 'video';
  onEnd: () => void;
}

// Mock data for chat messages
const mockMessages = [
  {
    id: '1',
    sender: 'student',
    content: 'Hello! I need help with quadratic equations.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    sender: 'tutor',
    content: 'Hi! I\'d be happy to help you with quadratic equations. What specific concept are you struggling with?',
    timestamp: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: '3',
    sender: 'student',
    content: 'I\'m having trouble with the quadratic formula and when to use it.',
    timestamp: new Date(Date.now() - 3400000).toISOString(),
  },
];

const TutoringSession = ({
  sessionId,
  studentId,
  subject,
  type,
  onEnd,
}: TutoringSessionProps) => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: 'tutor',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate student response after 2 seconds
    setTimeout(() => {
      const studentResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'student',
        content: 'Thank you for explaining that! It makes more sense now.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, studentResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Session Header */}
      <div className="bg-white dark:bg-gray-800 shadow p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {subject} Tutoring Session
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Session ID: {sessionId}
            </p>
          </div>
          <button
            onClick={onEnd}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            End Session
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'tutor' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'tutor'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow">
        <div className="flex space-x-4">
          {type === 'voice' && (
            <button
              onClick={toggleRecording}
              className={`p-2 rounded-full ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          )}
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={2}
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutoringSession; 