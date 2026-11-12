import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Inbox, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  User, 
  ShieldCheck, 
  LogOut, 
  ExternalLink,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { SendEmailConfirmationModal } from './SendEmailConfirmationModal';
import { 
  googleSignIn, 
  googleSignOut, 
  getAccessToken, 
  sendGmailMessage, 
  fetchGmailMessages, 
  GmailSendParams, 
  GmailMessageSummary 
} from '../../services/gmailAuth';
import { AdminItem } from '../../types';

interface AdminGmailCenterProps {
  users: AdminItem[];
  onLogAudit: (action: string, details?: string) => void;
  onToast: (msg: string) => void;
}

export const AdminGmailCenter: React.FC<AdminGmailCenterProps> = ({
  users,
  onLogAudit,
  onToast,
}) => {
  const [googleUser, setGoogleUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<'compose' | 'inbox'>('compose');

  // Compose State
  const [recipient, setRecipient] = useState(users[0]?.email || 'rahim.mia@example.com');
  const [subject, setSubject] = useState('MH BD INVEST — আপনার ডিপোজিট সফলভাবে অনুমোদিত হয়েছে');
  const [emailBody, setEmailBody] = useState(
    `প্রিয় গ্রাহক,\n\nMH BD INVEST প্ল্যাটফর্মে আপনার সাম্প্রতিক ডিপোজিট রিকোয়েস্ট সফলভাবে যাচাই ও অনুমোদন করা হয়েছে। উক্ত অর্থ আপনার ওয়ালেট ব্যালেন্সে যুক্ত করা হয়েছে।\n\nআপনি এখন যেকোনো লাভজনক ১০-দিনের ইনভেস্টমেন্ট প্ল্যানে বিনিয়োগ করতে পারেন।\n\nধন্যবাদ,\nMH BD INVEST অ্যাডমিন টিম\nsupport: mhbdinvestsupport@gmail.com`
  );

  // Template selector
  const [selectedTemplate, setSelectedTemplate] = useState<'deposit' | 'withdrawal' | 'kyc' | 'custom'>('deposit');

  // Confirmation modal state
  const [confirmParams, setConfirmParams] = useState<GmailSendParams | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Inbox State
  const [inboxMessages, setInboxMessages] = useState<GmailMessageSummary[]>([]);
  const [isLoadingInbox, setIsLoadingInbox] = useState(false);
  const [inboxError, setInboxError] = useState<string | null>(null);

  // Check initial token
  useEffect(() => {
    getAccessToken().then((token) => {
      if (token) setAccessToken(token);
    });
  }, []);

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setAccessToken(res.accessToken);
        onToast(`Google-এ সফলভাবে সাইন-ইন করা হয়েছে: ${res.user.email}`);
        onLogAudit('Gmail OAuth Sign-in', `Account: ${res.user.email}`);
      }
    } catch (err: any) {
      console.error(err);
      onToast(`গুগল সাইন-ইন ত্রুটি: ${err.message || 'ব্যর্থ হয়েছে'}`);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setGoogleUser(null);
    setAccessToken(null);
    setInboxMessages([]);
    onToast('Google অ্যাকাউন্ট লগআউট করা হয়েছে।');
  };

  const handleTemplateChange = (type: 'deposit' | 'withdrawal' | 'kyc' | 'custom') => {
    setSelectedTemplate(type);
    if (type === 'deposit') {
      setSubject('MH BD INVEST — ডিপোজিট অনুমোদন প্রাপ্তি');
      setEmailBody(
        `প্রিয় গ্রাহক,\n\nMH BD INVEST প্ল্যাটফর্মে আপনার বিকাশ/নগদ ডিপোজিট সফলভাবে অনুমোদিত হয়েছে এবং ওয়ালেটে ব্যালেন্স জমা করা হয়েছে।\n\nধন্যবাদ,\nMH BD INVEST ম্যানেজমেন্ট টিম`
      );
    } else if (type === 'withdrawal') {
      setSubject('MH BD INVEST — উত্তোলন (Cash-Out) সফল হয়েছে');
      setEmailBody(
        `প্রিয় গ্রাহক,\n\nআপনার ক্যাশ-আউট রিকোয়েস্ট অনুমোদিত হয়েছে এবং কাঙ্ক্ষিত বিকাশ/নগদ একাউন্টে অর্থ স্থানান্তর করা হয়েছে।\n\nধন্যবাদ,\nMH BD INVEST ম্যানেজমেন্ট টিম`
      );
    } else if (type === 'kyc') {
      setSubject('MH BD INVEST — জাতীয় পরিচয়পত্র ও KYC স্ট্যাটাস আপডেট');
      setEmailBody(
        `প্রিয় গ্রাহক,\n\nআপনার জমা দেওয়া স্মার্ট জাতীয় পরিচয়পত্র যাচাই সম্পন্ন হয়েছে এবং আপনার অ্যাকাউন্ট এখন ভেরিফাইড।\n\nধন্যবাদ,\nMH BD INVEST কমপ্লায়েন্স বিভাগ`
      );
    } else {
      setSubject('MH BD INVEST — জরুরি বিজ্ঞপ্তি');
      setEmailBody('');
    }
  };

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !subject || !emailBody) {
      onToast('সবগুলো ফিল্ড সঠিকভাবে পূরণ করুন');
      return;
    }
    setConfirmParams({
      to: recipient,
      subject,
      body: emailBody,
    });
  };

  const handleConfirmSend = async () => {
    if (!confirmParams || !accessToken) return;
    setIsSending(true);
    try {
      await sendGmailMessage(accessToken, confirmParams);
      onToast(`✓ জিমেইল সফলভাবে পাঠানো হয়েছে: ${confirmParams.to}`);
      onLogAudit(`Gmail Sent to ${confirmParams.to}`, `Subject: ${confirmParams.subject}`);
      setConfirmParams(null);
    } catch (err: any) {
      console.error('Send error:', err);
      onToast(`ইমেইল পাঠাতে ব্যর্থ: ${err.message || 'Authentication error'}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleLoadInbox = async () => {
    if (!accessToken) return;
    setIsLoadingInbox(true);
    setInboxError(null);
    try {
      const messages = await fetchGmailMessages(accessToken, 8);
      setInboxMessages(messages);
      onToast('জিমেইল ইনবক্স সফলভাবে লোড হয়েছে');
    } catch (err: any) {
      setInboxError(err.message || 'Failed to load inbox');
    } finally {
      setIsLoadingInbox(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title & Account Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D6B15C]/15 border border-[#D6B15C]/30 text-xs text-[#D6B15C] font-semibold mb-1">
            <Mail className="w-3.5 h-3.5" />
            <span>অফিসিয়াল জিমেইল ইন্টিগ্রেশন (Official Gmail Integration)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            জিমেইল নোটিফিকেশন ও কমিউনিকেশন সেন্টার (Gmail Center)
          </h2>
          <p className="text-xs text-[#9EACC1] mt-0.5">
            সরাসরি জিমেইল এপিআই-এর মাধ্যমে গ্রাহকদের ডিপোজিট, উইথড্র ও নোটিশ ইমেইল পাঠান
          </p>
        </div>

        {/* Google Auth Status Widget */}
        <div className="shrink-0">
          {accessToken ? (
            <div className="flex items-center gap-3 bg-[#081426] border border-[#43B581]/40 rounded-xl px-4 py-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#43B581]/20 flex items-center justify-center text-[#43B581] font-bold text-xs">
                G
              </div>
              <div className="text-xs">
                <div className="font-bold text-white flex items-center gap-1">
                  <span>{googleUser?.displayName || 'Gmail Connected'}</span>
                  <span className="w-2 h-2 rounded-full bg-[#43B581]" />
                </div>
                <div className="text-[11px] text-[#9EACC1] font-mono">
                  {googleUser?.email || 'mhbdinvestsupport@gmail.com'}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-2 text-[#9EACC1] hover:text-[#E46B70] text-xs font-semibold p-1"
                title="Disconnect Gmail"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <GoogleSignInButton
              onClick={handleSignIn}
              isLoading={isLoadingAuth}
              label="Connect Admin Gmail"
            />
          )}
        </div>
      </div>

      {/* Auth Prompt if not logged into Google */}
      {!accessToken && (
        <div className="p-5 rounded-2xl bg-[#081426] border border-[#D6B15C]/40 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D6B15C]/20 border border-[#D6B15C]/30 flex items-center justify-center text-[#D6B15C] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">জিমেইল এপিআই সংযোগ প্রয়োজন</h4>
              <p className="text-[#9EACC1] mt-0.5">
                অ্যাডমিন অ্যাকাউন্ট থেকে আসল ইমেইল পাঠাতে ও ইনবক্স দেখতে উপরের <strong>Connect Admin Gmail</strong> বাটনে ক্লিক করুন।
              </p>
            </div>
          </div>
          <GoogleSignInButton
            onClick={handleSignIn}
            isLoading={isLoadingAuth}
            label="Sign in with Google"
          />
        </div>
      )}

      {/* Tab Switcher: Compose vs Inbox */}
      <div className="flex border-b border-[#1e355b] gap-2">
        <button
          onClick={() => setActiveTab('compose')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 -mb-[1px] ${
            activeTab === 'compose'
              ? 'text-[#D6B15C] border-[#D6B15C]'
              : 'text-[#9EACC1] border-transparent hover:text-white'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>ইমেইল পাঠান (Compose & Send)</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('inbox');
            if (inboxMessages.length === 0 && accessToken) {
              handleLoadInbox();
            }
          }}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 -mb-[1px] ${
            activeTab === 'inbox'
              ? 'text-[#D6B15C] border-[#D6B15C]'
              : 'text-[#9EACC1] border-transparent hover:text-white'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>ইনবক্স মেসেজ (Inbox Preview)</span>
        </button>
      </div>

      {/* TAB 1: COMPOSE */}
      {activeTab === 'compose' && (
        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm space-y-5">
          {/* Quick Template Buttons */}
          <div>
            <label className="text-xs font-semibold text-[#9EACC1] block mb-2">
              দ্রুত টেমপ্লেট নির্বাচন করুন (Quick Templates)
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleTemplateChange('deposit')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                  selectedTemplate === 'deposit'
                    ? 'bg-[#1e355b] text-[#D6B15C] border-[#D6B15C]/50'
                    : 'bg-[#081426] text-[#9EACC1] border-[#1e355b] hover:text-white'
                }`}
              >
                ✓ ডিপোজিট অনুমোদন
              </button>

              <button
                type="button"
                onClick={() => handleTemplateChange('withdrawal')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                  selectedTemplate === 'withdrawal'
                    ? 'bg-[#1e355b] text-[#D6B15C] border-[#D6B15C]/50'
                    : 'bg-[#081426] text-[#9EACC1] border-[#1e355b] hover:text-white'
                }`}
              >
                ✓ ক্যাশ-আউট নোটিফিকেশন
              </button>

              <button
                type="button"
                onClick={() => handleTemplateChange('kyc')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                  selectedTemplate === 'kyc'
                    ? 'bg-[#1e355b] text-[#D6B15C] border-[#D6B15C]/50'
                    : 'bg-[#081426] text-[#9EACC1] border-[#1e355b] hover:text-white'
                }`}
              >
                ✓ কেওয়াইসি ভেরিফিকেশন
              </button>

              <button
                type="button"
                onClick={() => handleTemplateChange('custom')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                  selectedTemplate === 'custom'
                    ? 'bg-[#1e355b] text-[#D6B15C] border-[#D6B15C]/50'
                    : 'bg-[#081426] text-[#9EACC1] border-[#1e355b] hover:text-white'
                }`}
              >
                কাস্টম ইমেইল
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleOpenConfirm} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#9EACC1] font-semibold block mb-1">
                  প্রাপকের ইমেইল (Recipient Email)
                </label>
                <input
                  type="email"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[#9EACC1] font-semibold block mb-1">
                  ইউজার ড্রপডাউন থেকে নির্বাচন করুন
                </label>
                <select
                  onChange={(e) => {
                    const u = users.find((item) => item.email === e.target.value);
                    if (u?.email) setRecipient(u.email);
                  }}
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none"
                >
                  <option value="">-- ইউজার বেছে নিন --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.email}>
                      {u.name} ({u.email || u.phone})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[#9EACC1] font-semibold block mb-1">
                ইমেইল সাবজেক্ট (Subject)
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-2.5 rounded-xl outline-none font-medium"
              />
            </div>

            <div>
              <label className="text-[#9EACC1] font-semibold block mb-1">
                ইমেইল বডি বার্তা (Message Content)
              </label>
              <textarea
                rows={7}
                required
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white p-3 rounded-xl outline-none leading-relaxed font-sans text-xs"
              />
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-[#1e355b]/60">
              <span className="text-[11px] text-[#9EACC1]">
                {accessToken ? '✓ Gmail API সংযুক্ত আছে' : '⚠ ইমেইল পাঠাতে Google Sign-In প্রয়োজন'}
              </span>

              <button
                type="submit"
                disabled={!accessToken}
                className="px-6 py-2.5 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ইমেইল পাঠান (Send via Gmail)</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: INBOX PREVIEW */}
      {activeTab === 'inbox' && (
        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#D6B15C]" />
                সাম্প্রতিক জিমেইল ইনবক্স
              </h3>
              <p className="text-xs text-[#9EACC1]">
                আপনার সংযুক্ত জিমেইল অ্যাকাউন্টে আসা সর্বশেষ ইমেইলসমূহ
              </p>
            </div>

            <button
              onClick={handleLoadInbox}
              disabled={isLoadingInbox || !accessToken}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#D6B15C] bg-[#081426] hover:bg-[#1e355b] border border-[#D6B15C]/30 rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingInbox ? 'animate-spin' : ''}`} />
              <span>{isLoadingInbox ? 'লোডিং...' : 'রিফ্রেশ ইনবক্স'}</span>
            </button>
          </div>

          {inboxError && (
            <div className="p-3 rounded-xl bg-[#E46B70]/15 border border-[#E46B70]/40 text-[#E46B70] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{inboxError}</span>
            </div>
          )}

          {!accessToken ? (
            <div className="py-12 text-center text-xs text-[#9EACC1]">
              ইনবক্স দেখতে অনুগ্রহ করে প্রথমে <strong>Sign in with Google</strong> সম্পন্ন করুন।
            </div>
          ) : inboxMessages.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#9EACC1]">
              {isLoadingInbox ? 'ইমেইল লোড হচ্ছে...' : 'কোনো ইমেইল পাওয়া যায়নি। "রিফ্রেশ ইনবক্স" ক্লিক করুন।'}
            </div>
          ) : (
            <div className="divide-y divide-[#1e355b]/60">
              {inboxMessages.map((msg) => (
                <div key={msg.id} className="py-3.5 flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{msg.from}</span>
                      <span className="text-[10px] text-[#9EACC1] font-mono">{msg.date}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#D6B15C]">{msg.subject}</div>
                    <p className="text-[11px] text-[#9EACC1] line-clamp-2 leading-relaxed">
                      {msg.snippet}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mandatory User Confirmation Modal before sending email */}
      <SendEmailConfirmationModal
        isOpen={Boolean(confirmParams)}
        params={confirmParams}
        senderEmail={googleUser?.email || 'mhbdinvestsupport@gmail.com'}
        onConfirm={handleConfirmSend}
        onCancel={() => setConfirmParams(null)}
        isSending={isSending}
      />
    </div>
  );
};
