import React, { useState } from 'react';
import { 
  TrendingUp, 
  Check, 
  Clock, 
  Wallet, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { OFFICIAL_INVESTMENT_TIERS } from '../../data/initialData';
import { InvestmentTier, UserActivePlan } from '../../types';

interface UserInvestSectionProps {
  walletBalance: number;
  activePlans: UserActivePlan[];
  onInvest: (tier: InvestmentTier) => boolean;
  onOpenDeposit: () => void;
}

export const UserInvestSection: React.FC<UserInvestSectionProps> = ({
  walletBalance,
  activePlans,
  onInvest,
  onOpenDeposit,
}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInvestClick = (tier: InvestmentTier) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (walletBalance < tier.investAmount) {
      setErrorMessage(
        `পর্যাপ্ত ওয়ালেট ব্যালেন্স নেই! প্রয়োজন ৳${tier.investAmount.toLocaleString()}, আপনার ব্যালেন্স ৳${walletBalance.toLocaleString()}। অনুগ্রহ করে ডিপোজিট করুন।`
      );
      return;
    }

    const ok = onInvest(tier);
    if (ok) {
      setSuccessMessage(
        `অভিনন্দন! আপনার ${tier.labelBangla} সফলভাবে সক্রিয় হয়েছে। দৈনিক ৳${tier.dailyProfit.toLocaleString()} করে মুনাফা যোগ হবে।`
      );
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D6B15C]/15 border border-[#D6B15C]/30 text-xs text-[#D6B15C] font-semibold mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>MH BD INVEST অফিসিয়াল প্ল্যানসমূহ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            দৈনিক মুনাফা বিনিয়োগ প্যাকেজ (10 Days Investment Plans)
          </h2>
          <p className="text-xs text-[#9EACC1] mt-0.5">
            প্রতিটি প্যাকেজের মেয়াদ ১০ দিন। প্রতিদিন সরাসরি ওয়ালেটে মুনাফা জমা হয়।
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#081426] border border-[#1e355b] px-3.5 py-2 rounded-xl">
          <Wallet className="w-4 h-4 text-[#D6B15C]" />
          <div>
            <div className="text-[10px] text-[#9EACC1]">ওয়ালেট ব্যালেন্স</div>
            <div className="font-mono text-sm font-bold text-[#D6B15C]">৳{walletBalance.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-[#43B581]/15 border border-[#43B581]/40 text-[#43B581] text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-[#E46B70]/15 border border-[#E46B70]/40 text-[#E46B70] text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={onOpenDeposit}
            className="px-3 py-1 bg-[#D6B15C] hover:bg-[#e2c172] text-[#081426] font-bold rounded-lg shrink-0 ml-2"
          >
            + ডিপোজিট করুন
          </button>
        </div>
      )}

      {/* Official 4 Investment Tiers Grid (Requested exactly by user) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {OFFICIAL_INVESTMENT_TIERS.map((tier) => {
          const isAffordable = walletBalance >= tier.investAmount;
          return (
            <div
              key={tier.id}
              className="bg-[#12233D] hover:bg-[#172d4e]/70 border border-[#1e355b] hover:border-[#D6B15C]/40 rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between relative group"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between pb-3 border-b border-[#1e355b]/60">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {tier.labelBangla}
                    </h3>
                    <span className="text-[11px] text-[#9EACC1] font-mono">
                      মেয়াদ: {tier.durationDays} দিন
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#43B581] bg-[#43B581]/15 border border-[#43B581]/30 px-2 py-0.5 rounded-full font-bold">
                    ৩% দৈনিক
                  </span>
                </div>

                {/* Amount Details */}
                <div className="my-4 space-y-2.5">
                  <div className="bg-[#081426] p-3 rounded-xl border border-[#1e355b]">
                    <span className="text-[10px] text-[#9EACC1] block uppercase tracking-wider">বিনিয়োগ মূল্য</span>
                    <span className="text-2xl font-extrabold text-[#D6B15C] font-mono tracking-tight">
                      ৳{tier.investAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#9EACC1] px-1">
                    <div className="flex justify-between items-center">
                      <span>দৈনিক মুনাফা:</span>
                      <strong className="text-white font-mono font-bold">
                        ৳{tier.dailyProfit.toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>১০ দিনে মোট মুনাফা:</span>
                      <strong className="text-[#43B581] font-mono font-bold">
                        +৳{tier.totalProfit10Days.toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center pt-1 border-t border-[#1e355b]/60 text-xs">
                      <span className="font-semibold text-white">মোট রিটার্ন:</span>
                      <strong className="text-[#D6B15C] font-mono font-extrabold">
                        ৳{(tier.investAmount + tier.totalProfit10Days).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#1e355b]/60">
                <button
                  onClick={() => handleInvestClick(tier)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    isAffordable
                      ? 'bg-[#D6B15C] hover:bg-[#e2c172] text-[#081426]'
                      : 'bg-[#081426] hover:bg-[#1e355b] text-[#D6B15C] border border-[#D6B15C]/40'
                  }`}
                >
                  <span>{isAffordable ? 'বিনিয়োগ করুন (Invest)' : 'ডিপোজিট করে বিনিয়োগ করুন'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Investment Plans Section */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#1e355b]/60">
          <div>
            <h3 className="text-sm font-bold text-[#D6B15C] uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              আপনার বর্তমান সক্রিয় বিনিয়োগ (Active Portfolio)
            </h3>
            <p className="text-xs text-[#9EACC1] mt-0.5">
              প্রতিদিন রাত ১২:০০ টায় আপনার ওয়ালেটে স্বয়ংক্রিয়ভাবে মুনাফা যোগ হয়
            </p>
          </div>
          <span className="text-xs font-mono text-[#43B581] bg-[#43B581]/15 border border-[#43B581]/30 px-2.5 py-1 rounded-full font-bold">
            {activePlans.length} সক্রিয় প্ল্যান
          </span>
        </div>

        {activePlans.length === 0 ? (
          <div className="text-center py-10 text-xs text-[#9EACC1]">
            বর্তমানে আপনার কোনো সক্রিয় বিনিয়োগ নেই। ওপরের যেকোনো একটি প্যাকেজে বিনিয়োগ করে প্রতিদিন নিশ্চিত মুনাফা গ্রহণ করুন।
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {activePlans.map((plan) => {
              const progressPct = Math.round((plan.daysCompleted / plan.totalDays) * 100);
              const earnedSoFar = plan.dailyProfit * plan.daysCompleted;

              return (
                <div
                  key={plan.id}
                  className="p-4 rounded-xl bg-[#081426] border border-[#1e355b] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{plan.planTitle}</h4>
                        <span className="text-[10px] font-mono bg-[#43B581]/15 text-[#43B581] px-2 py-0.5 rounded">
                          রানিং (RUNNING)
                        </span>
                      </div>
                      <div className="text-[11px] text-[#9EACC1] mt-0.5">
                        মূলধন: <strong className="text-white font-mono">৳{plan.investedAmount.toLocaleString()}</strong> · শুরু: {plan.startDate}
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-xs font-bold text-[#43B581] font-mono">
                        অর্জিত মুনাফা: ৳{earnedSoFar.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#9EACC1]">
                        পরবর্তী পেআউট: {plan.nextPayout}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-[11px] text-[#9EACC1] mb-1 font-mono">
                      <span>অগ্রগতি: {plan.daysCompleted} / {plan.totalDays} দিন</span>
                      <span>{progressPct}% সম্পন্ন</span>
                    </div>
                    <div className="w-full h-2 bg-[#12233D] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D6B15C] to-[#43B581] rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
