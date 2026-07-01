export type Stage = 'Lead' | 'Contacted' | 'Sampled' | 'Stocked' | 'Reordering' | 'Lost';
export type StoreType = 'Supplement Store' | 'Health Food' | 'Grocery';

export interface Store {
  name: string;
  type: StoreType;
  city: string;
  contactName: string;
  phone: string;
  email: string;
  stage: Stage;
  firstContacted: string;
  lastContacted: string;
  nextFollowUp: string;
  notes: string;
  unitsOrdered: number;
  lastOrderDate: string;
}

export const STAGE_ORDER: Stage[] = ['Lead', 'Contacted', 'Sampled', 'Stocked', 'Reordering', 'Lost'];

export const STAGE_COLORS: Record<Stage, string> = {
  Lead: '#7C80C9',
  Contacted: '#4A90B8',
  Sampled: '#C49A3C',
  Stocked: '#3D7A4B',
  Reordering: '#2D6B5A',
  Lost: '#ABABAB',
};

export const STAGE_BG: Record<Stage, string> = {
  Lead: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Contacted: 'bg-blue-100 text-blue-700 border-blue-200',
  Sampled: 'bg-amber-100 text-amber-700 border-amber-200',
  Stocked: 'bg-green-100 text-green-700 border-green-200',
  Reordering: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Lost: 'bg-gray-100 text-gray-500 border-gray-200',
};
export type Stage = 'Lead' | 'Contacted' | 'Sampled' | 'Stocked' | 'Reordering' | 'Lost';
export type StoreType = 'Supplement Store' | 'Health Food' | 'Grocery';

export interface Store {
  name: string;
  type: StoreType;
  city: string;
  contactName: string;
  phone: string;
  email: string;
  stage: Stage;
  firstContacted: string;
  lastContacted: string;
  nextFollowUp: string;
  notes: string;
  unitsOrdered: number;
  lastOrderDate: string;
}

export const STAGE_ORDER: Stage[] = ['Lead', 'Contacted', 'Sampled', 'Stocked', 'Reordering', 'Lost'];

export const STAGE_COLORS: Record<Stage, string> = {
  Lead: '#7C80C9',
  Contacted: '#4A90B8',
  Sampled: '#C49A3C',
  Stocked: '#3D7A4B',
  Reordering: '#2D6B5A',
  Lost: '#ABABAB',
};

export const STAGE_BG: Record<Stage, string> = {
  Lead: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Contacted: 'bg-blue-100 text-blue-700 border-blue-200',
  Sampled: 'bg-amber-100 text-amber-700 border-amber-200',
  Stocked: 'bg-green-100 text-green-700 border-green-200',
  Reordering: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Lost: 'bg-gray-100 text-gray-500 border-gray-200',
};
export type Stage = 'Lead' | 'Contacted' | 'Sampled' | 'Stocked' | 'Reordering' | 'Lost';
export type StoreType = 'Supplement Store' | 'Health Food' | 'Grocery';

export interface Store {
  name: string;
  type: StoreType;
  city: string;
  contactName: string;
  phone: string;
  email: string;
  stage: Stage;
  firstContacted: string;
  lastContacted: string;
  nextFollowUp: string;
  notes: string;
  unitsOrdered: number;
  lastOrderDate: string;
}

export const STAGE_ORDER: Stage[] = ['Lead', 'Contacted', 'Sampled', 'Stocked', 'Reordering', 'Lost'];

export const STAGE_COLORS: Record<Stage, string> = {
  Lead: '#6366f1',
  Contacted: '#3b82f6',
  Sampled: '#eab308',
  Stocked: '#22c55e',
  Reordering: '#10b981',
  Lost: '#4b5563',
};

export const STAGE_BG: Record<Stage, string> = {
  Lead: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  Contacted: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Sampled: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Stocked: 'bg-green-500/20 text-green-300 border-green-500/30',
  Reordering: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Lost: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};
