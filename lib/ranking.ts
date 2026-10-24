import { Participant } from '@/types/tournament';

export interface SortedParticipantResult {
  participant: Participant;
  rank: number; // visual sequence 1..20
  compRank: number; // competition rank (shared rank when tied)
  tieClass?: string;
  medal?: 1 | 2 | 3;
}

export const TIE_COLORS_COUNT = 5;
export const TIE_RANK_LIMIT = 10;

/**
 * Sorts participants primarily by points descending, secondarily by ID ascending.
 */
export function getSortedParticipants(participants: Participant[]): Participant[] {
  return [...participants].sort((a, b) => (b.points - a.points) || (a.id - b.id));
}

/**
 * Computes competition ranks and tie group colors strictly following the reference system:
 * - Bin phase: if all scores are 0 or from BIN bonus, ranks remain sequential 1, 2, 3...
 * - External points phase: participants with equal points share competition rank (1 + count(points > t.points)).
 * - Tied ranks for podium positions (compRank <= 3) receive distinct tie group colors (tie-0 to tie-4).
 */
export function calculateRankings(participants: Participant[]): SortedParticipantResult[] {
  const sorted = getSortedParticipants(participants);
  const compRankMap: Record<number, number> = {};
  let tieColorMap: Record<number, number> = {};

  // Check if still in BIN phase (all points are either 0 or exclusively from binGiven)
  const isBinPhase = sorted.every((t) => t.points === 0 || t.points === t.binGiven);

  if (isBinPhase) {
    sorted.forEach((t, i) => {
      compRankMap[t.id] = i + 1;
    });
  } else {
    // Normal competition ranking: 1 + number of competitors with strictly higher points
    sorted.forEach((t) => {
      compRankMap[t.id] = 1 + sorted.filter((o) => o.points > t.points).length;
    });

    // Count how many participants have each point score in top positions (for podium contention)
    const pointCounts: Record<number, number> = {};
    sorted.slice(0, TIE_RANK_LIMIT).forEach((t) => {
      if (t.points > 0 && compRankMap[t.id] <= 3) {
        pointCounts[t.points] = (pointCounts[t.points] || 0) + 1;
      }
    });

    let tieGroupIndex = 0;
    tieColorMap = {};
    sorted.slice(0, TIE_RANK_LIMIT).forEach((t) => {
      if (t.points > 0 && pointCounts[t.points] > 1 && tieColorMap[t.points] === undefined) {
        tieColorMap[t.points] = tieGroupIndex++ % TIE_COLORS_COUNT;
      }
    });
  }

  return sorted.map((participant, index) => {
    const rank = index + 1;
    const compRank = compRankMap[participant.id] || rank;
    let tieClass: string | undefined;

    if (participant.points > 0 && rank <= TIE_RANK_LIMIT && tieColorMap[participant.points] !== undefined) {
      tieClass = `tie-${tieColorMap[participant.points]}`;
    }

    let medal: 1 | 2 | 3 | undefined;
    if (participant.points > 0 && (compRank === 1 || compRank === 2 || compRank === 3)) {
      medal = compRank as 1 | 2 | 3;
    }

    return {
      participant,
      rank,
      compRank,
      tieClass,
      medal,
    };
  });
}

/**
 * Synchronizes BIN bonus points:
 * When Pay contains 'bin' (case-insensitive) and bin has not been given, award plusDefault points.
 * If 'bin' is removed, revoke the bonus.
 */
export function syncBinPoints(
  participant: Participant,
  plusDefault: number
): { changed: boolean; delta: number; label: string } {
  const hasBin = /bin/i.test(participant.pay || '');
  let delta = 0;
  let label = '';

  if (hasBin && !participant.binGiven) {
    const amt = plusDefault > 0 ? plusDefault : 1;
    participant.binGiven = amt;
    delta = amt;
    label = 'Bonus Bin';
  } else if (!hasBin && participant.binGiven) {
    delta = -participant.binGiven;
    participant.binGiven = 0;
    label = 'Bin dibatalkan';
  } else {
    return { changed: false, delta: 0, label: '' };
  }

  const newPoints = Math.max(0, participant.points + delta);
  const actualDelta = newPoints - participant.points;
  participant.points = newPoints;

  if (actualDelta !== 0) {
    participant.flash = {
      dir: actualDelta > 0 ? 'up' : 'down',
      time: Date.now(),
    };
    participant.history.push({
      id: Math.random().toString(36).substring(2, 9),
      delta: actualDelta,
      after: newPoints,
      time: Date.now(),
      label,
    });
  }

  return { changed: true, delta: actualDelta, label };
}
