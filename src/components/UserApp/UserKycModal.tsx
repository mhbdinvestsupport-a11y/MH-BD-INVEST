import React, { useState } from 'react';
import { 
  FileCheck2, 
  Upload, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { AdminItem } from '../../types';

interface UserKycModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userPhone: string;
  currentKycStatus: 'Unverified' | 'Pending' | 'Approved' | 'Rejected';
  onKycSubmitted: (newKyc: AdminItem) => void;
}

export const UserKycModal: React.FC<UserKycModalProps> = ({
  isOpen,
  onClose,
  userName,
  userPhone,
  currentKycStatus,
  onKycSubmitted,
}) => {
  const [nidNumber, setNidNumber] = useState('1992269548000142');
  const [docType, setDocType] = useState<'National ID' | 'Passport' | 'Driving License'>('National ID');
  const [fatherName, setFatherName] = useState('Abdul Jabbar');
  const [dob, setDob] = useState('1992-05-14');
  const [address, setAddress] = useState('Motijheel Commercial Area, Dhaka-1000');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newKyc: AdminItem = {
      id: `K${Math.floor(100 + Math.random() * 900)}`,
      name: userName,
      description: `${docType} Verification (${nidNumber})`,
      status: 'Pending',
      nidNumber,
      documentType: docType,
      phone: userPhone,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
    };
    onKycSubmitted(newKyc);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#43B581]/20 border border-[#43B581]/40 flex items-center justify-center text-[#43B581]">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">KYC পরিচয় যাচাই (Identity Verification)</h3>
              <p className="text-[11px] text-[#9EACC1]">বাংলাদেশ সরকারের স্মার্ট জাতীয় পরিচয়পত্র / পাসপোর্ট</p>
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
            <h4 className="text-base font-bold text-white">কেওয়াইসি তথ্য সফলভাবে জমা হয়েছে!</h4>
            <p className="text-xs text-[#9EACC1]">
              অ্যাডমিন টিম আপনার জাতীয় পরিচয়পত্র যাচাই করে একাউন্ট ভেরিফাইড স্ট্যাটাস প্রদান করবেন।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-between">
              <span className="text-[#9EACC1]">বর্তমান ভেরিফিকেশন স্ট্যাটাস:</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                currentKycStatus === 'Approved' ? 'bg-[#43B581]/15 text-[#43B581]' : 'bg-[#D6B15C]/15 text-[#D6B15C]'
              }`}>
                {currentKycStatus === 'Approved' ? 'ভেরিফাইড (VERIFIED)' : 'পেন্ডিং / আন-ভেরিফাইড'}
              </span>
            </div>

            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">ডকুমেন্টের ধরন</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl outline-none"
              >
                <option value="National ID">স্মার্ট জাতীয় পরিচয়পত্র (Smart NID)</option>
                <option value="Passport">বাংলাদেশি পাসপোর্ট (Passport)</option>
                <option value="Driving License">ড্রাইভিং লাইসেন্স (Driving License)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[#9EACC1] block mb-1 font-semibold">এনআইডি / পাসপোর্ট নাম্বার</label>
                <input
                  type="text"
                  required
                  value={nidNumber}
                  onChange={(e) => setNidNumber(e.target.value)}
                  className="w-full bg-[#081426] border border-[#1e355b] text-white font-mono p-2.5 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-[#9EACC1] block mb-1 font-semibold">জন্ম তারিখ (DOB)</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">পিতার নাম (Father's Name)</label>
              <input
                type="text"
                required
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">বর্তমান ঠিকানা</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl outline-none"
              />
            </div>

            {/* Document Photo Upload Simulation */}
            <div>
              <label className="text-[#9EACC1] block mb-1 font-semibold">এনআইডি কার্ডের ছবি (Front & Back)</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-dashed border-[#1e355b] hover:border-[#D6B15C] rounded-xl p-3 text-center bg-[#081426] cursor-pointer">
                  <Upload className="w-5 h-5 text-[#D6B15C] mx-auto mb-1" />
                  <span className="text-[10px] text-white block font-medium">সামনের অংশ (Front)</span>
                  <span className="text-[9px] text-[#43B581]">nid_front.jpg (সংযুক্ত)</span>
                </div>
                <div className="border border-dashed border-[#1e355b] hover:border-[#D6B15C] rounded-xl p-3 text-center bg-[#081426] cursor-pointer">
                  <Upload className="w-5 h-5 text-[#D6B15C] mx-auto mb-1" />
                  <span className="text-[10px] text-white block font-medium">পেছনের অংশ (Back)</span>
                  <span className="text-[9px] text-[#43B581]">nid_back.jpg (সংযুক্ত)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1e355b] flex justify-end gap-2.5">
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
                কেওয়াইসি সাবমিট করুন
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
