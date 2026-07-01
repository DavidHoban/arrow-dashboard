'use client';

import { Stage, STAGE_ORDER, STAGE_COLORS } from '@/types/store';

interface PipelineFunnelProps {
  stageCounts: Partial<Record<Stage, number>>;
}

export function PipelineFunnel({ stageCounts }: PipelineFunnelProps) {
  const activeStages = STAGE_ORDER.filter(s => s !== 'Lost');
  const maxCount = Math.max(...activeStages.map(s => stageCounts[s] || 0), 1);

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0DDD9' }}>
      <h2 className="text-xs uppercase tracking-widest font-medium mb-6" style={{ color: '#888888' }}>
        Pipeline Stages
      </h2>
      <div className="space-y-3">
        {activeStages.map((stage) => {
          const count = stageCounts[stage] || 0;
          const pct = Math.max((count / maxCount) * 100, count > 0 ? 4 : 0);
          return (
            <div key={stage} className="flex items-center gap-4">
              <span className="text-sm w-24 shrink-0" style={{ color: '#888888' }}>{stage}</span>
              <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ backgroundColor: '#F5F2EE' }}>
                <div
                  className="h-full rounded-lg flex items-center px-3 transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: STAGE_COLORS[stage],
                    opacity: count === 0 ? 0.25 : 1,
                  }}
                >
                  {count > 0 && (
                    <span className="text-xs font-bold text-white">{count}</span>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold w-6 text-right shrink-0" style={{ color: '#1C1C1C' }}>
                {count}
              </span>
            </div>
          );
        })}
        <div className="pt-3 flex items-center gap-4" style={{ borderTop: '1px solid #E0DDD9' }}>
          <span className="text-sm w-24 shrink-0" style={{ color: '#ABABAB' }}>Lost</span>
          <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ backgroundColor: '#F5F2EE' }}>
            <div
              className="h-full rounded-lg flex items-center px-3"
              style={{
                width: `${Math.max(((stageCounts['Lost'] || 0) / maxCount) * 100, stageCounts['Lost'] ? 4 : 0)}%`,
                backgroundColor: STAGE_COLORS['Lost'],
                opacity: (stageCounts['Lost'] || 0) === 0 ? 0.25 : 0.6,
              }}
            >
              {(stageCounts['Lost'] || 0) > 0 && (
                <span className="text-xs font-bold" style={{ color: '#FFFFFF' }}>{stageCounts['Lost']}</span>
              )}
            </div>
          </div>
          <span className="text-sm font-semibold w-6 text-right shrink-0" style={{ color: '#ABABAB' }}>
            {stageCounts['Lost'] || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Stage, STAGE_ORDER, STAGE_COLORS } from '@/types/store';

interface PipelineFunnelProps {
  stageCounts: Partial<Record<Stage, number>>;
}

export function PipelineFunnel({ stageCounts }: PipelineFunnelProps) {
  const activeStages = STAGE_ORDER.filter(s => s !== 'Lost');
  const maxCount = Math.max(...activeStages.map(s => stageCounts[s] || 0), 1);

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0DDD9' }}>
      <h2 className="text-xs uppercase tracking-widest font-medium mb-6" style={{ color: '#888888' }}>
        Pipeline Stages
      </h2>
      <div className="space-y-3">
        {activeStages.map((stage) => {
          const count = stageCounts[stage] || 0;
          const pct = Math.max((count / maxCount) * 100, count > 0 ? 4 : 0);
          return (
            <div key={stage} className="flex items-center gap-4">
              <span className="text-sm w-24 shrink-0" style={{ color: '#888888' }}>{stage}</span>
              <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ backgroundColor: '#F5F2EE' }}>
                <div
                  className="h-full rounded-lg flex items-center px-3 transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: STAGE_COLORS[stage],
                    opacity: count === 0 ? 0.25 : 1,
                  }}
                >
                  {count > 0 && (
                    <span className="text-xs font-bold text-white">{count}</span>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold w-6 text-right shrink-0" style={{ color: '#1C1C1C' }}>
                {count}
              </span>
            </div>
          );
        })}

        {/* Lost row */}
        <div className="pt-3 flex items-center gap-4" style={{ borderTop: '1px solid #E0DDD9' }}>
          <span className="text-sm w-24 shrink-0" style={{ color: '#ABABAB' }}>Lost</span>
          <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ backgroundColor: '#F5F2EE' }}>
            <div
              className="h-full rounded-lg flex items-center px-3"
              style={{
                width: `${Math.max(((stageCounts['Lost'] || 0) / maxCount) * 100, stageCounts['Lost'] ? 4 : 0)}%`,
                backgroundColor: STAGE_COLORS['Lost'],
                opacity: (stageCounts['Lost'] || 0) === 0 ? 0.25 : 0.6,
              }}
            >
              {(stageCounts['Lost'] || 0) > 0 && (
                <span className="text-xs font-bold" style={{ color: '#FFFFFF' }}>{stageCounts['Lost']}</span>
              )}
            </div>
          </div>
          <span className="text-sm font-semibold w-6 text-right shrink-0" style={{ color: '#ABABAB' }}>
            {stageCounts['Lost'] || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Stage, STAGE_ORDER, STAGE_COLORS } from '@/types/store';

interface PipelineFunnelProps {
  stageCounts: Partial<Record<Stage, number>>;
}

const STAGE_LABELS: Record<Stage, string> = {
  Lead: 'Lead',
  Contacted: 'Contacted',
  Sampled: 'Sampled',
  Stocked: 'Stocked',
  Reordering: 'Reordering',
  Lost: 'Lost',
};

export function PipelineFunnel({ stageCounts }: PipelineFunnelProps) {
  const activeStages = STAGE_ORDER.filter(s => s !== 'Lost');
  const maxCount = Math.max(...activeStages.map(s => stageCounts[s] || 0), 1);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-6">Pipeline Stages</h2>
      <div className="space-y-3">
        {activeStages.map((stage) => {
          const count = stageCounts[stage] || 0;
          const pct = Math.max((count / maxCount) * 100, count > 0 ? 4 : 0);
          return (
            <div key={stage} className="flex items-center gap-4">
              <span className="text-sm text-gray-400 w-24 shrink-0">{STAGE_LABELS[stage]}</span>
              <div className="flex-1 h-7 bg-white/5 rounded-md overflow-hidden">
                <div
                  className="h-full rounded-md flex items-center px-3 transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: STAGE_COLORS[stage],
                    opacity: count === 0 ? 0.2 : 1,
                  }}
                >
                  {count > 0 && (
                    <span className="text-xs font-bold text-white">{count}</span>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold text-white w-6 text-right shrink-0">{count}</span>
            </div>
          );
        })}
        {/* Lost row - separated */}
        <div className="border-t border-white/10 pt-3 flex items-center gap-4">
          <span className="text-sm text-gray-500 w-24 shrink-0">Lost</span>
          <div className="flex-1 h-7 bg-white/5 rounded-md overflow-hidden">
            <div
              className="h-full rounded-md flex items-center px-3"
              style={{
                width: `${Math.max(((stageCounts['Lost'] || 0) / maxCount) * 100, stageCounts['Lost'] ? 4 : 0)}%`,
                backgroundColor: STAGE_COLORS['Lost'],
                opacity: (stageCounts['Lost'] || 0) === 0 ? 0.2 : 0.5,
              }}
            >
              {(stageCounts['Lost'] || 0) > 0 && (
                <span className="text-xs font-bold text-gray-300">{stageCounts['Lost']}</span>
              )}
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-500 w-6 text-right shrink-0">{stageCounts['Lost'] || 0}</span>
        </div>
      </div>
    </div>
  );
}
