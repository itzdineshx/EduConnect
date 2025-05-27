import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Award } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '../lib/language';

export function HowItWorks() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('home.features.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {t('home.features.collaborative')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('home.features.collaborativeDesc')}
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-secondary-100 dark:bg-secondary-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {t('home.features.organize')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('home.features.organizeDesc')}
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-accent-100 dark:bg-accent-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-accent-600 dark:text-accent-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {t('home.features.achieve')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('home.features.achieveDesc')}
            </p>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="primary" 
            size="lg"
          >
            {t('home.hero.getStarted')}
          </Button>
        </div>
      </div>
    </section>
  );
} 