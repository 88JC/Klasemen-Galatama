import React, { useEffect } from 'react';
import { Participant } from '@/types/tournament';
import { CloseIcon, HistoryIcon } from './Icons';

interface PointHistoryModalProps {
  participant: Participant | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PointHistoryModal({
  participant,
  isOpen,
  onClose,
}: PointHistoryModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !participant) return null;

  const displayName = participant.nickname || participant.name || `Peserta #${participant.id}`;

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const historyItems = [...(participant.history || [])].reverse();

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
        aria-labelledby="hist-modal-title"
        className="w-full max-w-lg max-h-[85vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 text-white dark:bg-zinc-950 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 id="hist-modal-title" className="text-xl font-bold leading-tight">
                Riwayat Poin
              </h2>
              <p className="text-sm text-zinc-400 font-medium">{displayName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup riwayat"
            className="p-2 rounded-full hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {historyItems.length === 0 ? (
            <div className="py-14 text-center text-zinc-500 dark:text-zinc-400 font-medium">
              <p className="text-lg">Belum ada riwayat perubahan poin.</p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                Poin akan tercatat otomatis saat ditambah atau ditarik.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {historyItems.map((item, idx) => {
                const isPositive = item.delta > 0;
                return (
                  <li key={item.id || idx} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-2xl font-black tabular-nums min-w-[70px] ${isPositive ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                          }`}
                      >
                        {isPositive ? `+${item.delta}` : item.delta}
                      </span>
                      <div>
                        {item.label && (
                          <span className="block text-sm font-bold text-amber-700 dark:text-amber-400">
                            {item.label}
                          </span>
                        )}
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Poin akhir: <b className="text-zinc-800 dark:text-zinc-200">{item.after}</b>
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 tabular-nums">
                      {formatTime(item.time)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex justify-end px-6 py-3.5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-sm font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
