import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Plus, Sparkles, Download, Copy, RefreshCw, BookOpen, RotateCw, Check, Timer, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockNotes, mockNoteSummaries, mockQuizzes, mockQuizAttempts } from '../data/mockData';
import { generateSummary, generateFlashcards, generateQuiz } from '../lib/ai';
import { toast } from '../components/ui/Toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Notes } from '../components/features/Notes';
import { AISummaries } from '../components/features/AISummaries';
import { Flashcards } from '../components/features/Flashcards';
import { useLanguage } from '../lib/language';

export function EduAssist() {
  const [activeTab, setActiveTab] = useState('notes');
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [processingNote, setProcessingNote] = useState(false);
  const [copiedFlashcard, setCopiedFlashcard] = useState<string | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Filter notes based on search term
  const filteredNotes = mockNotes.filter(
    note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Get summaries
  const noteSummaries = mockNoteSummaries;
  
  // Get flashcards from all summaries
  const flashcards = noteSummaries.flatMap(summary => summary.flashcards);
  
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };
  
  const handleProcessNote = async (noteId: string) => {
    try {
    setProcessingNote(true);
      const note = mockNotes.find(n => n.id === noteId);
      
      if (!note) {
        throw new Error('Note not found');
      }

      // Generate AI summary
      const aiSummary = await generateSummary(note.content);
      
      // Generate additional flashcards using Gemini
      const aiFlashcards = await generateFlashcards(note.content);
      
      // Combine the results
      const newSummary = {
        id: `ns${Date.now()}`,
        noteId: note.id,
        summary: aiSummary.summary,
        keyPoints: aiSummary.keyPoints,
        flashcards: [...aiSummary.flashcards, ...aiFlashcards.flashcards],
        createdAt: new Date()
      };

      // In a real app, you would save this to your backend
      // For now, we'll just show a success message
      toast({
        title: 'Summary Generated',
        description: 'AI has processed your notes and generated a summary with flashcards.',
        type: 'success'
      });

      // Optional: Generate a quiz from the flashcards
      const quiz = await generateQuiz(newSummary.flashcards);
      
      // In a real app, save the quiz to your backend
      console.log('Generated Quiz:', quiz);

    } catch (error) {
      console.error('Error processing note:', error);
      toast({
        title: 'Error',
        description: 'Failed to process note. Please try again.',
        type: 'error'
      });
    } finally {
      setProcessingNote(false);
    }
  };
  
  const copyFlashcard = (id: string) => {
    setCopiedFlashcard(id);
    setTimeout(() => {
      setCopiedFlashcard(null);
    }, 2000);
  };

  // Quiz Functions
  const startQuiz = () => {
    setIsQuizMode(true);
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setShowAnswer(false);
    setQuizCompleted(false);
  };

  const handleAnswer = (flashcardId: string, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [flashcardId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < flashcards.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const calculateScore = () => {
    const totalAnswered = Object.keys(quizAnswers).length;
    if (totalAnswered === 0) return 0;
    
    const correctAnswers = flashcards.filter(flashcard => 
      quizAnswers[flashcard.id]?.toLowerCase() === flashcard.answer.toLowerCase()
    );
    
    return (correctAnswers.length / totalAnswered) * 100;
  };
                
                return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t('eduassist.title')}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="notes">{t('eduassist.notes')}</TabsTrigger>
          <TabsTrigger value="summaries">{t('eduassist.summaries')}</TabsTrigger>
          <TabsTrigger value="flashcards">{t('eduassist.flashcards')}</TabsTrigger>
        </TabsList>

        <TabsContent value="notes">
          <Notes />
        </TabsContent>

        <TabsContent value="summaries">
          <AISummaries />
        </TabsContent>

        <TabsContent value="flashcards">
          <Flashcards />
        </TabsContent>
      </Tabs>
    </div>
  );
}