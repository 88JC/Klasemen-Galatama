import fs from 'fs';
import path from 'path';
import { TournamentState } from '@/types/tournament';
import { getInitialTournamentState } from '@/lib/constants';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'tournament.json');

export function readTournamentData(): TournamentState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
      const initialState = getInitialTournamentState();
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
      return initialState;
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(fileContent);

    // Validate minimum structural integrity
    if (!parsed || !Array.isArray(parsed.participants) || parsed.participants.length !== 20) {
      const initialState = getInitialTournamentState();
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
      return initialState;
    }

    return parsed as TournamentState;
  } catch (error) {
    console.error('Error reading tournament data:', error);
    return getInitialTournamentState();
  }
}

export function saveTournamentData(data: TournamentState): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const stateToSave: TournamentState = {
      ...data,
      lastUpdated: Date.now(),
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(stateToSave, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving tournament data:', error);
    return false;
  }
}

export function resetTournamentData(): TournamentState {
  const freshState = getInitialTournamentState();
  saveTournamentData(freshState);
  return freshState;
}
