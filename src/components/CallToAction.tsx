import React from 'react';
import { useLanguage } from '../lib/language';
import { Button } from './ui/Button';

export function CallToAction() {
  const { t } = useLanguage();
  
  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          {t('home.cta.title')}
        </h2>
        <p className="text-xl text-white mb-8">
          {t('home.cta.subtitle')}
        </p>
        <div className="flex justify-center space-x-4">
          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            {t('home.cta.register')}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-purple-600"
          >
            {t('home.cta.demo')}
          </Button>
        </div>
      </div>
    </section>
  );
} 