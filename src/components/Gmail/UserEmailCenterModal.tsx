import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  AlertCircle, 
  HelpCircle,
  FileText,
  User,
  ShieldCheck
} from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { SendEmailConfirmationModal } from './SendEmailConfirmationModal';
import { 
  googleSignIn, 
  getAccessToken, 
  sendGmailMessage, 
  GmailSendParams 
} from '../../services/gmailAuth';
import { UserAccount } from '../../types';

interface UserEmailCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  onToast: (msg: string) => void;
}

export const UserEmailCenterModal: React.FC<UserEmailCenterModalProps> = ({
  isOpen,
  onClose,
  user,
  onToast,
}) => {
  const [googleUser, setGoogleUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Email form
  const [subject, setSubject] = useState(`MH BD INVEST সহায়তা প্রয়োজন - ${user.name}`);
  const [category, setCategory] = useState<'deposit' | 'withdrawal' | 'kyc' | 'general'>('deposit');
  const [message, setMessage] = useState('');
  
  // Confirmation Modal
  const [confirmParams, setConfirmParams] = useState<GmailSendParams | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setAccessToken(res.accessToken);
        onToast(`Google-এ সাইন-ইন সফল: ${res.user.email}`);
      }
    } catch (err: any) {
      console.error(err);
      onToast(`গুগল সাইন-ইন ত্রুটি: ${err.message || 'ব্যর্থ হয়েছে'}`);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleCategoryChange = (cat: 'deposit' | 'withdrawal' | 'kyc' | 'general') => {
    setCategory(cat);
    if (cat === 'deposit') {
      setSubject(`ডিপোজিট যাচাই সহায়তা - ${user.name} (${user.phone})`);
      setMessage(`আসসালামু আলাইকুম,\n\nআমি বিকাশ/নগদে ডিপোজিট করেছি। আমার প্রেরক নম্বর ও TrxID যাচাই করার জন্য অনুরোধ করছি।\n\nনাম: ${user.name}\nমোবাইল: ${user.phone}\nধন্যবাদ।`);
    } else if (cat === 'withdrawal') {
      setSubject(`উইথড্রয়াল প্রসেসিং সহায়তা - ${user.name}`);
      setMessage(`আসসালামু আলাইকুম,\n\nআমার উইথড্রয়াল রিকোয়েস্টের বিষয়ে জানতে চাচ্ছি।\n\nনাম: ${user.name}\nমোবাইল: ${user.phone}`);
    } else if (cat === 'kyc') {
      setSubject(`কেওয়াইসি ভেরিফিকেশন আবেদন - ${user.name}`);
      setMessage(`আসসালামু আলাইকুম,\n\nআমার জাতীয় পরিচয়পত্র যাচাইয়ের বিষয়ে সহযোগিতা কামনা করছি।\n\nএনআইডি: ${user.nidNumber || 'জমাকৃত'}`);
    } else {
      setSubject(`সাধারণ জিজ্ঞাসা - ${user.name}`);
      setMessage('');
    }
  };

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      onToast('অনুগ্রহ করে বার্তার বিবরণ লিখুন');
      return;
    }

    setConfirmParams({
      to: 'mhbdinvestsupport@gmail.com',
      subject,
      body: message,
    });
  };

  const handleConfirmSend = async () => {
    if (!confirmParams || !accessToken) return;
    setIsSending(true);
    try {
      await sendGmailMessage(accessToken, confirmParams);
      onToast('✓ জিমেইল সফলভাবে mhbdinvestsupport@gmail.com-এ পাঠানো হয়েছে!');
      setIsSentSuccess(true);
      setConfirmParams(null);
      setTimeout(() => {
        setIsSentSuccess(false);
        onClose();
      }, 2500);
    } catch (err: any) {
      console.error(err);
      onToast(`ইমেইল পাঠাতে ত্রুটি: ${err.message || 'ব্যর্থ হয়েছে'}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D6B15C]/20 border border-[#D6B15C]/40 flex items-center justify-center text-[#D6B15C]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">অফিসিয়াল জিমেইল সাপোর্ট (Send Gmail)</h3>
              <p className="text-[11px] text-[#9EACC1]">সরাসরি mhbdinvestsupport@gmail.com-এ ইমেইল করুন</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#9EACC1] hover:text-white p-1 rounded-lg">
            ✕
          </button>
        </div>

        {isSentSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#43B581]/20 border border-[#43B581] flex items-center justify-center text-[#43B581] mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">ইমেইল সফলভাবে পাঠানো হয়েছে!</h4>
            <p className="text-xs text-[#9EACC1]">
              MH BD INVEST সাপোর্ট টিম আপনার ইমেইল পর্যালোচনা করে দ্রুত উত্তর প্রদান করবে।
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4 text-xs">
            {/* Google Authentication Box */}
            <div className="p-3.5 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-[10px] text-blue-600 shrink-0">
                  G
                </div>
                <div>
                  <div className="text-white font-semibold">
                    {googleUser ? googleUser.email : 'Google Account (Gmail)'}
                  </div>
                  <div className="text-[10px] text-[#9EACC1]">
                    {googleUser ? 'সংযুক্ত (Connected)' : 'ইমেইল পাঠাতে গুগল সাইন-ইন প্রয়োজন'}
                  </div>
                </div>
              </div>

              {!accessToken ? (
                <GoogleSignInButton
                  onClick={handleSignIn}
                  isLoading={isLoadingAuth}
                  label="Sign in"
                />
              ) : (
                <span className="text-[10px] font-bold text-[#43B581] bg-[#43B581]/15 px-2 py-0.5 rounded">
                  ✓ Connected
                </span>
              )}
            </div>

            {/* Category selection */}
            <div>
              <label className="text-[#9EACC1] block mb-1.5 font-semibold">বিষয় বা ক্যাটাগরি</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'deposit', label: 'ডিপোজিট' },
                  { id: 'withdrawal', label: 'উত্তোলন' },
                  { id: 'kyc', label: 'কেওয়াইসি' },
                  { id: 'general', label: 'অন্যান্য' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCategoryChange(item.id as any)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      category === item.id
                        ? 'bg-[#12233D] text-[#D6B15C] border-[#D6B15C]/40 shadow-sm'
                        : 'bg-[#081426] text-[#9EACC1] border-[#1e355b] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email form */}
            <form onSubmit={handleOpenConfirm} className="space-y-3">
              <div>
                <label className="text-[#9EACC1] block mb-1 font-semibold">বিষয় (Subject)</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-[#9EACC1] block mb-1 font-semibold">আপনার বার্তা (Message Body)</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনার সমস্যা বা প্রশ্নের বিস্তারিত লিখুন..."
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none leading-relaxed"
                />
              </div>

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
                  disabled={!accessToken}
                  className="px-5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ইমেইল পাঠান</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <SendEmailConfirmationModal
        isOpen={Boolean(confirmParams)}
        params={confirmParams}
        senderEmail={googleUser?.email || user.email}
        onConfirm={handleConfirmSend}
        onCancel={() => setConfirmParams(null)}
        isSending={isSending}
      />
    </div>
  );
};
