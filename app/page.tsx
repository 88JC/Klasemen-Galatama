'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TournamentState, Participant, TournamentSettings } from '@/types/tournament';
import { getInitialTournamentState } from '@/lib/constants';
import { calculateRankings, syncBinPoints } from '@/lib/ranking';
import { HeaderToolbar } from '@/components/HeaderToolbar';
import { TableHeroBanner } from '@/components/TableHeroBanner';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { TarikIkanModal } from '@/components/TarikIkanModal';
import { PointHistoryModal } from '@/components/PointHistoryModal';
import { AdminRevenueModal } from '@/components/AdminRevenueModal';
import { StatsModal } from '@/components/StatsModal';
import { Footer } from '@/components/Footer';
import { PetunjukModal } from '@/components/PetunjukModal';
import { ResetConfirmDialog } from '@/components/ResetConfirmDialog';
import { FloatingSearchBar } from '@/components/FloatingSearchBar';
import { Toast, ToastProps } from '@/components/Toast';

export default function Home() {
  const [tournament, setTournament] = useState<TournamentState>(getInitialTournamentState());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchMatchIndex, setSearchMatchIndex] = useState<number>(0);

  // Modal states
  const [fishModalId, setFishModalId] = useState<number | null>(null);
  const [historyModalId, setHistoryModalId] = useState<number | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isResetOpen, setIsResetOpen] = useState<boolean>(false);

  // Toast feedback
  const [toast, setToast] = useState<Omit<ToastProps, 'onClose'> | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const isInitialMount = useRef<boolean>(true);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile device detection
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function detectMobile() {
      if (typeof window === 'undefined') return false;
      const ua = navigator.userAgent || '';
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const isTouchScreen = window.matchMedia('(max-width: 1024px) and (pointer: coarse)').matches;
      return isMobileUA || isTouchScreen;
    }

    const updateMobile = () => {
      setIsMobile(detectMobile());
    };

    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  // Scalable canvas auto-fit to screen: designed at 1400px wide
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function fitToScreen() {
      if (typeof window === 'undefined') return;

      const el = wrapRef.current;
      if (!el) return;

      if (isMobile) {
        // Natural mobile responsive flow: no 0.2x zoom shrinking
        if ('zoom' in (document.body.style as unknown as Record<string, unknown>)) {
          (el.style as unknown as Record<string, unknown>).zoom = '1';
          el.style.transform = 'none';
          el.style.marginBottom = '0px';
        } else {
          el.style.transformOrigin = 'top center';
          el.style.transform = 'none';
          el.style.marginBottom = '0px';
        }
        return;
      }

      // Desktop & Minimized Desktop auto-scaling canvas (100% UNTOUCHED):
      const availW = window.innerWidth - 16;
      const availH = window.innerHeight - 16;

      const DESIGN_W = 1400;
      const DESIGN_H = 880;

      // Scale proportionally to fit BOTH width and height completely in viewport
      const scaleW = availW / DESIGN_W;
      const scaleH = availH / DESIGN_H;
      const targetScale = Math.min(scaleW, scaleH);

      // Clamp scale between 0.2 and 1.5 to support any minimized window size
      const scale = Math.min(Math.max(targetScale, 0.2), 1.5);

      if ('zoom' in (document.body.style as unknown as Record<string, unknown>)) {
        (el.style as unknown as Record<string, unknown>).zoom = scale;
        el.style.transform = 'none';
        el.style.marginBottom = '0px';
      } else {
        el.style.transformOrigin = 'top center';
        el.style.transform = `scale(${scale})`;
        el.style.marginBottom = `-${Math.round((1 - scale) * DESIGN_H)}px`;
      }
    }

    queueMicrotask(fitToScreen);

    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(fitToScreen);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Initialize theme strictly from user preference in localStorage (defaults strictly to 'dark')
  useEffect(() => {
    const savedTheme = localStorage.getItem('klasemen_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      queueMicrotask(() => setTheme('light'));
    } else {
      document.documentElement.classList.add('dark');
      queueMicrotask(() => setTheme('dark'));
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('klasemen_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Fetch initial tournament data from server API
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/tournament');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setTournament(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load tournament data:', err);
        setToast({ message: 'Gagal memuat data dari server. Menggunakan data lokal.', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Autosave changes to server API (debounced)
  const persistTournament = useCallback((stateToSave: TournamentState) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setIsSyncing(true);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/tournament', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stateToSave),
        });
        if (!res.ok) throw new Error('Network error');
      } catch (error) {
        console.error('Failed to save tournament data:', error);
      } finally {
        setIsSyncing(false);
      }
    }, 600);
  }, []);

  // Update tournament state and trigger autosave
  const updateTournamentState = useCallback(
    (updater: (prev: TournamentState) => TournamentState) => {
      setTournament((prev) => {
        const next = updater(prev);
        if (!isInitialMount.current) {
          persistTournament(next);
        }
        return next;
      });
    },
    [persistTournament]
  );

  useEffect(() => {
    if (!isLoading) {
      isInitialMount.current = false;
    }
  }, [isLoading]);

  // Update individual participant
  const handleUpdateParticipant = useCallback(
    (id: number, updates: Partial<Participant>) => {
      updateTournamentState((prev) => {
        const participants = prev.participants.map((p) => {
          if (p.id !== id) return p;
          const updated = { ...p, ...updates };

          // If pay changed, check BIN bonus synchronization
          if (updates.pay !== undefined) {
            syncBinPoints(updated, prev.settings.plusDefault);
          }
          return updated;
        });
        return { ...prev, participants };
      });
    },
    [updateTournamentState]
  );

  // Direct manual commit of points delta (e.g. ± input or + button)
  const handleCommitDelta = useCallback(
    (id: number, delta: number, label = 'Manual') => {
      updateTournamentState((prev) => {
        const participants = prev.participants.map((p) => {
          if (p.id !== id) return p;
          const newPoints = Math.max(0, p.points + delta);
          const actualDelta = newPoints - p.points;
          if (actualDelta === 0) return p;

          const historyItem = {
            id: Math.random().toString(36).substring(2, 9),
            delta: actualDelta,
            after: newPoints,
            time: Date.now(),
            label,
          };

          return {
            ...p,
            points: newPoints,
            flash: { dir: actualDelta > 0 ? ('up' as const) : ('down' as const), time: Date.now() },
            history: [...p.history, historyItem],
          };
        });
        return { ...prev, participants };
      });
    },
    [updateTournamentState]
  );

  // Fish Modal point commit
  const handleCommitFishPoints = useCallback(
    (id: number, delta: number, fishLabel: string) => {
      handleCommitDelta(id, delta, fishLabel);
      setToast({ message: `+${delta} poin untuk ${fishLabel}`, type: 'success' });
    },
    [handleCommitDelta]
  );

  // Update Settings
  const handleUpdateSettings = useCallback(
    (newSettings: Partial<TournamentSettings>) => {
      updateTournamentState((prev) => {
        const settings = { ...prev.settings, ...newSettings };
        let participants = prev.participants;
        if (newSettings.plusDefault !== undefined) {
          participants = prev.participants.map((p) => {
            const clone = { ...p };
            syncBinPoints(clone, settings.plusDefault);
            return clone;
          });
        }
        return { ...prev, settings, participants };
      });
    },
    [updateTournamentState]
  );

  // Reset Tournament
  const handleResetTournament = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/tournament/reset', { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setTournament(json.data);
          setToast({ message: 'Klasemen berhasil di-reset.', type: 'info' });
        }
      }
    } catch (err) {
      console.error('Reset failed:', err);
      setToast({ message: 'Gagal mereset turnamen.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Export CSV or JSON
  const handleExport = (format: 'csv' | 'json') => {
    window.open(`/api/tournament/export?format=${format}`, '_blank');
    setToast({ message: `Mengekspor file ${format.toUpperCase()}...`, type: 'success' });
  };

  // Calculations
  const rankedResults = calculateRankings(tournament.participants);
  const emptySlotsCount = tournament.participants.filter((p) => (p.name || '').trim() === '').length;

  // Search logic
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchedParticipants =
    normalizedQuery === ''
      ? []
      : rankedResults.filter(
        (r) =>
          (r.participant.nickname || '').toLowerCase().includes(normalizedQuery) ||
          (r.participant.name || '').toLowerCase().includes(normalizedQuery)
      );

  const activeSearchHit =
    matchedParticipants.length > 0
      ? matchedParticipants[
      ((searchMatchIndex % matchedParticipants.length) + matchedParticipants.length) %
      matchedParticipants.length
      ]
      : null;

  const handleNextSearch = () => {
    if (matchedParticipants.length > 0) {
      setSearchMatchIndex((prev) => (prev + 1) % matchedParticipants.length);
    }
  };

  const handlePrevSearch = () => {
    if (matchedParticipants.length > 0) {
      setSearchMatchIndex((prev) => (prev - 1 + matchedParticipants.length) % matchedParticipants.length);
    }
  };

  const handleSearchEnterHit = () => {
    if (activeSearchHit) {
      setFishModalId(activeSearchHit.participant.id);
      setIsSearchOpen(false);
    }
  };

  const activeFishParticipant = tournament.participants.find((p) => p.id === fishModalId) || null;
  const activeHistoryParticipant = tournament.participants.find((p) => p.id === historyModalId) || null;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start bg-[#f0f2f5] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors p-1.5 sm:p-2 xl:p-2 overflow-x-hidden ${isMobile ? 'w-full' : ''}`}>
      <div
        ref={wrapRef}
        className={`flex flex-col gap-2.5 shrink-0 ${
          isMobile ? 'w-full max-w-full' : 'w-[1400px] max-w-[1400px]'
        }`}
        style={{ margin: '0 auto' }}
      >
        <HeaderToolbar
          settings={tournament.settings}
          emptySlotsCount={emptySlotsCount}
          theme={theme}
          onToggleTheme={toggleTheme}
          onUpdateSettings={handleUpdateSettings}
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenReset={() => setIsResetOpen(true)}
          onExport={handleExport}
        />

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                }`}
            />
            <span className="font-semibold">{isSyncing ? 'Menyimpan perubahan...' : 'Tersinkronisasi'}</span>
          </div>
          <span className="font-mono text-xs opacity-75">
            20 Slot Peserta · {tournament.lastUpdated ? new Date(tournament.lastUpdated).toLocaleTimeString('id-ID') : 'baru saja'}
          </span>
        </div>

        <TableHeroBanner
          settings={tournament.settings}
          rankedResults={rankedResults}
          participants={tournament.participants}
          onOpenFishModal={(id) => setFishModalId(id)}
        />

        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-zinc-400">Memuat data klasemen...</p>
          </div>
        ) : (
          <LeaderboardTable
            rankedResults={rankedResults}
            highlightQuery={searchQuery}
            activeSearchId={activeSearchHit ? activeSearchHit.participant.id : null}
            onUpdateParticipant={handleUpdateParticipant}
            onCommitDelta={handleCommitDelta}
            onOpenFishModal={(id) => setFishModalId(id)}
            onOpenHistoryModal={(id) => setHistoryModalId(id)}
            defaultPlusBin={tournament.settings.plusDefault}
            isMobile={isMobile}
          />
        )}

        <Footer
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
        />
      </div>

      <FloatingSearchBar
        isOpen={isSearchOpen}
        searchQuery={searchQuery}
        matchCount={matchedParticipants.length}
        currentMatchIndex={searchMatchIndex}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setSearchMatchIndex(0);
        }}
        onOpen={() => setIsSearchOpen(true)}
        onClose={() => {
          setIsSearchOpen(false);
          setSearchQuery('');
        }}
        onNext={handleNextSearch}
        onPrev={handlePrevSearch}
        onEnterHit={handleSearchEnterHit}
      />

      <TarikIkanModal
        key={fishModalId ?? 'closed'}
        participant={activeFishParticipant}
        isOpen={fishModalId !== null}
        onClose={() => setFishModalId(null)}
        onCommitFishPoints={handleCommitFishPoints}
      />

      <PointHistoryModal
        participant={activeHistoryParticipant}
        isOpen={historyModalId !== null}
        onClose={() => setHistoryModalId(null)}
      />

      <AdminRevenueModal
        participants={tournament.participants}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <StatsModal
        participants={tournament.participants}
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
      />

      <PetunjukModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <ResetConfirmDialog
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={handleResetTournament}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
