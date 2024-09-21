import { Timestamp } from "firebase/firestore";

export interface GamePointsScores {
  date: Timestamp,
  players: string[];
}
