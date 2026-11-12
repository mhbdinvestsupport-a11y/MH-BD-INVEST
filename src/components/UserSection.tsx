import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  ShieldAlert, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Calendar, 
  Wallet,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { AdminItem } from '../types';

interface UserSectionProps {
  users: AdminItem[];
  searchText: string;
  onSearchChange: (text: string) => void;
  onToggleUserStatus: (id: string) => void;
  onOpenAddUserModal: () => void;
}

export const UserSection: React.FC<UserSectionProps> = ({
  users,
  searchText,
  onSearchChange,
  onToggleUserStatus,
  onOpenAddUserModal,
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Blocked'>('All');
  const [selectedUser, setSelectedUser] = useState<AdminItem | null>(null);

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchText.toLowerCase()) ||
      u.id.toLowerCase().includes(searchText.toLowerCase()) ||
      (u.phone && u.phone.includes(searchText));
    const matchesFilter = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#D6B15C] tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#D6B15C]" />
            User Management
          </h2>
          <p className="text-xs text-[#9EACC1] mt-0.5">
            Administer investor accounts, verify Bangladeshi phone numbers, and control access
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAddUserModal}
            className="px-3.5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#12233D] border border-[#1e355b] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9EACC1] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, ID, or phone..."
            className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white text-xs rounded-xl pl-9 pr-3.5 py-2 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#081426] border border-[#1e355b] rounded-xl w-full sm:w-auto">
          {(['All', 'Active', 'Blocked'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                  : 'text-[#9EACC1] hover:text-white'
              }`}
            >
              {tab} {tab !== 'All' && `(${users.filter((u) => u.status === tab).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* User Cards Grid / List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#12233D]/60 border border-[#1e355b] rounded-2xl p-8">
          <Users className="w-12 h-12 text-[#9EACC1]/40 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white">No users match your criteria</p>
          <p className="text-xs text-[#9EACC1] mt-1">
            Try adjusting your search query or clear the filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((user) => {
            const isActive = user.status === 'Active';
            return (
              <div
                key={user.id}
                className="bg-[#12233D] hover:bg-[#172d4e]/70 border border-[#1e355b] hover:border-[#D6B15C]/40 rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-center font-bold text-sm text-[#D6B15C] font-mono">
                        {user.id}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {user.name}
                        </h4>
                        <div className="text-[11px] text-[#9EACC1] font-mono">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md font-mono ${
                        isActive
                          ? 'text-[#43B581] bg-[#43B581]/15 border border-[#43B581]/30'
                          : 'text-[#E46B70] bg-[#E46B70]/15 border border-[#E46B70]/30'
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>

                  {/* Body description & details */}
                  <p className="text-xs text-[#9EACC1] mt-3">
                    {user.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#1e355b]/60 space-y-2 text-xs">
                    {user.phone && (
                      <div className="flex items-center gap-2 text-[#9EACC1]">
                        <Phone className="w-3.5 h-3.5 text-[#D6B15C]" />
                        <span className="font-mono text-white/90">{user.phone}</span>
                      </div>
                    )}
                    {user.amount && (
                      <div className="flex items-center justify-between text-[#9EACC1]">
                        <span>Portfolio Balance:</span>
                        <span className="font-bold text-[#D6B15C] font-mono text-sm tabular-nums">
                          {user.amount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action matching Android: Block/Unblock toggle */}
                <div className="mt-5 pt-3 border-t border-[#1e355b]/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-xs text-[#9EACC1] hover:text-white underline underline-offset-4 transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onToggleUserStatus(user.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#E46B70] hover:bg-[#E46B70]/15 border-[#E46B70]/40'
                        : 'text-[#43B581] hover:bg-[#43B581]/15 border-[#43B581]/40'
                    }`}
                  >
                    {isActive ? 'Block User' : 'Unblock User'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
              <div>
                <h3 className="text-base font-bold text-white">{selectedUser.name}</h3>
                <span className="text-xs text-[#9EACC1] font-mono">User Record · {selectedUser.id}</span>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-[#9EACC1] hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#081426] border border-[#1e355b] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#9EACC1]">Account Status:</span>
                  <span className={`font-bold font-mono ${selectedUser.status === 'Active' ? 'text-[#43B581]' : 'text-[#E46B70]'}`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9EACC1]">Phone:</span>
                  <span className="font-mono text-white">{selectedUser.phone || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9EACC1]">Email:</span>
                  <span className="text-white">{selectedUser.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9EACC1]">Registration Date:</span>
                  <span className="font-mono text-white">{selectedUser.date || '2026-11-01'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9EACC1]">Current Balance:</span>
                  <span className="font-bold text-[#D6B15C] font-mono text-sm">{selectedUser.amount || '৳0'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#081426] border border-[#1e355b] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#9EACC1] uppercase">Compliance Status</span>
                <div className="flex items-center gap-2 text-white mt-1">
                  <CheckCircle2 className="w-4 h-4 text-[#43B581]" />
                  <span>Bangladeshi Mobile Verified (+880 OTP)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                onClick={() => {
                  onToggleUserStatus(selectedUser.id);
                  setSelectedUser({
                    ...selectedUser,
                    status: selectedUser.status === 'Active' ? 'Blocked' : 'Active'
                  });
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl border ${
                  selectedUser.status === 'Active'
                    ? 'text-[#E46B70] border-[#E46B70]/40 hover:bg-[#E46B70]/10'
                    : 'text-[#43B581] border-[#43B581]/40 hover:bg-[#43B581]/10'
                }`}
              >
                {selectedUser.status === 'Active' ? 'Block Account' : 'Unblock Account'}
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1e355b] hover:bg-[#284675] rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
