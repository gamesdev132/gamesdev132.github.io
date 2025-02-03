import { Injectable } from '@angular/core';
import { Firestore, orderBy } from '@angular/fire/firestore';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { Player } from 'app/@shared/interface/player';
import { BehaviorSubject, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private readonly playersCollection;
  private playerList: Player[] = [];
  activePlayers: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private firestore: Firestore) {
    this.playersCollection = collection(this.firestore, 'players');
  }

  async savePlayer(playerName: string): Promise<void> {
    const player = { name: playerName };
    await addDoc(this.playersCollection, player);
    this.playerList.push(player);
    this.activePlayers.next(this.getActivePlayers());
  }

  async initializePlayerList(): Promise<void> {
    this.playerList = [];
    const querySnapshot = await getDocs(
      query(this.playersCollection, orderBy('name')),
    );
    querySnapshot.docs
      .map((doc) => doc.data())
      .map((player) => {
        this.playerList.push({ name: player['name'], deactivate: player['deactivate'] ?? false });
        this.activePlayers.next(this.getActivePlayers());
      });
  }

  async getPlayerList(): Promise<string[]> {
    if (this.playerList.length === 0) {
      await this.initializePlayerList();
    }
    return this.playerList.map((player) => player.name);
  }

  private getActivePlayers(): string[] {
    return this.playerList.filter((player) => player.deactivate !== true).map((player) => player.name);
  }
}
