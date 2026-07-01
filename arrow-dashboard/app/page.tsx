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

      <StatsBar
        stores={stores}
        followUpCount={followUpsToday.length}
        totalUnits={totalUnits}
        stockedCount={stocked.length}
        closeRate={closeRate}
      />

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PipelineFunnel stageCounts={stageCounts} />
        <FollowUpQueue stores={stores} />
      </div>

      <div className="mt-5">
        <StoreTable stores={stores} />
      </div>

      <div className="mt-10 text-center text-xs text-[#ABABAB]">
        Arrow Supplements · Vancouver, BC · Data refreshes every 5 minutes
      </div>
    </main>
  );
}
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
          {/* Arrow logo from CDN */}
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
        Arrow Supplements Â· Vancouver, BC Â· Data refreshes every 5 minutes
      </div>
    </main>
  );
}
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
