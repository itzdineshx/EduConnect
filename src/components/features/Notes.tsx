import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { NoteCard } from './NoteCard';
import { mockNotes } from '../../data/mockData';
import { useLanguage } from '../../lib/language';

export function Notes() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const filteredNotes = mockNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Button variant="primary" className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            {t('eduassist.createNote')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery
              ? t('common.noResults')
              : t('eduassist.noNotes')}
          </p>
        </div>
      )}
    </div>
  );
} 