import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Phone, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  LogOut, 
  Smartphone,
  Lock,
  Layers
} from 'lucide-react';
import { UserAccount } from '../../types';

interface UserProfileProps {
  user: UserAccount;
  onOpenKyc: () => void;
  onOpenAuth: () => void;
  onToggle2Fa: () => void;
  onSwitchToAdmin: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onOpenKyc,
  onOpenAuth,
  onToggle2Fa,
  onSwitchToAdmin,
}) => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D6B15C] to-[#997726] flex items-center justify-center font-extrabold text-[#081426] text-2xl shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <div className="text-xs text-[#9EACC1] font-mono mt-0.5">{user.phone}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                user.kycStatus === 'Approved'
                  ? 'bg-[#43B581]/15 text-[#43B581] border border-[#43B581]/30'
                  : 'bg-[#D6B15C]/15 text-[#D6B15C] border border-[#D6B15C]/30'
              }`}>
                {user.kycStatus === 'Approved' ? '● KYC ভেরিফাইড' : '○ KYC পেন্ডিং'}
              </span>
              <span className="text-[10px] text-[#9EACC1] font-mono">
                আইডি: {user.id}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAuth}
          className="px-3.5 py-2 text-xs font-semibold text-[#9EACC1] hover:text-white bg-[#081426] border border-[#1e355b] rounded-xl self-start sm:self-auto transition-colors"
        >
          অ্যাকাউন্ট পরিবর্তন / লগআউট
        </button>
      </div>

      {/* KYC Status & Details */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#43B581]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              জাতীয় পরিচয়পত্র ও KYC অবস্থা
            </h3>
          </div>
          <button
            onClick={onOpenKyc}
            className="text-xs text-[#D6B15C] hover:text-[#e2c172] font-semibold underline underline-offset-4"
          >
            {user.kycStatus === 'Approved' ? 'ডকুমেন্ট দেখুন' : 'এখনই KYC জমা দিন'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#081426] border border-[#1e355b] space-y-1">
            <span className="text-[#9EACC1] block">এনআইডি নম্বর:</span>
            <span className="font-mono font-bold text-white text-sm">
              {user.nidNumber || 'জমাকৃত নয়'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#081426] border border-[#1e355b] space-y-1">
            <span className="text-[#9EACC1] block">পরিচয়পত্র যাচাইকারী:</span>
            <span className="font-mono font-bold text-[#43B581] text-sm">
              বাংলাদেশ নির্বাচন কমিশন সার্ভার ভেরিফাইড
            </span>
          </div>
        </div>
      </div>

      {/* Security & 2FA */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]/60">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#D6B15C]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              নিরাপত্তা সেটিংস (Security & 2FA)
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-[#081426] border border-[#1e355b]">
          <div>
            <div className="text-xs font-bold text-white">2-ফ্যাক্টর নিরাপত্তা (2FA Security)</div>
            <p className="text-[11px] text-[#9EACC1] mt-0.5">
              লগইন করার সময় মোবাইল এসএমএস ওটিপি বাধ্যতামূলক করা হবে
            </p>
          </div>

          <button
            onClick={onToggle2Fa}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-colors ${
              user.is2FAEnabled
                ? 'bg-[#43B581]/15 text-[#43B581] border-[#43B581]/40 hover:bg-[#43B581]/25'
                : 'bg-[#1e355b] text-[#9EACC1] border-[#1e355b] hover:text-white'
            }`}
          >
            {user.is2FAEnabled ? 'সক্রিয় (ENABLED)' : 'নিষ্ক্রিয় (DISABLED)'}
          </button>
        </div>
      </div>

      {/* Switch to Admin Control Panel */}
      <div className="p-4 rounded-2xl bg-[#081426] border border-[#D6B15C]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#D6B15C]" />
            <span>অ্যাডমিন কন্ট্রোল প্যানেল অ্যাক্সেস</span>
          </div>
          <p className="text-[11px] text-[#9EACC1] mt-0.5">
            সুপার অ্যাডমিন হিসেবে ডিপোজিট ও উইথড্রয়াল অ্যাপ্রুভ/রিজেক্ট করতে অ্যাডমিন মোডে যান।
          </p>
        </div>

        <button
          onClick={onSwitchToAdmin}
          className="px-4 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shrink-0 shadow-sm"
        >
          অ্যাডমিন ড্যাশবোর্ডে যান →
        </button>
      </div>
    </div>
  );
};
