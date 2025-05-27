import { Globe } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../../lib/language';
import { Language } from '../../types/index';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  // Show English text in English mode, Tamil text in Tamil mode
  const buttonText = language === 'en' ? 'English' : 'தமிழ்';
  const switchToText = language === 'en' ? 'Tamil' : 'ஆங்கிலம்';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label={`Switch to ${switchToText}`}
      className="flex items-center space-x-1"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm">{buttonText}</span>
    </Button>
  );
} 