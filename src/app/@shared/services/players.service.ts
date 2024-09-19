import { Injectable } from '@angular/core';
import { Firestore, orderBy } from "@angular/fire/firestore";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private readonly playersCollection;
  private playerList: string[] = [];

  constructor(private firestore: Firestore) {
    this.playersCollection = collection(this.firestore, 'players');
  }

  async savePlayer(playerName: string): Promise<void> {
    await addDoc(this.playersCollection, {name: playerName});
    this.playerList.push(playerName);
  }

  async initializePlayerList(): Promise<void> {
    const querySnapshot = await getDocs(query(
      this.playersCollection,
      orderBy('name')
    ))
    querySnapshot.docs.map(
      doc => (
        doc.data()
      )).map((player) => {
      this.playerList.push(player['name'])
    })
  }

  async getPlayerList(): Promise<string[]> {
    if (this.playerList.length === 0){
      await this.initializePlayerList();
    }
    return this.playerList;
  }
}
