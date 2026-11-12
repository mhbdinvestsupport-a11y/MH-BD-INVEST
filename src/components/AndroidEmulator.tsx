import React, { useState } from 'react';
import { 
  Wifi, 
  BatteryMedium, 
  RotateCcw,
  Search,
  Check,
  X,
  Smartphone
} from 'lucide-react';
import { AdminItem, InvestmentPlan, SecurityLog, AuditLog, TabType } from '../types';

interface AndroidEmulatorProps {
  users: AdminItem[];
  kyc: AdminItem[];
  deposits: AdminItem[];
  withdrawals: AdminItem[];
  transactions: AdminItem[];
  securityLogs: SecurityLog[];
  auditLogs: AuditLog[];
  plans: InvestmentPlan[];
  onToggleUserStatus: (id: string) => void;
  onAction: (category: 'kyc' | 'deposit' | 'withdrawal', id: string, newStatus: 'Approved' | 'Rejected') => void;
}

export const AndroidEmulator: React.FC<AndroidEmulatorProps> = ({
  users,
  kyc,
  deposits,
  withdrawals,
  transactions,
  securityLogs,
  auditLogs,
  plans,
  onToggleUserStatus,
  onAction,
}) => {
  const tabs: TabType[] = [
    'Overview',
    'Users',
    'KYC',
    'Deposit',
    'Withdrawal',
    'Transactions',
    'Security',
    'Audit',
    'Plans'
  ];

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  const pendingKycCount = kyc.filter((k) => k.status === 'Pending').length;
  const pendingDepositsCount = deposits.filter((d) => d.status === 'Pending').length;
  const pendingWithdrawalsCount = withdrawals.filter((w) => w.status === 'Pending').length;

  const currentTabName = tabs[selectedTab];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Device Label / Note */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12233D] border border-[#D6B15C]/30 text-xs text-[#D6B15C] font-semibold">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android Jetpack Compose Native View Simulator</span>
        </div>
        <p className="text-xs text-[#9EACC1] mt-1">
          Exact pixel rendering of MainActivity.kt and MHAdminTheme
        </p>
      </div>

      {/* Realistic Android Phone Chassis */}
      <div className="w-full max-w-[400px] h-[780px] bg-[#000000] rounded-[48px] p-3 shadow-2xl border-4 border-[#283852] relative flex flex-col overflow-hidden">
        {/* Device Punch Hole Camera */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border border-[#222] z-50 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#112233]" />
        </div>

        {/* Screen Bezel / Container (Navy #081426) */}
        <div className="w-full h-full bg-[#081426] rounded-[36px] overflow-hidden flex flex-col relative text-white font-sans">
          
          {/* Android Status Bar */}
          <div className="h-8 bg-[#12233D] px-6 flex items-center justify-between text-[11px] font-mono text-[#9EACC1] shrink-0 select-none z-20">
            <span>09:41</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px]">Grameenphone 4G</span>
              <Wifi className="w-3 h-3 text-[#D6B15C]" />
              <BatteryMedium className="w-3.5 h-3.5 text-[#D6B15C]" />
            </div>
          </div>

          {/* Android TopAppBar (NavyCard #12233D) */}
          <div className="bg-[#12233D] px-4 py-3 flex items-center justify-between border-b border-[#1e355b]/60 shrink-0 z-20">
            <div>
              <div className="text-[#D6B15C] font-extrabold text-[19px] tracking-wide leading-tight">
                MH BD INVEST
              </div>
              <div className="text-[#9EACC1] text-[10px] tracking-widest font-semibold">
                ADMIN CONTROL PANEL
              </div>
            </div>

            <button
              onClick={() => setSearchText('')}
              className="text-[#D6B15C] text-xs font-bold px-2.5 py-1 rounded hover:bg-[#1e355b]/50 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Android ScrollableTabRow */}
          <div className="bg-[#081426] border-b border-[#1e355b] overflow-x-auto shrink-0 z-10 no-scrollbar">
            <div className="flex px-3 py-1 gap-1 min-w-max">
              {tabs.map((tab, idx) => {
                const isSelected = selectedTab === idx;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedTab(idx);
                      setSearchText('');
                    }}
                    className={`px-3 py-2 text-xs transition-colors relative whitespace-nowrap ${
                      isSelected
                        ? 'text-[#D6B15C] font-bold'
                        : 'text-[#9EACC1] font-normal hover:text-white'
                    }`}
                  >
                    <span>{tab}</span>
                    {isSelected && (
                      <div className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#D6B15C] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Android OutlinedTextField search bar (when tab is not 0, 6, 7, 8) */}
          {selectedTab !== 0 && selectedTab !== 6 && selectedTab !== 7 && selectedTab !== 8 && (
            <div className="px-4 py-2 shrink-0 bg-[#081426]">
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search by name or ID"
                  className="w-full bg-transparent border border-[#9EACC1]/60 focus:border-[#D6B15C] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none placeholder:text-[#9EACC1]/70 transition-colors"
                />
                {searchText && (
                  <button
                    onClick={() => setSearchText('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9EACC1] hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Android Screen Body Content with LazyColumn scroll */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            
            {/* TAB 0: OVERVIEW */}
            {selectedTab === 0 && (
              <div className="space-y-3 pb-6">
                <div>
                  <h3 className="text-white text-[22px] font-bold leading-tight">
                    Welcome, Super Admin
                  </h3>
                  <p className="text-[#9EACC1] text-xs">
                    MH BD INVEST Management
                  </p>
                </div>

                {/* Stat Cards 2x2 grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#12233D] rounded-2xl p-4">
                    <span className="text-[#9EACC1] text-[11px] block">Total Users</span>
                    <span className="text-[#D6B15C] text-2xl font-extrabold font-mono mt-1 block">
                      {users.length}
                    </span>
                  </div>

                  <div className="bg-[#12233D] rounded-2xl p-4">
                    <span className="text-[#9EACC1] text-[11px] block">Pending KYC</span>
                    <span className="text-[#D6B15C] text-2xl font-extrabold font-mono mt-1 block">
                      {pendingKycCount}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#12233D] rounded-2xl p-4">
                    <span className="text-[#9EACC1] text-[11px] block">Deposits</span>
                    <span className="text-[#D6B15C] text-2xl font-extrabold font-mono mt-1 block">
                      {pendingDepositsCount}
                    </span>
                  </div>

                  <div className="bg-[#12233D] rounded-2xl p-4">
                    <span className="text-[#9EACC1] text-[11px] block">Withdrawals</span>
                    <span className="text-[#D6B15C] text-2xl font-extrabold font-mono mt-1 block">
                      {pendingWithdrawalsCount}
                    </span>
                  </div>
                </div>

                {/* System Status Card */}
                <div className="bg-[#12233D] rounded-[18px] p-4 space-y-2">
                  <div className="text-[#D6B15C] font-bold text-xs uppercase tracking-wider mb-2">
                    SYSTEM STATUS
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white">Admin Panel</span>
                    <span className="text-[#43B581] font-bold font-mono">Active</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white">Demo Database</span>
                    <span className="text-[#D6B15C] font-bold font-mono">Local</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white">Payment Gateway</span>
                    <span className="text-[#D6B15C] font-bold font-mono">Sandbox only</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white">Real Money Transactions</span>
                    <span className="text-[#E46B70] font-bold font-mono">Disabled</span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="pt-2">
                  <div className="text-[#D6B15C] font-bold text-sm">
                    Quick Information
                  </div>
                  <div className="text-[#9EACC1] text-[12px] leading-relaxed mt-1">
                    All displayed records are sample data. No real payment or investment is processed.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: USERS */}
            {selectedTab === 1 && (
              <div className="space-y-3 pb-6">
                <div className="text-[#D6B15C] font-bold text-base">
                  User Management
                </div>

                {users
                  .filter((u) => u.name.toLowerCase().includes(searchText.toLowerCase()) || u.id.toLowerCase().includes(searchText.toLowerCase()))
                  .map((item) => {
                    const statusColor = item.status === 'Active' ? 'text-[#43B581]' : 'text-[#E46B70]';
                    return (
                      <div key={item.id} className="bg-[#12233D] rounded-2xl p-4">
                        <div className="flex justify-between items-start">
                          <span className="text-white font-bold text-sm">{item.name}</span>
                          <span className={`${statusColor} font-bold text-xs font-mono`}>{item.status}</span>
                        </div>
                        <div className="text-[#9EACC1] text-xs mt-1">ID: {item.id}</div>
                        <div className="text-[#9EACC1] text-xs">{item.description}</div>
                        {item.amount && (
                          <div className="text-[#D6B15C] font-bold text-xs font-mono mt-1">
                            Amount: {item.amount}
                          </div>
                        )}

                        <div className="mt-3 pt-2 border-t border-[#1e355b]/60 flex justify-end">
                          <button
                            onClick={() => onToggleUserStatus(item.id)}
                            className="px-3 py-1 text-xs font-semibold text-[#D6B15C] border border-[#D6B15C] rounded-lg hover:bg-[#D6B15C]/10"
                          >
                            {item.status === 'Active' ? 'Block User' : 'Unblock User'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* TAB 2: KYC */}
            {selectedTab === 2 && (
              <div className="space-y-3 pb-6">
                <div className="text-[#D6B15C] font-bold text-base">
                  KYC Verification
                </div>

                {kyc
                  .filter((k) => k.name.toLowerCase().includes(searchText.toLowerCase()) || k.id.toLowerCase().includes(searchText.toLowerCase()))
                  .map((item) => (
                    <div key={item.id} className="bg-[#12233D] rounded-2xl p-4">
                      <div className="flex justify-between items-start">
                        <span className="text-white font-bold text-sm">{item.name}</span>
                        <span className={`font-bold text-xs font-mono ${
                          item.status === 'Approved' ? 'text-[#43B581]' : item.status === 'Rejected' ? 'text-[#E46B70]' : 'text-[#D6B15C]'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-[#9EACC1] text-xs mt-1">ID: {item.id}</div>
                      <div className="text-[#9EACC1] text-xs">{item.description}</div>
                      {item.nidNumber && (
                        <div className="text-[#D6B15C] text-xs font-mono mt-1">
                          NID: {item.nidNumber}
                        </div>
                      )}

                      {item.status === 'Pending' && (
                        <div className="mt-3 flex justify-end gap-2">
                          <button
                            onClick={() => onAction('kyc', item.id, 'Rejected')}
                            className="px-3 py-1 text-xs font-bold text-[#E46B70] border border-[#E46B70] rounded-lg"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => onAction('kyc', item.id, 'Approved')}
                            className="px-3 py-1 text-xs font-bold text-[#081426] bg-[#D6B15C] rounded-lg"
                          >
                            Approve
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* TAB 3: DEPOSITS */}
            {selectedTab === 3 && (
              <div className="space-y-3 pb-6">
                <div className="text-[#D6B15C] font-bold text-base">
                  Deposit Requests
                </div>

                {deposits
                  .filter((d) => d.name.toLowerCase().includes(searchText.toLowerCase()) || d.id.toLowerCase().includes(searchText.toLowerCase()))
                  .map((item) => (
                    <div key={item.id} className="bg-[#12233D] rounded-2xl p-4">
                      <div className="flex justify-between items-start">
                        <span className="text-white font-bold text-sm">{item.name}</span>
                        <span className={`font-bold text-xs font-mono ${
                          item.status === 'Approved' ? 'text-[#43B581]' : item.status === 'Rejected' ? 'text-[#E46B70]' : 'text-[#D6B15C]'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-[#9EACC1] text-xs mt-1">ID: {item.id}</div>
                      <div className="text-[#9EACC1] text-xs">{item.description}</div>
                      {item.amount && (
                        <div className="text-[#D6B15C] font-bold text-xs font-mono mt-1">
                          Amount: {item.amount}
                        </div>
                      )}
                      {item.method && (
                        <div className="text-[#9EACC1] text-xs">Method: {item.method}</div>
                      )}

                      {item.status === 'Pending' && (
                        <div className="mt-3 flex justify-end gap-2">
                          <button
                            onClick={() => onAction('deposit', item.id, 'Rejected')}
                            className="px-3 py-1 text-xs font-bold text-[#E46B70] border border-[#E46B70] rounded-lg"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => onAction('deposit', item.id, 'Approved')}
                            className="px-3 py-1 text-xs font-bold text-[#081426] bg-[#D6B15C] rounded-lg"
                          >
                            Approve
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* TAB 4: WITHDRAWALS */}
            {selectedTab === 4 && (
              <div className="space-y-3 pb-6">
                <div className="text-[#D6B15C] font-bold text-base">
                  Withdrawal Requests
                </div>

                {withdrawals
                  .filter((w) => w.name.toLowerCase().includes(searchText.toLowerCase()) || w.id.toLowerCase().includes(searchText.toLowerCase()))
                  .map((item) => (
                    <div key={item.id} className="bg-[#12233D] rounded-2xl p-4">
                      <div className="flex justify-between items-start">
                        <span className="text-white font-bold text-sm">{item.name}</span>
                        <span className={`font-bold text-xs font-mono ${
                          item.status === 'Approved' ? 'text-[#43B581]' : item.status === 'Rejected' ? 'text-[#E46B70]' : 'text-[#D6B15C]'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-[#9EACC1] text-xs mt-1">ID: {item.id}</div>
                      <div className="text-[#9EACC1] text-xs">{item.description}</div>
                      {item.amount && (
                        <div className="text-[#D6B15C] font-bold text-xs font-mono mt-1">
                          Amount: {item.amount}
                        </div>
                      )}
                      {item.method && (
                        <div className="text-[#9EACC1] text-xs">Method: {item.method}</div>
                      )}

                      {item.status === 'Pending' && (
                        <div className="mt-3 flex justify-end gap-2">
                          <button
                            onClick={() => onAction('withdrawal', item.id, 'Rejected')}
                            className="px-3 py-1 text-xs font-bold text-[#E46B70] border border-[#E46B70] rounded-lg"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => onAction('withdrawal', item.id, 'Approved')}
                            className="px-3 py-1 text-xs font-bold text-[#081426] bg-[#D6B15C] rounded-lg"
                          >
                            Approve
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* TAB 5: TRANSACTIONS */}
            {selectedTab === 5 && (
              <div className="space-y-3 pb-6">
                <div className="text-[#D6B15C] font-bold text-base">
                  Transaction Monitoring
                </div>

                {transactions
                  .filter((t) => t.name.toLowerCase().includes(searchText.toLowerCase()) || t.id.toLowerCase().includes(searchText.toLowerCase()))
                  .map((item) => (
                    <div key={item.id} className="bg-[#12233D] rounded-2xl p-4">
                      <div className="flex justify-between items-start">
                        <span className="text-white font-bold text-sm">{item.name}</span>
                        <span className={`font-bold text-xs font-mono ${
                          item.status === 'Completed' ? 'text-[#43B581]' : 'text-[#D6B15C]'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-[#9EACC1] text-xs mt-1">ID: {item.id}</div>
                      <div className="text-[#9EACC1] text-xs">{item.description}</div>
                      {item.amount && (
                        <div className="text-[#D6B15C] font-bold text-xs font-mono mt-1">
                          Amount: {item.amount}
                        </div>
                      )}
                      {item.method && (
                        <div className="text-[#9EACC1] text-xs">Method: {item.method}</div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* TAB 6: SECURITY */}
            {selectedTab === 6 && (
              <div className="space-y-3 pb-6">
                <div className="text-[#D6B15C] font-bold text-base">
                  Security Alerts
                </div>

                {securityLogs.map((log) => (
                  <div key={log.id} className="bg-[#12233D] rounded-2xl p-4">
                    <p className="text-white text-xs">{log.event}</p>
                    <div className="text-[10px] text-[#9EACC1] font-mono mt-1">
                      {log.timestamp} · {log.location}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 7: AUDIT */}
            {selectedTab === 7 && (
              <div className="space-y-3 pb-6">
                <div className="text-[#D6B15C] font-bold text-base">
                  Audit Reports
                </div>

                {auditLogs.map((log) => (
                  <div key={log.id} className="bg-[#12233D] rounded-2xl p-4">
                    <p className="text-white text-xs font-medium">{log.action}</p>
                    <div className="text-[10px] text-[#9EACC1] font-mono mt-1">
                      {log.actor} · {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 8: PLANS */}
            {selectedTab === 8 && (
              <div className="space-y-3 pb-6">
                <div>
                  <div className="text-[#D6B15C] font-bold text-base">
                    Demo Plan Management
                  </div>
                  <div className="text-[#9EACC1] text-xs">
                    Illustrative rates only. Not an actual investment offer.
                  </div>
                </div>

                {plans.map((plan) => (
                  <div key={plan.id} className="bg-[#12233D] rounded-2xl p-4">
                    <div className="text-white font-bold text-sm">{plan.title}</div>
                    <div className="text-[#D6B15C] font-bold text-sm mt-0.5">{plan.rate}</div>
                    <div className="text-[#9EACC1] text-xs mt-0.5">{plan.tag}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Android Bottom Navigation Gesture Bar */}
          <div className="h-6 bg-[#081426] flex items-center justify-center shrink-0 z-20">
            <div className="w-28 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
