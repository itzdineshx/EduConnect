import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Network, Users, FileText, Award, Lightbulb, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ModuleCard } from '../components/features/ModuleCard';
import { modules, mockUsers } from '../data/mockData';
import { LeaderboardItem } from '../components/features/LeaderboardItem';

export function Home() {
  const navigate = useNavigate();
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
                Bridge the Gap in Education
              </h1>
              <p className="mt-4 text-lg md:text-xl text-primary-100">
                Connect with peers, organize study groups, create visual mind maps, and leverage AI-powered learning tools.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-700 hover:bg-primary-50"
                  onClick={scrollToHowItWorks}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-primary-700"
                >
                  Learn More
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
                alt="Students collaborating" 
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
              Powerful Educational Modules
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              EduBridge offers a suite of integrated tools designed to enhance your learning experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ModuleCard module={module} />
              </motion.div>
            ))}
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
              How EduBridge Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform provides a seamless experience for students and tutors alike.
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
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Connect & Learn</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find tutors or study groups based on your subjects and learning style. Schedule sessions and collaborate in real-time.
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
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Organize & Visualize</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create mind maps to organize concepts, collaborate on study materials, and export your work for easy review.
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
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Achieve & Earn</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your progress with gamification features. Earn badges and climb the leaderboard as you help others learn.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/edubridge')}
            >
              Start Learning <ArrowRight className="ml-2 h-4 w-4" />
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
              Top Contributors
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Recognizing our most active community members.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            {/* Sort users by points and show top 5 */}
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
              View Full Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-accent-800 dark:from-accent-900 dark:to-accent-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">Ready to Transform Your Learning Journey?</h2>
            <p className="mt-4 text-lg text-accent-100 max-w-2xl mx-auto">
              Join thousands of students and educators on EduBridge today.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Button 
                size="lg" 
                className="bg-white text-accent-700 hover:bg-accent-50"
              >
                Sign Up Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-accent-700"
              >
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}