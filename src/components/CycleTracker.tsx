import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CycleData {
  lastPeriodDate: Date | null;
  cycleLength: number;
  periodDuration: number;
}

interface CycleInfo {
  nextPeriodDate: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  periodDays: Date[];
  fertileDays: Date[];
}

const CycleTracker = () => {
  const { t } = useTranslation();
  const [cycleData, setCycleData] = useState<CycleData>({
    lastPeriodDate: null,
    cycleLength: 28,
    periodDuration: 5,
  });

  const [calendarDate, setCalendarDate] = useState(new Date());

  // Calculate cycle information
  const cycleInfo = useMemo((): CycleInfo | null => {
    if (!cycleData.lastPeriodDate) return null;

    const last = new Date(cycleData.lastPeriodDate);
    const next = new Date(last.getTime() + cycleData.cycleLength * 24 * 60 * 60 * 1000);
    
    // Ovulation typically happens 14 days before next period
    const ovulationDaysBeforeNext = 14;
    const ovulation = new Date(next.getTime() - ovulationDaysBeforeNext * 24 * 60 * 60 * 1000);
    
    // Fertile window is typically 5 days: 3 days before ovulation + ovulation day + 1 day after
    const fertileStart = new Date(ovulation.getTime() - 3 * 24 * 60 * 60 * 1000);
    const fertileEnd = new Date(ovulation.getTime() + 2 * 24 * 60 * 60 * 1000);

    // Calculate period days (both current and next cycle for visibility)
    const periodDays: Date[] = [];
    for (let i = 0; i < cycleData.periodDuration; i++) {
      periodDays.push(new Date(last.getTime() + i * 24 * 60 * 60 * 1000));
      periodDays.push(new Date(next.getTime() + i * 24 * 60 * 60 * 1000));
    }

    // Calculate fertile days
    const fertileDays: Date[] = [];
    const current = new Date(fertileStart);
    while (current <= fertileEnd) {
      fertileDays.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return {
      nextPeriodDate: next,
      ovulationDate: ovulation,
      fertileWindowStart: fertileStart,
      fertileWindowEnd: fertileEnd,
      periodDays,
      fertileDays,
    };
  }, [cycleData]);

  const getDayClassName = (date: Date): string => {
    if (!cycleInfo) return 'bg-gray-50';

    const dateStr = date.toDateString();
    
    // Check if it's a period day
    const isPeriodDay = cycleInfo.periodDays.some(d => d.toDateString() === dateStr);
    if (isPeriodDay) return 'bg-red-400 text-white font-bold';

    // Check if it's ovulation day
    const isOvulationDay = cycleInfo.ovulationDate.toDateString() === dateStr;
    if (isOvulationDay) return 'bg-blue-400 text-white font-bold';

    // Check if it's a fertile day
    const isFertileDay = cycleInfo.fertileDays.some(d => d.toDateString() === dateStr);
    if (isFertileDay) return 'bg-green-300 text-gray-900 font-semibold';

    return 'bg-gray-50';
  };

  const handleCalendarChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setCalendarDate(value);
      setCycleData({ ...cycleData, lastPeriodDate: value });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setCycleData({ ...cycleData, lastPeriodDate: date });
    setCalendarDate(date);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const daysUntilNext = cycleInfo
    ? Math.ceil((cycleInfo.nextPeriodDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.12),_transparent_30%),linear-gradient(to_bottom_right,#fdf2f8,#ffffff,#faf5ff)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {t('cycleTracker.title')}
          </h1>
          <p className="text-gray-600 text-lg">{t('cycleTracker.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl border border-pink-100/50 p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('cycleTracker.yourInformation')}</h2>

              <form className="space-y-6">
                {/* Last Period Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    {t('cycleTracker.lastPeriodDate')}
                  </label>
                  <input
                    type="date"
                    value={formatDate(cycleData.lastPeriodDate)}
                    onChange={handleDateChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white bg-gray-50 transition-all"
                  />
                </div>

                {/* Cycle Length */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    {t('cycleTracker.cycleLength')}
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="21"
                      max="35"
                      value={cycleData.cycleLength}
                      onChange={(e) => setCycleData({ ...cycleData, cycleLength: parseInt(e.target.value) })}
                      className="flex-1 h-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-2xl font-bold text-purple-600 min-w-12 text-center">
                      {cycleData.cycleLength}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{t('cycleTracker.typicalCycleRange')}</p>
                </div>

                {/* Period Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    {t('cycleTracker.periodDuration')}
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={cycleData.periodDuration}
                      onChange={(e) => setCycleData({ ...cycleData, periodDuration: parseInt(e.target.value) })}
                      className="flex-1 h-2 bg-gradient-to-r from-red-300 to-pink-300 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-2xl font-bold text-red-500 min-w-12 text-center">
                      {cycleData.periodDuration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{t('cycleTracker.typicalPeriodRange')}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const today = new Date();
                    setCycleData({
                      lastPeriodDate: today,
                      cycleLength: 28,
                      periodDuration: 5,
                    });
                  }}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
                >
                  {t('cycleTracker.reset')}
                </button>
              </form>
            </div>
          </div>

          {/* Calendar & Predictions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Calendar */}
            <div className="bg-white rounded-3xl shadow-2xl border border-pink-100/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('cycleTracker.cycleCalendar')}</h2>
              
              <style>{`
                .react-calendar {
                  width: 100%;
                  background: transparent;
                  border: none;
                  font-family: 'Poppins', system-ui, sans-serif;
                }
                .react-calendar__navigation {
                  margin-bottom: 1.5rem;
                  display: flex;
                  gap: 1rem;
                  justify-content: space-between;
                  align-items: center;
                }
                .react-calendar__navigation button {
                  background: linear-gradient(to right, #a855f7, #ec4899);
                  color: white;
                  border: none;
                  border-radius: 0.75rem;
                  padding: 0.5rem 1rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s;
                }
                .react-calendar__navigation button:hover {
                  transform: scale(1.05);
                }
                .react-calendar__month-view {
                  border-collapse: collapse;
                  width: 100%;
                }
                .react-calendar__month-view__weekdays {
                  text-align: center;
                  font-weight: 700;
                  font-size: 0.875rem;
                  color: #6b7280;
                  text-transform: uppercase;
                  margin-bottom: 0.5rem;
                }
                .react-calendar__month-view__weekdays__weekday {
                  padding: 0.5rem;
                  border: none;
                }
                .react-calendar__month-view__days {
                  display: grid;
                  grid-template-columns: repeat(7, 1fr);
                  gap: 0.5rem;
                }
                .react-calendar__tile {
                  aspect-ratio: 1;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 1px solid #e5e7eb;
                  border-radius: 0.75rem;
                  background: #f9fafb;
                  cursor: pointer;
                  font-weight: 500;
                  font-size: 0.875rem;
                  transition: all 0.2s;
                }
                .react-calendar__tile:hover {
                  border-color: #c084fc;
                  transform: scale(1.05);
                }
                .react-calendar__tile--neighboringMonth {
                  color: #d1d5db;
                  background: #f3f4f6;
                }
                .react-calendar__tile--weekend {
                  color: #6b7280;
                }
                .react-calendar__tile.bg-red-400 {
                  background-color: #f87171 !important;
                  color: #ffffff !important;
                }
                .react-calendar__tile.bg-blue-400 {
                  background-color: #60a5fa !important;
                  color: #ffffff !important;
                }
                .react-calendar__tile.bg-green-300 {
                  background-color: #86efac !important;
                  color: #0f172a !important;
                }
                .react-calendar__tile.bg-gray-50 {
                  background-color: #f9fafb !important;
                  color: #111827 !important;
                }
                .react-calendar__tile--active {
                  box-shadow: inset 0 0 0 2px rgba(167, 139, 250, 0.9);
                }
              `}</style>

              {cycleData.lastPeriodDate ? (
                <>
                  <Calendar 
                    value={cycleData.lastPeriodDate ?? calendarDate}
                    onChange={handleCalendarChange as any}
                    tileClassName={({ date, view }) => view === 'month' ? getDayClassName(date) : ''}
                  />
                  
                  {/* Legend */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-4">{t('cycleTracker.legend')}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-400 rounded"></div>
                        <span className="text-sm text-gray-700">{t('cycleTracker.period')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-300 rounded"></div>
                        <span className="text-sm text-gray-700">{t('cycleTracker.fertile')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-400 rounded"></div>
                        <span className="text-sm text-gray-700">{t('cycleTracker.ovulation')}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 font-medium">{t('cycleTracker.enterDatePrompt')}</p>
                </div>
              )}
            </div>

            {/* Predictions */}
            {cycleInfo && (
              <div className="bg-white rounded-3xl shadow-2xl border border-pink-100/50 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('cycleTracker.cyclePredictions')}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Next Period */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
                    <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">
                      {t('cycleTracker.nextPeriod')}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {cycleInfo.nextPeriodDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    {daysUntilNext !== null && (
                      <p className="text-sm text-gray-600">
                        {daysUntilNext > 0 ? t('cycleTracker.inDays', { days: daysUntilNext }) : t('cycleTracker.todayOrPassed')}
                      </p>
                    )}
                  </div>

                  {/* Ovulation */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                      {t('cycleTracker.ovulationDay')}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {cycleInfo.ovulationDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date() > cycleInfo.ovulationDate ? t('cycleTracker.passed') : t('cycleTracker.fertilePeak')}
                    </p>
                  </div>

                  {/* Fertile Window */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
                      {t('cycleTracker.fertileWindow')}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mb-2">
                      {cycleInfo.fertileWindowStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {' '}- {cycleInfo.fertileWindowEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('cycleTracker.fertileDays', { days: cycleInfo.fertileDays.length })}
                    </p>
                  </div>

                  {/* Cycle Stats */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">
                      {t('cycleTracker.yourCycle')}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mb-2">
                      {t('cycleTracker.cycleStats', { length: cycleData.cycleLength, duration: cycleData.periodDuration })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('cycleTracker.nextCycleStarts', { days: cycleData.cycleLength - cycleData.periodDuration })}
                    </p>
                  </div>
                </div>

                {/* Health Tips */}
                <div className="mt-8 pt-6 border-t border-gray-200 bg-blue-50 rounded-xl p-6">
                  <p className="font-semibold text-gray-900 mb-3">{t('cycleTracker.healthTips')}</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>{t('cycleTracker.tip1')}</li>
                    <li>{t('cycleTracker.tip2')}</li>
                    <li>{t('cycleTracker.tip3')}</li>
                    <li>{t('cycleTracker.tip4')}</li>
                    <li>{t('cycleTracker.tip5')}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleTracker;
