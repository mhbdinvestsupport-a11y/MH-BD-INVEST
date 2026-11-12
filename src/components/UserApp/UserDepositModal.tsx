import React, { useState } from 'react';
import { 
  ArrowDownLeft, 
  Copy, 
  Check, 
  Info, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { MerchantNumbers, AdminItem } from '../../types';

interface UserDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantNumbers: MerchantNumbers;
  userName: string;
  userPhone: string;
  onDepositSubmitted: (newDeposit: AdminItem) => void;
}

export const UserDepositModal: React.FC<UserDepositModalProps> = ({
  isOpen,
  onClose,
  merchantNumbers,
  userName,
  userPhone,
  onDepositSubmitted,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [amount, setAmount] = useState<number>(5000);
  const [senderNumber, setSenderNumber] = useState(userPhone);
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const activeNumber = selectedMethod === 'bKash' ? merchantNumbers.bkashMerchant : merchantNumbers.nagadMerchant;
  const activeType = selectedMethod === 'bKash' ? merchantNumbers.bkashType : merchantNumbers.nagadType;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(activeNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim()) return;

    const newDeposit: AdminItem = {
      id: `D${Math.floor(100 + Math.random() * 900)}`,
      name: userName,
      description: `${selectedMethod} ${activeType} Deposit`,
      amount: `৳${amount.toLocaleString()}`,
      rawAmount: amount,
      method: selectedMethod,
      status: 'Pending',
      trxId: trxId.trim().toUpperCase(),
      accountNumber: senderNumber,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      phone: senderNumber,
    };

    onDepositSubmitted(newDeposit);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-white">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D6B15C]/20 border border-[#D6B15C]/40 flex items-center justify-center text-[#D6B15C]">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">ডিপোজিট করুন (Deposit BDT)</h3>
              <p className="text-[11px] text-[#9EACC1]">অফিসিয়াল মার্চেন্ট একাউন্টে টাকা পাঠান</p>
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
            <h4 className="text-base font-bold text-white">ডিপোজিট রিকোয়েস্ট সফলভাবে সাবমিট হয়েছে!</h4>
            <p className="text-xs text-[#9EACC1]">
              অ্যাডমিন যাচাই করার পর আপনার একাউন্টে ৳{amount.toLocaleString()} যুক্ত করা হবে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            {/* Method Selectors */}
            <div>
              <label className="text-[#9EACC1] block mb-1.5 font-semibold">পেমেন্ট মাধ্যম বেছে নিন</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('bKash')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    selectedMethod === 'bKash'
                      ? 'bg-[#E2136E]/15 border-[#E2136E] text-white shadow-sm'
                      : 'bg-[#081426] border-[#1e355b] text-[#9EACC1] hover:text-white'
                  }`}
                >
                  <span className="w-6 h-6 rounded bg-[#E2136E] text-white font-extrabold text-[10px] flex items-center justify-center">
                    bK
                  </span>
                  <div className="text-left">
                    <div className="font-bold">bKash</div>
                    <div className="text-[10px] text-[#9EACC1]">মার্চেন্ট পেমেন্ট</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('Nagad')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    selectedMethod === 'Nagad'
                      ? 'bg-[#F7941D]/15 border-[#F7941D] text-white shadow-sm'
                      : 'bg-[#081426] border-[#1e355b] text-[#9EACC1] hover:text-white'
                  }`}
                >
                  <span className="w-6 h-6 rounded bg-[#F7941D] text-white font-extrabold text-[10px] flex items-center justify-center">
                    নগদ
                  </span>
                  <div className="text-left">
                    <div className="font-bold">Nagad</div>
                    <div className="text-[10px] text-[#9EACC1]">মার্চেন্ট পেমেন্ট</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Official Receiver Number Box (Configured by Admin) */}
            <div className="p-3.5 rounded-xl bg-[#081426] border border-[#D6B15C]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#D6B15C]">
                  অফিসিয়াল {selectedMethod} {activeType} নাম্বার:
                </span>
                <span className="text-[10px] font-mono bg-[#D6B15C]/20 text-[#D6B15C] px-2 py-0.5 rounded">
                  {activeType}
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#12233D] border border-[#1e355b] rounded-lg px-3 py-2">
                <span className="font-mono text-base font-bold text-white tracking-wider">
                  {activeNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#D6B15C] hover:text-[#e2c172] bg-[#081426] px-2.5 py-1 rounded border border-[#D6B15C]/30 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-[#43B581]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>

              <p className="text-[10px] text-[#9EACC1] leading-relaxed">
                {merchantNumbers.noticeBangla}
              </p>
            </div>

            {/* Amount input */}
            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">ডিপোজিট পরিমাণ (৳ BDT)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#D6B15C]">
                  ৳
                </span>
                <input
                  type="number"
                  min={merchantNumbers.minDeposit}
                  step="500"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono text-base font-bold pl-8 pr-3 py-2.5 rounded-xl outline-none"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[5000, 10000, 20000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className="flex-1 py-1 text-[11px] font-mono text-[#9EACC1] hover:text-[#D6B15C] bg-[#081426] border border-[#1e355b] rounded-lg"
                  >
                    ৳{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Sender Phone Number */}
            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">
                আপনার যে নাম্বার থেকে টাকা পাঠিয়েছেন (Sender Mobile)
              </label>
              <input
                type="text"
                required
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono p-2.5 rounded-xl outline-none"
              />
            </div>

            {/* Transaction ID */}
            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">
                ট্রানজেকশন আইডি (TrxID)
              </label>
              <input
                type="text"
                required
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="যেমন: 9B7X2K4A9"
                className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono uppercase tracking-wider p-2.5 rounded-xl outline-none"
              />
            </div>

            {/* Submit CTA */}
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
                ডিপোজিট সাবমিট করুন
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
