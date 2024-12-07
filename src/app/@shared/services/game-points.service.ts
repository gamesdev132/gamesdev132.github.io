import { Injectable } from '@angular/core';
import { Firestore, orderBy, where } from '@angular/fire/firestore';
import {
  GamePointsPlayer,
  GamePointsScores,
} from 'app/@shared/interface/game-points-scores';
import { RoundScoresRatio } from 'app/@shared/interface/roundScoresRatio';
import { PlayersService } from 'app/@shared/services/players.service';
import { getPastTimestampDate } from 'app/@shared/utils/date.utils';
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
} from 'firebase/firestore';
import { GameEnum } from '../enums/game.enum';

@Injectable({
  providedIn: 'root',
})
export class GamePointsService {
  private readonly SixQuiPrendCollection;
  private readonly HiloCollection;

  constructor(
    private firestore: Firestore,
    private playersService: PlayersService,
  ) {
    this.SixQuiPrendCollection = collection(this.firestore, 'SixQuiPrend');
    this.HiloCollection = collection(this.firestore, 'hilo');
  }

  async saveGame(scores: GamePointsScores, game: string): Promise<void> {
    const collection = this.getCollection(game);
    await addDoc(collection, scores);
  }

  async getScoresFromLastXDays(
    game: string,
    days: number = 31,
  ): Promise<GamePointsScores[]> {
    const collection = this.getCollection(game);
    const startDate: Timestamp = getPastTimestampDate(days);
    const querySnapshot = await getDocs(
      query(
        collection,
        where('date', '>=', startDate),
        orderBy('date', 'desc'),
      ),
    );
    const gamePointsScores: GamePointsScores[] = querySnapshot.docs.map(
      (doc) => doc.data() as GamePointsScores,
    );
    gamePointsScores.forEach((gamePoints: GamePointsScores) => {
      let sortedPlayers = [...gamePoints.players].sort(
        (player1: GamePointsPlayer, player2: GamePointsPlayer) =>
          player1.total - player2.total,
      );

      let uniqueScores = [
        ...new Set(sortedPlayers.map((player) => player.total)),
      ];

      let bestScore: number = uniqueScores[0];
      let secondScore: number = uniqueScores[1] || bestScore;
      let thirdScore: number = uniqueScores[2] || secondScore;
      let worstScore: number = uniqueScores[uniqueScores.length - 1];

      gamePoints.players = gamePoints.players.map(
        (player: GamePointsPlayer): GamePointsPlayer => {
          return {
            name: player.name,
            total: player.total,
            isWinner: player.total === bestScore,
            isSecond: player.total === secondScore,
            isThird: player.total === thirdScore,
            isLooser: player.total === worstScore,
          };
        },
      );
    });
    return gamePointsScores;
  }

  async getRatios(
    gameName: string = 'SixQuiPrend',
  ): Promise<RoundScoresRatio[]> {
    const players: string[] = await this.playersService.getPlayerList();
    const scores: GamePointsScores[] = await this.getScoresFromLastXDays(
      gameName,
      31,
    );
    let ratios: RoundScoresRatio[] = [];

    players.forEach((player: string) => {
      ratios.push({
        playerName: player,
        topThree: 0,
        wins: 0,
        defeats: 0,
        gamesPlayed: 0,
      });
    });

    scores.forEach((score: GamePointsScores): void => {
      score.players.forEach((player: GamePointsPlayer) => {
        const playerRatio = ratios.find(
          (ratio: RoundScoresRatio): boolean =>
            ratio.playerName === player.name,
        );
        if (playerRatio) {
          playerRatio.gamesPlayed++;
          if (player.isWinner) {
            playerRatio.wins++;
            playerRatio.topThree++;
          }
          if (player.isSecond || player.isThird) {
            playerRatio.topThree++;
          }
          if (player.isLooser) {
            playerRatio.defeats++;
          }
        }
      });
    });

    ratios = ratios.filter(
      (ratio: RoundScoresRatio) => ratio.gamesPlayed !== 0,
    );
    return ratios;
  }

  private getCollection(game: string) {
    return game === GameEnum.Hilo
      ? this.HiloCollection
      : this.SixQuiPrendCollection;
  }
}
