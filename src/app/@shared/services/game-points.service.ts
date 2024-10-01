import { Injectable } from "@angular/core";
import { Firestore, orderBy, where } from "@angular/fire/firestore";
import { GamePointsPlayer, GamePointsScores } from "app/@shared/interface/game-points-scores";
import { RoundScoresRatio } from "app/@shared/interface/roundScoresRatio";
import { PlayersService } from "app/@shared/services/players.service";
import { getPastTimestampDate } from "app/@shared/utils/date.utils";
import { addDoc, collection, getDocs, query, Timestamp } from 'firebase/firestore'

@Injectable({
  providedIn: 'root',
})
export class GamePointsService {
  private readonly SixQuiPrendCollection;
  private readonly HiloCollection;

  constructor(private firestore: Firestore, private playersService: PlayersService) {
    this.SixQuiPrendCollection = collection(this.firestore, 'SixQuiPrend');
    this.HiloCollection = collection(this.firestore, 'hilo');
  }

  async saveGame(scores: GamePointsScores, game: string): Promise<void> {
    const collection = this.getCollection(game);
    await addDoc(collection, scores);
  }

  async getScoresFromLastXDays(game: string, days: number = 31): Promise<GamePointsScores[]> {
    const collection = this.getCollection(game);
    const startDate: Timestamp = getPastTimestampDate(days)
    const querySnapshot = await getDocs(query(
      collection,
      where('date', '>=', startDate),
      orderBy('date', 'desc')
    ))
    const gamePointsScores: GamePointsScores[] = querySnapshot.docs.map(
      doc => (
        doc.data() as GamePointsScores
      ))
    gamePointsScores.forEach((gamePoints: GamePointsScores) => {
      let bestScore: number = Math.min(...gamePoints.players.map((player: GamePointsPlayer) => player.total));
      let worstScore: number = Math.max(...gamePoints.players.map((player: GamePointsPlayer) => player.total));

      gamePoints.players = gamePoints.players.map((player: GamePointsPlayer): GamePointsPlayer => {
        return {
          name: player.name,
          total: player.total,
          isWinner: player.total === bestScore,
          isLooser: player.total === worstScore,
        };
      });
    });
    return gamePointsScores
  }

  async getRatios(): Promise<RoundScoresRatio[]> {
    const players: string[] = await this.playersService.getPlayerList();
    const scores: GamePointsScores[] = await this.getScoresFromLastXDays('SixQuiPrend', 31)
    let ratios: RoundScoresRatio[] = []

    players.forEach((player: string) => {
      ratios.push({
        playerName: player,
        wins: 0,
        defeats: 0,
        gamesPlayed: 0
      })
    })

    scores.forEach((score: GamePointsScores): void => {
      score.players.forEach((player: GamePointsPlayer) => {
        const playerRatio = ratios.find((ratio: RoundScoresRatio): boolean => ratio.playerName === player.name)
        if (playerRatio) {
          playerRatio.gamesPlayed++;
          if (player.isWinner) {
            playerRatio.wins++;
          }
          if (player.isLooser) {
            playerRatio.defeats++
          }
        }
      })
    })

    ratios = ratios.filter((ratio: RoundScoresRatio) => ratio.gamesPlayed !== 0)
    return ratios//.sort((a, b) => this.compareRatios(a, b))
  }

  private getCollection(game: string) {
    if (game === 'Hilo') {
      return this.HiloCollection;
    }
    return this.SixQuiPrendCollection;
  }
}
