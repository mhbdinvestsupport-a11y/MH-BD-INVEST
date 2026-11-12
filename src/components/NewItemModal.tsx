import React, { useState } from 'react';
import { Plus, User, ArrowDownLeft, ArrowUpRight, FileCheck2 } from 'lucide-react';
import { AdminItem } from '../types';

interface NewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: AdminItem) => void;
  onAddDeposit: (deposit: AdminItem) => void;
  onAddWithdrawal: (withdrawal: AdminItem) => void;
  onAddKyc: (kyc: AdminItem) => void;
}

export const NewItemModal: React.FC<NewItemModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
  onAddDeposit,
  onAddWithdrawal,
  onAddKyc,
}) => {
  const [entryType, setEntryType] = useState<'user' | 'deposit' | 'withdrawal' | 'kyc'>('deposit');
  
  // Form fields
  const [name, setName] = useState('Anisur Rahman');
  const [amount, setAmount] = useState('7500');
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [phone, setPhone] = useState('+880 1755-123456');
  const [description, setDescription] = useState('Personal investment transfer');
  const [nid, setNid] = useState('1994269871000543');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    const randomSuffix = Math.floor(100 + Math.random() * 900);

    if (entryType === 'user') {
      const newUser: AdminItem = {
        id: `U00${randomSuffix.toString().slice(0, 1)}`,
        name,
        description: description || 'Registered investor',
        status: 'Active',
        phone,
        amount: `৳${Number(amount || 0).toLocaleString()}`,
        date: timestamp,
      };
      onAddUser(newUser);
    } else if (entryType === 'deposit') {
      const newDeposit: AdminItem = {
        id: `D00${randomSuffix.toString().slice(0, 1)}`,
        name,
        description: description || 'Deposit request',
        amount: `৳${Number(amount || 0).toLocaleString()}`,
        method,
        status: 'Pending',
        trxId: `TRX${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        accountNumber: phone,
        date: timestamp,
      };
      onAddDeposit(newDeposit);
    } else if (entryType === 'withdrawal') {
      const newWithdrawal: AdminItem = {
        id: `W00${randomSuffix.toString().slice(0, 1)}`,
        name,
        description: description || 'Withdrawal request',
        amount: `৳${Number(amount || 0).toLocaleString()}`,
        method,
        status: 'Pending',
        accountNumber: phone,
        date: timestamp,
      };
      onAddWithdrawal(newWithdrawal);
    } else if (entryType === 'kyc') {
      const newKyc: AdminItem = {
        id: `K00${randomSuffix.toString().slice(0, 1)}`,
        name,
        description: 'National identity verification request',
        status: 'Pending',
        nidNumber: nid,
        phone,
        date: timestamp,
      };
      onAddKyc(newKyc);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#D6B15C]" />
              Create Demo Administrative Record
            </h3>
            <p className="text-xs text-[#9EACC1]">
              Simulate incoming requests to test MH BD INVEST approval workflows
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#9EACC1] hover:text-white p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Record Type Selector */}
        <div className="grid grid-cols-4 gap-2 mt-4 p-1 bg-[#081426] border border-[#1e355b] rounded-xl">
          <button
            type="button"
            onClick={() => setEntryType('deposit')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
              entryType === 'deposit'
                ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                : 'text-[#9EACC1] hover:text-white'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Deposit</span>
          </button>

          <button
            type="button"
            onClick={() => setEntryType('withdrawal')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
              entryType === 'withdrawal'
                ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                : 'text-[#9EACC1] hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Withdrawal</span>
          </button>

          <button
            type="button"
            onClick={() => setEntryType('kyc')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
              entryType === 'kyc'
                ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                : 'text-[#9EACC1] hover:text-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>KYC</span>
          </button>

          <button
            type="button"
            onClick={() => setEntryType('user')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
              entryType === 'user'
                ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                : 'text-[#9EACC1] hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>User</span>
          </button>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="text-[#9EACC1] block mb-1">User / Investor Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none"
            />
          </div>

          {(entryType === 'deposit' || entryType === 'withdrawal' || entryType === 'user') && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#9EACC1] block mb-1">
                  {entryType === 'user' ? 'Starting Balance (৳)' : 'Amount (৳ BDT)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6B15C] font-bold">
                    ৳
                  </span>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono pl-7 pr-3 py-2.5 rounded-xl outline-none"
                  />
                </div>
              </div>

              {entryType !== 'user' && (
                <div>
                  <label className="text-[#9EACC1] block mb-1">Payment Method</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as any)}
                    className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none"
                  >
                    <option value="bKash">bKash (MFS)</option>
                    <option value="Nagad">Nagad (Post Office)</option>
                    <option value="Rocket">Rocket (DBBL)</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {entryType === 'kyc' && (
            <div>
              <label className="text-[#9EACC1] block mb-1">National ID / Smart Card Number</label>
              <input
                type="text"
                required
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                placeholder="10 or 17 digit Bangladeshi NID"
                className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono p-2.5 rounded-xl outline-none"
              />
            </div>
          )}

          <div>
            <label className="text-[#9EACC1] block mb-1">Bangladeshi Mobile Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 17XX-XXXXXX"
              className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono p-2.5 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="text-[#9EACC1] block mb-1">Description / Notes</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none"
            />
          </div>

          <div className="pt-3 border-t border-[#1e355b] flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1e355b] hover:bg-[#284675] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shadow-sm"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
