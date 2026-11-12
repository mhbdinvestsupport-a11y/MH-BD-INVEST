import React, { useState } from 'react';
import { 
  Clock, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { AdminItem } from '../../types';

interface UserHistoryProps {
  transactions: AdminItem[];
}

export const UserHistory: React.FC<UserHistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'All' | 'Deposit' | 'Withdrawal'>('All');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((t) => {
    const isDeposit = t.description.toLowerCase().includes('deposit');
    const isWithdrawal = t.description.toLowerCase().includes('withdraw');
    const matchesType =
      filter === 'All' ? true : filter === 'Deposit' ? isDeposit : isWithdrawal;
    const matchesSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      (t.trxId && t.trxId.toLowerCase().includes(search.toLowerCase())) ||
      (t.amount && t.amount.toLowerCase().includes(search.toLowerCase())) ||
      (t.method && t.method.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#D6B15C] tracking-tight flex items-center gap-2">
          <Clock className="w-6 h-6 text-[#D6B15C]" />
          লেনদেনের ইতিহাস (Transaction History)
        </h2>
        <p className="text-xs text-[#9EACC1] mt-0.5">
          আপনার ওয়ালেটের সকল ডিপোজিট, ইনভেস্টমেন্ট ও ক্যাশ-আউট রেকর্ড
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="p-4 bg-[#12233D] border border-[#1e355b] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#9EACC1] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by TrxID, amount..."
            className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white text-xs rounded-xl pl-9 pr-3.5 py-2 outline-none"
          />
        </div>

        <div className="flex gap-1 p-1 bg-[#081426] border border-[#1e355b] rounded-xl w-full sm:w-auto">
          {(['All', 'Deposit', 'Withdrawal'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === type
                  ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                  : 'text-[#9EACC1] hover:text-white'
              }`}
            >
              {type === 'All' ? 'সকল লেনদেন' : type === 'Deposit' ? 'ডিপোজিট' : 'উত্তোলন'}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions list */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm divide-y divide-[#1e355b]/60">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#9EACC1]">
            কোনো লেনদেন পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map((t) => {
            const isDeposit = t.description.toLowerCase().includes('deposit');
            const isApproved = t.status === 'Completed' || t.status === 'Approved';
            const isPending = t.status === 'Pending';
            const isRejected = t.status === 'Rejected';

            return (
              <div key={t.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isDeposit ? 'bg-[#43B581]/15 text-[#43B581]' : 'bg-[#E46B70]/15 text-[#E46B70]'
                  }`}>
                    {isDeposit ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{t.description}</h4>
                      <span className="text-[10px] font-mono text-[#D6B15C] bg-[#D6B15C]/10 px-1.5 py-0.5 rounded">
                        {t.method}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-[#9EACC1] font-mono">
                      <span>আইডি: {t.id}</span>
                      {t.trxId && (
                        <>
                          <span>·</span>
                          <span>TrxID: <strong className="text-white">{t.trxId}</strong></span>
                        </>
                      )}
                      {t.accountNumber && (
                        <>
                          <span>·</span>
                          <span>নাম্বার: {t.accountNumber}</span>
                        </>
                      )}
                      <span>·</span>
                      <span>তারিখ: {t.date || 'Today'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1e355b]/60">
                  <div className={`font-mono text-base font-extrabold ${isDeposit ? 'text-[#43B581]' : 'text-[#D6B15C]'}`}>
                    {isDeposit ? '+' : '-'}{t.amount}
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded mt-0.5 ${
                    isApproved ? 'bg-[#43B581]/15 text-[#43B581]' : isPending ? 'bg-[#D6B15C]/15 text-[#D6B15C]' : 'bg-[#E46B70]/15 text-[#E46B70]'
                  }`}>
                    {isApproved ? 'সফল (Approved)' : isPending ? 'অপেক্ষমাণ (Pending)' : 'প্রত্যাখ্যাত (Rejected)'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
