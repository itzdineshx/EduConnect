import React from 'react';
import { useLanguage } from '../lib/language';

export function Platform() {
  const { t } = useLanguage();
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Tagline */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-indigo-600">{t('nav.edubridge')}</span>
            </div>
            <p className="text-gray-600">
              {t('home.hero.subtitle')}
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('nav.links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/edubridge" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  {t('nav.edubridge')}
                </a>
              </li>
              <li>
                <a href="/mindmap" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  {t('nav.mindmap')}
                </a>
              </li>
              <li>
                <a href="/studybuddy" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  {t('nav.studybuddy')}
                </a>
              </li>
              <li>
                <a href="/eduassist" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  {t('nav.eduassist')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 