import { FishItem, Participant, TournamentSettings, TournamentState } from '@/types/tournament';

export const FISH_LIST: FishItem[] = [
  { name: 'Secret', points: 1, category: 'Standard' },
  { name: 'Big', points: 1, category: 'Standard' },
  { name: 'Shiny', points: 1, category: 'Standard' },
  { name: 'Mutasi', points: 1, category: 'Standard' },
  { name: 'Pelagon', points: 2, category: 'Rare' },
  { name: 'Mutant Cosmic', points: 2, category: 'Rare' },
  { name: 'Megalodon', points: 3, category: 'Mythic' },
  { name: 'Glacial', points: 3, category: 'Mythic' },
  { name: 'Forgotten', points: 5, category: 'Special' },
];

export const MAP_OPTIONS: string[] = [
  'SISYPHUS STATUE',
  'CRATER ISLAND',
  'WEATHER MACHINE',
  'MEGALODON HUNT',
  'TREASURE ROOM',
  'GLACIAL SERPENT',
  'COPPER CANYON MINES',
  'PLANETARY OBSERVATOR',
];

export const DEFAULT_SETTINGS: TournamentSettings = {
  plusDefault: 0,
  usn: '',
  map: '',
  jamStart: '',
  title: 'KLASEMEN GALATAMA',
};

export function createDefaultParticipants(): Participant[] {
  const participants: Participant[] = [];
  for (let i = 1; i <= 20; i++) {
    const isAdmin = i === 20;
    participants.push({
      id: i,
      name: isAdmin ? 'Admin' : '',
      nickname: isAdmin ? 'Admin' : '',
      points: 0,
      binGiven: 0,
      pay: isAdmin ? 'D' : '',
      paid: isAdmin,
      joined: isAdmin,
      red: false,
      slotTime: isAdmin ? 1 : 0,
      history: [],
      flash: null,
    });
  }
  return participants;
}

export function getInitialTournamentState(): TournamentState {
  return {
    participants: createDefaultParticipants(),
    settings: { ...DEFAULT_SETTINGS },
    lastUpdated: 0,
    isLive: true,
  };
}

export const FLASH_DURATION_MS = 2400;
