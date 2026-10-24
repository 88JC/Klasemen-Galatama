import React, { useState } from 'react';
import Image from 'next/image';
import { TournamentSettings } from '@/types/tournament';
import { MAP_OPTIONS } from '@/lib/constants';
import {
  SunIcon,
  MoonIcon,
  ChartIcon,
  DollarIcon,
  DownloadIcon,
  RefreshIcon,
} from './Icons';

interface HeaderToolbarProps {
  settings: TournamentSettings;
  emptySlotsCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  showBanner?: boolean;
  onToggleBanner?: () => void;
  onUpdateSettings: (newSettings: Partial<TournamentSettings>) => void;
  onOpenStats: () => void;
  onOpenAdmin: () => void;
  onOpenReset: () => void;
  onExport: (format: 'csv' | 'json') => void;
}

export function HeaderToolbar({
  settings,
  emptySlotsCount,
  theme,
  onToggleTheme,
  showBanner,
  onToggleBanner,
  onUpdateSettings,
  onOpenStats,
  onOpenAdmin,
  onOpenReset,
  onExport,
}: HeaderToolbarProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const renderActionTools = () => (
    <>
      {onToggleBanner && (
        <button
          type="button"
          onClick={onToggleBanner}
          title={showBanner ? 'Sembunyikan Banner (Tampilan Ringkas)' : 'Tampilkan Banner'}
          aria-label="Toggle banner"
          className="p-1.5 sm:p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs"
        >
          {showBanner ? (
            <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      )}
      <button
        type="button"
        onClick={onOpenStats}
        title="Statistik Turnamen"
        className="p-1.5 sm:p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs"
      >
        <ChartIcon className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onOpenAdmin}
        title="Rekap Pembayaran Pay"
        className="p-1.5 sm:p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs"
      >
        <DollarIcon className="w-4 h-4" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowExportMenu(!showExportMenu)}
          title="Ekspor Data"
          className="p-1.5 sm:p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs"
        >
          <DownloadIcon className="w-4 h-4" />
        </button>
        {showExportMenu && (
          <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 shadow-xl py-1 z-50">
            <button
              onClick={() => {
                onExport('csv');
                setShowExportMenu(false);
              }}
              className="w-full text-left px-3.5 py-2 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Ekspor CSV (Excel)
            </button>
            <button
              onClick={() => {
                onExport('json');
                setShowExportMenu(false);
              }}
              className="w-full text-left px-3.5 py-2 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Ekspor Backup JSON
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onOpenReset}
        title="Reset Turnamen"
        className="p-1.5 sm:p-2 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs"
        aria-label="Reset turnamen"
      >
        <RefreshIcon className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onToggleTheme}
        title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
        aria-label="Toggle tema"
        className="p-1.5 sm:p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs"
      >
        {theme === 'dark' ? <SunIcon className="w-4 h-4 text-amber-400" /> : <MoonIcon className="w-4 h-4" />}
      </button>
    </>
  );

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-md p-2.5 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center justify-between w-full lg:w-auto gap-2.5 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 border-emerald-500/50 shadow-xs bg-emerald-50 dark:bg-zinc-800 shrink-0">
              <Image
                src="/galatama.png"
                alt="Galatama Logo"
                fill
                sizes="40px"
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase font-mono">
                  {settings.title ? settings.title.toUpperCase() : 'KLASEMEN GALATAMA'}
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-1 shrink-0">
            {renderActionTools()}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center w-full lg:w-auto">
          <div
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-[11px] sm:text-xs font-bold shadow-2xs"
            title="Nilai bonus otomatis jika Pay berisi kata BIN"
          >
            <span className="text-zinc-500 dark:text-zinc-400 font-mono">+ POINT BIN</span>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onUpdateSettings({ plusDefault: Math.max(0, (settings.plusDefault || 0) - 1) })}
                title="Kurangi 1 Poin"
                className="w-5 h-5 sm:h-6 rounded-l bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 font-black text-xs flex items-center justify-center transition-colors cursor-pointer select-none"
              >
                −
              </button>
              <input
                type="number"
                value={settings.plusDefault}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  onUpdateSettings({ plusDefault: isNaN(val) ? 0 : val });
                }}
                className="w-8 sm:w-9 text-center font-black text-xs sm:text-sm bg-white dark:bg-zinc-900 border-y border-zinc-300 dark:border-zinc-600 py-0.5 text-zinc-900 dark:text-zinc-100 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => onUpdateSettings({ plusDefault: (settings.plusDefault || 0) + 1 })}
                title="Tambah 1 Poin"
                className="w-5 h-5 sm:h-6 rounded-r bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 font-black text-xs flex items-center justify-center transition-colors cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>

          <div
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-[11px] sm:text-xs font-bold shadow-2xs"
            title="Host Username / USN"
          >
            <span className="text-zinc-500 dark:text-zinc-400 font-mono">USN</span>
            <input
              type="text"
              value={settings.usn}
              placeholder="isi USN..."
              onFocus={(e) => e.target.select()}
              onChange={(e) => onUpdateSettings({ usn: e.target.value })}
              className="w-22 sm:w-32 font-bold text-xs sm:text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 rounded py-0.5 px-1.5 text-zinc-900 dark:text-zinc-100 focus:outline-none placeholder:text-zinc-400"
            />
          </div>

          <div
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-[11px] sm:text-xs font-bold shadow-2xs"
            title="Lokasi Map Turnamen"
          >
            <span className="text-zinc-500 dark:text-zinc-400 font-mono">MAP</span>
            <div className="relative flex items-center">
              <select
                value={settings.map}
                onChange={(e) => onUpdateSettings({ map: e.target.value })}
                className="w-28 sm:w-44 font-bold text-xs sm:text-sm uppercase bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 rounded py-0.5 pl-2 pr-6 text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer appearance-none truncate"
              >
                <option value="" className="text-zinc-400">PILIH MAP...</option>
                {settings.map && !MAP_OPTIONS.includes(settings.map) && (
                  <option value={settings.map} className="font-bold py-1">
                    {settings.map}
                  </option>
                )}
                {MAP_OPTIONS.map((map) => (
                  <option key={map} value={map} className="font-bold py-1">
                    {map}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 pointer-events-none text-zinc-400">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {settings.map && (
              <button
                type="button"
                onClick={() => onUpdateSettings({ map: '' })}
                title="Kosongkan / Reset Map"
                className="w-4 h-4 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white flex items-center justify-center text-[10px] font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-[11px] sm:text-xs font-bold shadow-2xs"
            title="Jam Mulai Lomba (Contoh: 19:30)"
          >
            <span className="text-zinc-500 dark:text-zinc-400 font-mono">START</span>
            <div className="relative flex items-center">
              <input
                type="text"
                value={settings.jamStart}
                placeholder="--:--"
                maxLength={5}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  let val = e.target.value.replace(/[^0-9:]/g, '');
                  if (val.length === 2 && !val.includes(':') && !settings.jamStart.includes(':')) {
                    val = val + ':';
                  }
                  onUpdateSettings({ jamStart: val });
                }}
                className="w-14 sm:w-16 text-center font-bold text-xs sm:text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 rounded py-0.5 px-1 text-zinc-900 dark:text-zinc-100 focus:outline-none placeholder:text-zinc-400 font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  const hh = String(now.getHours()).padStart(2, '0');
                  const mm = String(now.getMinutes()).padStart(2, '0');
                  onUpdateSettings({ jamStart: `${hh}:${mm}` });
                }}
                title="Gunakan Jam Sekarang"
                className="ml-1 p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </button>
              {settings.jamStart && (
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ jamStart: '' })}
                  title="Hapus / Reset Jam"
                  className="w-3.5 h-3.5 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white flex items-center justify-center text-[9px] font-bold cursor-pointer ml-0.5"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border-2 text-[11px] sm:text-xs font-bold shadow-2xs ${emptySlotsCount === 0
              ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-900'
              : 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800'
              }`}
            title="Slot kosong yang tersisa"
          >
            <span className="font-mono text-zinc-500 dark:text-zinc-400">SLOT</span>
            <span className="font-black text-xs sm:text-sm tabular-nums px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950">
              {emptySlotsCount}
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          {renderActionTools()}
        </div>
      </div>
    </div>
  );
}
