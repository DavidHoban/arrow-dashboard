'use client';

import { useState, useMemo } from 'react';
import { Store, Stage, STAGE_ORDER } from '@/types/store';
import { formatDate, isOverdue } from '@/lib/sheets';
import { StageBadge } from './StageBadge';

interface StoreTableProps {
  stores: Store[];
}

export function StoreTable({ stores }: StoreTableProps) {
  const [stageFilter, setStageFilter] = useState<Stage | 'All'>('All');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof Store>('nextFollowUp');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    return stores
      .filter(s => stageFilter === 'All' || s.stage === stageFilter)
      .filter(s =>
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.contactName.toLowerCase().includes(search.toLowerCase()) ||
        s.notes.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const va = String(a[sortField] || '');
        const vb = String(b[sortField] || '');
        return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      });
  }, [stores, stageFilter, search, sortField, sortAsc]);

  function toggleSort(field: keyof Store) {
    if (sortField === field) setSortAsc(x => !x);
    else { setSortField(field); setSortAsc(true); }
  }

  function SortHeader({ field, label }: { field: keyof Store; label: string }) {
    const active = sortField === field;
    return (
      <th
        className="text-left text-xs uppercase tracking-wider pb-2 pr-4 cursor-pointer select-none"
        style={{ color: active ? '#1C1C1C' : '#ABABAB' }}
        onClick={() => toggleSort(field)}
      >
        {label} {active ? (sortAsc ? 'â' : 'â') : ''}
      </th>
    );
  }

  const stageCounts = STAGE_ORDER.reduce((acc, s) => {
    acc[s] = stores.filter(st => st.stage === s).length;
    return acc;
  }, {} as Record<Stage, number>);

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0DDD9' }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <h2 className="text-xs uppercase tracking-widest font-medium" style={{ color: '#888888' }}>All Stores</h2>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-lg px-3 py-1.5 text-sm focus:outline-none w-48 transition-colors"
            style={{
              backgroundColor: '#F5F2EE',
              border: '1px solid #E0DDD9',
              color: '#1C1C1C',
            }}
          />
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setStageFilter('All')}
              className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
              style={{
                backgroundColor: stageFilter === 'All' ? '#1C1C1C' : '#F5F2EE',
                color: stageFilter === 'All' ? '#FFFFFF' : '#888888',
              }}
            >
              All ({stores.length})
            </button>
            {STAGE_ORDER.map(stage => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                style={{
                  backgroundColor: stageFilter === stage ? '#1C1C1C' : '#F5F2EE',
                  color: stageFilter === stage ? '#FFFFFF' : '#888888',
                }}
              >
                {stage} ({stageCounts[stage] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm" style={{ color: '#ABABAB' }}>No stores match your filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #E0DDD9' }}>
                <SortHeader field="name" label="Store" />
                <SortHeader field="type" label="Type" />
                <SortHeader field="stage" label="Stage" />
                <SortHeader field="contactName" label="Contact" />
                <SortHeader field="lastContacted" label="Last Contact" />
                <SortHeader field="nextFollowUp" label="Next Follow-up" />
                <SortHeader field="unitsOrdered" label="Units" />
                <th className="text-left text-xs uppercase tracking-wider pb-2" style={{ color: '#ABABAB' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((store, i) => {
                const overdue = isOverdue(store.nextFollowUp) && store.stage !== 'Lost';
                return (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-[#F5F2EE]"
                    style={{ borderBottom: '1px solid #F0EDEA' }}
                  >
                    <td className="py-3 pr-4 font-medium" style={{ color: '#1C1C1C' }}>{store.name}</td>
                    <td className="py-3 pr-4 text-xs" style={{ color: '#888888' }}>{store.type}</td>
                    <td className="py-3 pr-4">
                      <StageBadge stage={store.stage} />
                    </td>
                    <td className="py-3 pr-4" style={{ color: '#888888' }}>
                      {store.contactName || <span style={{ color: '#ABABAB' }}>&mdash;</span>}
                    </td>
                    <td className="py-3 pr-4" style={{ color: '#888888' }}>
                      {formatDate(store.lastContacted)}
                    </td>
                    <td className="py-3 pr-4">
                      {store.nextFollowUp ? (
                        <span style={{ color: overdue ? '#C0392B' : '#888888', fontWeight: overdue ? 600 : 400 }}>
                          {overdue ? 'â ï¸ ' : ''}{formatDate(store.nextFollowUp)}
                        </span>
                      ) : (
                        <span style={{ color: '#ABABAB' }}>&mdash;</span>
                      )}
                    </td>
                    <td className="py-3 pr-4" style={{ color: '#1C1C1C' }}>
                      {store.unitsOrdered > 0 ? store.unitsOrdered : <span style={{ color: '#ABABAB' }}>&mdash;</span>}
                    </td>
                    <td className="py-3 text-xs max-w-xs" style={{ color: '#888888' }}>
                      <span className="line-clamp-2">{store.notes || 'â'}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs mt-3" style={{ color: '#ABABAB' }}>
            {filtered.length} store{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
