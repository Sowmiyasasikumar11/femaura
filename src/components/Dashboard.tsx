

interface DashboardProps {
  onViewChange: (view: 'cycle' | 'mood' | 'chat' | 'videos' | 'menopause') => void;
  onShowQuote: () => void;
}

const Dashboard = ({ onViewChange, onShowQuote }: DashboardProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to FemAura
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive wellness companion for menstrual health, mood tracking, and personal care.
        </p>
      </div>

      {/* Core Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">🌟</span>
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => onViewChange('cycle')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-purple-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Cycle Tracking</h3>
                <p className="text-gray-600">Calendar, predictions, and cycle insights</p>
              </div>
            </div>
            <p className="text-gray-700">
              Track your menstrual cycle, predict periods, and monitor your health patterns with our intuitive calendar interface.
            </p>
          </div>

          <div
            onClick={() => onViewChange('mood')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-purple-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">😊</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Mood Tracking</h3>
                <p className="text-gray-600">Emoji-based mood logging with insights</p>
              </div>
            </div>
            <p className="text-gray-700">
              Log your daily moods with emojis and receive personalized insights about your emotional well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Health & Awareness */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">🏥</span>
          Health & Awareness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => onViewChange('videos')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-purple-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">🎥</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Awareness Videos</h3>
                <p className="text-gray-600">Usage, hygiene, and disposal guides</p>
              </div>
            </div>
            <p className="text-gray-700">
              Watch educational videos about menstrual hygiene, product usage, and responsible disposal practices.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Educational Content</h3>
                <p className="text-gray-600">Learn about menstruation and wellness</p>
              </div>
            </div>
            <p className="text-gray-700">
              Access comprehensive information about menstrual health, body changes, and self-care practices.
            </p>
          </div>
        </div>
      </section>

      {/* Support & Assistance */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">💬</span>
          Support & Assistance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => onViewChange('chat')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-purple-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">AI Chatbot</h3>
                <p className="text-gray-600">Menstrual health queries and support</p>
              </div>
            </div>
            <p className="text-gray-700">
              Get instant answers to your menstrual health questions from our intelligent AI assistant.
            </p>
          </div>

          <div
            onClick={onShowQuote}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-purple-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Daily Tips</h3>
                <p className="text-gray-600">Motivational messages and wellness tips</p>
              </div>
            </div>
            <p className="text-gray-700">
              Receive daily motivational quotes and personalized wellness tips to support your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">🚀</span>
          Advanced Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => onViewChange('menopause')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-purple-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Menopause Support</h3>
                <p className="text-gray-600">Guidance through life transitions</p>
              </div>
            </div>
            <p className="text-gray-700">
              Access resources and support for navigating menopause with confidence and care.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">❤️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Symptom Insights</h3>
                <p className="text-gray-600">Personalized tips based on symptoms</p>
              </div>
            </div>
            <p className="text-gray-700">
              Receive tailored advice and recommendations based on your reported symptoms and cycle data.
            </p>
          </div>
        </div>
      </section>

      {/* User Management */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">👤</span>
          User Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Profile Settings</h3>
                <p className="text-gray-600">Manage your personal information</p>
              </div>
            </div>
            <p className="text-gray-700">
              Update your profile, preferences, and personal health information for a customized experience.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">🌐</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Language & Preferences</h3>
                <p className="text-gray-600">Customize your app experience</p>
              </div>
            </div>
            <p className="text-gray-700">
              Choose your preferred language and adjust app settings to match your needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;