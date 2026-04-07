import { useTranslation } from 'react-i18next';

interface NavBarProps {
  isLoggedIn: boolean;
  currentView: 'dashboard' | 'cycle' | 'mood' | 'chat' | 'videos' | 'menopause';
  onViewChange: (view: 'dashboard' | 'cycle' | 'mood' | 'chat' | 'videos' | 'menopause') => void;
  onLogout: () => void;
}

const NavBar = ({ isLoggedIn, currentView, onViewChange, onLogout }: NavBarProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 shadow-[0_24px_80px_rgba(124,58,237,0.18)] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/20 text-white shadow-lg ring-1 ring-white/20">
                <span className="text-2xl">🌙</span>
              </div>
              <div className="text-white">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">FemAura</h1>
                <p className="text-xs sm:text-sm text-white/90">Wellness for every cycle.</p>
              </div>
            </div>

            {isLoggedIn && (
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/15 px-2 py-2 backdrop-blur-sm border border-white/20">
                <button
                  onClick={() => onViewChange('dashboard')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    currentView === 'dashboard'
                      ? 'bg-white text-purple-700 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => onViewChange('cycle')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    currentView === 'cycle'
                      ? 'bg-white text-purple-700 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🩸 Cycle
                </button>
                <button
                  onClick={() => onViewChange('mood')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    currentView === 'mood'
                      ? 'bg-white text-purple-700 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  😊 Mood
                </button>
                <button
                  onClick={() => onViewChange('chat')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    currentView === 'chat'
                      ? 'bg-white text-purple-700 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => onViewChange('videos')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    currentView === 'videos'
                      ? 'bg-white text-purple-700 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🎥 Videos
                </button>
                <button
                  onClick={() => onViewChange('menopause')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    currentView === 'menopause'
                      ? 'bg-white text-purple-700 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🌿 Menopause
                </button>
              </div>
            )}

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-1 sm:gap-2 bg-white/20 rounded-full px-1 sm:px-2 py-1 backdrop-blur-sm border border-white/30">
                <button
                  onClick={() => i18n.language !== 'en' && toggleLanguage()}
                  className={`px-2 sm:px-3 py-1 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    i18n.language === 'en'
                      ? 'bg-white text-purple-700 shadow-md'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.language !== 'ta' && toggleLanguage()}
                  className={`px-2 sm:px-3 py-1 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    i18n.language === 'ta'
                      ? 'bg-white text-purple-700 shadow-md'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  தமிழ்
                </button>
              </div>

              <button
                onClick={toggleLanguage}
                className="sm:hidden px-3 py-2 rounded-lg bg-white/90 text-purple-700 hover:bg-white transition-all font-semibold text-sm border border-white/40"
              >
                {i18n.language === 'en' ? 'EN' : 'தமிழ்'}
              </button>

              {isLoggedIn && (
                <button
                  onClick={onLogout}
                  className="px-3 sm:px-6 py-2 bg-white/90 text-purple-700 rounded-lg hover:bg-white transition-all font-semibold text-sm sm:text-base border border-white/40"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {isLoggedIn && (
            <div className="sm:hidden flex gap-2 pb-3 px-2">
              <button
                onClick={() => onViewChange('cycle')}
                className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  currentView === 'cycle'
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'bg-white/20 text-white border border-white/20'
                }`}
              >
                🩸 Cycle
              </button>
              <button
                onClick={() => onViewChange('mood')}
                className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  currentView === 'mood'
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'bg-white/20 text-white border border-white/20'
                }`}
              >
                😊 Mood
              </button>
              <button
                onClick={() => onViewChange('chat')}
                className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  currentView === 'chat'
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'bg-white/20 text-white border border-white/20'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => onViewChange('videos')}
                className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  currentView === 'videos'
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'bg-white/20 text-white border border-white/20'
                }`}
              >
                🎥 Videos
              </button>
              <button
                onClick={() => onViewChange('menopause')}
                className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  currentView === 'menopause'
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'bg-white/20 text-white border border-white/20'
                }`}
              >
                🌿 Menopause
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
