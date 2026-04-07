import { useState, useEffect } from 'react';
import quotesData from '../data/quotes.json';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [selectedContent, setSelectedContent] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      // Randomly select between quote and food recommendation
      const isQuote = Math.random() > 0.5;
      
      if (isQuote) {
        const randomQuote = quotesData.motivationalQuotes[
          Math.floor(Math.random() * quotesData.motivationalQuotes.length)
        ];
        setSelectedContent({
          type: 'quote',
          ...randomQuote,
        });
      } else {
        const randomFood = quotesData.foodRecommendations[
          Math.floor(Math.random() * quotesData.foodRecommendations.length)
        ];
        setSelectedContent({
          type: 'food',
          ...randomFood,
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl border border-pink-100/50 p-8 sm:p-12 max-w-md w-full pointer-events-auto animate-slideUpFadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {selectedContent && (
            <div className="text-center">
              {/* Icon */}
              <div className="mb-6">
                <span className="text-6xl line-height-1">{selectedContent.icon}</span>
              </div>

              {/* Content */}
              {selectedContent.type === 'quote' ? (
                <>
                  {/* Quote */}
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
                    {selectedContent.text}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">💭 Daily Inspiration</p>
                </>
              ) : (
                <>
                  {/* Food Recommendation */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    {selectedContent.title}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    {selectedContent.text}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">🍴 Health Tip</p>
                </>
              )}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-8 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Let's Go! ✨
          </button>

          {/* Skip tip */}
          <p className="text-xs text-gray-400 mt-4 text-center">
            You'll see a new tip each time you log in
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUpFadeIn {
          animation: slideUpFadeIn 0.4s ease-out cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
};

export default QuoteModal;
