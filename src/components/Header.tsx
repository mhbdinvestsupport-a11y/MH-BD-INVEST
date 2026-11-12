import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Smartphone, 
  Monitor, 
  Code2, 
  Plus, 
  Download,
  AlertCircle
} from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isMobileView: boolean;
  onToggleMobileView: () => void;
  onReset: () => void;
  onOpenKotlinSource: () => void;
  onOpenNewModal: () => void;
  pendingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  isMobileView,
  onToggleMobileView,
  onReset,
  onOpenKotlinSource,
  onOpenNewModal,
  pendingCount,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-[#12233D] border-b border-[#1e355b]/80 shadow-lg backdrop-blur-md">
      {/* Zone 1: Single text wordmark with brand styling */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D6B15C] to-[#a8822f] flex items-center justify-center shadow-md shadow-[#D6B15C]/10 text-[#081426] font-extrabold text-sm tracking-wider">
          MH
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight text-[#D6B15C] whitespace-nowrap">
              MH BD INVEST
            </span>
            <span className="text-[11px] font-semibold text-[#9EACC1] tracking-wider uppercase border border-[#1e355b] px-1.5 py-0.5 rounded">
              Admin
            </span>
          </div>
          <div className="text-[11px] text-[#9EACC1] tracking-wider font-medium">
            ADMIN CONTROL PANEL · BANGLADESH
          </div>
        </div>
      </div>

      {/* Zone 2: Navigation Links / Breadcrumbs */}
      <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-[#9EACC1]">
        <span className="text-[#D6B15C]/80 font-semibold">Console</span>
        <span className="text-[#9EACC1]/40">/</span>
        <span className="text-white font-semibold">{currentTab}</span>
        {pendingCount > 0 && (
          <span className="ml-2 text-[11px] font-mono tabular-nums text-[#D6B15C] bg-[#D6B15C]/10 border border-[#D6B15C]/30 px-2 py-0.5 rounded-full">
            {pendingCount} Pending Reviews
          </span>
        )}
      </div>

      {/* Zone 3: Primary Action & Utility Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Toggle between Web Dashboard and Android Device Frame */}
        <button
          onClick={onToggleMobileView}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            isMobileView
              ? 'bg-[#D6B15C] text-[#081426] border-[#D6B15C] shadow-sm'
              : 'bg-[#081426] text-[#9EACC1] border-[#1e355b] hover:text-white hover:border-[#D6B15C]/50'
          }`}
          title="Toggle Android Compose Mobile Emulator"
        >
          {isMobileView ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">Desktop Layout</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-[#D6B15C]" />
              <span className="whitespace-nowrap">Android View</span>
            </>
          )}
        </button>

        {/* View Kotlin Jetpack Compose Code */}
        <button
          onClick={onOpenKotlinSource}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#9EACC1] bg-[#081426] border border-[#1e355b] rounded-lg hover:text-[#D6B15C] hover:border-[#D6B15C]/40 transition-colors"
          title="View original Android Jetpack Compose code"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">Kotlin Code</span>
        </button>

        {/* Quick Add New Request */}
        <button
          onClick={onOpenNewModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-lg transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Entry</span>
        </button>

        {/* Reset button matching Android TopAppBar action */}
        <button
          onClick={onReset}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#D6B15C] hover:text-[#e2c172] hover:bg-[#1e355b]/50 rounded-lg transition-colors"
          title="Reset search filters and sample data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};
