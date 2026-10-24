import React, { useEffect } from 'react';
import { Participant } from '@/types/tournament';
import { calculateRankings } from '@/lib/ranking';
import { CloseIcon, ChartIcon } from './Icons';

interface StatsModalProps {
  participants: Participant[];
  isOpen: boolean;
  onClose: () => void;
}

export function StatsModal({ participants, isOpen, onClose }: StatsModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ranked = calculateRankings(participants);
  const totalPoints = participants.reduce((acc, p) => acc + p.points, 0);
  const totalJoined = participants.filter((p) => p.joined).length;
  const totalPaid = participants.filter((p) => p.paid).length;
  const filledSlots = participants.filter((p) => (p.name || '').trim() !== '').length;

  // Aggregate fish types from history
  const fishCountMap: Record<string, number> = {};
  participants.forEach((p) => {
    p.history.forEach((h) => {
      if (h.label && h.label !== 'Manual' && !h.label.includes('Bin')) {
        const fishNames = h.label.split(' + ');
        fishNames.forEach((name) => {
          const trimmed = name.trim();
          if (trimmed) {
            fishCountMap[trimmed] = (fishCountMap[trimmed] || 0) + 1;
          }
        });
      }
    });
  });

  const topFish = Object.entries(fishCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const top3 = ranked.filter((r) => r.compRank <= 3 && r.participant.points > 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="stats-modal-title"
        className="w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 text-white dark:bg-zinc-950 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-amber-400">
              <ChartIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 id="stats-modal-title" className="text-xl font-bold leading-tight">
                Statistik & Analisis Turnamen
              </h2>
              <p className="text-sm text-zinc-400 font-medium">Ringkasan performa dan perolehan ikan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup statistik"
            className="p-2 rounded-full hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">TOTAL POIN</span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums mt-0.5">
                {totalPoints}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">PESERTA TERISI</span>
              <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums mt-0.5">
                {filledSlots} <span className="text-sm font-normal text-zinc-400">/ 20</span>
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">KEHADIRAN</span>
              <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums mt-0.5">
                {totalJoined} <span className="text-sm font-normal text-zinc-400">({Math.round((totalJoined / 20) * 100)}%)</span>
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">STATUS BAYAR</span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums mt-0.5">
                {totalPaid} <span className="text-sm font-normal text-zinc-400">({Math.round((totalPaid / 20) * 100)}%)</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Kandidat Juara Saat Ini
            </h3>
            {top3.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 py-3 italic">
                Belum ada peserta dengan perolehan poin di atas 0.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {top3.map((r) => {
                  const medalColors = {
                    1: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
                    2: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800/60 dark:text-slate-200 dark:border-slate-700',
                    3: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200 dark:border-orange-800',
                  }[r.compRank] || 'bg-zinc-100 text-zinc-900';

                  const medalLabel = { 1: 'JUARA 1', 2: 'JUARA 2', 3: 'JUARA 3' }[r.compRank];

                  return (
                    <div
                      key={r.participant.id}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between ${medalColors}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black tracking-wider uppercase">{medalLabel}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/30">
                          Slot #{r.participant.id}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-base font-bold truncate">
                          {r.participant.nickname || r.participant.name || `Peserta #${r.participant.id}`}
                        </p>
                        <p className="text-2xl font-black tabular-nums mt-0.5">
                          {r.participant.points} Poin
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Tangkapan Ikan Terbanyak
            </h3>
            {topFish.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 py-3 italic">
                Belum ada tangkapan ikan yang dicatat lewat fitur Tarik Ikan.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {topFish.map(([name, count]) => (
                  <div
                    key={name}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 tabular-nums">
                      {count}x
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end px-6 py-3.5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-sm font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
