import React from 'react';
import { CloseIcon } from './Icons';

interface PetunjukModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PetunjukModal({ isOpen, onClose }: PetunjukModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lime-400 text-zinc-950 flex items-center justify-center font-black text-sm shadow-xs">
              📖
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-mono">
                PETUNJUK TURNAMEN GALATAMA
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Panduan operasional klasemen live, input poin, dan aturan pertandingan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            title="Tutup Panduan"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
            <h3 className="font-black text-sm text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-2">
              <span>🏆</span> 1. Sistem Ranking & Tie-Breaker Otomatis
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Peserta diurutkan secara otomatis dari poin tertinggi ke terendah. Jika terjadi poin seri di posisi Top 10, peserta yang <strong>mencapai poin tersebut lebih dulu</strong> (berdasarkan riwayat waktu tangkapan tercepat) berhak menempati posisi lebih atas. Grup poin seri ditandai dengan warna highlight tie-breaker.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
            <h3 className="font-black text-sm text-lime-600 dark:text-lime-400 mb-1.5 flex items-center gap-2">
              <span>⚡</span> 2. Cara Tambah / Kurangi Poin
            </h3>
            <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-300">
              <li className="flex items-start gap-1.5">
                <span className="text-lime-500 font-bold">•</span>
                <span><strong>Input Delta (±):</strong> Ketik angka (misal: <code className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700">5</code> atau <code className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700">-2</code>) di kotak ± lalu tekan <strong>Enter</strong>.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-lime-500 font-bold">•</span>
                <span><strong>Tombol Plus (+) & Minus (-):</strong> Menambah (<code className="px-1 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">+</code>) atau mengurangi (<code className="px-1 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">-</code>) poin secara instan sesuai input delta atau nilai <em>+ POINT BIN</em>.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-lime-500 font-bold">•</span>
                <span><strong>Tombol Tarik Ikan (Logo Ikan):</strong> Membuka daftar jenis ikan tangkapan (Secret, Big, Shiny, Pelagon, Megalodon, Maxton, dll) untuk menambah poin tangkapan resmi.</span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
            <h3 className="font-black text-sm text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-2">
              <span>📌</span> 3. Fitur Kehadiran, Pay & Pelanggaran
            </h3>
            <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-300">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Kolom Pay:</strong> Klik tombol Pay untuk menandakan lunas (berubah hijau <code className="px-1 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">D</code>). Klik dua kali untuk mengubah keterangan teks pembayaran.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Kolom Absen:</strong> Centang tombol kotak checkmark untuk menandai angler telah hadir di arena.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Memerahkan Display (NO):</strong> Klik nomor slot peserta (badge NO) untuk memerahkan baris peserta jika terjadi pelanggaran atau catatan juri.</span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
            <h3 className="font-black text-sm text-blue-600 dark:text-blue-400 mb-1.5 flex items-center gap-2">
              <span>⌨️</span> 4. Navigasi & Shortcut Praktis
            </h3>
            <div className="grid grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 font-mono font-bold text-[10px]">Ctrl + F</kbd>
                <span>Cari nama peserta / USN</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 font-mono font-bold text-[10px]">Ikon Jam</kbd>
                <span>Buka riwayat log poin slot</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-lime-400 hover:bg-lime-500 text-zinc-950 font-black text-xs transition-colors cursor-pointer shadow-xs"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
