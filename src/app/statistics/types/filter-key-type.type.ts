import { FilterKey } from '../enums/filter-key.enum';

export type FilterKeyType =
  | FilterKey.Defeats
  | FilterKey.GamesPlayed
  | FilterKey.Wins
  | FilterKey.TopThree;
