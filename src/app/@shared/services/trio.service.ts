import { Injectable } from '@angular/core';
import { Firestore, orderBy, where } from '@angular/fire/firestore';
import { TrioRatio } from 'app/@shared/interface/trioRatio';
import { PlayersService } from 'app/@shared/services/players.service';
import { getPastTimestampDate } from 'app/@shared/utils/date.utils';
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
} from 'firebase/firestore';
import { Trio } from '../interface/trio';

@Injectable({
  providedIn: 'root',
})
export class TrioService {
  private scores: Trio[] = [];
  private readonly trioCollection;

  constructor(
    private firestore: Firestore,
    private playersService: PlayersService,
  ) {
    this.trioCollection = collection(this.firestore, 'trio');
  }

  async getScores(): Promise<Trio[]> {
    if (!this.scores.length) {
      this.scores = await this.getScoresFromLastXDays();
    } else {
      const dayScores = await this.getScoresFromLastXDays(1);
      this.scores.forEach((score) => {
        dayScores.forEach((dayScore, index) => {
          if (score.id === dayScore.id) {
            dayScores.splice(index, 1);
          }
        });
      });
      this.scores = dayScores.concat(this.scores);
    }
    return this.scores;
  }

  async saveGame(scores: Trio): Promise<void> {
    await addDoc(this.trioCollection, scores);
  }

  async getScoresFromLastXDays(days: number = 31): Promise<Trio[]> {
    const startDate: Timestamp = getPastTimestampDate(days);
    const querySnapshot = await getDocs(
      query(
        this.trioCollection,
        where('date', '>=', startDate),
        orderBy('date', 'desc'),
      ),
    );
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Trio,
    );
  }

  async getRatios(): Promise<TrioRatio[]> {
    const players: string[] = await this.playersService.getPlayerList();
    const scores: Trio[] = await this.getScores();
    let ratios: TrioRatio[] = [];

    players.forEach((player: string) => {
      ratios.push({
        ratio: 0,
        playerName: player,
        wins: 0,
        gamesPlayed: 0,
      });
    });

    scores.forEach((score: Trio): void => {
      score.players.forEach((player: string) => {
        const playerRatio = ratios.find(
          (ratio: TrioRatio): boolean => ratio.playerName === player,
        );
        if (playerRatio) {
          if (score.isDuo) playerRatio.gamesPlayed += 0.5;
          else playerRatio.gamesPlayed++;
        }
      });
      const winnerRatio = ratios.find(
        (ratio: TrioRatio): boolean => score.winner === ratio.playerName,
      );
      if (winnerRatio) {
        if (score.isDuo) winnerRatio.wins += 0.5;
        else winnerRatio.wins++;
      }
    });

    ratios = ratios.filter((ratio: TrioRatio) => ratio.gamesPlayed > 4);
    ratios.forEach((ratio: TrioRatio) => {
      ratio.ratio = parseFloat((ratio.wins / ratio.gamesPlayed).toFixed(3));
    });
    return ratios.sort((a, b) => this.compareRatios(a, b));
  }

  private compareRatios(a: TrioRatio, b: TrioRatio): number {
    if (a.ratio > b.ratio) return -1;
    if (a.ratio < b.ratio) return 1;
    if (a.gamesPlayed > b.gamesPlayed) return -1;
    if (a.gamesPlayed < b.gamesPlayed) return 1;
    return 0;
  }
}
