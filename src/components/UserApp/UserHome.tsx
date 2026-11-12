import React from 'react';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  TrendingUp, 
  FileText, 
  Headphones, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserAccount, AdminItem } from '../../types';

interface UserHomeProps {
  user: UserAccount;
  transactions: AdminItem[];
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenKyc: () => void;
  onNavigateTab: (tab: 'home' | 'invest' | 'profit' | 'history' | 'support' | 'profile') => void;
}

export const UserHome: React.FC<UserHomeProps> = ({
  user,
  transactions,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenKyc,
  onNavigateTab,
}) => {
  const isKycApproved = user.kycStatus === 'Approved';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* User Greeting & KYC Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#12233D] border border-[#1e355b] rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D6B15C] to-[#997726] flex items-center justify-center font-extrabold text-[#081426] text-base shrink-0 shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">{user.name}</h2>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                isKycApproved
                  ? 'bg-[#43B581]/15 text-[#43B581] border border-[#43B581]/30'
                  : 'bg-[#D6B15C]/15 text-[#D6B15C] border border-[#D6B15C]/30'
              }`}>
                {isKycApproved ? 'KYC ভেরিফাইড' : 'KYC পেন্ডিং'}
              </span>
            </div>
            <p className="text-xs text-[#9EACC1] font-mono mt-0.5">{user.phone}</p>
          </div>
        </div>

        {!isKycApproved && (
          <button
            onClick={onOpenKyc}
            className="text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] px-3.5 py-2 rounded-xl transition-colors shrink-0 shadow-sm self-start sm:self-auto"
          >
            পরিচয় যাচাই করুন (Verify KYC)
          </button>
        )}
      </div>

      {/* Primary Wallet Balance Card */}
      <div className="bg-gradient-to-br from-[#12233D] via-[#102038] to-[#0a1728] border border-[#D6B15C]/40 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6B15C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between text-[#9EACC1] text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-[#D6B15C]" />
              মোট ওয়ালেট ব্যালেন্স (Wallet Balance)
            </span>
            <span className="font-mono text-[#D6B15C]">BDT (৳)</span>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-[#D6B15C] font-mono tracking-tight tabular-nums my-2">
            ৳{user.walletBalance.toLocaleString()}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9EACC1] font-mono pt-1">
            <span>সক্রিয় বিনিয়োগ: <strong className="text-white">৳{user.totalInvested.toLocaleString()}</strong></span>
            <span>·</span>
            <span>মোট প্রফিট: <strong className="text-[#43B581]">+৳{user.totalProfit.toLocaleString()}</strong></span>
          </div>

          {/* Action Buttons: Deposit & Withdraw */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-[#1e355b]/60">
            <button
              onClick={onOpenDeposit}
              className="py-3 px-4 rounded-xl bg-[#D6B15C] hover:bg-[#e2c172] text-[#081426] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>ডিপোজিট (Deposit)</span>
            </button>

            <button
              onClick={onOpenWithdraw}
              className="py-3 px-4 rounded-xl bg-[#081426] hover:bg-[#12233D] text-white border border-[#1e355b] hover:border-[#D6B15C]/50 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <ArrowUpRight className="w-4 h-4 text-[#D6B15C]" />
              <span>উত্তোলন (Withdraw)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateTab('invest')}
          className="p-4 rounded-2xl bg-[#12233D] hover:bg-[#172d4e] border border-[#1e355b] hover:border-[#D6B15C]/40 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#D6B15C] mb-2.5 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">ইনভেস্ট প্ল্যান</div>
          <div className="text-[10px] text-[#9EACC1] mt-0.5">৳৫,০০০ - ৳২৫,০০০</div>
        </button>

        <button
          onClick={() => onNavigateTab('profit')}
          className="p-4 rounded-2xl bg-[#12233D] hover:bg-[#172d4e] border border-[#1e355b] hover:border-[#D6B15C]/40 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#43B581] mb-2.5 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">প্রফিট স্টেটমেন্ট</div>
          <div className="text-[10px] text-[#9EACC1] mt-0.5">দৈনিক মুনাফার হিসাব</div>
        </button>

        <button
          onClick={() => onNavigateTab('history')}
          className="p-4 rounded-2xl bg-[#12233D] hover:bg-[#172d4e] border border-[#1e355b] hover:border-[#D6B15C]/40 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#D6B15C] mb-2.5 group-hover:scale-105 transition-transform">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">লেনদেন ইতিহাস</div>
          <div className="text-[10px] text-[#9EACC1] mt-0.5">ডিপোজিট ও ক্যাশ আউট</div>
        </button>

        <button
          onClick={() => onNavigateTab('support')}
          className="p-4 rounded-2xl bg-[#12233D] hover:bg-[#172d4e] border border-[#1e355b] hover:border-[#D6B15C]/40 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#E46B70] mb-2.5 group-hover:scale-105 transition-transform">
            <Headphones className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">লাইভ সাপোর্ট</div>
          <div className="text-[10px] text-[#9EACC1] mt-0.5">২৪/৭ কাস্টমার কেয়ার</div>
        </button>
      </div>

      {/* Active Investment Quick Peek */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D6B15C]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">রানিং ইনভেস্টমেন্ট প্যাকেজ</h3>
          </div>
          <button
            onClick={() => onNavigateTab('invest')}
            className="text-xs text-[#D6B15C] hover:text-[#e2c172] flex items-center gap-1 font-semibold"
          >
            <span>নতুন প্ল্যান দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {user.activePlans.length > 0 ? (
          <div className="mt-3.5 space-y-2.5">
            {user.activePlans.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{p.planTitle}</div>
                  <div className="text-[11px] text-[#9EACC1] font-mono mt-0.5">
                    বিনিয়োগ: ৳{p.investedAmount.toLocaleString()} · দৈনিক মুনাফা: ৳{p.dailyProfit.toLocaleString()}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#43B581] font-bold block">
                    {p.daysCompleted} / {p.totalDays} দিন
                  </span>
                  <span className="text-[10px] text-[#9EACC1]">
                    পরবর্তী মুনাফা: {p.nextPayout}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-[#9EACC1]">
            কোনো সক্রিয় প্ল্যান নেই। এখনই ইনভেস্ট শুরু করুন।
          </div>
        )}
      </div>

      {/* Recent Transaction Activity */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]/60">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D6B15C]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">সাম্প্রতিক লেনদেন (Transactions)</h3>
          </div>
          <button
            onClick={() => onNavigateTab('history')}
            className="text-xs text-[#D6B15C] hover:text-[#e2c172] font-semibold"
          >
            সব দেখুন
          </button>
        </div>

        <div className="divide-y divide-[#1e355b]/60 mt-2">
          {transactions.slice(0, 4).map((t) => {
            const isDeposit = t.description.toLowerCase().includes('deposit');
            return (
              <div key={t.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isDeposit ? 'bg-[#43B581]/15 text-[#43B581]' : 'bg-[#E46B70]/15 text-[#E46B70]'
                  }`}>
                    {isDeposit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-white">{t.description}</div>
                    <div className="text-[10px] text-[#9EACC1] font-mono">
                      {t.method} · {t.date || 'Today'} · {t.id}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-mono font-bold text-sm ${isDeposit ? 'text-[#43B581]' : 'text-[#D6B15C]'}`}>
                    {isDeposit ? '+' : '-'}{t.amount}
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${
                    t.status === 'Completed' || t.status === 'Approved' ? 'text-[#43B581]' : t.status === 'Pending' ? 'text-[#D6B15C]' : 'text-[#E46B70]'
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
