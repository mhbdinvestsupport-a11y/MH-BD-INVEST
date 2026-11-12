import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Key, 
  Smartphone, 
  Globe, 
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { SecurityLog } from '../types';

interface SecuritySectionProps {
  logs: SecurityLog[];
  onTriggerSecurityScan: () => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  logs,
  onTriggerSecurityScan,
}) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [ipWhitelisting, setIpWhitelisting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onTriggerSecurityScan();
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#D6B15C] tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-[#D6B15C]" />
            Security Alerts
          </h2>
          <p className="text-xs text-[#9EACC1] mt-0.5">
            Real-time administrative threat detection, OTP verification telemetry & session shielding
          </p>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className="px-3.5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors flex items-center gap-1.5 shadow-sm self-start sm:self-auto disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning Network...' : 'Run Security Check'}</span>
        </button>
      </div>

      {/* Security Health Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#9EACC1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Firewall Status</span>
            <ShieldCheck className="w-4 h-4 text-[#43B581]" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-3 font-mono">
            ENFORCED
          </div>
          <p className="text-[11px] text-[#43B581] mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Zero unauthorized breach attempts
          </p>
        </div>

        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#9EACC1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Super Admin 2FA</span>
            <Smartphone className="w-4 h-4 text-[#D6B15C]" />
          </div>
          <div className="text-2xl font-extrabold text-[#D6B15C] mt-3 font-mono">
            {twoFactorEnabled ? 'ACTIVE (OTP)' : 'DISABLED'}
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className="text-[11px] text-[#9EACC1] hover:text-white underline mt-1 block"
          >
            {twoFactorEnabled ? 'Configure backup keys' : 'Enable 2FA Protection'}
          </button>
        </div>

        <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#9EACC1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Geo-Fencing</span>
            <Globe className="w-4 h-4 text-[#43B581]" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-3 font-mono">
            BANGLADESH (+880)
          </div>
          <p className="text-[11px] text-[#9EACC1] mt-1">
            Dhaka, Chittagong, Sylhet data centers
          </p>
        </div>
      </div>

      {/* Main Security Event Records (Matching Compose InformationSection) */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#D6B15C] uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>Security Alert Feeds</span>
          <span className="text-xs font-mono text-[#9EACC1] font-normal">({logs.length} events recorded)</span>
        </h3>

        <div className="space-y-3">
          {logs.map((log) => {
            const isWarning = log.level === 'warning';
            return (
              <div
                key={log.id}
                className="bg-[#081426] hover:bg-[#0c1c34] border border-[#1e355b] hover:border-[#D6B15C]/40 rounded-xl p-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isWarning 
                        ? 'bg-[#E46B70]/15 text-[#E46B70] border border-[#E46B70]/30'
                        : 'bg-[#43B581]/15 text-[#43B581] border border-[#43B581]/30'
                    }`}>
                      {isWarning ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white tracking-wide">
                        {log.event}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-[#9EACC1] font-mono">
                        <span>Event ID: <strong className="text-white/80">{log.id}</strong></span>
                        <span>·</span>
                        <span>IP: <strong className="text-white/80">{log.ip}</strong></span>
                        <span>·</span>
                        <span>Location: {log.location}</span>
                        <span>·</span>
                        <span>Client: {log.device}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-[#D6B15C] shrink-0 self-start sm:self-auto">
                    {log.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
