import { useEffect, useRef, useState } from 'react';
import knowledgeBase from '../data/chatbot.json';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface KnowledgeBaseEntry {
  question: string;
  keywords: string[];
  answer: string | string[];
}

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi! I’m here to help you with menstrual health. Ask me anything about your cycle, PMS, hygiene, diet or mood.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[’'`,.!?\/\\]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const findAnswer = (question: string): string => {
    const normalized = normalize(question);
    const words = normalized.split(' ');
    const knowledgeEntries = knowledgeBase.knowledgeBase as KnowledgeBaseEntry[];

    let bestMatch: KnowledgeBaseEntry | null = null;
    let bestScore = 0;

    knowledgeEntries.forEach((entry) => {
      let score = 0;

      entry.keywords.forEach((keyword) => {
        const normalizedKeyword = normalize(keyword);

        if (normalized.includes(normalizedKeyword)) {
          score += 3;
        }

        normalizedKeyword.split(' ').forEach((word) => {
          if (word && words.includes(word)) {
            score += 1;
          }
        });
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    });

    if (bestMatch && bestScore > 0) {
      const finalMatch = bestMatch as KnowledgeBaseEntry;
      const answer = finalMatch.answer;
      const answers = Array.isArray(answer) ? answer : [answer];
      return answers[Math.floor(Math.random() * answers.length)];
    }

    return knowledgeBase.fallback;
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      sender: 'user',
      text: trimmed,
    };

    const answer = findAnswer(trimmed);
    const botMessage: ChatMessage = {
      id: `${Date.now()}-bot`,
      sender: 'bot',
      text: answer,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.12),_transparent_30%),linear-gradient(to_bottom_right,#fdf2f8,#ffffff,#faf5ff)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">FemAura Chatbot</h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Ask questions about your menstrual cycle, PMS, hygiene, nutrition, or mood. I’m here to help with gentle wellness guidance.
            </p>
          </div>
          <div className="rounded-[32px] bg-white/95 shadow-2xl border border-purple-100/70 px-5 py-5 w-full max-w-sm">
            <p className="text-sm font-semibold text-purple-600 mb-3">Quick tips</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Ask about your cycle phases</li>
              <li>• Learn about PMS relief</li>
              <li>• Get diet and mood support</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/95 rounded-[32px] shadow-2xl border border-purple-100/60 overflow-hidden">
          <div className="flex min-h-[620px] flex-col">
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4" style={{ scrollBehavior: 'smooth' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-4 rounded-3xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-none rounded-tl-3xl'
                        : 'bg-purple-50 text-gray-900 rounded-bl-none rounded-tr-3xl'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-6">{message.text}</p>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 bg-white px-5 py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your cycle, PMS, diet, or mood..."
                  className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-900 focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
