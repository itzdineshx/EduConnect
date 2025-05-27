import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              எடுபிரிட்ஜ் பற்றி
            </h3>
            <p className="text-gray-400">
              கூட்டு கற்றல் சூழலில் கற்பவர்களையும் கற்பிப்பவர்களையும் இணைக்கிறோம்
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              விரைவு இணைப்புகள்
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  முகப்பு
                </a>
              </li>
              <li>
                <a href="/tutors" className="text-gray-400 hover:text-white transition-colors">
                  ஆசிரியர்களைக் கண்டறிக
                </a>
              </li>
              <li>
                <a href="/groups" className="text-gray-400 hover:text-white transition-colors">
                  படிப்புக் குழுக்கள்
                </a>
              </li>
              <li>
                <a href="/resources" className="text-gray-400 hover:text-white transition-colors">
                  கற்றல் வளங்கள்
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              ஆதரவு
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-gray-400 hover:text-white transition-colors">
                  உதவி மையம்
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  எங்களை தொடர்பு கொள்ள
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  தனியுரிமைக் கொள்கை
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  சேவை விதிமுறைகள்
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              எங்களுடன் இணையுங்கள்
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/community" className="text-gray-400 hover:text-white transition-colors">
                  சமூகத்தில் சேருங்கள்
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  வலைப்பதிவு
                </a>
              </li>
              <li>
                <a href="/social" className="text-gray-400 hover:text-white transition-colors">
                  சமூக ஊடகங்கள்
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} எடுபிரிட்ஜ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
        </div>
      </div>
    </footer>
  );
} 