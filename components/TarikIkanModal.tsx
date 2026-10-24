import React, { useState, useEffect } from 'react';
import { Participant, FishItem } from '@/types/tournament';
import { FISH_LIST } from '@/lib/constants';
import { CloseIcon, FishIcon } from './Icons';

interface TarikIkanModalProps {
  participant: Participant | null;
  isOpen: boolean;
  onClose: () => void;
  onCommitFishPoints: (participantId: number, delta: number, fishLabel: string) => void;
}

export function TarikIkanModal({
  participant,
  isOpen,
  onClose,
  onCommitFishPoints,
}: TarikIkanModalProps) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !participant) return null;

  const toggleFish = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectedFish: FishItem[] = selectedIndices.map((i) => FISH_LIST[i]);
  const totalDelta = selectedFish.reduce((acc, f) => acc + f.points, 0);

  const handleClose = () => {
    setSelectedIndices([]);
    onClose();
  };

  const handleSubmit = () => {
    if (totalDelta <= 0) {
      handleClose();
      return;
    }
    const label = selectedFish.map((f) => f.name).join(' + ');
    onCommitFishPoints(participant.id, totalDelta, label);
    handleClose();
  };

  const displayName = participant.nickname || participant.name || `Peserta #${participant.id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fish-modal-title"
        className="w-full max-w-md max-h-[88vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <FishIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 id="fish-modal-title" className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                Tarik Ikan
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{displayName}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Tutup popup"
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-1">
          {FISH_LIST.map((fish, index) => {
            const isChecked = selectedIndices.includes(index);
            return (
              <label
                key={fish.name}
                className={`flex items-center justify-between py-2.5 px-3 rounded-2xl cursor-pointer transition-all ${isChecked
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 border border-emerald-200/80 dark:border-emerald-800/60 font-semibold'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 border border-transparent'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">{fish.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold tabular-nums ${isChecked
                        ? 'bg-emerald-200/80 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                  >
                    +{fish.points}P
                  </span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFish(index)}
                    className="w-4 h-4 rounded-md accent-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
              </label>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total:</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
              +{totalDelta} P
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={totalDelta <= 0}
              onClick={handleSubmit}
              className="px-5 py-2 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm active:scale-95 transition-all"
            >
              Tambah Poin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
