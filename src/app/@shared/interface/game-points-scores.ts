export interface GamePointsScores {
  date: Date;
  players: GamePointsPlayer[];
}

export interface GamePointsPlayer {
  name: string;
  total: number;
  isWinner?: boolean;
  isSecond?: boolean;
  isThird?: boolean;
  isLooser?: boolean;
}
