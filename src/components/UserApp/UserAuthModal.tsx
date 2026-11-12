import React, { useState } from 'react';
import { 
  Smartphone, 
  KeyRound, 
  ShieldCheck, 
  Check, 
  UserPlus, 
  LogIn,
  AlertCircle
} from 'lucide-react';
import { UserAccount } from '../../types';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onUpdateUser: (user: UserAccount) => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | '2fa'>('login');
  const [phone, setPhone] = useState('01712-345678');
  const [name, setName] = useState('Rahim Mia');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [is2FaVerified, setIs2FaVerified] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpCode('789123'); // Demo OTP prefill for convenience
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser.is2FAEnabled && !is2FaVerified) {
      setAuthMode('2fa');
      return;
    }

    onUpdateUser({
      ...currentUser,
      phone,
      name,
      isLoggedIn: true,
    });
    onClose();
  };

  const handle2FaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIs2FaVerified(true);
    onUpdateUser({
      ...currentUser,
      phone,
      name,
      isLoggedIn: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D6B15C]/20 border border-[#D6B15C]/40 flex items-center justify-center text-[#D6B15C]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {authMode === 'login' ? 'মোবাইল ওটিপি লগইন' : authMode === 'register' ? 'নতুন একাউন্ট রেজিস্ট্রেশন' : '2FA অতিরিক্ত নিরাপত্তা যাচাই'}
              </h3>
              <p className="text-[11px] text-[#9EACC1]">MH BD INVEST সিকিউর অথেনটিকেশন</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#9EACC1] hover:text-white p-1 rounded-lg">
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        {authMode !== '2fa' && (
          <div className="grid grid-cols-2 gap-2 mt-4 p-1 bg-[#081426] border border-[#1e355b] rounded-xl">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setOtpSent(false); }}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                authMode === 'login'
                  ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                  : 'text-[#9EACC1]'
              }`}
            >
              লগইন (Login OTP)
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setOtpSent(false); }}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                authMode === 'register'
                  ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                  : 'text-[#9EACC1]'
              }`}
            >
              রেজিস্ট্রেশন (Register)
            </button>
          </div>
        )}

        {authMode === '2fa' ? (
          <form onSubmit={handle2FaSubmit} className="mt-4 space-y-4 text-xs">
            <div className="p-3.5 bg-[#081426] border border-[#D6B15C]/40 rounded-xl space-y-2 text-center">
              <ShieldCheck className="w-8 h-8 text-[#D6B15C] mx-auto" />
              <h4 className="font-bold text-white">2-ফ্যাক্টর নিরাপত্তা সক্রিয়</h4>
              <p className="text-[11px] text-[#9EACC1]">
                আপনার নিবন্ধিত নম্বরে ({phone}) ৬ ডিজিটের নিরাপত্তা কোড পাঠানো হয়েছে।
              </p>
            </div>

            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">2FA সিকিউরিটি কোড</label>
              <input
                type="text"
                required
                maxLength={6}
                defaultValue="456789"
                className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono text-center tracking-widest text-lg p-2.5 rounded-xl outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#D6B15C] hover:bg-[#e2c172] text-[#081426] font-bold rounded-xl transition-colors shadow-sm"
            >
              যাচাই করে প্রবেশ করুন
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="mt-4 space-y-3.5 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="text-[#9EACC1] block mb-1 font-semibold">আপনার পূর্ণ নাম</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">বাংলাদেশি মোবাইল নম্বর</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="flex-1 bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono p-2.5 rounded-xl outline-none"
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-3.5 py-2 bg-[#1e355b] hover:bg-[#284675] text-[#D6B15C] font-semibold rounded-xl whitespace-nowrap transition-colors"
                >
                  {otpSent ? 'OTP পাঠানো হয়েছে' : 'OTP পাঠান'}
                </button>
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="text-[#9EACC1] block mb-1 font-semibold">মোবাইল OTP কোড</label>
                <input
                  type="text"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="৬ ডিজিটের কোড"
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono text-center tracking-widest text-base p-2.5 rounded-xl outline-none"
                />
                <p className="text-[10px] text-[#43B581] mt-1">
                  ✓ ডেমো ওটিপি কোড স্বয়ংক্রিয়ভাবে বসানো হয়েছে (789123)
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1e355b] rounded-xl hover:bg-[#284675]"
              >
                বন্ধ
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shadow-sm"
              >
                {authMode === 'login' ? 'লগইন করুন' : 'অ্যাকাউন্ট তৈরি করুন'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
