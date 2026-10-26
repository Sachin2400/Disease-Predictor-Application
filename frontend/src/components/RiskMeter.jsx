import React from 'react';
import { AlertTriangle, CheckCircle2, AlertOctagon, TrendingUp } from 'lucide-react';

export default function RiskMeter({ probability, riskLevel, riskColor }) {
  const pct = Math.min(Math.max(probability || 0, 0), 100);

  const getGradient = () => {
    if (pct < 45) return 'from-emerald-500 to-teal-400';
    if (pct < 75) return 'from-amber-500 to-orange-400';
    return 'from-rose-500 to-red-600';
  };

  const getBadgeStyle = () => {
    if (pct < 45) {
      return {
        bg: 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400',
        icon: CheckCircle2,
      };
    }
    if (pct < 75) {
      return {
        bg: 'bg-amber-950/60 border-amber-500/30 text-amber-400',
        icon: AlertTriangle,
      };
    }
    return {
      bg: 'bg-rose-950/60 border-rose-500/30 text-rose-400',
      icon: AlertOctagon,
    };
  };

  const badge = getBadgeStyle();
  const Icon = badge.icon;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
          ML Risk Assessment
        </span>
        <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{riskLevel}</span>
        </div>
      </div>

      {/* Progress Bar & Value Display */}
      <div className="relative pt-2 pb-4">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
              {pct}%
            </span>
            <span className="text-xs text-slate-400 ml-2">Probability Score</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {pct < 45 ? 'Minimal Risk' : pct < 75 ? 'Moderate Caution' : 'High Urgency'}
          </span>
        </div>

        <div className="w-full bg-slate-900 rounded-full h-3.5 p-0.5 overflow-hidden border border-slate-800">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getGradient()} transition-all duration-1000 ease-out`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 px-1">
          <span>0% Normal</span>
          <span>45% Threshold</span>
          <span>75% High Risk</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

