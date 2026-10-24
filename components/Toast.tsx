import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgStyles = {
    success: 'bg-emerald-800 text-emerald-50 border-emerald-700 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800',
    error: 'bg-red-800 text-red-50 border-red-700 dark:bg-red-950 dark:text-red-100 dark:border-red-800',
    info: 'bg-slate-800 text-slate-50 border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800',
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl transition-all duration-200 transform translate-y-0 text-sm font-medium ${bgStyles}`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 rounded-md hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Tutup notifikasi"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
