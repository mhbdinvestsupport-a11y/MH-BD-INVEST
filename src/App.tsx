import React, { useState } from 'react';
import { 
  AppMode, 
  TabType, 
  AdminItem, 
  InvestmentPlan, 
  InvestmentTier,
  SecurityLog, 
  AuditLog, 
  MerchantNumbers, 
  UserAccount, 
  SupportMessage 
} from './types';
import { 
  INITIAL_USERS, 
  INITIAL_KYC, 
  INITIAL_DEPOSITS, 
  INITIAL_WITHDRAWALS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_SECURITY_LOGS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_PLANS, 
  INITIAL_MERCHANT_NUMBERS, 
  INITIAL_USER_ACCOUNT, 
  INITIAL_SUPPORT_MESSAGES 
} from './data/initialData';

// Component imports
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewSection } from './components/OverviewSection';
import { UserSection } from './components/UserSection';
import { ReviewSection } from './components/ReviewSection';
import { SecuritySection } from './components/SecuritySection';
import { AuditSection } from './components/AuditSection';
import { PlansSection } from './components/PlansSection';
import { AndroidEmulator } from './components/AndroidEmulator';
import { KotlinSourceModal } from './components/KotlinSourceModal';
import { NewItemModal } from './components/NewItemModal';
import { AdminMerchantSettings } from './components/AdminPanel/AdminMerchantSettings';
import { AdminGmailCenter } from './components/Gmail/AdminGmailCenter';
import { UserAppContainer } from './components/UserApp/UserAppContainer';

// Icons
import { 
  ShieldCheck, 
  Smartphone, 
  Layers, 
  CheckCircle2, 
  RotateCcw,
  User,
  Shield,
  ArrowRight
} from 'lucide-react';

export default function App() {
  // Global Mode: 'admin' | 'user'
  const [appMode, setAppMode] = useState<AppMode>('admin');

  // Admin Panel Navigation & View States
  const [adminTab, setAdminTab] = useState<TabType>('Overview');
  const [adminSearch, setAdminSearch] = useState<string>('');
  const [isMobileEmulatorView, setIsMobileEmulatorView] = useState<boolean>(false);
  const [isKotlinSourceOpen, setIsKotlinSourceOpen] = useState<boolean>(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);

  // Shared Reactive Data
  const [users, setUsers] = useState<AdminItem[]>(INITIAL_USERS);
  const [kyc, setKyc] = useState<AdminItem[]>(INITIAL_KYC);
  const [deposits, setDeposits] = useState<AdminItem[]>(INITIAL_DEPOSITS);
  const [withdrawals, setWithdrawals] = useState<AdminItem[]>(INITIAL_WITHDRAWALS);
  const [transactions, setTransactions] = useState<AdminItem[]>(INITIAL_TRANSACTIONS);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>(INITIAL_SECURITY_LOGS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [plans, setPlans] = useState<InvestmentPlan[]>(INITIAL_PLANS);
  const [merchantNumbers, setMerchantNumbers] = useState<MerchantNumbers>(INITIAL_MERCHANT_NUMBERS);
  const [userAccount, setUserAccount] = useState<UserAccount>(INITIAL_USER_ACCOUNT);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>(INITIAL_SUPPORT_MESSAGES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper for notification toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper to add audit record
  const logAudit = (action: string, details?: string, targetId?: string) => {
    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      action,
      actor: 'Super Admin',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      details,
      targetId,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // --------------------------------------------------------------------------
  // ADMIN ACTIONS: DEPOSIT & WITHDRAWAL ACCEPT / REJECT WORKFLOWS
  // --------------------------------------------------------------------------

  // Review action handler (Deposit, Withdrawal, KYC)
  const handleReviewAction = (
    category: 'kyc' | 'deposit' | 'withdrawal',
    id: string,
    newStatus: 'Approved' | 'Rejected' | 'Completed'
  ) => {
    if (category === 'deposit') {
      const dep = deposits.find((d) => d.id === id);
      if (!dep) return;

      setDeposits((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
      );

      if (newStatus === 'Approved') {
        const numericAmount = dep.rawAmount || parseInt(dep.amount?.replace(/[^\d]/g, '') || '0', 10);
        
        // Credit the User's Wallet
        setUserAccount((prev) => ({
          ...prev,
          walletBalance: prev.walletBalance + numericAmount,
        }));

        // Record in completed transactions list
        const newTxn: AdminItem = {
          id: `T${Date.now().toString().slice(-4)}`,
          name: dep.name,
          description: `${dep.method || 'MFS'} Deposit Approved`,
          amount: dep.amount,
          rawAmount: numericAmount,
          method: dep.method,
          status: 'Completed',
          trxId: dep.trxId,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
        };
        setTransactions((prev) => [newTxn, ...prev]);

        logAudit(
          `Deposit Approved: ${dep.amount} for ${dep.name}`,
          `Method: ${dep.method}, TrxID: ${dep.trxId}`,
          id
        );
        showToast(`✓ ডিপোজিট অনুমোদিত! ${dep.name}-এর ওয়ালেটে ${dep.amount} যোগ করা হয়েছে।`);
      } else {
        logAudit(`Deposit Rejected: ${dep.amount} for ${dep.name}`, `Reason: Verification failed`, id);
        showToast(`✕ ডিপোজিট প্রত্যাখ্যাত হয়েছে (${dep.id})`);
      }
    } 
    else if (category === 'withdrawal') {
      const w = withdrawals.find((item) => item.id === id);
      if (!w) return;

      setWithdrawals((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );

      if (newStatus === 'Approved') {
        const numericAmount = w.rawAmount || parseInt(w.amount?.replace(/[^\d]/g, '') || '0', 10);

        // Record transaction
        const newTxn: AdminItem = {
          id: `T${Date.now().toString().slice(-4)}`,
          name: w.name,
          description: `${w.method || 'MFS'} Cash-Out Payout`,
          amount: w.amount,
          rawAmount: numericAmount,
          method: w.method,
          status: 'Completed',
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
        };
        setTransactions((prev) => [newTxn, ...prev]);

        logAudit(
          `Withdrawal Approved: ${w.amount} to ${w.name}`,
          `Account: ${w.accountNumber || w.phone}`,
          id
        );
        showToast(`✓ ক্যাশ-আউট অনুমোদিত! ${w.amount} সফলভাবে প্রদান করা হয়েছে।`);
      } else {
        // If rejected, refund the user wallet balance if it was from current user
        const numericAmount = w.rawAmount || parseInt(w.amount?.replace(/[^\d]/g, '') || '0', 10);
        setUserAccount((prev) => ({
          ...prev,
          walletBalance: prev.walletBalance + numericAmount,
        }));

        logAudit(`Withdrawal Rejected: ${w.amount} for ${w.name}`, `Refunded to wallet`, id);
        showToast(`✕ উত্তোলন বাতিল এবং ওয়ালেটে ${w.amount} ফেরত দেওয়া হয়েছে।`);
      }
    } 
    else if (category === 'kyc') {
      const k = kyc.find((item) => item.id === id);
      if (!k) return;

      setKyc((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );

      if (newStatus === 'Approved') {
        setUserAccount((prev) => ({
          ...prev,
          kycStatus: 'Approved',
        }));
        logAudit(`KYC Approved for ${k.name}`, `NID: ${k.nidNumber || 'Verified'}`, id);
        showToast(`✓ ${k.name}-এর কেওয়াইসি ভেরিফিকেশন সফলভাবে অনুমোদিত!`);
      } else {
        setUserAccount((prev) => ({
          ...prev,
          kycStatus: 'Rejected',
        }));
        logAudit(`KYC Rejected for ${k.name}`, `Documents unverified`, id);
        showToast(`✕ ${k.name}-এর কেওয়াইসি প্রত্যাখ্যাত হয়েছে।`);
      }
    }
  };

  // Toggle user active / blocked
  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'Active' ? 'Blocked' : 'Active';
          logAudit(`User status changed: ${u.name} is now ${newStatus}`, undefined, id);
          showToast(`ইউজার ${u.name} এখন ${newStatus === 'Active' ? 'সক্রিয়' : 'ব্লকড'}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // Update Merchant Numbers (Admin Only)
  const handleUpdateMerchantNumbers = (newNumbers: MerchantNumbers) => {
    setMerchantNumbers(newNumbers);
    logAudit('Merchant Numbers Updated', `bKash: ${newNumbers.bkashMerchant}, Nagad: ${newNumbers.nagadMerchant}`);
    showToast('✓ মার্চেন্ট নাম্বার সফলভাবে আপডেট করা হয়েছে!');
  };

  // --------------------------------------------------------------------------
  // USER APP ACTIONS
  // --------------------------------------------------------------------------

  // User submits a deposit
  const handleUserDepositSubmitted = (newDeposit: AdminItem) => {
    setDeposits((prev) => [newDeposit, ...prev]);
    logAudit(`New Deposit Request: ${newDeposit.amount} via ${newDeposit.method}`, `From ${newDeposit.name}`, newDeposit.id);
    showToast(`ডিপোজিট সাবমিট হয়েছে! অ্যাডমিন প্যানেলে যাচাইয়ের অপেক্ষায় রয়েছে।`);
  };

  // User submits a withdrawal
  const handleUserWithdrawSubmitted = (newWithdraw: AdminItem) => {
    // Deduct from balance immediately in pending state
    const amt = newWithdraw.rawAmount || 0;
    setUserAccount((prev) => ({
      ...prev,
      walletBalance: Math.max(0, prev.walletBalance - amt),
    }));
    setWithdrawals((prev) => [newWithdraw, ...prev]);
    logAudit(`New Withdrawal Request: ${newWithdraw.amount} via ${newWithdraw.method}`, `To ${newWithdraw.name}`, newWithdraw.id);
    showToast(`উত্তোলন রিকোয়েস্ট সাবমিট হয়েছে! অ্যাডমিন অ্যাপ্রুভালের পর টাকা পাঠানো হবে।`);
  };

  // User submits KYC
  const handleUserKycSubmitted = (newKyc: AdminItem) => {
    setKyc((prev) => [newKyc, ...prev]);
    setUserAccount((prev) => ({
      ...prev,
      kycStatus: 'Pending',
      nidNumber: newKyc.nidNumber,
    }));
    logAudit(`New KYC Submission: ${newKyc.name}`, `NID: ${newKyc.nidNumber}`, newKyc.id);
    showToast(`কেওয়াইসি সাবমিট হয়েছে! অ্যাডমিন টিম যাচাই করবেন।`);
  };

  // User invests in an official 10-day tier
  const handleUserInvest = (tier: InvestmentTier): boolean => {
    if (userAccount.walletBalance < tier.investAmount) return false;

    // Deduct from wallet
    setUserAccount((prev) => {
      const newPlan = {
        id: `ACT-${Date.now().toString().slice(-4)}`,
        planTitle: `${tier.labelBangla} (${tier.durationDays} দিন)`,
        investedAmount: tier.investAmount,
        dailyProfit: tier.dailyProfit,
        totalProfit10Days: tier.totalProfit10Days,
        daysCompleted: 1,
        totalDays: tier.durationDays,
        startDate: '2026-11-12',
        nextPayout: 'আজ রাত ১২:০০',
      };

      return {
        ...prev,
        walletBalance: prev.walletBalance - tier.investAmount,
        totalInvested: prev.totalInvested + tier.investAmount,
        activePlans: [newPlan, ...prev.activePlans],
      };
    });

    // Record transaction
    const newTxn: AdminItem = {
      id: `T${Date.now().toString().slice(-4)}`,
      name: userAccount.name,
      description: `Investment in ${tier.labelBangla}`,
      amount: `৳${tier.investAmount.toLocaleString()}`,
      rawAmount: tier.investAmount,
      method: 'Wallet',
      status: 'Completed',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
    };
    setTransactions((prev) => [newTxn, ...prev]);

    logAudit(`User Investment: ${userAccount.name} enrolled in ${tier.labelBangla}`, `Amount: ৳${tier.investAmount.toLocaleString()}`);
    return true;
  };

  // User Live Support Chat
  const handleUserSendMessage = (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: SupportMessage = {
      id: `M-${Date.now()}`,
      sender: 'user',
      text,
      timestamp,
    };

    setSupportMessages((prev) => [...prev, userMsg]);

    // Simulated responsive support reply after 800ms
    setTimeout(() => {
      let reply = 'ধন্যবাদ। আমাদের একজন কাস্টমার রিপ্রেজেন্টেটিভ আপনার মেসেজটি দেখেছেন। শীঘ্রই বিস্তারিত জানাচ্ছি।';
      const lower = text.toLowerCase();
      if (lower.includes('ডিপোজিট') || lower.includes('deposit') || lower.includes('টাকা')) {
        reply = `ডিপোজিট করতে "ডিপোজিট" বাটনে ক্লিক করে অ্যাডমিনের অফিসিয়াল বিকাশ (${merchantNumbers.bkashMerchant}) বা নগদ (${merchantNumbers.nagadMerchant}) নাম্বারে টাকা পাঠিয়ে TrxID সাবমিট করুন। অ্যাডমিন অনুমোদনের সাথে সাথে ব্যালেন্স জমা হবে।`;
      } else if (lower.includes('উইথড্র') || lower.includes('withdraw') || lower.includes('উত্তোলন')) {
        reply = `উইথড্রয়াল রিকোয়েস্ট দেওয়ার পর অ্যাডমিন ৫-১৫ মিনিটের মধ্যে আপনার ব্যক্তিগত বিকাশ বা নগদে টাকা ক্যাশ-আউট নিশ্চিত করেন। কোনো ফি কাটা হয় না।`;
      } else if (lower.includes('প্ল্যান') || lower.includes('লাভ') || lower.includes('মুনাফা') || lower.includes('plan')) {
        reply = `আমাদের ১০ দিনের প্যাকেজসমূহ: ৳৫,০০০ (দৈনিক ৳১৫০), ৳১০,০০০ (দৈনিক ৳৩০০), ৳২০,০০০ (দৈনিক ৳৬০০), ৳২৫,০০০ (দৈনিক ৳৭৫০)। প্রতি রাত ১২টায় অটো প্রফিট ক্রেডিট হয়।`;
      }

      const botMsg: SupportMessage = {
        id: `M-${Date.now() + 1}`,
        sender: 'support',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setSupportMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  // Reset to initial demo data
  const handleResetData = () => {
    setUsers(INITIAL_USERS);
    setKyc(INITIAL_KYC);
    setDeposits(INITIAL_DEPOSITS);
    setWithdrawals(INITIAL_WITHDRAWALS);
    setTransactions(INITIAL_TRANSACTIONS);
    setSecurityLogs(INITIAL_SECURITY_LOGS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setPlans(INITIAL_PLANS);
    setMerchantNumbers(INITIAL_MERCHANT_NUMBERS);
    setUserAccount(INITIAL_USER_ACCOUNT);
    setAdminSearch('');
    showToast('ডেমো ডেটা প্রাথমিক অবস্থায় রিসেট করা হয়েছে!');
  };

  // Pending counts for badges
  const pendingCounts = {
    kyc: kyc.filter((k) => k.status === 'Pending').length,
    deposits: deposits.filter((d) => d.status === 'Pending').length,
    withdrawals: withdrawals.filter((w) => w.status === 'Pending').length,
  };
  const totalPending = pendingCounts.kyc + pendingCounts.deposits + pendingCounts.withdrawals;

  return (
    <div className="min-h-screen bg-[#081426] text-white flex flex-col font-sans selection:bg-[#D6B15C]/20 selection:text-[#D6B15C]">
      
      {/* =========================================================================
          GLOBAL MODE BAR: Switch between USER APP and ADMIN DASHBOARD
         ========================================================================= */}
      <div className="bg-[#050d18] border-b border-[#1e355b] px-4 py-2 flex items-center justify-between text-xs shrink-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-[#9EACC1] font-semibold hidden sm:inline">সিস্টেম মোড:</span>
          
          <div className="flex items-center gap-1 p-0.5 bg-[#081426] border border-[#1e355b] rounded-xl">
            <button
              onClick={() => setAppMode('user')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                appMode === 'user'
                  ? 'bg-[#D6B15C] text-[#081426] shadow-sm'
                  : 'text-[#9EACC1] hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 ইউজার অ্যাপ (User App)</span>
            </button>

            <button
              onClick={() => setAppMode('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                appMode === 'admin'
                  ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/40 shadow-sm'
                  : 'text-[#9EACC1] hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6B15C]" />
              <span>🛡️ অ্যাডমিন ড্যাশবোর্ড (Admin Panel)</span>
              {totalPending > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#E46B70] animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Status chip */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#9EACC1] font-mono">
            <span>MH BD INVEST</span>
            <span>·</span>
            <span>bKash & Nagad Merchant Active</span>
          </div>

          <button
            onClick={handleResetData}
            className="flex items-center gap-1 text-[11px] text-[#D6B15C] hover:text-[#e2c172] transition-colors font-medium px-2 py-0.5"
            title="Reset to default mock dataset"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">রিসেট (Reset)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          NOTIFICATION TOAST
         ========================================================================= */}
      {toastMessage && (
        <div className="fixed top-14 right-4 z-50 bg-[#12233D] border border-[#D6B15C] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#43B581] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          VIEW ROUTING: USER APP vs ADMIN DASHBOARD
         ========================================================================= */}
      {appMode === 'user' ? (
        <UserAppContainer
          user={userAccount}
          merchantNumbers={merchantNumbers}
          transactions={transactions}
          supportMessages={supportMessages}
          onDepositSubmitted={handleUserDepositSubmitted}
          onWithdrawSubmitted={handleUserWithdrawSubmitted}
          onKycSubmitted={handleUserKycSubmitted}
          onInvest={handleUserInvest}
          onSendMessage={handleUserSendMessage}
          onUpdateUser={setUserAccount}
          onSwitchToAdmin={() => setAppMode('admin')}
          onToast={showToast}
        />
      ) : (
        /* ================= ADMIN CONTROL PANEL ================= */
        <div className="flex-1 flex flex-col min-h-0">
          <Header
            currentTab={adminTab}
            onSelectTab={setAdminTab}
            isMobileView={isMobileEmulatorView}
            onToggleMobileView={() => setIsMobileEmulatorView(!isMobileEmulatorView)}
            onReset={handleResetData}
            onOpenKotlinSource={() => setIsKotlinSourceOpen(true)}
            onOpenNewModal={() => setIsNewModalOpen(true)}
            pendingCount={totalPending}
          />

          <div className="flex-1 flex min-h-0">
            {/* Desktop Left Sidebar */}
            {!isMobileEmulatorView && (
              <Sidebar
                currentTab={adminTab}
                onSelectTab={setAdminTab}
                pendingCounts={pendingCounts}
                totalUsersCount={users.length}
              />
            )}

            {/* Main Content Viewport */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {isMobileEmulatorView ? (
                /* Android Jetpack Compose Native View Emulator */
                <AndroidEmulator
                  users={users}
                  kyc={kyc}
                  deposits={deposits}
                  withdrawals={withdrawals}
                  transactions={transactions}
                  securityLogs={securityLogs}
                  auditLogs={auditLogs}
                  plans={plans}
                  onToggleUserStatus={handleToggleUserStatus}
                  onAction={(cat, id, stat) => handleReviewAction(cat, id, stat)}
                />
              ) : (
                /* Full Desktop SaaS Dashboard Panels */
                <>
                  {adminTab === 'Overview' && (
                    <OverviewSection
                      totalUsers={users.length}
                      pendingKyc={pendingCounts.kyc}
                      pendingDeposits={pendingCounts.deposits}
                      pendingWithdrawals={pendingCounts.withdrawals}
                      onNavigateTab={setAdminTab}
                      onQuickSimulate={(type) => {
                        if (type === 'deposit') {
                          handleUserDepositSubmitted({
                            id: `D${Math.floor(100 + Math.random() * 900)}`,
                            name: 'Anisur Rahman',
                            description: 'bKash Deposit Request',
                            amount: '৳5,000',
                            rawAmount: 5000,
                            method: 'bKash',
                            status: 'Pending',
                            trxId: `TRX${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                            accountNumber: '01712-998877',
                            date: 'Just now',
                          });
                        } else if (type === 'withdrawal') {
                          handleUserWithdrawSubmitted({
                            id: `W${Math.floor(100 + Math.random() * 900)}`,
                            name: 'Rahim Mia',
                            description: 'Nagad Cash-Out Request',
                            amount: '৳2,000',
                            rawAmount: 2000,
                            method: 'Nagad',
                            status: 'Pending',
                            accountNumber: '01819-445566',
                            date: 'Just now',
                          });
                        }
                      }}
                    />
                  )}

                  {adminTab === 'Users' && (
                    <UserSection
                      users={users}
                      searchText={adminSearch}
                      onSearchChange={setAdminSearch}
                      onToggleUserStatus={handleToggleUserStatus}
                      onOpenAddUserModal={() => setIsNewModalOpen(true)}
                    />
                  )}

                  {adminTab === 'KYC' && (
                    <ReviewSection
                      title="KYC Verification (পরিচয় যাচাই)"
                      items={kyc}
                      searchText={adminSearch}
                      onSearchChange={setAdminSearch}
                      allowActions={true}
                      onAction={(id, newStat) => handleReviewAction('kyc', id, newStat)}
                      onOpenNewModal={() => setIsNewModalOpen(true)}
                      category="kyc"
                    />
                  )}

                  {adminTab === 'Deposit' && (
                    <ReviewSection
                      title="Deposit Requests (ডিপোজিট রিভিউ)"
                      items={deposits}
                      searchText={adminSearch}
                      onSearchChange={setAdminSearch}
                      allowActions={true}
                      onAction={(id, newStat) => handleReviewAction('deposit', id, newStat)}
                      onOpenNewModal={() => setIsNewModalOpen(true)}
                      category="deposit"
                    />
                  )}

                  {adminTab === 'Withdrawal' && (
                    <ReviewSection
                      title="Withdrawal Requests (উত্তোলন রিভিউ)"
                      items={withdrawals}
                      searchText={adminSearch}
                      onSearchChange={setAdminSearch}
                      allowActions={true}
                      onAction={(id, newStat) => handleReviewAction('withdrawal', id, newStat)}
                      onOpenNewModal={() => setIsNewModalOpen(true)}
                      category="withdrawal"
                    />
                  )}

                  {adminTab === 'Transactions' && (
                    <ReviewSection
                      title="Transaction Monitoring (লেনদেন মনিটরিং)"
                      items={transactions}
                      searchText={adminSearch}
                      onSearchChange={setAdminSearch}
                      allowActions={false}
                      category="transaction"
                    />
                  )}

                  {adminTab === 'MerchantNumbers' && (
                    <AdminMerchantSettings
                      merchantNumbers={merchantNumbers}
                      onUpdateMerchantNumbers={handleUpdateMerchantNumbers}
                    />
                  )}

                  {adminTab === 'Gmail' && (
                    <AdminGmailCenter
                      users={users}
                      onLogAudit={logAudit}
                      onToast={showToast}
                    />
                  )}

                  {adminTab === 'Security' && (
                    <SecuritySection
                      logs={securityLogs}
                      onTriggerSecurityScan={() => {
                        const newLog: SecurityLog = {
                          id: `SEC-${Date.now().toString().slice(-4)}`,
                          event: 'Manual Admin Threat Scan Completed - All clear',
                          level: 'info',
                          timestamp: new Date().toLocaleTimeString(),
                          ip: '103.145.120.4',
                          location: 'Dhaka, Bangladesh',
                          device: 'Chrome / Admin Console',
                        };
                        setSecurityLogs((prev) => [newLog, ...prev]);
                        showToast('নিরাপত্তা স্ক্যান সম্পন্ন! কোনো ঝুঁকি পাওয়া যায়নি।');
                      }}
                    />
                  )}

                  {adminTab === 'Audit' && (
                    <AuditSection logs={auditLogs} />
                  )}

                  {adminTab === 'Plans' && (
                    <PlansSection
                      plans={plans}
                      onTogglePlan={(id) => {
                        setPlans((prev) =>
                          prev.map((p) =>
                            p.id === id ? { ...p, isActive: !p.isActive } : p
                          )
                        );
                        showToast('প্ল্যান সক্রিয়তা পরিবর্তন করা হয়েছে!');
                      }}
                      onUpdatePlan={(updated) => {
                        setPlans((prev) =>
                          prev.map((p) => (p.id === updated.id ? updated : p))
                        );
                        showToast('প্ল্যান সফলভাবে আপডেট করা হয়েছে!');
                      }}
                      onAddPlan={(newPlan) => {
                        setPlans((prev) => [...prev, newPlan]);
                        logAudit(`New Plan Created: ${newPlan.title}`, `Rate: ${newPlan.rate}`);
                        showToast('নতুন প্ল্যান তৈরি করা হয়েছে!');
                      }}
                    />
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL MODALS
         ========================================================================= */}
      <KotlinSourceModal
        isOpen={isKotlinSourceOpen}
        onClose={() => setIsKotlinSourceOpen(false)}
      />

      <NewItemModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAddUser={(newUser) => {
          setUsers((prev) => [newUser, ...prev]);
          logAudit(`New User Created: ${newUser.name}`, `ID: ${newUser.id}`);
          showToast(`ইউজার ${newUser.name} যুক্ত হয়েছে!`);
        }}
        onAddDeposit={(newDep) => {
          setDeposits((prev) => [newDep, ...prev]);
          logAudit(`Manual Deposit Added: ${newDep.amount}`, `User: ${newDep.name}`);
          showToast(`ডিপোজিট রিকোয়েস্ট তৈরি হয়েছে!`);
        }}
        onAddWithdrawal={(newWith) => {
          setWithdrawals((prev) => [newWith, ...prev]);
          logAudit(`Manual Withdrawal Added: ${newWith.amount}`, `User: ${newWith.name}`);
          showToast(`উত্তোলন রিকোয়েস্ট তৈরি হয়েছে!`);
        }}
        onAddKyc={(newKyc) => {
          setKyc((prev) => [newKyc, ...prev]);
          logAudit(`Manual KYC Added: ${newKyc.name}`, `NID: ${newKyc.nidNumber}`);
          showToast(`কেওয়াইসি ভেরিফিকেশন যুক্ত হয়েছে!`);
        }}
      />
    </div>
  );
}
