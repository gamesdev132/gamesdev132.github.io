export interface GamePointsParams {
  minimumPlayers: number;
  maximumPlayers: number;
  objective: GamePointsObjectives.minPoints | GamePointsObjectives.maxPoints;
}

export enum GamePointsObjectives {
  minPoints = 'minimumPoints',
  maxPoints = 'maximumPoints',
}
