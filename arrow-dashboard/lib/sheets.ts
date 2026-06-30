import { Store, Stage, StoreType } from '@/types/store';

const SHEET_ID = process.env.SHEET_ID || '1CA3sEyhrAG2ZftRtI12osFx79Gbn8W-6lpFlT5pxJXU';

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text: string): string[][] {
  return text
    .split('\n')
    .filter(line => line.trim())
    .map(parseCSVLine);
}

export async function fetchStores(): Promise<Store[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      headers: { 'Accept': 'text/csv' },
    });

    if (!response.ok) throw new Error(`Sheets fetch failed: ${response.status}`);

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    // Skip header row
    const dataRows = rows.slice(1);

    return dataRows
      .filter(row => row[0]) // Skip empty rows
      .map(row => ({
        name: row[0] || '',
        type: (row[1] || 'Supplement Store') as StoreType,
        city: row[2] || '',
        contactName: row[3] || '',
        phone: row[4] || '',
        email: row[5] || '',
        stage: (row[6] || 'Lead') as Stage,
        firstContacted: row[7] || '',
        lastContacted: row[8] || '',
        nextFollowUp: row[9] || '',
        notes: row[10] || '',
        unitsOrdered: parseInt(row[11]) || 0,
        lastOrderDate: row[12] || '',
      }));
  } catch (error) {
    console.error('Failed to fetch stores:', error);
    return [];
  }
}

export function getStats(stores: Store[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const active = stores.filter(s => s.stage !== 'Lost');
  const stocked = stores.filter(s => s.stage === 'Stocked' || s.stage === 'Reordering');
  const totalUnits = stores.reduce((sum, s) => sum + s.unitsOrdered, 0);

  const followUpsToday = stores.filter(s => {
    if (!s.nextFollowUp || s.stage === 'Lost') return false;
    const due = new Date(s.nextFollowUp);
    return due <= today;
  });

  const contacted = stores.filter(s =>
    ['Contacted', 'Sampled', 'Stocked', 'Reordering'].includes(s.stage)
  );
  const closeRate = contacted.length > 0
    ? Math.round((stocked.length / contacted.length) * 100)
    : 0;

  const stageCounts = stores.reduce((acc, s) => {
    acc[s.stage] = (acc[s.stage] || 0) + 1;
    return acc;
  }, {} as Record<Stage, number>);

  return { active, stocked, totalUnits, followUpsToday, closeRate, stageCounts };
}

export function isOverdue(dateStr: string): boolean {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr) < today;
}

export function isDueToday(dateStr: string): boolean {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateStr);
  due.setHours(0, 0, 0, 0);
  return due.getTime() === today.getTime();
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
  });
}
