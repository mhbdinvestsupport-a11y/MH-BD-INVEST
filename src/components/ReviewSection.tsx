import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  X, 
  Download, 
  Eye, 
  FileCheck2, 
  ArrowDownLeft, 
  ArrowUpRight, 
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  Filter
} from 'lucide-react';
import { AdminItem } from '../types';

interface ReviewSectionProps {
  title: string;
  items: AdminItem[];
  searchText: string;
  onSearchChange: (text: string) => void;
  allowActions?: boolean;
  onAction?: (id: string, newStatus: 'Approved' | 'Rejected' | 'Completed') => void;
  onOpenNewModal?: () => void;
  category?: 'kyc' | 'deposit' | 'withdrawal' | 'transaction';
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  title,
  items,
  searchText,
  onSearchChange,
  allowActions = true,
  onAction,
  onOpenNewModal,
  category = 'deposit',
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [inspectDoc, setInspectDoc] = useState<AdminItem | null>(null);

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.amount && item.amount.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.method && item.method.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.trxId && item.trxId.toLowerCase().includes(searchText.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Pending'
        ? item.status === 'Pending'
        : statusFilter === 'Completed'
        ? item.status === 'Completed' || item.status === 'Approved'
        : item.status === 'Rejected';

    return matchesSearch && matchesStatus;
  });

  const getMethodBadge = (method?: string) => {
    if (!method) return null;
    const lower = method.toLowerCase();
    if (lower.includes('bkash')) {
      return (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E2136E]/15 text-[#E2136E] border border-[#E2136E]/30">
          bKash
        </span>
      );
    }
    if (lower.includes('nagad')) {
      return (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F7941D]/15 text-[#F7941D] border border-[#F7941D]/30">
          Nagad
        </span>
      );
    }
    if (lower.includes('rocket')) {
      return (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#8C3494]/15 text-[#8C3494] border border-[#8C3494]/30">
          Rocket
        </span>
      );
    }
    return (
      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#1e355b] text-white/80 border border-[#1e355b]">
        {method}
      </span>
    );
  };

  const exportCsv = () => {
    const headers = ['ID', 'Name', 'Description', 'Amount', 'Method', 'Status', 'Date', 'TrxID'];
    const rows = filtered.map((i) => [
      i.id,
      `"${i.name}"`,
      `"${i.description}"`,
      i.amount || '',
      i.method || '',
      i.status,
      i.date || '',
      i.trxId || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#D6B15C] tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-[#9EACC1] mt-0.5">
            Real-time queue · Approving records instantly validates state and logs an audit trail
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="px-3 py-2 text-xs font-semibold text-[#9EACC1] hover:text-white bg-[#12233D] hover:bg-[#1e355b] border border-[#1e355b] rounded-xl transition-colors flex items-center gap-1.5"
            title="Download records as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {onOpenNewModal && (
            <button
              onClick={onOpenNewModal}
              className="px-3.5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              + Create Demo Entry
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-[#12233D] border border-[#1e355b] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9EACC1] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, ID, or amount..."
            className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white text-xs rounded-xl pl-9 pr-3.5 py-2 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#081426] border border-[#1e355b] rounded-xl w-full sm:w-auto overflow-x-auto">
          {['All', 'Pending', 'Completed', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-[#12233D] text-[#D6B15C] border border-[#D6B15C]/30 shadow-sm'
                  : 'text-[#9EACC1] hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List matching Jetpack Compose AdminCard visual style */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#12233D]/60 border border-[#1e355b] rounded-2xl p-8">
          <Clock className="w-10 h-10 text-[#9EACC1]/40 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white">No matching requests found</p>
          <p className="text-xs text-[#9EACC1] mt-1">
            There are currently no items matching "{searchText}" in this queue.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isApproved = item.status === 'Approved' || item.status === 'Completed' || item.status === 'Active';
            const isRejected = item.status === 'Rejected' || item.status === 'Blocked';
            const isPending = item.status === 'Pending';

            return (
              <div
                key={item.id}
                className="bg-[#12233D] hover:bg-[#172d4e]/60 border border-[#1e355b] hover:border-[#D6B15C]/30 rounded-2xl p-5 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-center font-bold text-xs font-mono text-[#D6B15C] shrink-0">
                      {item.id}
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-mono text-[#9EACC1]">
                          ID: {item.id}
                        </span>
                        {getMethodBadge(item.method)}
                      </div>

                      <p className="text-xs text-[#9EACC1] mt-1">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-[#9EACC1] font-mono">
                        {item.trxId && (
                          <span>TrxID: <strong className="text-white">{item.trxId}</strong></span>
                        )}
                        {item.accountNumber && (
                          <span>Account: <strong className="text-white">{item.accountNumber}</strong></span>
                        )}
                        {item.nidNumber && (
                          <span>NID: <strong className="text-white">{item.nidNumber}</strong></span>
                        )}
                        {item.date && (
                          <span>Date: {item.date}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side: Amount and Status */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#1e355b]/60 shrink-0">
                    {item.amount && (
                      <div className="text-lg font-extrabold text-[#D6B15C] font-mono tabular-nums">
                        {item.amount}
                      </div>
                    )}
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded mt-0.5 ${
                        isApproved
                          ? 'text-[#43B581] bg-[#43B581]/15'
                          : isRejected
                          ? 'text-[#E46B70] bg-[#E46B70]/15'
                          : 'text-[#D6B15C] bg-[#D6B15C]/15'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Action buttons (Approve & Reject) matching Compose code */}
                <div className="mt-4 pt-3 border-t border-[#1e355b]/60 flex items-center justify-between gap-3">
                  {item.nidNumber ? (
                    <button
                      onClick={() => setInspectDoc(item)}
                      className="text-xs text-[#D6B15C] hover:text-[#e2c172] flex items-center gap-1 font-semibold underline underline-offset-4"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Bangladesh Smart NID</span>
                    </button>
                  ) : (
                    <div className="text-[11px] text-[#9EACC1]">
                      System Verification: Standard Gateway Check
                    </div>
                  )}

                  {allowActions && isPending && onAction && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAction(item.id, 'Rejected')}
                        className="px-3.5 py-1.5 text-xs font-bold text-[#E46B70] hover:bg-[#E46B70]/15 border border-[#E46B70]/50 rounded-xl transition-colors"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => onAction(item.id, 'Approved')}
                        className="px-4 py-1.5 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shadow-sm"
                      >
                        Approve
                      </button>
                    </div>
                  )}

                  {!isPending && (
                    <span className="text-[11px] text-[#9EACC1] font-mono">
                      Decision Recorded
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Document Inspector Modal for Bangladeshi NID */}
      {inspectDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
              <div>
                <h3 className="text-base font-bold text-white">KYC Document Inspection</h3>
                <span className="text-xs text-[#9EACC1]">Government of the People's Republic of Bangladesh</span>
              </div>
              <button
                onClick={() => setInspectDoc(null)}
                className="text-[#9EACC1] hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Simulated Smart National ID Card */}
            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-[#0c231a] to-[#081426] border-2 border-[#43B581]/40 shadow-inner relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-[#43B581]/30 pb-2 mb-3">
                <div>
                  <div className="text-[10px] font-bold text-[#43B581] uppercase tracking-wider">
                    Government of the People's Republic of Bangladesh
                  </div>
                  <div className="text-xs font-bold text-white tracking-wide">
                    NATIONAL IDENTITY CARD / জাতীয় পরিচয় পত্র
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#E2136E]/20 border border-[#E2136E]/50 flex items-center justify-center text-[9px] text-[#E2136E] font-bold">
                  BD
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-20 h-24 rounded-lg bg-[#12233D] border border-[#43B581]/30 flex flex-col items-center justify-center text-[#9EACC1] text-[10px] shrink-0 font-mono">
                  [ PHOTO ]
                </div>
                <div className="space-y-1.5 text-xs text-white">
                  <div>
                    <span className="text-[10px] text-[#9EACC1] block">Name / নাম:</span>
                    <strong className="text-sm font-bold text-[#D6B15C]">{inspectDoc.name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9EACC1] block">NID NO:</span>
                    <strong className="font-mono text-white text-xs tracking-wider">{inspectDoc.nidNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9EACC1] block">Verification Status:</span>
                    <span className="text-[#43B581] font-bold font-mono">Biometrics Matched</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#43B581]/20 flex justify-between text-[10px] font-mono text-[#9EACC1]">
                <span>Type: Smart NID 10-Digit</span>
                <span>Security Chip: Verified</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              {allowActions && inspectDoc.status === 'Pending' && onAction && (
                <>
                  <button
                    onClick={() => {
                      onAction(inspectDoc.id, 'Rejected');
                      setInspectDoc(null);
                    }}
                    className="px-4 py-2 text-xs font-bold text-[#E46B70] border border-[#E46B70]/40 hover:bg-[#E46B70]/15 rounded-xl transition-colors"
                  >
                    Reject KYC
                  </button>
                  <button
                    onClick={() => {
                      onAction(inspectDoc.id, 'Approved');
                      setInspectDoc(null);
                    }}
                    className="px-4 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shadow-sm"
                  >
                    Approve KYC
                  </button>
                </>
              )}
              <button
                onClick={() => setInspectDoc(null)}
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
