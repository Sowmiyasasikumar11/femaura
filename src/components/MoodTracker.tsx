import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MoodData {
  [date: string]: 'happy' | 'sad' | 'angry' | 'neutral' | 'excited';
}

const MoodTracker = () => {
  const { t } = useTranslation();
  const [moodData, setMoodData] = useState<MoodData>(() => {
    const saved = localStorage.getItem('femauraMoodData');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedMood, setSelectedMood] = useState<'happy' | 'sad' | 'angry' | 'neutral' | 'excited' | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const moods = ['happy', 'sad', 'angry', 'neutral', 'excited'] as const;
  const moodEmojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    neutral: '😐',
    excited: '🤩',
  };

  const moodValues: Record<string, number> = {
    sad: 1,
    angry: 2,
    neutral: 3,
    happy: 4,
    excited: 5,
  };

  const moodGradientStyles: Record<string, string> = {
    happy: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    sad: 'linear-gradient(135deg, #3b82f6 0%, #818cf8 100%)',
    angry: 'linear-gradient(135deg, #ff6b6b 0%, #f59e0b 100%)',
    neutral: 'linear-gradient(135deg, #8b5cf6 0%, #c4b5fd 100%)',
    excited: 'linear-gradient(135deg, #fbbf24 0%, #ec4899 100%)',
  };

  const moodColors: Record<string, string> = {
    happy: '#ec4899',
    sad: '#3b82f6',
    angry: '#ff6b6b',
    neutral: '#8b5cf6',
    excited: '#fbbf24',
  };

  const today = new Date().toISOString().split('T')[0];

  const saveMood = () => {
    if (selectedMood) {
      const newData = {
        ...moodData,
        [today]: selectedMood,
      };
      setMoodData(newData);
      localStorage.setItem('femauraMoodData', JSON.stringify(newData));
      setSelectedMood(null);
    }
  };

  const getTodayMood = (): string | null => {
    return moodData[today] || null;
  };

  const getCurrentMoodLevel = (): number => {
    const mood = getTodayMood();
    return mood ? moodValues[mood] : 0;
  };

  const getMoodTrendData = useMemo(() => {
    const endDay = viewMode === 'week' ? 7 : 30;
    const data = [];
    
    for (let i = endDay - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayOfMonth = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const mood = moodData[dateStr];
      const value = mood ? moodValues[mood] : null;

      data.push({
        date: viewMode === 'week' ? dayOfWeek : dayOfMonth,
        mood: value,
        moodName: mood || 'none',
        emoji: mood ? moodEmojis[mood] : '',
      });
    }
    
    return data;
  }, [moodData, viewMode]);

  const getMoodDistribution = useMemo(() => {
    const distribution = {
      happy: 0,
      sad: 0,
      angry: 0,
      neutral: 0,
      excited: 0,
    };

    Object.values(moodData).forEach((mood) => {
      distribution[mood]++;
    });

    return Object.entries(distribution)
      .filter(([_, count]) => count > 0)
      .map(([mood, count]) => ({
        name: t(`moodTracker.moods.${mood}`),
        value: count,
        emoji: moodEmojis[mood as keyof typeof moodEmojis],
      }));
  }, [moodData, t]);

  const getMoodStats = useMemo(() => {
    const entries = Object.entries(moodData)
      .filter(([date]) => {
        const entryDate = new Date(date);
        const cutoffDate = new Date();
        if (viewMode === 'week') {
          cutoffDate.setDate(cutoffDate.getDate() - 7);
        } else {
          cutoffDate.setDate(cutoffDate.getDate() - 30);
        }
        return entryDate >= cutoffDate;
      });

    if (entries.length === 0) return { average: 0, count: 0 };

    const sum = entries.reduce((acc, [, mood]) => acc + moodValues[mood], 0);
    const average = Math.round((sum / entries.length) * 10) / 10;

    return { average, count: entries.length };
  }, [moodData, viewMode]);

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.12),_transparent_30%),linear-gradient(to_bottom_right,#fdf2f8,#ffffff,#faf5ff)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {t('moodTracker.title')}
          </h1>
          <p className="text-gray-600 text-lg">{t('moodTracker.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Mood Selection & Meter */}
          <div className="lg:col-span-1 space-y-8">
            {/* Mood Selection */}
            <div className="bg-white rounded-3xl shadow-2xl border border-pink-100/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {t('moodTracker.howAreYou')}
              </h2>

              <div className="space-y-4 mb-6">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    style={selectedMood === mood ? { background: moodGradientStyles[mood] } : undefined}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-between ${
                      selectedMood === mood
                        ? 'text-white shadow-2xl'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-3xl">{moodEmojis[mood]}</span>
                    <span className="flex-1 ml-3">{t(`moodTracker.moods.${mood}`)}</span>
                    {selectedMood === mood && (
                      <span className="text-2xl">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={saveMood}
                disabled={!selectedMood}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('moodTracker.saveMood')}
              </button>

              {getTodayMood() && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <p className="text-sm text-green-700 text-center font-semibold">
                    ✓ {t('moodTracker.moods.' + getTodayMood())} {moodEmojis[getTodayMood()!]}
                  </p>
                </div>
              )}
            </div>

            {/* Mood Meter */}
            <div className="bg-white rounded-3xl shadow-2xl border border-pink-100/50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{t('moodTracker.moodMeter')}</h3>

              <div className="flex flex-col items-center">
                {/* Gauge visualization */}
                <div className="relative w-40 h-40 mb-6">
                  <svg viewBox="0 0 200 120" className="w-full">
                    {/* Background arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Colored arcs */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 60 31.36"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 60 31.36 A 80 80 0 0 1 100 5"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 100 5 A 80 80 0 0 1 140 31.36"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 140 31.36 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    {/* Needle */}
                    {getCurrentMoodLevel() > 0 && (
                      <g>
                        <circle cx="100" cy="100" r="6" fill="#1f2937" />
                        <line
                          x1="100"
                          y1="100"
                          x2={100 + 70 * Math.cos((180 - (getCurrentMoodLevel() - 1) * 40) * (Math.PI / 180))}
                          y2={100 + 70 * Math.sin((180 - (getCurrentMoodLevel() - 1) * 40) * (Math.PI / 180))}
                          stroke="#1f2937"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </svg>

                  {/* Center emoji */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl">
                      {getTodayMood() ? moodEmojis[getTodayMood()!] : '😐'}
                    </div>
                  </div>
                </div>

                <p className="text-lg font-semibold text-gray-700">
                  {getTodayMood() 
                    ? t(`moodTracker.moods.${getTodayMood()}`)
                    : t('moodTracker.noMoodTracked')}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Charts & History */}
          <div className="lg:col-span-2 space-y-8">
            {/* View Mode Toggle */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setViewMode('week')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'week'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('moodTracker.thisWeek')}
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'month'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('moodTracker.thisMonth')}
              </button>
            </div>

            {/* Mood Trend Chart */}
            <div className="bg-white rounded-3xl shadow-2xl border border-pink-100/50 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('moodTracker.moodTrend')}</h3>

              {getMoodTrendData.some(d => d.mood !== null) ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getMoodTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis domain={[0, 5]} stroke="#6b7280" />
                    <Tooltip
                      formatter={(value, name, props) => [
                        value ? `${props.payload.emoji} ${props.payload.moodName}` : 'No data',
                        name,
                      ]}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="natural"
                      dataKey="mood"
                      stroke="#a855f7"
                      strokeWidth={3}
                      dot={({ cx, cy, payload }) =>
                        payload.mood ? (
                          <circle cx={cx} cy={cy} r={6} fill={moodColors[payload.moodName]} />
                        ) : null
                      }
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-72 flex items-center justify-center bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-center">{t('moodTracker.noMoodTracked')}</p>
                </div>
              )}
            </div>

            {/* Stats & Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl border border-purple-100/50 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 {t('moodTracker.moodLevel')}</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 border border-purple-100">
                    <p className="text-sm text-gray-600 mb-1">Average Mood Level</p>
                    <p className="text-3xl font-bold text-purple-600">{getMoodStats.average}/5</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-pink-100">
                    <p className="text-sm text-gray-600 mb-1">Tracked Days</p>
                    <p className="text-3xl font-bold text-pink-600">{getMoodStats.count}</p>
                  </div>
                </div>
              </div>

              {/* Mood Distribution Pie Chart */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl border border-blue-100/50 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">😊 Mood Distribution</h3>
                {getMoodDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={getMoodDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {(Object.entries(moodColors) as Array<[string, string]>).map(([mood, color]) => (
                          <Cell key={mood} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} days`} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">{t('moodTracker.noMoodTracked')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-2xl border border-green-100/50 p-8">
              <p className="font-semibold text-gray-900 mb-3">💡 Tips:</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>{t('moodTracker.tip1')}</li>
                <li>{t('moodTracker.tip2')}</li>
                <li>{t('moodTracker.tip3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
