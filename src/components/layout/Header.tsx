import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LogIn, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useAuth } from '../../lib/auth';
import { useLanguage } from '../../lib/language';

const studentNavigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.edubridge', href: '/edubridge' },
  { name: 'nav.mindmap', href: '/mindmap' },
  { name: 'nav.studybuddy', href: '/studybuddy' },
  { name: 'nav.eduassist', href: '/eduassist' },
];

const tutorNavigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.profile', href: '/tutor-dashboard?tab=profile' },
  { name: 'nav.requests', href: '/tutor-dashboard?tab=requests' },
  { name: 'nav.sessions', href: '/tutor-dashboard?tab=sessions' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const navigation = user?.role === 'tutor' ? tutorNavigation : studentNavigation;

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2',
                    location.pathname === item.href
                      ? 'border-primary-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                  )}
                >
                  {t(item.name)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.name} ({user.role})
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> {t('nav.signOut')}
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm" className="hidden md:flex" onClick={() => navigate('/auth')}>
                <LogIn className="h-4 w-4 mr-2" /> {t('nav.signIn')}
              </Button>
            )}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'block px-3 py-2 text-base font-medium rounded-md',
                location.pathname === item.href
                  ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {t(item.name)}
            </Link>
          ))}
          {user ? (
            <>
              <div className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                {user.name} ({user.role})
              </div>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" /> {t('nav.signOut')}
              </Button>
            </>
          ) : (
            <Button variant="primary" className="w-full" onClick={() => navigate('/auth')}>
              <LogIn className="h-4 w-4 mr-2" /> {t('nav.signIn')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}