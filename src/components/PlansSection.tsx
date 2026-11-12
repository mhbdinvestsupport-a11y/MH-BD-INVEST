import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calculator, 
  Plus, 
  Edit3, 
  Check, 
  Clock, 
  Percent, 
  Layers,
  AlertCircle
} from 'lucide-react';
import { InvestmentPlan } from '../types';

interface PlansSectionProps {
  plans: InvestmentPlan[];
  onTogglePlan: (id: string) => void;
  onUpdatePlan: (updatedPlan: InvestmentPlan) => void;
  onAddPlan: (newPlan: InvestmentPlan) => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({
  plans,
  onTogglePlan,
  onUpdatePlan,
  onAddPlan,
}) => {
  const [calcAmount, setCalcAmount] = useState<number>(10000);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[0]?.id || 'PLAN-1');
  const [showAddModal, setShowAddModal] = useState(false);

  // New plan state
  const [newTitle, setNewTitle] = useState('45 Days Plan');
  const [newDays, setNewDays] = useState(45);
  const [newPercent, setNewPercent] = useState(6.0);
  const [newMin, setNewMin] = useState('৳25,000');
  const [newMax, setNewMax] = useState('৳1,000,000');

  const activePlan = plans.find((p) => p.id === selectedPlanId) || plans[0];
  const dailyProfit = activePlan ? (calcAmount * activePlan.dailyPercent) / 100 : 0;
  const totalProfit = activePlan ? dailyProfit * activePlan.periodDays : 0;
  const totalReturn = calcAmount + totalProfit;

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InvestmentPlan = {
      id: `PLAN-${Date.now().toString().slice(-4)}`,
      title: newTitle,
      rate: `${newPercent}% daily`,
      periodDays: newDays,
      dailyPercent: newPercent,
      minAmount: newMin,
      maxAmount: newMax,
      tag: 'Demo only',
      isActive: true,
    };
    onAddPlan(created);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#D6B15C] tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#D6B15C]" />
            Demo Plan Management
          </h2>
          <p className="text-xs text-[#9EACC1] mt-0.5">
            Illustrative rates only. Not an actual investment offer.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Plan</span>
        </button>
      </div>

      {/* Plans Grid (Matching Android Cards Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`cursor-pointer rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#12233D] border-[#D6B15C] shadow-lg shadow-[#D6B15C]/10 scale-[1.01]'
                  : 'bg-[#12233D] border-[#1e355b] hover:border-[#D6B15C]/50 hover:bg-[#172d4e]/70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {plan.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#D6B15C] bg-[#D6B15C]/10 border border-[#D6B15C]/30 px-2 py-0.5 rounded-full">
                    {plan.tag}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-3xl font-extrabold text-[#D6B15C] font-mono tracking-tight">
                    {plan.rate}
                  </div>
                  <div className="text-xs text-[#9EACC1] mt-1 font-mono">
                    Duration: {plan.periodDays} Days
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1e355b]/60 space-y-1.5 text-xs text-[#9EACC1]">
                  <div className="flex justify-between">
                    <span>Min Investment:</span>
                    <strong className="text-white font-mono">{plan.minAmount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Investment:</span>
                    <strong className="text-white font-mono">{plan.maxAmount}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#1e355b]/60 flex items-center justify-between">
                <span className={`text-[11px] font-bold font-mono ${plan.isActive ? 'text-[#43B581]' : 'text-[#E46B70]'}`}>
                  {plan.isActive ? '● ACTIVE' : '○ PAUSED'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePlan(plan.id);
                  }}
                  className="text-xs text-[#9EACC1] hover:text-[#D6B15C] transition-colors"
                >
                  {plan.isActive ? 'Pause Plan' : 'Activate'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Yield Calculator */}
      <div className="bg-[#12233D] border border-[#1e355b] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#1e355b]/60">
          <div>
            <h3 className="text-sm font-bold text-[#D6B15C] uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Administrative ROI Projection Calculator
            </h3>
            <p className="text-xs text-[#9EACC1] mt-0.5">
              Simulate investment returns across Bangladeshi Taka (৳) brackets
            </p>
          </div>
          <span className="text-xs font-mono text-[#D6B15C] bg-[#D6B15C]/10 border border-[#D6B15C]/30 px-2 py-1 rounded">
            Selected: {activePlan?.title}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#9EACC1] uppercase tracking-wider block mb-2">
                Simulated Principal Deposit (৳ BDT)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#D6B15C] text-sm">
                  ৳
                </span>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#081426] border border-[#1e355b] focus:border-[#D6B15C] text-white font-mono text-base font-bold rounded-xl pl-8 pr-4 py-2.5 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {[5000, 10000, 25000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setCalcAmount(amt)}
                  className="flex-1 py-1.5 px-1 bg-[#081426] hover:bg-[#1e355b] text-[11px] font-mono text-[#9EACC1] hover:text-[#D6B15C] border border-[#1e355b] rounded-lg transition-colors"
                >
                  ৳{amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Results Card */}
          <div className="bg-[#081426] border border-[#1e355b] rounded-xl p-5 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-[#9EACC1]">
              <span>Daily Payout Rate:</span>
              <span className="text-[#D6B15C] font-bold">{activePlan?.rate}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#9EACC1]">
              <span>Daily Profit (৳):</span>
              <span className="text-white font-bold tabular-nums">৳{dailyProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#9EACC1]">
              <span>Total Profit over {activePlan?.periodDays} Days:</span>
              <span className="text-[#43B581] font-bold tabular-nums">+৳{totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="pt-2 border-t border-[#1e355b] flex items-center justify-between text-sm">
              <span className="text-white font-bold">Total Maturity Return:</span>
              <span className="text-lg font-extrabold text-[#D6B15C] tabular-nums">
                ৳{totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreatePlan} className="bg-[#12233D] border border-[#1e355b] w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
              <h3 className="text-base font-bold text-white">Create New Investment Plan</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#9EACC1] hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="text-[#9EACC1] block mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl focus:border-[#D6B15C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#9EACC1] block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newDays}
                    onChange={(e) => setNewDays(Number(e.target.value))}
                    className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl focus:border-[#D6B15C] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[#9EACC1] block mb-1">Daily Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    min="0.1"
                    value={newPercent}
                    onChange={(e) => setNewPercent(Number(e.target.value))}
                    className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl focus:border-[#D6B15C] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#9EACC1] block mb-1">Min Amount</label>
                  <input
                    type="text"
                    required
                    value={newMin}
                    onChange={(e) => setNewMin(e.target.value)}
                    className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl focus:border-[#D6B15C] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[#9EACC1] block mb-1">Max Amount</label>
                  <input
                    type="text"
                    required
                    value={newMax}
                    onChange={(e) => setNewMax(e.target.value)}
                    className="w-full bg-[#081426] border border-[#1e355b] text-white p-2.5 rounded-xl focus:border-[#D6B15C] focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1e355b] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl"
              >
                Save Plan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
