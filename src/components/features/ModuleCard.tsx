import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Network, Users, FileText } from 'lucide-react';
import { useLanguage } from '../../lib/language';

interface ModuleCardProps {
  module: {
    id: string;
    name: string;
    description: string;
    icon: string;
    path: string;
    color: string;
  };
}

const iconMap = {
  'book-open': BookOpen,
  'network': Network,
  'users': Users,
  'file-text': FileText,
};

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = iconMap[module.icon as keyof typeof iconMap];
  const { t } = useLanguage();
  
  return (
    <Link to={module.path}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200`}
      >
        <div className={`w-12 h-12 rounded-lg bg-${module.color}-100 dark:bg-${module.color}-900/30 flex items-center justify-center mb-4`}>
          <Icon className={`h-6 w-6 text-${module.color}-600 dark:text-${module.color}-400`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {module.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {module.description}
        </p>
        <div className="mt-4 flex items-center text-sm font-medium text-gray-900 dark:text-white">
          {t('common.learnMore')}
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
}