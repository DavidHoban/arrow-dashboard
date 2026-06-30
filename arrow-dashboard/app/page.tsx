import { fetchStores, getStats } from '@/lib/sheets';
import { StatsBar } from '@/components/StatsBar';
import { PipelineFunnel } from '@/components/PipelineFunnel';
import { FollowUpQueue } from '@/components/FollowUpQueue';
import { StoreTable } from '@/components/StoreTable';

export const revalidate = 300; // Refresh data every 5 minutes

export default async function Dashboard() {
  const stores = await fetchStores();
  const { stocked, totalUnits, followUpsToday, closeRate, stageCounts } = getStats(stores);

  const now = new Date().toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">🏹</span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Arrow <span className="text-gray-500 font-normal">|</span> Retail Pipeline
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-9">Updated {now}</p>
        </div>
        <a
          href="https://docs.google.com/spreadsheets/d/1CA3sEyhrAG2ZftRtI12osFx79Gbn8W-6lpFlT5pxJXU/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Sheet
        </a>
      </div>

      {/* Stats */}
      <StatsBar
        stores={stores}
        followUpCount={followUpsToday.length}
        totalUnits={totalUnits}
        stockedCount={stocked.length}
        closeRate={closeRate}
      />

      {/* Pipeline + Follow-ups row */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineFunnel stageCounts={stageCounts} />
        <FollowUpQueue stores={stores} />
      </div>

      {/* All stores */}
      <div className="mt-6">
        <StoreTable stores={stores} />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-700">
        Arrow Supplements · Vancouver, BC · Data refreshes every 5 minutes
      </div>
    </main>
  );
}
