import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  AlertCircle, 
  Wallet,
  ShieldCheck
} from 'lucide-react';
import { AdminItem, MerchantNumbers } from '../../types';

interface UserWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  userName: string;
  userPhone: string;
  merchantNumbers: MerchantNumbers;
  onWithdrawSubmitted: (newWithdraw: AdminItem) => void;
}

export const UserWithdrawModal: React.FC<UserWithdrawModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
  userName,
  userPhone,
  merchantNumbers,
  onWithdrawSubmitted,
}) => {
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [amount, setAmount] = useState<number>(1000);
  const [accountNumber, setAccountNumber] = useState(userPhone);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > walletBalance) {
      setError(`আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই। বর্তমান ব্যালেন্স ৳${walletBalance.toLocaleString()}`);
      return;
    }
    if (amount < merchantNumbers.minWithdraw) {
      setError(`সর্বনিম্ন উত্তোলন ৳${merchantNumbers.minWithdraw.toLocaleString()}`);
      return;
    }

    const newWithdraw: AdminItem = {
      id: `W${Math.floor(100 + Math.random() * 900)}`,
      name: userName,
      description: `${method} Withdrawal Payout`,
      amount: `৳${amount.toLocaleString()}`,
      rawAmount: amount,
      method,
      status: 'Pending',
      accountNumber,
      phone: accountNumber,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
    };

    onWithdrawSubmitted(newWithdraw);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E46B70]/20 border border-[#E46B70]/40 flex items-center justify-center text-[#E46B70]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">টাকা উত্তোলন করুন (Withdraw Funds)</h3>
              <p className="text-[11px] text-[#9EACC1]">বিকাশ বা নগদে সরাসরি ক্যাশ-আউট</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#9EACC1] hover:text-white p-1 rounded-lg">
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#43B581]/20 border border-[#43B581] flex items-center justify-center text-[#43B581] mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">উত্তোলন রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!</h4>
            <p className="text-xs text-[#9EACC1]">
              অ্যাডমিন অনুমোদনের পর আপনার {method} একাউন্টে ৳{amount.toLocaleString()} পাঠিয়ে দেওয়া হবে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            {/* Balance Notice */}
            <div className="p-3 bg-[#081426] border border-[#1e355b] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#9EACC1]">
                <Wallet className="w-4 h-4 text-[#D6B15C]" />
                <span>বর্তমান ওয়ালেট ব্যালেন্স:</span>
              </div>
              <span className="font-mono text-sm font-bold text-[#D6B15C] tabular-nums">
                ৳{walletBalance.toLocaleString()}
              </span>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-[#E46B70]/15 border border-[#E46B70]/40 text-[#E46B70] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Method selection */}
            <div>
              <label className="text-[#9EACC1] block mb-1.5 font-semibold">পেমেন্ট মাধ্যম বেছে নিন</label>
              <div className="grid grid-cols-3 gap-2">
                {(['bKash', 'Nagad', 'Rocket'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                      method === m
                        ? 'bg-[#12233D] text-[#D6B15C] border-[#D6B15C] shadow-sm'
                        : 'bg-[#081426] text-[#9EACC1] border-[#1e355b] hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Account Number */}
            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">
                আপনার {method} একাউন্ট নাম্বার (Personal Number)
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono p-2.5 rounded-xl outline-none"
              />
            </div>

            {/* Amount input */}
            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">উত্তোলনের পরিমাণ (৳ BDT)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#D6B15C]">
                  ৳
                </span>
                <input
                  type="number"
                  min={merchantNumbers.minWithdraw}
                  max={walletBalance}
                  step="500"
                  required
                  value={amount}
                  onChange={(e) => {
                    setError(null);
                    setAmount(Number(e.target.value));
                  }}
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono text-base font-bold pl-8 pr-3 py-2.5 rounded-xl outline-none"
                />
              </div>
            </div>

            {/* Fee summary */}
            <div className="p-3 bg-[#081426] border border-[#1e355b] rounded-xl space-y-1.5 text-[11px] text-[#9EACC1]">
              <div className="flex justify-between">
                <span>উত্তোলন ফি (Platform Fee):</span>
                <span className="text-[#43B581] font-bold">০% (ফ্রি)</span>
              </div>
              <div className="flex justify-between">
                <span>মোট প্রাপ্ত অর্থ:</span>
                <span className="font-bold text-white font-mono">৳{amount.toLocaleString()}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1e355b] rounded-xl hover:bg-[#284675]"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shadow-sm"
              >
                উত্তোলন সাবমিট করুন
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
