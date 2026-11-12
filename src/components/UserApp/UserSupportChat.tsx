import React, { useState } from 'react';
import { 
  Send, 
  Headphones, 
  CheckCheck, 
  Sparkles, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { SupportMessage } from '../../types';

interface UserSupportChatProps {
  messages: SupportMessage[];
  onSendMessage: (text: string) => void;
}

export const UserSupportChat: React.FC<UserSupportChatProps> = ({
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'বিকাশে ডিপোজিট করার নিয়ম কি?',
    'উইথড্র রিকোয়েস্ট কতক্ষণে অ্যাপ্রুভ হয়?',
    '১০ দিনের ইনভেস্টমেন্টে লাভ কত?'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickClick = (q: string) => {
    onSendMessage(q);
  };

  return (
    <div className="max-w-3xl mx-auto h-[620px] bg-[#12233D] border border-[#1e355b] rounded-2xl flex flex-col overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 bg-[#0c1a30] border-b border-[#1e355b] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D6B15C] to-[#997726] flex items-center justify-center text-[#081426] font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="w-3 h-3 rounded-full bg-[#43B581] border-2 border-[#0c1a30] absolute bottom-0 right-0" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              MH BD 24/7 লাইভ সাপোর্ট
              <span className="text-[10px] font-mono text-[#43B581] bg-[#43B581]/15 px-2 py-0.5 rounded">
                অনলাইন
              </span>
            </h3>
            <p className="text-[11px] text-[#9EACC1]">
              গড় উত্তর দেওয়ার সময়: ২ মিনিট
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages scroll area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#081426]">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-[#D6B15C] text-[#081426] font-medium rounded-tr-none shadow-sm'
                    : 'bg-[#12233D] text-white border border-[#1e355b] rounded-tl-none shadow-sm'
                }`}
              >
                <p>{m.text}</p>
                <div
                  className={`text-[9px] mt-1.5 flex items-center justify-end gap-1 font-mono ${
                    isUser ? 'text-[#081426]/70' : 'text-[#9EACC1]'
                  }`}
                >
                  <span>{m.timestamp}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-[#081426]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 py-2 bg-[#0c1a30] border-t border-[#1e355b] flex gap-2 overflow-x-auto shrink-0 no-scrollbar">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickClick(q)}
            className="text-[11px] text-[#D6B15C] hover:text-[#e2c172] bg-[#12233D] hover:bg-[#1e355b] border border-[#D6B15C]/30 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={handleSend} className="p-3 bg-[#12233D] border-t border-[#1e355b] flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="আপনার সমস্যা বা প্রশ্ন লিখুন..."
          className="flex-1 bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white text-xs rounded-xl px-4 py-2.5 outline-none placeholder:text-[#9EACC1]/60 transition-colors"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-xl bg-[#D6B15C] hover:bg-[#e2c172] text-[#081426] flex items-center justify-center transition-colors shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
