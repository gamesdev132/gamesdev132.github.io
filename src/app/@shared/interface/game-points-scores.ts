import { Timestamp } from "firebase/firestore";

export interface GamePointsScores {
  date: Timestamp,
  players: GamePointsPlayer[];
}

export interface GamePointsPlayer {
  name: string;
  total: number;
  isWinner?: boolean;
  isLooser?: boolean;
}
