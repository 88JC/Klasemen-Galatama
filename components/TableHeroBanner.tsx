import React from 'react';
import Image from 'next/image';
import { Participant, TournamentSettings } from '@/types/tournament';
import { SortedParticipantResult } from '@/lib/ranking';

interface TableHeroBannerProps {
  settings: TournamentSettings;
  rankedResults: SortedParticipantResult[];
  participants: Participant[];
  onOpenFishModal: (id: number) => void;
}

export function TableHeroBanner({
  settings,
  rankedResults,
  participants,
  onOpenFishModal,
}: TableHeroBannerProps) {
  const leader = rankedResults.length > 0 && rankedResults[0].participant.points > 0 ? rankedResults[0] : null;

  // Aggregate tournament metrics
  const totalPoints = participants.reduce((acc, p) => acc + (p.points || 0), 0);
  const totalFishCaught = participants.reduce((acc, p) => {
    return acc + (p.history ? p.history.filter((h) => h.label !== 'Manual' && h.label !== 'Bonus BIN').length : 0);
  }, 0);
  const totalJoined = participants.filter((p) => p.joined).length;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-zinc-200/90 dark:border-zinc-800/90 shadow-lg bg-[#f8fafc] dark:bg-[#0c0d0f] transition-all my-1">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full object-cover dark:hidden"
          viewBox="0 0 1400 180"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1400" height="180" fill="#ffffff" />

          <path
            d="M-50,0 C120,40 280,10 450,90 C620,170 790,20 980,110 C1170,200 1320,50 1450,120 L1450,-50 L-50,-50 Z"
            fill="#d9f99d"
            opacity="0.85"
          />
          <path
            d="M-60,50 C140,110 320,60 510,140 C700,220 880,80 1080,160 C1280,240 1390,90 1460,150 L1460,0 L-60,0 Z"
            fill="#bef264"
            opacity="0.9"
          />
          <path
            d="M-80,120 C100,180 290,120 480,200 C670,280 840,140 1040,220 C1240,300 1380,160 1480,210 L1480,80 L-80,80 Z"
            fill="#a3e635"
            opacity="0.4"
          />
          <path
            d="M-40,-30 C150,20 340,-20 530,60 C720,140 910,20 1110,80 C1310,140 1420,30 1460,70 L1460,-60 L-40,-60 Z"
            fill="#84cc16"
            opacity="0.25"
          />
        </svg>

        <svg
          className="absolute inset-0 w-full h-full object-cover hidden dark:block"
          viewBox="0 0 1400 180"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1400" height="180" fill="#0c0d0f" />
          <path
            d="M-50,0 C120,40 280,10 450,90 C620,170 790,20 980,110 C1170,200 1320,50 1450,120 L1450,-50 L-50,-50 Z"
            fill="#166534"
            opacity="0.35"
          />
          <path
            d="M-60,50 C140,110 320,60 510,140 C700,220 880,80 1080,160 C1280,240 1390,90 1460,150 L1460,0 L-60,0 Z"
            fill="#22c55e"
            opacity="0.22"
          />
          <path
            d="M-80,120 C100,180 290,120 480,200 C670,280 840,140 1040,220 C1240,300 1380,160 1480,210 L1480,80 L-80,80 Z"
            fill="#a3e635"
            opacity="0.15"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:grid md:grid-cols-12 items-center px-4 sm:px-6 py-2.5 gap-3 md:gap-4">
        <div className="w-full md:col-span-4 flex flex-col justify-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border-2 border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#bef264] text-zinc-950 font-black text-xs flex items-center justify-center shadow-xs">
              🎣
            </span>
            <span className="text-xs font-black tracking-tight text-zinc-900 dark:text-zinc-50 lowercase font-mono">
              galatama<span className="text-lime-600 dark:text-lime-400 font-extrabold">.arena</span>
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </span>
          </div>

          <ul className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium space-y-0.5 leading-snug">
            <li className="flex items-center gap-1.5">
              <span className="text-lime-600 dark:text-lime-400 font-black">•</span>
              <span>Turnamen mancing Fish It! 20 slot profesional</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-lime-600 dark:text-lime-400 font-black">•</span>
              <span>Sistem poin & tie-breaker otomatis realtime</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-lime-600 dark:text-lime-400 font-black">•</span>
              <span>Map: <strong className="text-zinc-900 dark:text-zinc-100 uppercase">{settings.map || '-'}</strong> · bonus: <strong className="text-amber-600 dark:text-amber-400">+{settings.plusDefault}P</strong></span>
            </li>
          </ul>
        </div>

        <div className="w-full md:col-span-4 flex flex-col items-center justify-center relative py-1 md:py-0">
          <div className="relative group cursor-pointer flex items-center justify-center">
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-lime-400 to-emerald-400 blur-md opacity-70 animate-aura pointer-events-none" />

            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#bef264] dark:bg-[#a3e635] border-3 border-zinc-900 dark:border-zinc-950 shadow-xl overflow-visible flex items-center justify-center">
              <div className="absolute -top-3 w-24 h-24 sm:w-28 sm:h-28 animate-float drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] pointer-events-none">
                <Image
                  src="/galatama.png"
                  alt="Galatama Angler Mascot"
                  fill
                  sizes="112px"
                  className="object-contain object-top"
                  priority
                />
              </div>

              <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md border border-white/20 dark:border-black/20">
                20 SLOTS
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:col-span-4 flex flex-col justify-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border-2 border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-lg bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shadow-xs">
                🏆
              </span>
              <span className="text-xs font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                TURNAMEN LIVE STATUS
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 font-semibold">
              START: {settings.jamStart || '--:--'}
            </span>
          </div>

          <div className="space-y-1.5">
            {leader ? (
              <button
                type="button"
                onClick={() => onOpenFishModal(leader.participant.id)}
                title="Klik untuk memasukkan ikan tangkapan juara 1"
                className="w-full flex items-center justify-between px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/50 dark:border-amber-500/30 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 block leading-tight">
                      PEMIMPIN KLASEMEN
                    </span>
                    <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 truncate block">
                      {leader.participant.nickname || leader.participant.name || `Slot #${leader.participant.id}`}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400 block tabular-nums">
                    {leader.participant.points} PTS
                  </span>
                  <span className="text-[9px] text-zinc-400 group-hover:text-amber-600 transition-colors">
                    + Ikan →
                  </span>
                </div>
              </button>
            ) : (
              <div className="flex items-center justify-between px-2.5 py-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                  Belum ada poin terisi
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Standby
                </span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-1.5 pt-0.5">
              <div className="px-2 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 text-center">
                <span className="text-[8px] font-black uppercase text-zinc-400 block leading-none">Poin</span>
                <span className="text-[11px] font-black text-zinc-900 dark:text-zinc-50 tabular-nums">{totalPoints}P</span>
              </div>
              <div className="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 text-center">
                <span className="text-[8px] font-black uppercase text-amber-700 dark:text-amber-400 block leading-none">Ikan</span>
                <span className="text-[11px] font-black text-amber-900 dark:text-amber-200 tabular-nums">{totalFishCaught}</span>
              </div>
              <div className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-center">
                <span className="text-[8px] font-black uppercase text-emerald-700 dark:text-emerald-400 block leading-none">Hadir</span>
                <span className="text-[11px] font-black text-emerald-900 dark:text-emerald-200 tabular-nums">{totalJoined}/20</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
