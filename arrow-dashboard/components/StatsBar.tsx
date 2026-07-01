'use client';

import { Store } from '@/types/store';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  urgent?: boolean;
}

function StatCard({ label, value, sub, urgent }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-1"
      style={{
        backgroundColor: urgent ? '#1C1C1C' : '#FFFFFF',
        border: urgent ? 'none' : '1px solid #E0DDD9',
      }}
    >
      <span
        className="text-xs uppercase tracking-widest font-medium"
        style={{ color: urgent ? '#ABABAB' : '#888888' }}
      >
        {label}
      </span>
      <span
        className="text-4xl font-bold tracking-tight"
        style={{ color: urgent ? '#FFFFFF' : '#1C1C1C' }}
      >
        {value}
      </span>
      {sub && (
        <span
          className="text-xs mt-1"
          style={{ color: urgent ? '#888888' : '#ABABAB' }}
        >
          {sub}
        </span>
      )}
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
      <StatCard label="In Pipeline" value={active} sub="active stores" />
      <StatCard label="Stocked / Reordering" value={stockedCount} sub={`${totalUnits} units sold total`} />
      <StatCard label="Close Rate" value={`${closeRate}%`} sub="contacted → stocked" />
      <StatCard label="Follow-ups Due" value={followUpCount} sub="action required today" urgent={followUpCount > 0} />
    </div>
  );
}
