import { Edit2, Trash2, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Note } from '../../types';
import { useLanguage } from '../../lib/language';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
          {note.content.length > 200
            ? `${note.content.substring(0, 200)}...`
            : note.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          {t('common.share')}
        </Button>
        <Button variant="ghost" size="sm">
          <Edit2 className="h-4 w-4 mr-2" />
          {t('common.edit')}
        </Button>
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400">
          <Trash2 className="h-4 w-4 mr-2" />
          {t('common.delete')}
        </Button>
      </CardFooter>
    </Card>
  );
} 