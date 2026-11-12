import React from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { UserActivePlan } from '../../types';

interface UserProfitStatementProps {
  totalProfit: number;
  totalInvested: number;
  activePlans: UserActivePlan[];
}

export const UserProfitStatement: React.FC<UserProfitStatementProps> = ({
  totalProfit,
  totalInvested,
  activePlans,
}) => {
  const dailyTotal = activePlans.reduce((sum, p) => sum + p.dailyProfit, 0);

  // Simulated daily credit history
  const ledgerEntries = [
    { date: '2026-11-12 (আজ)', plan: '৳১০,০০০ প্ল্যান', amount: '+৳৩০০', status: 'জমা হয়েছে (Credited)', time: '12:00 AM' },
    { date: '2026-11-11 (গতকাল)', plan: '৳১০,০০০ প্ল্যান', amount: '+৳৩০০', status: 'জমা হয়েছে (Credited)', time: '12:00 AM' },
    { date: '2026-11-10', plan: '৳১০,০০০ প্ল্যান', amount: '+৳৩০০', status: 'জমা হয়েছে (Credited)', time: '12:00 AM' },
    { date: '2026-11-09', plan: '৳১০,০০০ প্ল্যান', amount: '+৳৩০০', status: 'জমা হয়েছে (Credited)', time: '12:00 AM' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#D6B15C] tracking-tight flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#D6B15C]" />
          প্রফিট স্টেটমেন্ট (Profit Statement & Yield)
        </h2>
        <p className="text-xs text-[#9EACC1] mt-0.5">
          কাল্পনিক মুনাফার হিসাব ও প্রতিদিনের ওয়ালেট রিটার্ন রেকর্ড
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider block">
            সর্বমোট অর্জিত মুনাফা
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#43B581] font-mono mt-2 tabular-nums">
            +৳{totalProfit.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#9EACC1] mt-1 block">
            সরাসরি ওয়ালেট ব্যালেন্সে যুক্ত
          </span>
        </div>

        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider block">
            দৈনিক মোট প্রাপ্তি (Daily Yield)
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#D6B15C] font-mono mt-2 tabular-nums">
            ৳{dailyTotal.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#9EACC1] mt-1 block">
            প্রতিদিন রাত ১২:০০ টায় অটো-ক্রেডিট
          </span>
        </div>

        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider block">
            মোট সক্রিয় বিনিয়োগকৃত মূলধন
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2 tabular-nums">
            ৳{totalInvested.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#9EACC1] mt-1 block">
            ১০ দিনের মেয়াদের অধীনে
          </span>
        </div>
      </div>

      {/* Daily Profit Ledger */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#1e355b]/60">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D6B15C]" />
              দৈনিক মুনাফা বিতরণ লেজার (Daily Credit Ledger)
            </h3>
            <p className="text-xs text-[#9EACC1] mt-0.5">
              প্রতিদিনের মুনাফা জমার নির্ভুল তালিকা
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#43B581] bg-[#43B581]/15 px-2 py-0.5 rounded">
            Auto-Settled
          </span>
        </div>

        <div className="divide-y divide-[#1e355b]/60 mt-2">
          {ledgerEntries.map((entry, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#43B581]/15 border border-[#43B581]/30 flex items-center justify-center text-[#43B581]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">{entry.plan}</div>
                  <div className="text-[11px] text-[#9EACC1] font-mono">
                    {entry.date} · {entry.time}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-[#43B581] font-mono text-sm">{entry.amount}</div>
                <div className="text-[10px] text-[#43B581] font-semibold">{entry.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
