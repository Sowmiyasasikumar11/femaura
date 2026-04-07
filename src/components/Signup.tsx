import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SignupProps {
  onSwitchToLogin: () => void;
  onSignupSuccess?: () => void;
}

const Signup = ({ onSwitchToLogin, onSignupSuccess }: SignupProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{name?: string; age?: string; email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || parseInt(formData.age) < 13) newErrors.age = 'Must be 13 or older';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Signup:', formData);
      // Handle signup logic here
      if (onSignupSuccess) {
        onSignupSuccess();
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
    if (errors[field as keyof typeof errors]) {
      setErrors({...errors, [field]: undefined});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-12 sm:px-6 lg:px-10">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden rounded-[40px] bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500 p-10 text-white shadow-2xl lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/75">Begin your journey</p>
            <h2 className="mt-6 text-4xl font-bold leading-tight">Easy cycle support for every woman</h2>
            <p className="mt-5 text-base leading-8 text-white/85 max-w-xl">
              Join FemAura to track moods, learn from trusted guidance, and feel more confident in your body.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] bg-white/10 p-6 border border-white/15">
              <h3 className="text-lg font-semibold">Track your patterns</h3>
              <p className="mt-2 text-sm text-white/85">Log moods, cycle dates, and helpful reminders.</p>
            </div>
            <div className="rounded-[28px] bg-white/10 p-6 border border-white/15">
              <h3 className="text-lg font-semibold">Learn with confidence</h3>
              <p className="mt-2 text-sm text-white/85">Access approachable insights for sustainable wellness.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] shadow-2xl border border-pink-100/60 p-8 sm:p-10 transition-all duration-300 hover:shadow-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              FemAura
            </h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('signup.title')}</h2>
            <p className="text-gray-600 text-sm sm:text-base">Create your account and start feeling more grounded.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
                {t('signup.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`w-full px-4 py-4 border-2 rounded-3xl transition-all duration-200 focus:outline-none text-gray-900 placeholder-gray-400 ${
                  errors.name
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white'
                }`}
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <p className="text-xs text-red-600 font-medium">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-semibold text-gray-900">
                {t('signup.age')}
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                min="13"
                max="120"
                className={`w-full px-4 py-4 border-2 rounded-3xl transition-all duration-200 focus:outline-none text-gray-900 placeholder-gray-400 ${
                  errors.age
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white'
                }`}
                placeholder="18"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
              />
              {errors.age && <p className="text-xs text-red-600 font-medium">{errors.age}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                {t('signup.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-4 py-4 border-2 rounded-3xl transition-all duration-200 focus:outline-none text-gray-900 placeholder-gray-400 ${
                  errors.email
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white'
                }`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <p className="text-xs text-red-600 font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                {t('signup.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`w-full px-4 py-4 border-2 rounded-3xl transition-all duration-200 focus:outline-none text-gray-900 placeholder-gray-400 ${
                  errors.password
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white'
                }`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              {errors.password && <p className="text-xs text-red-600 font-medium">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 rounded-3xl text-white font-semibold text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('signup.submit')}
            </button>
          </form>

          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="text-center">
            <p className="text-gray-700 text-sm mb-3">{t('signup.switchToLogin')}</p>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="w-full py-3 px-4 rounded-3xl border-2 border-purple-200 text-purple-600 font-semibold hover:bg-purple-50 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;