import { Timestamp } from 'firebase/firestore';

export interface Trio {
  id: string;
  date: Timestamp;
  players: string[];
  winner: string;
  isDuo?: boolean;
}
