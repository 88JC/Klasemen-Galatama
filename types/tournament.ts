export interface PointHistoryItem {
  id: string;
  delta: number;
  after: number;
  time: number;
  label: string;
}

export interface Participant {
  id: number;
  name: string;
  nickname: string;
  points: number;
  binGiven: number;
  pay: string;
  paid: boolean;
  joined: boolean;
  red: boolean;
  slotTime: number;
  history: PointHistoryItem[];
  flash?: {
    dir: 'up' | 'down';
    time: number;
  } | null;
}

export interface TournamentSettings {
  plusDefault: number;
  usn: string;
  map: string;
  jamStart: string;
  title: string;
}

export interface TournamentState {
  participants: Participant[];
  settings: TournamentSettings;
  lastUpdated: number;
  isLive: boolean;
}

export interface FishItem {
  name: string;
  points: number;
  category?: 'Standard' | 'Rare' | 'Mythic' | 'Special';
}
