import { Timestamp } from 'firebase/firestore';

export interface Trio {
  date: Timestamp;
  players: string[];
  winner: string;
  isDuo?: boolean;
}
