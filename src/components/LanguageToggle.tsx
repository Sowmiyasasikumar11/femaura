import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-2 bg-white rounded-full px-1 py-1 shadow-lg border border-pink-200">
        {/* English Button */}
        <button
          onClick={() => i18n.language !== 'en' && toggleLanguage()}
          className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
            i18n.language === 'en'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          EN
        </button>

        {/* Tamil Button */}
        <button
          onClick={() => i18n.language !== 'ta' && toggleLanguage()}
          className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
            i18n.language === 'ta'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          தமிழ்
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;