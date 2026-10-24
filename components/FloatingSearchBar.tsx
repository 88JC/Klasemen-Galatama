import React, { useRef, useEffect } from 'react';
import { SearchIcon, ChevronUpIcon, ChevronDownIcon, CloseIcon } from './Icons';

interface FloatingSearchBarProps {
  isOpen: boolean;
  searchQuery: string;
  matchCount: number;
  currentMatchIndex: number;
  onSearchChange: (query: string) => void;
  onOpen: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onEnterHit: () => void;
}

export function FloatingSearchBar({
  isOpen,
  searchQuery,
  matchCount,
  currentMatchIndex,
  onSearchChange,
  onOpen,
  onClose,
  onNext,
  onPrev,
  onEnterHit,
}: FloatingSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen]);

  // Global Ctrl+F / Cmd+F handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        onOpen();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpen]);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={onOpen}
          title="Cari Peserta (Ctrl+F)"
          aria-label="Buka pencarian"
          className="fixed bottom-5 right-4 sm:bottom-8 sm:right-6 z-40 flex items-center justify-center w-10 h-10 sm:w-auto sm:px-3.5 sm:py-2 gap-2 rounded-full bg-zinc-900/95 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all font-semibold text-xs border border-zinc-700/80 dark:border-zinc-300/80 backdrop-blur-xs"
        >
          <SearchIcon className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span className="hidden sm:inline">Cari Peserta</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700">
            Ctrl+F
          </kbd>
        </button>
      )}

      {isOpen && (
        <div
          role="search"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/95 dark:bg-zinc-950/95 text-white backdrop-blur-md shadow-2xl border border-zinc-700/80">
            <SearchIcon className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onEnterHit();
                } else if (e.key === 'Escape') {
                  onClose();
                }
              }}
              placeholder="Ketik display nama... (Enter = Tarik Ikan)"
              className="flex-1 bg-transparent border-none text-white text-base focus:outline-none placeholder:text-zinc-400"
            />

            {searchQuery.trim() !== '' && (
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold tabular-nums shrink-0 ${matchCount > 0
                    ? 'bg-emerald-900/80 text-emerald-300'
                    : 'bg-red-900/80 text-red-300'
                  }`}
              >
                {matchCount > 0
                  ? `${currentMatchIndex + 1} / ${matchCount}`
                  : 'Tidak ada'}
              </span>
            )}

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={onPrev}
                disabled={matchCount === 0}
                title="Sebelumnya"
                className="p-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-30 transition-colors"
              >
                <ChevronUpIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={matchCount === 0}
                title="Berikutnya"
                className="p-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-30 transition-colors"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Tutup (Esc)"
                className="p-1.5 ml-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
