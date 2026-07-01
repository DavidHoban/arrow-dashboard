'use client';

import { useState } from 'react';
import { Store } from '@/types/store';
import { formatDate, isOverdue } from '@/lib/sheets';
import { StageBadge } from './StageBadge';
import { BriefModal } from './BriefModal';

interface FollowUpQueueProps { stores: Store[]; }

export function FollowUpQueue({ stores: allStores }: FollowUpQueueProps) {
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = allStores
    .filter(s => { if (!s.nextFollowUp || s.stage === 'Lost') return false; return new Date(s.nextFollowUp) <= today; })
    .sort((a, b) => new Date(a.nextFollowUp).getTime() - new Date(b.nextFollowUp).getTime());
  if (due.length === 0) return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0DDD9' }}>
      <h2 className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: '#888888' }}>Follow-ups Due Today</h2>
      <p className="text-sm" style={{ color: '#ABABAB' }}>Nothing due today. You&apos;re all caught up.</p>
    </div>
  );
  return (
    <>
      <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0DDD9' }}>
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold shrink-0" style={{ backgroundColor: '#1C1C1C' }}>{due.length}</span>
          <h2 className="text-xs uppercase tracking-widest font-medium" style={{ color: '#1C1C1C' }}>Follow-ups Due Today</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: '1px solid #E0DDD9' }}>
              <th className="text-left text-xs uppercase tracking-wider pb-2 pr-4" style={{ color: '#ABABAB' }}>Store</th>
              <th className="text-left text-xs uppercase tracking-wider pb-2 pr-4" style={{ color: '#ABABAB' }}>Stage</th>
              <th className="text-left text-xs uppercase tracking-wider pb-2 pr-4" style={{ color: '#ABABAB' }}>Last Contact</th>
              <th className="text-left text-xs uppercase tracking-wider pb-2 pr-4" style={{ color: '#ABABAB' }}>Due</th>
              <th className="text-left text-xs uppercase tracking-wider pb-2 pr-4" style={{ color: '#ABABAB' }}>Contact</th>
              <th className="text-left text-xs uppercase tracking-wider pb-2" style={{ color: '#ABABAB' }}></th>
            </tr></thead>
            <tbody>
              {due.map((store, i) => {
                const overdue = isOverdue(store.nextFollowUp);
                return (
                  <tr key={i} className="transition-colors hover:bg-[#F5F2EE]" style={{ borderBottom: '1px solid #F0EDEA' }}>
                    <td className="py-3 pr-4 font-medium" style={{ color: '#1C1C1C' }}>{store.name}</td>
                    <td className="py-3 pr-4"><StageBadge stage={store.stage} /></td>
                    <td className="py-3 pr-4 text-sm" style={{ color: '#888888' }}>{formatDate(store.lastContacted)}</td>
                    <td className="py-3 pr-4"><span className="text-xs font-semibold" style={{ color: overdue ? '#C0392B' : '#1C1C1C' }}>{overdue ? `Overdue (${formatDate(store.nextFollowUp)})` : 'Today'}</span></td>
                    <td className="py-3 pr-4">{store.phone ? (<a href={`tel:${store.phone}`} className="text-xs underline" style={{ color: '#4A90B8' }}>{store.phone}</a>) : store.email ? (<a href={`mailto:${store.email}`} className="text-xs underline" style={{ color: '#4A90B8' }}>Email</a>) : (<span className="text-xs" style={{ color: '#ABABAB' }}>&mdash; </span>)}</td>
                    <td className="py-3"><button onClick={() => setActiveStore(store)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors" style={{ backgroundColor: '#1C1C1C', color: '#FFFFFF' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333333')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1C1C1C')}>Get Brief</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {activeStore && <BriefModal store={activeStore} onClose={() => setActiveStore(null)} />}
    </>
  );
}
