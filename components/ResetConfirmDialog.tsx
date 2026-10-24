import React, { useEffect } from 'react';
import { RefreshIcon } from './Icons';

interface ResetConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetConfirmDialog({ isOpen, onClose, onConfirm }: ResetConfirmDialogProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="reset-dialog-title"
        className="w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 overflow-hidden"
      >
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950 flex items-center justify-center">
            <RefreshIcon className="w-5 h-5" />
          </div>
          <h2 id="reset-dialog-title" className="text-lg font-black text-zinc-900 dark:text-zinc-50">
            Reset Seluruh Klasemen?
          </h2>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 font-medium">
          Tindakan ini akan mengosongkan nama peserta, mereset seluruh poin menjadi 0, dan menghapus riwayat tangkapan turnamen saat ini.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Ya, Reset Turnamen
          </button>
        </div>
      </div>
    </div>
  );
}
