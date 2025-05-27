import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Network, Users, FileText, Award, Lightbulb, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ModuleCard } from '../components/features/ModuleCard';
import { modules, mockUsers } from '../data/mockData';
import { LeaderboardItem } from '../components/features/LeaderboardItem';
import { useLanguage } from '../lib/language';

export function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {t('home.hero.title')}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-primary-100">
                {t('home.hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-700 hover:bg-primary-50"
                  onClick={scrollToHowItWorks}
                >
                  {t('home.hero.getStarted')}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-primary-700"
                >
                  {t('home.hero.learnMore')}
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img 
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt={t('home.hero.imageAlt')} 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ModuleCard
              module={{
                id: 'edubridge',
                name: t('home.features.edubridge'),
                description: t('home.features.edubridge'),
                icon: 'book-open',
                path: '/edubridge',
                color: 'primary'
              }}
            />
            <ModuleCard
              module={{
                id: 'mindmap',
                name: t('home.features.mindmap'),
                description: t('home.features.mindmap'),
                icon: 'network',
                path: '/mindmap',
                color: 'secondary'
              }}
            />
            <ModuleCard
              module={{
                id: 'studybuddy',
                name: t('home.features.studybuddy'),
                description: t('home.features.studybuddy'),
                icon: 'users',
                path: '/studybuddy',
                color: 'accent'
              }}
            />
            <ModuleCard
              module={{
                id: 'eduassist',
                name: t('home.features.eduassist'),
                description: t('home.features.eduassist'),
                icon: 'file-text',
                path: '/eduassist',
                color: 'success'
              }}
            />
          </div>

          <div className="mt-12 text-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/edubridge')}
            >
              {t('home.hero.getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
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
              onClick={() => navigate('/edubridge')}
            >
              {t('home.hero.getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('home.topContributors')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('home.leaderboardDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            {[...mockUsers]
              .sort((a, b) => b.points - a.points)
              .slice(0, 5)
              .map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <LeaderboardItem user={user} rank={index + 1} />
                </motion.div>
              ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">
              {t('home.leaderboard')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-accent-600 to-accent-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">{t('home.cta.title')}</h2>
            <p className="mt-4 text-lg text-accent-100 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Button 
                size="lg" 
                className="bg-white text-accent-700 hover:bg-accent-50"
              >
                {t('home.cta.register')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-accent-700"
              >
                {t('home.cta.demo')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}