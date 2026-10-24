import React, { useEffect, useMemo } from 'react';
import { Participant } from '@/types/tournament';
import { CloseIcon, DollarIcon } from './Icons';

interface AdminRevenueModalProps {
  participants: Participant[];
  isOpen: boolean;
  onClose: () => void;
}

export function AdminRevenueModal({
  participants,
  isOpen,
  onClose,
}: AdminRevenueModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const { grandTotal, paidTotal, filledCount, withNumberCount, rows } = useMemo(() => {
    const computedRows: {
      id: number;
      label: string;
      payStr: string;
      subtotal: number | null;
      isPaid: boolean;
    }[] = [];
    let grand = 0;
    let paid = 0;
    let filled = 0;
    let withNum = 0;

    for (const p of participants) {
      const payStr = (p.pay || '').trim();
      if (!payStr) continue;

      filled++;
      const numbers = (payStr.match(/\d+/g) || []).map(Number);
      const subtotal = numbers.reduce((a, b) => a + b, 0);

      if (numbers.length > 0) {
        withNum++;
        grand += subtotal;
        if (p.paid) {
          paid += subtotal;
        }
      }

      const label = (p.name || '').trim() || (p.nickname || '').trim() || `Peserta #${p.id}`;

      computedRows.push({
        id: p.id,
        label,
        payStr,
        subtotal: numbers.length > 0 ? subtotal : null,
        isPaid: p.paid,
      });
    }

    return {
      grandTotal: grand,
      paidTotal: paid,
      filledCount: filled,
      withNumberCount: withNum,
      rows: computedRows,
    };
  }, [participants]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="adm-modal-title"
        className="w-full max-w-lg max-h-[85vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <DollarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 id="adm-modal-title" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Menu Admin & Total Pay
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Rekapitulasi pembayaran peserta turnamen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup menu admin"
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                TOTAL PAY
              </span>
              <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums mt-1">
                {grandTotal.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                SUDAH DIBAYAR (LUNAS)
              </span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums mt-1">
                {paidTotal.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 text-sm">
              Belum ada kolom Pay yang diisi oleh peserta.
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80 border-t border-zinc-100 dark:border-zinc-800 pt-2">
              {rows.map((row) => (
                <div key={row.id} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {row.label}
                    </span>
                    {row.isPaid && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        LUNAS
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-400 font-mono">
                      Pay: {row.payStr}
                    </span>
                    <span
                      className={`text-sm font-bold tabular-nums min-w-[50px] text-right ${
                        row.isPaid ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      {row.subtotal !== null ? row.subtotal.toLocaleString('id-ID') : '-'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filledCount > 0 && (
            <p className="text-xs text-center text-zinc-400 pt-2">
              {withNumberCount} dari {filledCount} peserta memiliki nilai angka di kolom Pay.
            </p>
          )}
        </div>

        <div className="flex justify-end px-6 py-4 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
