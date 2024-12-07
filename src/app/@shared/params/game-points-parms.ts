import {
  GamePointsObjectives,
  GamePointsParams,
} from 'app/@shared/interface/game-points-params';

export const SixQuiPrendParams: GamePointsParams = {
  maximumPlayers: 11,
  minimumPlayers: 2,
  objective: GamePointsObjectives.minPoints,
};

export const HiloParams: GamePointsParams = {
  maximumPlayers: 7,
  minimumPlayers: 2,
  objective: GamePointsObjectives.minPoints,
};
