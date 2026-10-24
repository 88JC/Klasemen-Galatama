import React from 'react';
import Image from 'next/image';
import { SortedParticipantResult } from '@/lib/ranking';

interface PodiumShowcaseProps {
  top3: SortedParticipantResult[];
  onOpenFishModal: (id: number) => void;
}

export function PodiumShowcase({ top3, onOpenFishModal }: PodiumShowcaseProps) {
  if (top3.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 mb-0.5">
      {top3.map((item) => {
        const p = item.participant;
        const displayName = p.nickname || p.name || `Peserta #${p.id}`;

        const rankBadge = {
          1: {
            label: 'JUARA 1',
            pill: 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800',
            card: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40',
          },
          2: {
            label: 'JUARA 2',
            pill: 'text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800',
            card: 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/80 dark:border-slate-800/60',
          },
          3: {
            label: 'JUARA 3',
            pill: 'text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 border-orange-300 dark:border-orange-800',
            card: 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200/80 dark:border-orange-900/40',
          },
        }[item.compRank] || {
          label: 'PODIUM',
          pill: 'text-zinc-600 bg-zinc-50 border-zinc-200',
          card: 'bg-white dark:bg-zinc-900 border-zinc-200',
        };

        return (
          <div
            key={p.id}
            onClick={() => onOpenFishModal(p.id)}
            title="Klik untuk input ikan"
            className={`group relative p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border transition-all duration-150 hover:shadow-xs cursor-pointer flex items-center justify-between gap-2 ${rankBadge.card}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {item.compRank === 1 ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-amber-400 shrink-0 bg-amber-100">
                  <Image
                    src="/galatama.png"
                    alt="Galatama Angler"
                    fill
                    sizes="32px"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 border ${rankBadge.pill}`}
                >
                  {item.compRank}
                </span>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] font-black tracking-wider uppercase px-1.5 py-0.2 rounded border ${rankBadge.pill}`}>
                    {rankBadge.label}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Slot #{p.id}</span>
                </div>
                <p className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate mt-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {displayName}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-lg sm:text-xl font-black tabular-nums text-zinc-900 dark:text-zinc-50">
                {p.points}
              </span>
              <span className="text-[10px] text-zinc-400 ml-0.5">pts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
