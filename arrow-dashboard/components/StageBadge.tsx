import { Stage, STAGE_BG } from '@/types/store';

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STAGE_BG[stage]}`}>
      {stage}
    </span>
  );
}
