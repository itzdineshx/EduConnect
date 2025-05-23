import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Plus, Sparkles, Download, Copy, RefreshCw, BookOpen, RotateCw, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockNotes, mockNoteSummaries } from '../data/mockData';

export function EduAssist() {
  const [activeTab, setActiveTab] = useState<'notes' | 'summaries' | 'flashcards'>('notes');
  const [searchTerm, setSearchTerm] = useState('');
  const [processingNote, setProcessingNote] = useState(false);
  const [copiedFlashcard, setCopiedFlashcard] = useState<string | null>(null);
  
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
  
  const handleProcessNote = () => {
    setProcessingNote(true);
    // Simulate processing time
    setTimeout(() => {
      setProcessingNote(false);
    }, 2000);
  };
  
  const copyFlashcard = (id: string) => {
    setCopiedFlashcard(id);
    setTimeout(() => {
      setCopiedFlashcard(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EduAssist</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">AI-powered tools to summarize notes and generate study materials</p>
        </div>
      </div>
      
      {/* File Upload Area */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-success-600 dark:text-success-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload Your Notes</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              Upload lecture notes, PDFs, or audio recordings. Our AI will generate summaries, flashcards, and organize your notes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" size="lg">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
              <Button variant="outline" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'notes'
                ? 'border-success-500 text-success-600 dark:text-success-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Your Notes
          </button>
          <button
            onClick={() => setActiveTab('summaries')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'summaries'
                ? 'border-success-500 text-success-600 dark:text-success-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            AI Summaries
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'flashcards'
                ? 'border-success-500 text-success-600 dark:text-success-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Flashcards
          </button>
        </nav>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <Input
            type="text"
            placeholder="Search notes, summaries, and flashcards..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  {...fadeIn}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{note.title}</CardTitle>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={handleProcessNote}
                            disabled={processingNote}
                          >
                            {processingNote ? (
                              <RotateCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Sparkles className="h-4 w-4 text-success-500" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {note.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="success" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center justify-between w-full">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Created: {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Open
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <FileText className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notes found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                You don't have any notes yet. Upload a file or create a new note to get started.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Note
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Summaries Tab */}
      {activeTab === 'summaries' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {noteSummaries.length > 0 ? (
            <div className="space-y-6">
              {noteSummaries.map((summary) => {
                const note = mockNotes.find(n => n.id === summary.noteId)!;
                
                return (
                  <motion.div
                    key={summary.id}
                    {...fadeIn}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{note.title}</CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Summary generated on {new Date(summary.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-success-50 dark:bg-success-900/10 border border-success-200 dark:border-success-800 rounded-lg p-4 mb-6">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              <Sparkles className="h-5 w-5 text-success-600 dark:text-success-400" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-success-800 dark:text-success-300">
                                AI Summary
                              </h4>
                              <div className="mt-1 text-sm text-success-700 dark:text-success-400">
                                <p>{summary.summary}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Points</h4>
                          <ul className="space-y-2">
                            {summary.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center text-xs font-medium text-success-800 dark:text-success-400 mr-2">
                                  {index + 1}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900 dark:text-white">Flashcards ({summary.flashcards.length})</h4>
                            <Button variant="link" size="sm" onClick={() => setActiveTab('flashcards')}>
                              View All
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {summary.flashcards.map((flashcard) => (
                              <div 
                                key={flashcard.id} 
                                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                              >
                                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                  <div className="flex justify-between items-center">
                                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                                      Question
                                    </h5>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyFlashcard(flashcard.id)}
                                    >
                                      {copiedFlashcard === flashcard.id ? (
                                        <Check className="h-4 w-4 text-success-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                                    {flashcard.question}
                                  </p>
                                </div>
                                <div className="px-4 py-3">
                                  <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                                    Answer
                                  </h5>
                                  <p className="text-gray-700 dark:text-gray-300">
                                    {flashcard.answer}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Sparkles className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No summaries yet</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                Generate AI summaries from your notes to see key points and flashcards.
              </p>
              <Button variant="primary" onClick={() => setActiveTab('notes')}>
                <Sparkles className="h-4 w-4 mr-2" />
                Summarize Notes
              </Button>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Flashcards Tab */}
      {activeTab === 'flashcards' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Flashcards</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
              <Button variant="primary" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Start Quiz
              </Button>
            </div>
          </div>
          
          {flashcards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((flashcard) => (
                <motion.div
                  key={flashcard.id}
                  {...fadeIn}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full border border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          Question
                        </h5>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => copyFlashcard(flashcard.id)}
                          >
                            {copiedFlashcard === flashcard.id ? (
                              <Check className="h-4 w-4 text-success-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {flashcard.question}
                      </p>
                    </div>
                    <div className="px-6 py-4 flex-grow">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Answer
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        {flashcard.answer}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {flashcard.tags.map((tag) => (
                          <Badge key={tag} variant="success" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <BookOpen className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No flashcards yet</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                Generate summaries from your notes to automatically create flashcards.
              </p>
              <Button variant="primary" onClick={() => setActiveTab('notes')}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Flashcards
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}