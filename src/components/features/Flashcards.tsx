import { useState } from 'react';
import { Plus, Search, Filter, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';
import { mockFlashcards } from '../../data/mockData';
import { Flashcard } from '../../types';
import { useLanguage } from '../../lib/language';

export function Flashcards() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();

  const filteredFlashcards = mockFlashcards.filter((flashcard: Flashcard) =>
    flashcard.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flashcard.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAnswer = (id: string) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Filter className="h-4 w-4 mr-2" />
            {t('common.filter')}
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Play className="h-4 w-4 mr-2" />
            {t('eduassist.startQuiz')}
          </Button>
          <Button variant="primary" className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            {t('eduassist.addFlashcard')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlashcards.map((flashcard: Flashcard) => (
          <Card
            key={flashcard.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => toggleAnswer(flashcard.id)}
          >
            <CardContent className="p-6">
              <div className="min-h-[100px]">
                <p className="font-medium mb-4">{flashcard.question}</p>
                {showAnswer[flashcard.id] && (
                  <p className="text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t">
                    {flashcard.answer}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end mt-4 space-x-2">
                {flashcard.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFlashcards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery
              ? t('common.noResults')
              : t('eduassist.noFlashcards')}
          </p>
        </div>
      )}
    </div>
  );
} 