import React, { useState } from 'react';
import Image from 'next/image';
import { Participant } from '@/types/tournament';
import { SortedParticipantResult } from '@/lib/ranking';
import { FishIcon, HistoryIcon } from './Icons';

interface LeaderboardTableProps {
  rankedResults: SortedParticipantResult[];
  highlightQuery: string;
  activeSearchId: number | null;
  onUpdateParticipant: (id: number, updates: Partial<Participant>) => void;
  onCommitDelta: (id: number, delta: number, label?: string) => void;
  onOpenFishModal: (id: number) => void;
  onOpenHistoryModal: (id: number) => void;
  defaultPlusBin: number;
}

export function LeaderboardTable({
  rankedResults,
  highlightQuery,
  activeSearchId,
  onUpdateParticipant,
  onCommitDelta,
  onOpenFishModal,
  onOpenHistoryModal,
  defaultPlusBin,
}: LeaderboardTableProps) {
  const [mobileView, setMobileView] = useState<'top10' | 'bottom10' | 'all'>('top10');
  const top10 = rankedResults.filter((r) => r.rank <= 10);
  const bottom10 = rankedResults.filter((r) => r.rank > 10);

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex xl:hidden flex-col gap-1.5">
        <div className="flex items-center justify-between gap-1.5 p-1 rounded-2xl bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileView('top10')}
            className={`flex-1 py-1.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 ${mobileView === 'top10'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
          >
            <span>🥇</span> Slot 1 - 10
          </button>
          <button
            type="button"
            onClick={() => setMobileView('bottom10')}
            className={`flex-1 py-1.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 ${mobileView === 'bottom10'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
          >
            <span>🥈</span> Slot 11 - 20
          </button>
          <button
            type="button"
            onClick={() => setMobileView('all')}
            className={`py-1.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 ${mobileView === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
          >
            Semua (1-20)
          </button>
        </div>

        <div className="flex items-center justify-between px-2 text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
          <span>👉 Geser tabel ke kanan untuk kolom Absen & History</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            {mobileView === 'top10' ? 'Slot 1–10' : mobileView === 'bottom10' ? 'Slot 11–20' : '20 Slot Lengkap'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 w-full">
        <div
          className={`flex-col rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 shadow-md overflow-hidden ${mobileView === 'bottom10' ? 'hidden xl:flex' : 'flex'
            }`}
        >
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[640px] xl:min-w-0">
              <div className="grid grid-cols-[50px_1fr_64px_1fr_180px_46px_46px] gap-1.5 items-center px-3 py-2 text-xs font-black uppercase tracking-wider text-white bg-emerald-700 dark:bg-emerald-800 text-center shadow-xs">
                <div>NO</div>
                <div>NAMA</div>
                <div>Pay</div>
                <div>DISPLAY AKUN</div>
                <div>POINT</div>
                <div className="text-[10px]">Absen</div>
                <div className="text-[10px]">History</div>
              </div>

              <div className="flex flex-col divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
                {top10.map((item) => (
                  <TableRow
                    key={item.participant.id}
                    item={item}
                    highlightQuery={highlightQuery}
                    isActiveSearchHit={activeSearchId === item.participant.id}
                    onUpdateParticipant={onUpdateParticipant}
                    onCommitDelta={onCommitDelta}
                    onOpenFishModal={onOpenFishModal}
                    onOpenHistoryModal={onOpenHistoryModal}
                    defaultPlusBin={defaultPlusBin}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex-col rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 shadow-md overflow-hidden ${mobileView === 'top10' ? 'hidden xl:flex' : 'flex'
            }`}
        >
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[640px] xl:min-w-0">
              <div className="grid grid-cols-[50px_1fr_64px_1fr_180px_46px_46px] gap-1.5 items-center px-3 py-2 text-xs font-black uppercase tracking-wider text-white bg-emerald-700 dark:bg-emerald-800 text-center shadow-xs">
                <div>NO</div>
                <div>NAMA</div>
                <div>Pay</div>
                <div>DISPLAY AKUN</div>
                <div>POINT</div>
                <div className="text-[10px]">Absen</div>
                <div className="text-[10px]">History</div>
              </div>

              <div className="flex flex-col divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
                {bottom10.map((item) => (
                  <TableRow
                    key={item.participant.id}
                    item={item}
                    highlightQuery={highlightQuery}
                    isActiveSearchHit={activeSearchId === item.participant.id}
                    onUpdateParticipant={onUpdateParticipant}
                    onCommitDelta={onCommitDelta}
                    onOpenFishModal={onOpenFishModal}
                    onOpenHistoryModal={onOpenHistoryModal}
                    defaultPlusBin={defaultPlusBin}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TableRowProps {
  item: SortedParticipantResult;
  highlightQuery: string;
  isActiveSearchHit: boolean;
  onUpdateParticipant: (id: number, updates: Partial<Participant>) => void;
  onCommitDelta: (id: number, delta: number, label?: string) => void;
  onOpenFishModal: (id: number) => void;
  onOpenHistoryModal: (id: number) => void;
  defaultPlusBin: number;
}

function TableRow({
  item,
  highlightQuery,
  isActiveSearchHit,
  onUpdateParticipant,
  onCommitDelta,
  onOpenFishModal,
  onOpenHistoryModal,
  defaultPlusBin,
}: TableRowProps) {
  const p = item.participant;
  const [deltaInput, setDeltaInput] = useState<string>('');
  const [isEditingPay, setIsEditingPay] = useState<boolean>(false);
  const [payInputVal, setPayInputVal] = useState<string>(p.pay || '');

  const q = highlightQuery.trim().toLowerCase();
  const isSearchHit =
    q !== '' &&
    ((p.nickname || '').toLowerCase().includes(q) || (p.name || '').toLowerCase().includes(q));

  const isAdmin = p.id === 20;

  const handleCommitDelta = (subtract = false) => {
    let delta = parseInt(deltaInput, 10);
    if (isNaN(delta) || delta === 0) {
      delta = defaultPlusBin > 0 ? defaultPlusBin : 1;
    }
    if (subtract) {
      delta = -Math.abs(delta);
    }
    onCommitDelta(p.id, delta, 'Manual');
    setDeltaInput('');
  };

  const handlePayClick = () => {
    if (isEditingPay) return;
    const hasPay = (p.pay || '').trim() !== '';
    if (!hasPay) {
      setIsEditingPay(true);
      return;
    }
    onUpdateParticipant(p.id, { paid: !p.paid });
  };

  const handlePayDoubleClick = () => {
    setIsEditingPay(true);
    setPayInputVal(p.pay || '');
  };

  const handlePayBlur = () => {
    setIsEditingPay(false);
    onUpdateParticipant(p.id, { pay: payInputVal.trim() });
  };

  const medalBadgeStyles = {
    1: 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs font-black ring-1 ring-amber-300',
    2: 'bg-slate-300 text-slate-900 border-slate-400 shadow-xs font-black',
    3: 'bg-orange-400 text-orange-950 border-orange-500 shadow-xs font-black',
  };

  let rowBg = 'bg-white dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100';

  if (p.red) {
    rowBg = 'bg-red-500 text-white font-bold dark:bg-red-700';
  } else if (isAdmin) {
    rowBg = 'bg-amber-100/90 dark:bg-amber-950/50 text-amber-950 dark:text-amber-100 font-semibold';
  } else if (isActiveSearchHit) {
    rowBg = 'bg-yellow-200 dark:bg-yellow-900/60 ring-2 ring-yellow-400';
  } else if (isSearchHit) {
    rowBg = 'bg-yellow-100 dark:bg-yellow-950/40';
  } else if (item.medal === 1) {
    rowBg = 'bg-amber-100/70 dark:bg-amber-950/30';
  } else if (item.medal === 2) {
    rowBg = 'bg-slate-100/80 dark:bg-slate-900/40';
  } else if (item.tieClass) {
    rowBg = `${item.tieClass} bg-purple-50/80 dark:bg-purple-950/40`;
  } else if (p.points > 0) {
    rowBg = 'bg-emerald-50/50 dark:bg-emerald-950/20';
  }

  const flashAnimClass = p.flash ? (p.flash.dir === 'up' ? 'flash-up' : 'flash-down') : '';

  return (
    <div
      data-id={p.id}
      className={`grid grid-cols-[50px_1fr_64px_1fr_180px_46px_46px] gap-1.5 items-center px-3 py-1.5 transition-colors duration-150 ${rowBg} ${flashAnimClass}`}
    >
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            if (!isAdmin) {
              onUpdateParticipant(p.id, { red: !p.red });
            }
          }}
          title={isAdmin ? 'Server Admin' : 'Klik untuk tandai merah (penalti)'}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border transition-transform active:scale-90 ${item.medal
            ? medalBadgeStyles[item.medal]
            : p.red
              ? 'bg-red-700 text-white border-red-800'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700'
            }`}
        >
          {item.medal === 1 ? (
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src="/galatama.png"
                alt="1"
                fill
                sizes="24px"
                className="object-cover object-top"
              />
            </div>
          ) : (
            item.rank
          )}
        </button>
      </div>

      <div className="min-w-0 px-1">
        <input
          type="text"
          value={p.name}
          placeholder="Nama Peserta"
          onChange={(e) => {
            const newName = e.target.value;
            const updates: Partial<Participant> = { name: newName };
            if (newName.trim() === '') {
              updates.slotTime = 0;
            } else if (!p.slotTime) {
              updates.slotTime = 1;
            }
            onUpdateParticipant(p.id, updates);
          }}
          className={`w-full font-bold text-sm text-center bg-transparent border-0 p-0 focus:outline-none placeholder:text-zinc-400 truncate ${p.red ? 'text-white placeholder:text-red-200' : 'text-zinc-900 dark:text-zinc-100'
            }`}
        />
      </div>

      <div className="flex items-center justify-center">
        {isEditingPay ? (
          <input
            type="text"
            autoFocus
            value={payInputVal}
            maxLength={10}
            onChange={(e) => setPayInputVal(e.target.value)}
            onBlur={handlePayBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePayBlur();
              if (e.key === 'Escape') setIsEditingPay(false);
            }}
            className="w-14 text-center text-xs font-black uppercase bg-white text-zinc-900 border-2 border-emerald-500 rounded-lg py-0.5 focus:outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={handlePayClick}
            onDoubleClick={handlePayDoubleClick}
            title={
              p.pay
                ? `Pay: ${p.pay} (Klik: ${p.paid ? 'batalkan lunas' : 'tandai lunas'}, Dbl-Klik: edit)`
                : 'Klik untuk mengisi pay'
            }
            className={`w-14 py-1 rounded-lg text-xs font-black uppercase transition-all truncate text-center ${p.paid
              ? 'bg-emerald-600 text-white border border-emerald-700 shadow-2xs'
              : (p.pay || '').trim() !== ''
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-900'
                : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
              }`}
          >
            {p.pay || '-'}
          </button>
        )}
      </div>

      <div className="min-w-0 px-1">
        <input
          type="text"
          value={p.nickname}
          placeholder="Display Akun"
          onChange={(e) => onUpdateParticipant(p.id, { nickname: e.target.value })}
          className={`w-full font-bold text-sm text-center bg-transparent border-0 p-0 focus:outline-none placeholder:text-zinc-400 truncate ${p.red ? 'text-white placeholder:text-red-200' : 'text-zinc-900 dark:text-zinc-100'
            }`}
        />
      </div>

      <div className="flex items-center justify-center gap-1.5">
        <span
          className={`min-w-[34px] text-right font-black text-xl tabular-nums leading-none ${p.red ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
            }`}
        >
          {p.points}
        </span>

        <input
          type="number"
          value={deltaInput}
          placeholder="±"
          onChange={(e) => setDeltaInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCommitDelta();
          }}
          className="w-8 h-7 text-center font-bold text-xs bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none shadow-2xs"
        />

        <button
          type="button"
          onClick={() => handleCommitDelta(false)}
          title="Tambah poin (+)"
          className="w-7 h-7 rounded-md flex items-center justify-center font-black text-sm bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition-all shadow-xs"
        >
          +
        </button>

        <button
          type="button"
          onClick={() => onOpenFishModal(p.id)}
          title="Tarik Ikan"
          className="w-7 h-7 rounded-md flex items-center justify-center bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 active:scale-95 transition-all shadow-2xs"
        >
          <FishIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => onUpdateParticipant(p.id, { joined: !p.joined })}
          title={p.joined ? 'Sudah absen (klik batalkan)' : 'Belum absen (klik centang)'}
          className={`w-7 h-7 rounded-md flex items-center justify-center font-black text-sm transition-all border ${p.joined
            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
            : 'bg-white dark:bg-zinc-800 text-transparent border-zinc-300 dark:border-zinc-700 hover:border-emerald-500'
            }`}
        >
          {p.joined ? '✓' : ''}
        </button>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => onOpenHistoryModal(p.id)}
          title="Riwayat poin"
          className="relative w-7 h-7 rounded-md flex items-center justify-center bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors shadow-2xs"
        >
          <HistoryIcon className="w-4 h-4" />
          {p.history && p.history.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-1 rounded-full text-[9px] font-black bg-red-600 text-white flex items-center justify-center leading-none">
              {p.history.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
