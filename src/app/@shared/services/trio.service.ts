import { Injectable } from "@angular/core";
import { Firestore, orderBy, where } from "@angular/fire/firestore";
import { Ratio } from "app/@shared/interface/ratio";
import { PlayersService } from "app/@shared/services/players.service";
import { getPastTimestampDate } from "app/@shared/utils/date.utils";
import { addDoc, collection, getDocs, query, Timestamp } from 'firebase/firestore'
import { Trio } from "../interface/trio";

@Injectable({
  providedIn: 'root',
})
export class TrioService {
  private readonly trioCollection;

  constructor(private firestore: Firestore, private playersService: PlayersService) {
    this.trioCollection = collection(this.firestore, 'trio');
  }

  async saveGame(scores: Trio): Promise<void> {
    await addDoc(this.trioCollection, scores);
  }

  async getScoresFromLastXDays(days: number = 31): Promise<Trio[]> {
    const startDate: Timestamp = getPastTimestampDate(days)
    const querySnapshot = await getDocs(query(
      this.trioCollection,
      where('date', '>=', startDate),
      orderBy('date', 'desc')
    ))
    return querySnapshot.docs.map(
      doc => (
        doc.data() as Trio
      ))
  }

  async getRatios(): Promise<Ratio[]> {
    const players: string[] = await this.playersService.getPlayerList();
    const scores: Trio[] = await this.getScoresFromLastXDays(31)
    let ratios: Ratio[] = []

    players.forEach((player: string) => {
      ratios.push({
        ratio: 0,
        playerName: player,
        wins: 0,
        gamesPlayed: 0
      })
    })

    scores.forEach((score: Trio): void => {
      score.players.forEach((player: string) => {
        const playerRatio = ratios.find((ratio: Ratio): boolean => ratio.playerName === player)
        if (playerRatio) playerRatio.gamesPlayed++
      })
      const winnerRatio = ratios.find((ratio: Ratio): boolean => score.winner === ratio.playerName)
      if (winnerRatio) winnerRatio.wins++
    })

    ratios = ratios.filter((ratio: Ratio) => ratio.gamesPlayed !== 0)
    ratios.forEach((ratio: Ratio) => {
      ratio.ratio = parseFloat((ratio.wins / ratio.gamesPlayed).toFixed(3))
    })
    return ratios.sort((a, b) => this.compareRatios(a, b))
  }

  private compareRatios(a: Ratio, b: Ratio): number {
    if (a.ratio > b.ratio) return -1;
    if (a.ratio < b.ratio) return 1;
    return 0;
  };
}
