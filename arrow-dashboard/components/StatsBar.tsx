'use client';

import { Store } from '@/types/store';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  urgent?: boolean;
}

function StatCard({ label, value, sub, urgent }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-5 flex flex-col gap-1 ${
      urgent
        ? 'bg-orange-500/10 border-orange-500/40'
        : 'bg-white/5 border-white/10'
    }`}>
      <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">{label}</span>
      <span className={`text-4xl font-bold tracking-tight ${urgent ? 'text-orange-400' : 'text-white'}`}>
        {value}
      </span>
      {sub && <span className="text-xs text-gray-500 mt-1">{sub}</span>}
    </div>
  );
}

interface StatsBarProps {
  stores: Store[];
  followUpCount: number;
  totalUnits: number;
  stockedCount: number;
  closeRate: number;
}

export function StatsBar({ stores, followUpCount, totalUnits, stockedCount, closeRate }: StatsBarProps) {
  const active = stores.filter(s => s.stage !== 'Lost').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="In Pipeline"
        value={active}
        sub="active stores"
      />
      <StatCard
        label="Stocked / Reordering"
        value={stockedCount}
        sub={`${totalUnits} units sold total`}
      />
      <StatCard
        label="Close Rate"
        value={`${closeRate}%`}
        sub="contacted → stocked"
      />
      <StatCard
        label="Follow-ups Due"
        value={followUpCount}
        sub="action required today"
        urgent={followUpCount > 0}
      />
    </div>
  );
}
