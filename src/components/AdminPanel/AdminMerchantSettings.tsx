import React, { useState } from 'react';
import { 
  CreditCard, 
  Save, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Phone, 
  Lock,
  Smartphone,
  Info
} from 'lucide-react';
import { MerchantNumbers } from '../../types';

interface AdminMerchantSettingsProps {
  merchantNumbers: MerchantNumbers;
  onUpdateMerchantNumbers: (numbers: MerchantNumbers) => void;
}

export const AdminMerchantSettings: React.FC<AdminMerchantSettingsProps> = ({
  merchantNumbers,
  onUpdateMerchantNumbers,
}) => {
  const [formData, setFormData] = useState<MerchantNumbers>({ ...merchantNumbers });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMerchantNumbers(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#D6B15C]/15 border border-[#D6B15C]/30 text-xs font-mono text-[#D6B15C] mb-1">
            <Lock className="w-3 h-3" />
            <span>অ্যাডমিন গোপনীয় সেটিংস · Admin Eyes Only</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#D6B15C] tracking-tight">
            মার্চেন্ট ডিপোজিট নাম্বার কনফিগারেশন (Merchant Account Numbers)
          </h2>
          <p className="text-xs text-[#9EACC1] mt-0.5">
            এই নাম্বারগুলো শুধুমাত্র অ্যাডমিন পরিবর্তন করতে পারবেন। ইউজাররা ডিপোজিট করার সময় এই বিকাশ ও নগদ নাম্বারে টাকা পাঠাবে।
          </p>
        </div>

        {isSaved && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#43B581] bg-[#43B581]/15 px-3 py-1.5 rounded-xl border border-[#43B581]/30">
            <Check className="w-4 h-4" />
            <span>নাম্বার সফলভাবে সংরক্ষিত হয়েছে!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mobile Financial Services Gateway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* bKash Gateway Configuration */}
          <div className="bg-[#12233D] border border-[#E2136E]/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E2136E]/20 border border-[#E2136E]/40 flex items-center justify-center font-bold text-[#E2136E] text-xs">
                  bKash
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">বিকাশ পেমেন্ট গেটওয়ে (bKash)</h3>
                  <span className="text-[11px] text-[#9EACC1]">Official Recipient Account</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#43B581]/15 text-[#43B581] border border-[#43B581]/30">
                ACTIVE
              </span>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <label className="text-[#9EACC1] font-semibold block mb-1.5">
                  বিকাশ মার্চেন্ট / এজেন্ট নাম্বার (Receiver Number)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#D6B15C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.bkashMerchant}
                    onChange={(e) => setFormData({ ...formData, bkashMerchant: e.target.value })}
                    className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono text-sm font-bold pl-9 pr-3 py-2.5 rounded-xl outline-none"
                    placeholder="017XXXXXXXX"
                  />
                </div>
                <p className="text-[11px] text-[#9EACC1] mt-1">
                  ইউজাররা এই নাম্বারে ক্যাশ-আউট বা পেমেন্ট করবে
                </p>
              </div>

              <div>
                <label className="text-[#9EACC1] font-semibold block mb-1.5">
                  অ্যাকাউন্টের ধরন (Account Type)
                </label>
                <select
                  value={formData.bkashType}
                  onChange={(e) => setFormData({ ...formData, bkashType: e.target.value as any })}
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none"
                >
                  <option value="Merchant">Merchant (মার্চেন্ট পেমেন্ট - *247# বা App)</option>
                  <option value="Personal">Personal (সেন্ড মানি)</option>
                  <option value="Agent">Agent (ক্যাশ আউট)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Nagad Gateway Configuration */}
          <div className="bg-[#12233D] border border-[#F7941D]/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F7941D]/20 border border-[#F7941D]/40 flex items-center justify-center font-bold text-[#F7941D] text-xs">
                  Nagad
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">নগদ পেমেন্ট গেটওয়ে (Nagad)</h3>
                  <span className="text-[11px] text-[#9EACC1]">Official Recipient Account</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#43B581]/15 text-[#43B581] border border-[#43B581]/30">
                ACTIVE
              </span>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <label className="text-[#9EACC1] font-semibold block mb-1.5">
                  নগদ মার্চেন্ট নাম্বার (Receiver Number)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#D6B15C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.nagadMerchant}
                    onChange={(e) => setFormData({ ...formData, nagadMerchant: e.target.value })}
                    className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono text-sm font-bold pl-9 pr-3 py-2.5 rounded-xl outline-none"
                    placeholder="018XXXXXXXX"
                  />
                </div>
                <p className="text-[11px] text-[#9EACC1] mt-1">
                  ইউজাররা এই নাম্বারে নগদ ট্রানজেকশন সম্পন্ন করবে
                </p>
              </div>

              <div>
                <label className="text-[#9EACC1] font-semibold block mb-1.5">
                  অ্যাকাউন্টের ধরন (Account Type)
                </label>
                <select
                  value={formData.nagadType}
                  onChange={(e) => setFormData({ ...formData, nagadType: e.target.value as any })}
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none"
                >
                  <option value="Merchant">Merchant (মার্চেন্ট পেমেন্ট)</option>
                  <option value="Personal">Personal (সেন্ড মানি)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Limits & Notice Settings */}
        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-[#D6B15C] uppercase tracking-wider flex items-center gap-2">
            <Info className="w-4 h-4" />
            ডিপোজিট ও উইথড্রয়াল লিমিট এবং নির্দেশনা (Limits & Instructions)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#9EACC1] font-semibold block mb-1">
                সর্বনিম্ন ডিপোজিট (Min Deposit ৳)
              </label>
              <input
                type="number"
                min="100"
                step="100"
                value={formData.minDeposit}
                onChange={(e) => setFormData({ ...formData, minDeposit: Number(e.target.value) })}
                className="w-full bg-[#081426] border border-[#1e355b] text-white font-mono p-2.5 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="text-[#9EACC1] font-semibold block mb-1">
                সর্বনিম্ন উত্তোলন (Min Withdrawal ৳)
              </label>
              <input
                type="number"
                min="100"
                step="100"
                value={formData.minWithdraw}
                onChange={(e) => setFormData({ ...formData, minWithdraw: Number(e.target.value) })}
                className="w-full bg-[#081426] border border-[#1e355b] text-white font-mono p-2.5 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-[#9EACC1] font-semibold block mb-1">
              ইউজার ডিপোজিট পেজের নির্দেশনা বার্তা (বাংলা)
            </label>
            <textarea
              rows={2}
              value={formData.noticeBangla}
              onChange={(e) => setFormData({ ...formData, noticeBangla: e.target.value })}
              className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>সংরক্ষণ করুন (Save Merchant Numbers)</span>
          </button>
        </div>
      </form>
    </div>
  );
};
