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
                <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">எடுபிரிட்ஜ்</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                புதுமையான கற்றல் கருவிகள் மற்றும் சக இணைப்புகள் மூலம் கல்வியில் உள்ள இடைவெளியை இணைக்கிறோம்.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                தயாரிப்புகள்
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/edubridge" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    எடுபிரிட்ஜ்
                  </Link>
                </li>
                <li>
                  <Link to="/mindmap" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    மனவரைபட நிபுணர்
                  </Link>
                </li>
                <li>
                  <Link to="/studybuddy" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    படிப்புத் தோழன்
                  </Link>
                </li>
                <li>
                  <Link to="/eduassist" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    கல்வி உதவி
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                ஆதரவு
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/help" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    உதவி மையம்
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    எங்களை தொடர்பு கொள்ள
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    தனியுரிமைக் கொள்கை
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    சேவை விதிமுறைகள்
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                எங்களுடன் இணையுங்கள்
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/community" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    சமூகத்தில் சேருங்கள்
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    வலைப்பதிவு
                  </Link>
                </li>
                <li>
                  <Link to="/social" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    சமூக ஊடகங்கள்
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} எடுபிரிட்ஜ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
          </p>
        </div>
      </div>
    </footer>
  );
}