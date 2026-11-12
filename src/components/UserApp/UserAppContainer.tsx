import React, { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  FileText, 
  Clock, 
  Headphones, 
  User, 
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles,
  Mail
} from 'lucide-react';
import { 
  UserAccount, 
  MerchantNumbers, 
  AdminItem, 
  InvestmentTier,
  SupportMessage 
} from '../../types';
import { UserHome } from './UserHome';
import { UserInvestSection } from './UserInvestSection';
import { UserProfitStatement } from './UserProfitStatement';
import { UserHistory } from './UserHistory';
import { UserSupportChat } from './UserSupportChat';
import { UserProfile } from './UserProfile';
import { UserDepositModal } from './UserDepositModal';
import { UserWithdrawModal } from './UserWithdrawModal';
import { UserKycModal } from './UserKycModal';
import { UserAuthModal } from './UserAuthModal';
import { UserEmailCenterModal } from '../Gmail/UserEmailCenterModal';

interface UserAppContainerProps {
  user: UserAccount;
  merchantNumbers: MerchantNumbers;
  transactions: AdminItem[];
  supportMessages: SupportMessage[];
  onDepositSubmitted: (newDeposit: AdminItem) => void;
  onWithdrawSubmitted: (newWithdraw: AdminItem) => void;
  onKycSubmitted: (newKyc: AdminItem) => void;
  onInvest: (tier: InvestmentTier) => boolean;
  onSendMessage: (text: string) => void;
  onUpdateUser: (updatedUser: UserAccount) => void;
  onSwitchToAdmin: () => void;
  onToast: (msg: string) => void;
}

export const UserAppContainer: React.FC<UserAppContainerProps> = ({
  user,
  merchantNumbers,
  transactions,
  supportMessages,
  onDepositSubmitted,
  onWithdrawSubmitted,
  onKycSubmitted,
  onInvest,
  onSendMessage,
  onUpdateUser,
  onSwitchToAdmin,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'invest' | 'profit' | 'history' | 'support' | 'profile'>('home');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const navItems = [
    { id: 'home', label: 'হোম', icon: <Home className="w-4 h-4" /> },
    { id: 'invest', label: 'ইনভেস্ট', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profit', label: 'মুনাফা', icon: <FileText className="w-4 h-4" /> },
    { id: 'history', label: 'ইতিহাস', icon: <Clock className="w-4 h-4" /> },
    { id: 'support', label: 'সাপোর্ট', icon: <Headphones className="w-4 h-4" /> },
    { id: 'profile', label: 'প্রোফাইল', icon: <User className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-[#081426] text-white flex flex-col justify-between selection:bg-[#D6B15C]/20 selection:text-[#D6B15C]">
      {/* User App Top Bar */}
      <header className="sticky top-0 z-30 bg-[#12233D] border-b border-[#1e355b] px-4 sm:px-6 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D6B15C] to-[#a8822f] flex items-center justify-center text-[#081426] font-extrabold text-xs shadow-sm">
            MH
          </div>
          <div>
            <div className="text-sm font-extrabold text-[#D6B15C] tracking-wide">
              MH BD INVEST
            </div>
            <div className="text-[10px] text-[#9EACC1] font-semibold tracking-wider">
              INVESTOR MOBILE APP
            </div>
          </div>
        </div>

        {/* Right side controls: Balance chip & Gmail support & Switch to Admin */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EA4335]/15 hover:bg-[#EA4335]/25 border border-[#EA4335]/40 text-[#EA4335] font-bold text-xs rounded-xl transition-colors shadow-sm"
            title="Send email to support via Gmail"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gmail</span>
          </button>

          <button
            onClick={() => setShowDepositModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#081426] hover:bg-[#102038] border border-[#D6B15C]/40 rounded-xl transition-colors"
          >
            <Wallet className="w-3.5 h-3.5 text-[#D6B15C]" />
            <span className="font-mono text-xs font-bold text-[#D6B15C] tabular-nums">
              ৳{user.walletBalance.toLocaleString()}
            </span>
          </button>

          <button
            onClick={onSwitchToAdmin}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-[#D6B15C] hover:bg-[#e2c172] text-[#081426] font-bold text-xs rounded-xl transition-colors shadow-sm"
            title="Switch to Admin Dashboard"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>অ্যাডমিন প্যানেল</span>
          </button>
        </div>
      </header>

      {/* Main Body Viewport */}
      <main className="flex-1 p-4 sm:p-6 pb-24 max-w-5xl mx-auto w-full">
        {activeTab === 'home' && (
          <UserHome
            user={user}
            transactions={transactions}
            onOpenDeposit={() => setShowDepositModal(true)}
            onOpenWithdraw={() => setShowWithdrawModal(true)}
            onOpenKyc={() => setShowKycModal(true)}
            onNavigateTab={(t) => setActiveTab(t)}
          />
        )}

        {activeTab === 'invest' && (
          <UserInvestSection
            walletBalance={user.walletBalance}
            activePlans={user.activePlans}
            onInvest={onInvest}
            onOpenDeposit={() => setShowDepositModal(true)}
          />
        )}

        {activeTab === 'profit' && (
          <UserProfitStatement
            totalProfit={user.totalProfit}
            totalInvested={user.totalInvested}
            activePlans={user.activePlans}
          />
        )}

        {activeTab === 'history' && (
          <UserHistory transactions={transactions} />
        )}

        {activeTab === 'support' && (
          <UserSupportChat
            messages={supportMessages}
            onSendMessage={onSendMessage}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfile
            user={user}
            onOpenKyc={() => setShowKycModal(true)}
            onOpenAuth={() => setShowAuthModal(true)}
            onToggle2Fa={() => onUpdateUser({ ...user, is2FAEnabled: !user.is2FAEnabled })}
            onSwitchToAdmin={onSwitchToAdmin}
          />
        )}
      </main>

      {/* Bottom Sticky Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#12233D]/95 backdrop-blur-md border-t border-[#1e355b] px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 transition-colors relative ${
                isActive
                  ? 'text-[#D6B15C] font-bold'
                  : 'text-[#9EACC1] hover:text-white font-medium'
              }`}
            >
              <span className={isActive ? 'text-[#D6B15C]' : 'text-[#9EACC1]'}>
                {item.icon}
              </span>
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#D6B15C] absolute -top-1" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Modals */}
      <UserDepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        merchantNumbers={merchantNumbers}
        userName={user.name}
        userPhone={user.phone}
        onDepositSubmitted={onDepositSubmitted}
      />

      <UserWithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        walletBalance={user.walletBalance}
        userName={user.name}
        userPhone={user.phone}
        merchantNumbers={merchantNumbers}
        onWithdrawSubmitted={onWithdrawSubmitted}
      />

      <UserKycModal
        isOpen={showKycModal}
        onClose={() => setShowKycModal(false)}
        userName={user.name}
        userPhone={user.phone}
        currentKycStatus={user.kycStatus}
        onKycSubmitted={onKycSubmitted}
      />

      <UserAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={user}
        onUpdateUser={onUpdateUser}
      />

      <UserEmailCenterModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        user={user}
        onToast={onToast}
      />
    </div>
  );
};
