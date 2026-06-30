'use client';

import { useEffect, useState } from 'react';
import { Store } from '@/types/store';

interface BriefModalProps {
  store: Store;
  onClose: () => void;
}

export function BriefModal({ store, onClose }: BriefModalProps) {
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(store),
    })
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        else setBrief(d.brief);
        setLoading(false);
      })
      .catch(() => {
        setError('Something went wrong. Try again.');
        setLoading(false);
      });
  }, [store]);

  const sentences = brief
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.trim().length > 0);

  const icons = ['ð¯', 'ðª', 'ð¬'];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-6 max-w-lg w-full shadow-2xl"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0DDD9' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs uppercase tracking-widest font-medium mb-1" style={{ color: '#888888' }}>
              Pre-Call Brief
            </p>
            <h2 className="font-bold text-lg leading-tight" style={{ color: '#1C1C1C' }}>{store.name}</h2>
            <p className="text-sm mt-0.5" style={{ color: '#ABABAB' }}>{store.type} Â· {store.stage}</p>
          </div>
          <button
            onClick={onClose}
            className="text-xl leading-none transition-colors mt-1"
            style={{ color: '#ABABAB' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ABABAB')}
          >
            â
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex items-center gap-3 py-4">
            <div
              className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: '#1C1C1C', borderTopColor: 'transparent' }}
            />
            <p className="text-sm" style={{ color: '#888888' }}>Generating your briefâ¦</p>
          </div>
        )}

        {error && (
          <p className="text-sm py-4" style={{ color: '#C0392B' }}>{error}</p>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {sentences.map((sentence, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-lg shrink-0 mt-0.5">{icons[i] || 'â¢'}</span>
                <p className="text-sm leading-relaxed" style={{ color: '#1C1C1C' }}>{sentence}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {store.phone && (
          <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: '1px solid #E0DDD9' }}>
            <p className="text-xs" style={{ color: '#ABABAB' }}>Ready to call?</p>
            <a
              href={`tel:${store.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
              style={{ backgroundColor: '#1C1C1C', color: '#FFFFFF' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333333')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1C1C1C')}
            >
              ð Call {store.contactName || store.name}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
