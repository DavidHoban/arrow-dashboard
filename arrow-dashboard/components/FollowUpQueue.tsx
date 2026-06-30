'use client';

import { Store } from '@/types/store';
import { formatDate, isOverdue } from '@/lib/sheets';
import { StageBadge } from './StageBadge';

interface FollowUpQueueProps {
  stores: Store[];
}

export function FollowUpQueue({ stores: allStores }: FollowUpQueueProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = allStores
    .filter(s => {
      if (!s.nextFollowUp || s.stage === 'Lost') return false;
      const d = new Date(s.nextFollowUp);
      return d <= today;
    })
    .sort((a, b) => new Date(a.nextFollowUp).getTime() - new Date(b.nextFollowUp).getTime());

  if (due.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">
          Follow-ups Due Today
        </h2>
        <p className="text-gray-500 text-sm">Nothing due today. You&apos;re all caught up.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0">
          {due.length}
        </span>
        <h2 className="text-sm uppercase tracking-widest text-orange-400 font-medium">
          Follow-ups Due Today
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-2 pr-4">Store</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-2 pr-4">Stage</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-2 pr-4">Last Contact</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-2 pr-4">Due</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-2 pr-4">Contact</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {due.map((store, i) => {
              const overdue = isOverdue(store.nextFollowUp);
              return (
                <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                  <td className="py-3 pr-4 font-medium text-white">{store.name}</td>
                  <td className="py-3 pr-4">
                    <StageBadge stage={store.stage} />
                  </td>
                  <td className="py-3 pr-4 text-gray-400">
                    {formatDate(store.lastContacted)}
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold ${overdue ? 'text-red-400' : 'text-orange-400'}`}>
                      {overdue ? `Overdue (${formatDate(store.nextFollowUp)})` : 'Today'}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {store.phone ? (
                      <a
                        href={`tel:${store.phone}`}
                        className="text-blue-400 hover:text-blue-300 underline text-xs"
                      >
                        {store.phone}
                      </a>
                    ) : store.email ? (
                      <a
                        href={`mailto:${store.email}`}
                        className="text-blue-400 hover:text-blue-300 underline text-xs"
                      >
                        Email
                      </a>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3 text-gray-400 text-xs max-w-xs truncate">
                    {store.notes || '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
