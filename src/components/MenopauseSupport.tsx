import { useMemo, useState } from 'react';
import menopauseData from '../data/menopause.json';

interface SymptomItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface TipItem {
  id: string;
  title: string;
  description: string;
  why?: string;
}

interface PersonalizedTipGroup {
  symptomId: string;
  tips: TipItem[];
}

const MenopauseSupport = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [tipIndex, setTipIndex] = useState(0);

  const symptoms = menopauseData.symptoms as SymptomItem[];
  const tips = menopauseData.tips as TipItem[];
  const personalizedTipGroups = menopauseData.personalizedTips as PersonalizedTipGroup[];
  const dailyRecommendations = menopauseData.dailyRecommendations as string[];
  const summary = menopauseData.summary as { title: string; description: string };

  const selectedSymptomItems = useMemo(
    () => symptoms.filter((symptom) => selectedSymptoms.includes(symptom.id)),
    [selectedSymptoms, symptoms]
  );

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((symptomId) => symptomId !== id) : [...prev, id]
    );
  };

  const selectedSymptomTips = useMemo(() => {
    const selectedTipItems = personalizedTipGroups
      .filter((group) => selectedSymptoms.includes(group.symptomId))
      .flatMap((group) => group.tips);

    const uniqueTips = selectedTipItems.reduce<TipItem[]>((acc, current) => {
      if (!acc.some((tip) => tip.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);

    return uniqueTips;
  }, [selectedSymptoms, personalizedTipGroups]);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % dailyRecommendations.length);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.12),_transparent_30%),linear-gradient(to_bottom_right,#fdf2f8,#ffffff,#faf5ff)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="rounded-[32px] border border-purple-100/70 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Menopause Support</p>
              <h1 className="mt-3 text-4xl font-bold text-gray-900">Gentle guidance for the menopause transition</h1>
              <p className="mt-4 max-w-3xl text-gray-600 leading-7">{summary.description}</p>
            </div>
            <div className="rounded-3xl bg-purple-50 p-6 text-center shadow-md border border-purple-100">
              <p className="text-sm uppercase tracking-[0.24em] text-purple-700">Typical age range</p>
              <p className="mt-3 text-4xl font-bold text-purple-800">45–50 years</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-purple-100/70 bg-white/95 p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-purple-100 p-3 text-purple-700 text-2xl">💜</div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">What to expect</h2>
                  <p className="mt-2 text-gray-600">Menopause is a natural phase. Knowing common symptoms and supportive habits helps you feel grounded and resilient.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  type="button"
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`group flex flex-col gap-4 rounded-[28px] border p-5 text-left transition-all duration-200 ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl">{symptom.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{symptom.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{symptom.description}</p>
                    </div>
                  </div>
                  <div className={`self-start rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-50 text-purple-700'
                  }`}>
                    {selectedSymptoms.includes(symptom.id) ? 'Selected' : 'Tap to select'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-purple-100/70 bg-white/95 p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.24em] text-purple-600 font-semibold">Daily recommendation</p>
              <p className="mt-4 text-lg font-semibold text-gray-900">{dailyRecommendations[tipIndex]}</p>
              <button
                onClick={nextTip}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700"
              >
                Show another tip
              </button>
            </div>

            <div className="rounded-[32px] border border-purple-100/70 bg-white/95 p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-600 font-semibold">Selected symptoms</p>
              {selectedSymptomItems.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {selectedSymptomItems.map((symptom) => (
                    <li key={symptom.id} className="rounded-3xl bg-purple-50 p-4 text-sm text-gray-700">
                      <span className="mr-2 text-lg">{symptom.icon}</span>
                      <span>{symptom.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-gray-500">Select symptoms to track what you’re experiencing today.</p>
              )}
            </div>
          </aside>
        </section>

        <section className="rounded-[32px] border border-purple-100/70 bg-white/95 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Personalized tips</h2>
            <p className="mt-2 text-gray-600">Based on the symptoms you choose, we’ll show tips to help manage them.</p>
          </div>
          {selectedSymptomTips.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {selectedSymptomTips.map((tip) => (
                <div key={tip.id} className="rounded-[28px] border border-gray-200 bg-purple-50/90 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900">{tip.title}</h3>
                  <p className="mt-3 text-gray-600 leading-7">{tip.description}</p>
                  {tip.why && (
                    <p className="mt-4 text-sm text-purple-700 bg-purple-100/80 rounded-2xl border border-purple-200 p-3">
                      <span className="font-semibold">Why this helps: </span>
                      {tip.why}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-purple-200 bg-purple-50/80 p-8 text-center text-gray-600">
              Choose one or more symptoms to see personalized tips.
            </div>
          )}
        </section>

        <section className="rounded-[32px] border border-purple-100/70 bg-white/95 p-8 shadow-xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {tips.map((tip) => (
              <div key={tip.id} className="rounded-[28px] border border-gray-200 bg-purple-50/80 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-purple-700 font-semibold">Tip</p>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{tip.title}</h3>
                <p className="mt-3 text-gray-600 leading-7">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MenopauseSupport;
