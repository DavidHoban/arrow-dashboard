import { fetchStores, getStats } from '@/lib/sheets';
import { StatsBar } from '@/components/StatsBar';
import { PipelineFunnel } from '@/components/PipelineFunnel';
import { FollowUpQueue } from '@/components/FollowUpQueue';
import { StoreTable } from '@/components/StoreTable';

export const revalidate = 300;

export default async function Dashboard() {
  const stores = await fetchStores();
  const { stocked, totalUnits, followUpsToday, closeRate, stageCounts } = getStats(stores);

  const now = new Date().toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen px-4 py-8 md:px-10 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-4">
          <img
            src="https://www.arrowsupplements.com/cdn/shop/files/ArrowLogoFiles_Primary_Main.png?v=1720307977&width=160"
            alt="Arrow Supplements"
            className="h-8 object-contain"
          />
          <div className="w-px h-8 bg-black/15" />
          <div>
            <p className="text-sm font-medium text-[#1C1C1C]">Retail Pipeline</p>
            <p className="text-xs text-[#888]">{now}</p>
          </div>
        </div>
        <a
          href="https://docs.google.com/spreadsheets/d/1CA3sEyhrAG2ZftRtI12osFx79Gbn8W-6lpFlT5pxJXU/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C1C1C] hover:bg-[#333] text-white text-sm font-medium transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Pipeline + Follow-ups */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PipelineFunnel stageCounts={stageCounts} />
        <FollowUpQueue stores={stores} />
      </div>

      {/* All stores */}
      <div className="mt-5">
        <StoreTable stores={stores} />
      </div>

      <div className="mt-10 text-center text-xs text-[#ABABAB]">
        Arrow Supplements &middot; Vancouver, BC &middot; Data refreshes every 5 minutes
      </div>
    </main>
  );
}
