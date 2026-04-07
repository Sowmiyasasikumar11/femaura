import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import CycleTracker from './components/CycleTracker';
import MoodTracker from './components/MoodTracker';
import Chatbot from './components/Chatbot';
import AwarenessVideos from './components/AwarenessVideos';
import MenopauseSupport from './components/MenopauseSupport';
import NavBar from './components/NavBar';
import QuoteModal from './components/QuoteModal';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'cycle' | 'mood' | 'chat' | 'videos' | 'menopause'>('cycle');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowQuoteModal(true);
    setChatKey((prev) => prev + 1);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('cycle');
    setShowQuoteModal(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.14),_transparent_32%),linear-gradient(to_bottom_right,#fdf2f8,#ffffff,#faf5ff)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle,_rgba(168,85,247,0.18),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle,_rgba(236,72,153,0.16),transparent_40%)]" />

      <NavBar
        isLoggedIn={isLoggedIn}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />

      {/* Quote/Tip Modal */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      />

      {/* Main Content - Add top padding for navbar */}
      <main className={isLoggedIn ? 'pt-28 sm:pt-24 transition-all duration-300' : 'pt-0'}>
        {!isLoggedIn ? (
          isLogin ? (
            <Login
              onSwitchToSignup={() => {
                setIsLogin(false);
              }}
              onLoginSuccess={handleLogin}
            />
          ) : (
            <Signup
              onSwitchToLogin={() => {
                setIsLogin(true);
              }}
              onSignupSuccess={handleLogin}
            />
          )
        ) : currentView === 'cycle' ? (
          <CycleTracker />
        ) : currentView === 'mood' ? (
          <MoodTracker />
        ) : currentView === 'chat' ? (
          <Chatbot key={chatKey} />
        ) : currentView === 'videos' ? (
          <AwarenessVideos />
        ) : (
          <MenopauseSupport />
        )}
      </main>
    </div>
  );
}

export default App;
