import React from 'react';
import Image from 'next/image';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenStats: () => void;
  onOpenGuide: () => void;
  noteText?: string;
}

export function Footer({
  onOpenAdmin,
  onOpenStats,
  onOpenGuide,
  noteText = 'Klik no peserta untuk memerahkan display | Klik Pay yang sudah diisi untuk menandakan sudah dibayar',
}: FooterProps) {
  return (
    <footer className="relative w-full rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-200/90 dark:border-zinc-800/90 shadow-sm px-6 py-2.5 mt-1 overflow-visible transition-all">
      <div
        className="absolute -top-4 right-8 w-8 h-8 pointer-events-none select-none z-20 animate-float"
        title="Galatama Angler Peeking"
      >
        <Image
          src="/galatama.png"
          alt="Peeking Angler"
          fill
          sizes="32px"
          className="object-contain object-top drop-shadow-md"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenGuide}
            title="Buka Petunjuk & Aturan Turnamen"
            className="w-7 h-7 rounded-full bg-[#4d6318] hover:bg-[#3f5213] dark:bg-lime-500/25 dark:hover:bg-lime-500/40 text-white dark:text-lime-300 flex items-center justify-center transition-all hover:scale-110 shadow-2xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onOpenStats}
            title="Lihat Statistik Turnamen"
            className="w-7 h-7 rounded-full bg-[#4d6318] hover:bg-[#3f5213] dark:bg-lime-500/25 dark:hover:bg-lime-500/40 text-white dark:text-lime-300 flex items-center justify-center transition-all hover:scale-110 shadow-2xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c1.92-.41 3.44-1.95 3.61-3.96C19.08 11.63 21 9.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onOpenAdmin}
            title="Buka Menu Admin Rekap Pembayaran"
            className="w-7 h-7 rounded-full bg-[#4d6318] hover:bg-[#3f5213] dark:bg-lime-500/25 dark:hover:bg-lime-500/40 text-white dark:text-lime-300 flex items-center justify-center transition-all hover:scale-110 shadow-2xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
          </button>

          <a
            href="https://dsc.gg/kydo"
            target="_blank"
            rel="noopener noreferrer"
            title="Gabung Discord KYDO (https://dsc.gg/kydo)"
            className="w-7 h-7 rounded-full bg-[#4d6318] hover:bg-[#3f5213] dark:bg-lime-500/25 dark:hover:bg-lime-500/40 text-white dark:text-lime-300 flex items-center justify-center transition-all hover:scale-110 shadow-2xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>

          <a
            href="https://github.com/88JC/Klasemen-Galatama"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub (Open Source)"
            className="w-7 h-7 rounded-full bg-[#4d6318] hover:bg-[#3f5213] dark:bg-lime-500/25 dark:hover:bg-lime-500/40 text-white dark:text-lime-300 flex items-center justify-center transition-all hover:scale-110 shadow-2xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>

        <div className="flex-1 text-center px-4">
          <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            <span className="font-bold text-amber-700 dark:text-amber-400">NOTE:</span> {noteText}
          </p>
        </div>
      </div>

      <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-50 lowercase font-mono">
            galatama<span className="text-lime-600 dark:text-lime-400 font-extrabold">.arena</span>
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">v1.0</span>
        </div>

        <div className="flex items-center justify-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <span>Made with <span className="text-red-500 mx-0.5 animate-pulse">❤️</span> by</span>
          <a
            href="https://github.com/88JC"
            target="_blank"
            rel="noopener noreferrer"
            title="Kunjungi GitHub KYDO (https://github.com/88JC)"
            className="ml-1 font-bold text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors"
          >
            KYDO
          </a>
        </div>

        <a
          href="mailto:kydo@outlook.co.id"
          title="Kirim Email ke kydo@outlook.co.id"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bef264] hover:bg-[#a3e635] text-zinc-950 font-bold text-xs transition-all shadow-xs hover:shadow-sm cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>Contact</span>
        </a>
      </div>
    </footer>
  );
}
