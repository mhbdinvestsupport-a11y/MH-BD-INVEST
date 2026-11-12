import React from 'react';
import { 
  Users, 
  FileCheck2, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  Wallet, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { TabType } from '../types';

interface OverviewSectionProps {
  totalUsers: number;
  pendingKyc: number;
  pendingDeposits: number;
  pendingWithdrawals: number;
  onNavigateTab: (tab: TabType) => void;
  onQuickSimulate: (type: 'deposit' | 'withdrawal' | 'kyc') => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  totalUsers,
  pendingKyc,
  pendingDeposits,
  pendingWithdrawals,
  onNavigateTab,
  onQuickSimulate,
}) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            Welcome, Super Admin
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#D6B15C]/15 text-[#D6B15C] border border-[#D6B15C]/30">
              Bangladeshi Gateway
            </span>
          </h1>
          <p className="text-sm text-[#9EACC1] mt-1">
            MH BD INVEST Management · Real-time administrative controls & mobile banking queues
          </p>
        </div>

        {/* Quick Simulation Shortcuts */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onQuickSimulate('deposit')}
            className="px-3 py-1.5 text-xs font-medium text-[#D6B15C] bg-[#12233D] hover:bg-[#1e355b] border border-[#D6B15C]/40 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>+ Test bKash Deposit</span>
          </button>
          <button
            onClick={() => onQuickSimulate('withdrawal')}
            className="px-3 py-1.5 text-xs font-medium text-white bg-[#12233D] hover:bg-[#1e355b] border border-[#1e355b] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+ Test Nagad Payout</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Stat Cards matching Compose Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div 
          onClick={() => onNavigateTab('Users')}
          className="group cursor-pointer bg-[#12233D] hover:bg-[#172d4e] border border-[#1e355b] hover:border-[#D6B15C]/50 rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider">
              Total Users
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#D6B15C] group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-[#D6B15C] font-mono tabular-nums">
              {totalUsers}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#9EACC1]">
              <span>Verified accounts</span>
              <ArrowRight className="w-3 h-3 text-[#D6B15C] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </div>
          </div>
        </div>

        {/* Pending KYC */}
        <div 
          onClick={() => onNavigateTab('KYC')}
          className="group cursor-pointer bg-[#12233D] hover:bg-[#172d4e] border border-[#1e355b] hover:border-[#D6B15C]/50 rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider">
              Pending KYC
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#D6B15C] group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-[#D6B15C] font-mono tabular-nums">
              {pendingKyc}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#9EACC1]">
              <span>Requires admin review</span>
              <ArrowRight className="w-3 h-3 text-[#D6B15C] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </div>
          </div>
        </div>

        {/* Deposits */}
        <div 
          onClick={() => onNavigateTab('Deposit')}
          className="group cursor-pointer bg-[#12233D] hover:bg-[#172d4e] border border-[#1e355b] hover:border-[#D6B15C]/50 rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider">
              Deposits
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#43B581] group-hover:scale-105 transition-transform">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-[#D6B15C] font-mono tabular-nums">
              {pendingDeposits}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#9EACC1]">
              <span>Pending approvals</span>
              <ArrowRight className="w-3 h-3 text-[#D6B15C] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </div>
          </div>
        </div>

        {/* Withdrawals */}
        <div 
          onClick={() => onNavigateTab('Withdrawal')}
          className="group cursor-pointer bg-[#12233D] hover:bg-[#172d4e] border border-[#1e355b] hover:border-[#D6B15C]/50 rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider">
              Withdrawals
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#E46B70] group-hover:scale-105 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-[#D6B15C] font-mono tabular-nums">
              {pendingWithdrawals}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#9EACC1]">
              <span>Queued for payout</span>
              <ArrowRight className="w-3 h-3 text-[#D6B15C] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* System Status & Payment Gateway Channel Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* System Status Card (Matching Compose layout exact lines) */}
        <div className="lg:col-span-2 bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#1e355b]/60">
            <div>
              <h3 className="text-sm font-bold text-[#D6B15C] uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4" />
                SYSTEM STATUS
              </h3>
              <p className="text-xs text-[#9EACC1] mt-0.5">
                MH BD Core Infrastructure & Compliance Monitor
              </p>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-bold text-[#43B581] bg-[#43B581]/15 rounded-full border border-[#43B581]/30">
              OPERATIONAL
            </span>
          </div>

          <div className="mt-4 divide-y divide-[#1e355b]/40">
            <div className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-[#43B581]" />
                <span className="font-medium">Admin Panel</span>
              </div>
              <span className="font-bold text-[#43B581] font-mono">Active</span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-[#D6B15C]" />
                <span className="font-medium">Demo Database</span>
              </div>
              <span className="font-bold text-[#D6B15C] font-mono">Local State</span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-[#D6B15C]" />
                <span className="font-medium">Payment Gateway</span>
              </div>
              <span className="font-bold text-[#D6B15C] font-mono">Sandbox only</span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-[#E46B70]" />
                <span className="font-medium">Real Money Transactions</span>
              </div>
              <span className="font-bold text-[#E46B70] font-mono">Disabled</span>
            </div>
          </div>

          {/* Bangladeshi Gateway Channels */}
          <div className="mt-5 pt-4 border-t border-[#1e355b]/60">
            <div className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider mb-2.5">
              Integrated Bangladeshi MFS Channels
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-2.5 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">bKash</div>
                  <div className="text-[10px] text-[#9EACC1]">Personal & Merchant</div>
                </div>
                <span className="text-[10px] font-bold text-[#43B581] bg-[#43B581]/10 px-1.5 py-0.5 rounded">
                  Connected
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Nagad</div>
                  <div className="text-[10px] text-[#9EACC1]">Postal Digital Fin</div>
                </div>
                <span className="text-[10px] font-bold text-[#43B581] bg-[#43B581]/10 px-1.5 py-0.5 rounded">
                  Connected
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Rocket</div>
                  <div className="text-[10px] text-[#9EACC1]">Dutch-Bangla Bank</div>
                </div>
                <span className="text-[10px] font-bold text-[#D6B15C] bg-[#D6B15C]/10 px-1.5 py-0.5 rounded">
                  Standby
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Information & Regulatory Notice */}
        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#D6B15C] uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D6B15C]" />
              Quick Information
            </h3>
            
            <p className="mt-3 text-xs text-[#9EACC1] leading-relaxed">
              All displayed records are sample data. No real payment or investment is processed.
            </p>

            <div className="mt-5 p-3.5 rounded-xl bg-[#081426] border border-[#1e355b] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#9EACC1]">
                <span>Admin Tier:</span>
                <span className="font-bold text-white">Super Administrator</span>
              </div>
              <div className="flex items-center justify-between text-[#9EACC1]">
                <span>Active Currency:</span>
                <span className="font-bold text-[#D6B15C] font-mono">BDT (৳)</span>
              </div>
              <div className="flex items-center justify-between text-[#9EACC1]">
                <span>Timezone:</span>
                <span className="font-bold text-white font-mono">Asia/Dhaka (GMT+6)</span>
              </div>
              <div className="flex items-center justify-between text-[#9EACC1]">
                <span>Audit Protocol:</span>
                <span className="font-bold text-[#43B581] font-mono">Strict Logging</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1e355b]/60">
            <button
              onClick={() => onNavigateTab('Plans')}
              className="w-full py-2.5 px-4 bg-[#D6B15C] hover:bg-[#e2c172] text-[#081426] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Configure Investment Plans</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
