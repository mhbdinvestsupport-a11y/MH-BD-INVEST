import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Calendar, 
  User, 
  CheckCircle2, 
  Clock,
  Printer
} from 'lucide-react';
import { AuditLog } from '../types';

interface AuditSectionProps {
  logs: AuditLog[];
}

export const AuditSection: React.FC<AuditSectionProps> = ({ logs }) => {
  const [search, setSearch] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      (l.details && l.details.toLowerCase().includes(search.toLowerCase())) ||
      (l.targetId && l.targetId.toLowerCase().includes(search.toLowerCase()))
  );

  const exportCsv = () => {
    const headers = ['Log ID', 'Action', 'Actor', 'Timestamp', 'Target ID', 'Details'];
    const rows = filtered.map((l) => [
      l.id,
      `"${l.action}"`,
      `"${l.actor}"`,
      `"${l.timestamp}"`,
      l.targetId || '',
      `"${l.details || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mh_bd_invest_audit_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#D6B15C] tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#D6B15C]" />
            Audit Reports
          </h2>
          <p className="text-xs text-[#9EACC1] mt-0.5">
            Immutable compliance record · Every approval, rejection, and state modification is logged
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="px-3.5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="p-4 bg-[#12233D] border border-[#1e355b] rounded-2xl flex items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9EACC1] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by keyword or actor..."
            className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white text-xs rounded-xl pl-9 pr-3.5 py-2 focus:outline-none transition-colors"
          />
        </div>

        <div className="hidden sm:block text-xs font-mono text-[#9EACC1]">
          Total Entries: <strong className="text-[#D6B15C]">{filtered.length}</strong>
        </div>
      </div>

      {/* Audit Log Entries List */}
      <div className="space-y-3">
        {filtered.map((log) => (
          <div
            key={log.id}
            className="bg-[#12233D] hover:bg-[#172d4e]/70 border border-[#1e355b] hover:border-[#D6B15C]/40 rounded-2xl p-5 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#081426] border border-[#1e355b] flex items-center justify-center text-[#D6B15C] shrink-0 font-mono text-xs font-bold mt-0.5">
                LOG
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {log.action}
                  </h4>
                  {log.targetId && (
                    <span className="text-[11px] font-mono text-[#D6B15C] bg-[#D6B15C]/10 border border-[#D6B15C]/30 px-1.5 py-0.5 rounded">
                      Ref: {log.targetId}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[#9EACC1]">
                  <span>Actor: <strong className="text-white/80">{log.actor}</strong></span>
                  {log.details && (
                    <>
                      <span>·</span>
                      <span className="text-white/70">{log.details}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:self-center self-start text-[11px] font-mono text-[#9EACC1] border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1e355b]/60">
              <Clock className="w-3.5 h-3.5 text-[#D6B15C]" />
              <span>{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
