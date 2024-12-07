import { Injectable } from '@angular/core';
import { GamePointsScores } from '../interface/game-points-scores';
import { GamePointsFormPlayer } from '../interface/game-points-form';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setGamePoints(gamePoints: GamePointsFormPlayer[]): void {
    localStorage.setItem('points', JSON.stringify(gamePoints));
  }

  emptyGamePoints(): void {
    localStorage.removeItem('points');
  }

  getGamePoints(): GamePointsFormPlayer[] | null{
    const localStorageData = localStorage.getItem('points') ?? null;
    return localStorageData ? JSON.parse(localStorageData) : null
  }
}
