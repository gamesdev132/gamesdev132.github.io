import { Timestamp } from "firebase/firestore";

export interface GamePointsScores {
  date: Timestamp,
  players: string[] | GamePointsPlayer[];
}

export interface GamePointsPlayer {
  name: string;
  total: number;
}
