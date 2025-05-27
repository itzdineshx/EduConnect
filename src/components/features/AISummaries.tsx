import { useState } from 'react';
import { Plus, Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { mockNoteSummaries } from '../../data/mockData';
import { NoteSummary } from '../../types';
import { useLanguage } from '../../lib/language';

export function AISummaries() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const filteredSummaries = mockNoteSummaries.filter((summary: NoteSummary) =>
    summary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    summary.content.toLowerCase().includes(searchQuery.toLowerCase())
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
            {t('eduassist.generateSummary')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSummaries.map((summary: NoteSummary) => (
          <Card key={summary.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{summary.title}</span>
                <Button variant="ghost" size="sm" className="text-primary-600">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t('common.regenerate')}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {summary.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSummaries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery
              ? t('common.noResults')
              : t('eduassist.noSummaries')}
          </p>
        </div>
      )}
    </div>
  );
} 