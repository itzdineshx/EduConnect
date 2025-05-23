import { Link } from 'react-router-dom';
import { BookOpen, Github as GitHub, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">EduBridge</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Bridging the gap in education through innovative learning tools and peer connections.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">GitHub</span>
                  <GitHub className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Platform</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/edubridge" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    EduBridge
                  </Link>
                </li>
                <li>
                  <Link to="/mindmap" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    MindMap Master
                  </Link>
                </li>
                <li>
                  <Link to="/studybuddy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    StudyBuddy
                  </Link>
                </li>
                <li>
                  <Link to="/eduassist" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    EduAssist
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    Partnerships
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} EduBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}