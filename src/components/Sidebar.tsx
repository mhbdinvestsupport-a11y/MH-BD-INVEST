import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileCheck2, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ArrowLeftRight, 
  ShieldAlert, 
  FileText, 
  TrendingUp,
  CircleCheck,
  Server,
  Mail
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  pendingCounts: {
    kyc: number;
    deposits: number;
    withdrawals: number;
  };
  totalUsersCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingCounts,
  totalUsersCount,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    { id: 'Overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'Users', label: 'Users', icon: <Users className="w-4 h-4" />, badge: totalUsersCount },
    { id: 'KYC', label: 'KYC Verification', icon: <FileCheck2 className="w-4 h-4" />, badge: pendingCounts.kyc },
    { id: 'Deposit', label: 'Deposit Requests', icon: <ArrowDownLeft className="w-4 h-4" />, badge: pendingCounts.deposits },
    { id: 'Withdrawal', label: 'Withdrawal Requests', icon: <ArrowUpRight className="w-4 h-4" />, badge: pendingCounts.withdrawals },
    { id: 'Transactions', label: 'Transactions', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { id: 'MerchantNumbers', label: 'মার্চেন্ট নাম্বার (Numbers)', icon: <ArrowDownLeft className="w-4 h-4 text-[#D6B15C]" /> },
    { id: 'Gmail', label: 'জিমেইল সেন্টার (Gmail)', icon: <Mail className="w-4 h-4 text-[#EA4335]" /> },
    { id: 'Security', label: 'Security Alerts', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'Audit', label: 'Audit Reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'Plans', label: 'Investment Plans', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#0c1a30] border-r border-[#1e355b]/80 flex flex-col justify-between p-4 min-h-[calc(100vh-61px)]">
      <div>
        <div className="px-3 pb-3 mb-2 border-b border-[#1e355b]/60 flex items-center justify-between text-[11px] font-semibold text-[#9EACC1] uppercase tracking-wider">
          <span>Navigation Menu</span>
          <span className="font-mono text-[#D6B15C]">v2.4 BD</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const hasPending = typeof item.badge === 'number' && item.badge > 0 && item.id !== 'Users';

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#12233D] text-[#D6B15C] shadow-sm border border-[#D6B15C]/30'
                    : 'text-[#9EACC1] hover:text-white hover:bg-[#12233D]/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`${isActive ? 'text-[#D6B15C]' : 'text-[#9EACC1] group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-full ${
                      hasPending
                        ? 'bg-[#D6B15C] text-[#081426] font-bold'
                        : isActive
                        ? 'bg-[#1e355b] text-[#D6B15C]'
                        : 'bg-[#12233D] text-[#9EACC1]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="mt-6 pt-4 border-t border-[#1e355b]/60 space-y-3">
        <div className="p-3 rounded-xl bg-[#12233D]/70 border border-[#1e355b] text-xs">
          <div className="flex items-center justify-between text-[#9EACC1] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-[#43B581]" />
              <span className="font-semibold text-white">System Status</span>
            </span>
            <span className="text-[#43B581] font-bold text-[10px]">ACTIVE</span>
          </div>
          <p className="text-[11px] text-[#9EACC1] leading-relaxed">
            MH BD INVEST Sandbox Gateway. Mobile banking channels active.
          </p>
        </div>

        <div className="px-2 flex items-center justify-between text-[11px] text-[#9EACC1]">
          <span className="truncate">mhbdinvestsupport@gmail.com</span>
        </div>
      </div>
    </aside>
  );
};
