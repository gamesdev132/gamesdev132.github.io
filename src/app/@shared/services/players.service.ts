import { Injectable } from '@angular/core';
import { Firestore, orderBy } from '@angular/fire/firestore';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { Player } from 'app/@shared/interface/player';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private readonly playersCollection;
  private playerList: Player[] = [];

  constructor(private firestore: Firestore) {
    this.playersCollection = collection(this.firestore, 'players');
  }

  async savePlayer(playerName: string): Promise<void> {
    const player = { name: playerName };
    await addDoc(this.playersCollection, player);
    this.playerList.push(player);
  }

  async initializePlayerList(): Promise<void> {
    const querySnapshot = await getDocs(
      query(this.playersCollection, orderBy('name')),
    );
    querySnapshot.docs
      .map((doc) => doc.data())
      .map((player) => {
        this.playerList.push({ name: player['name'], deactivate: player['deactivate'] ?? false });
      });
  }

  async getPlayerList(): Promise<string[]> {
    if (this.playerList.length === 0) {
      await this.initializePlayerList();
    }
    return this.playerList.map((player) => player.name);
  }

  async getActivePlayerList(): Promise<string[]> {
    if (this.playerList.length === 0) {
      await this.initializePlayerList();
    }
    return this.playerList.filter((player) => player.deactivate !== true).map((player) => player.name);
  }
}
