import { Injectable } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private readonly playersCollection;

  constructor(private firestore: Firestore) {
    this.playersCollection = collection(this.firestore, 'players');
  }

  async saveCompletePlayerList(): Promise<void> {
    const playerList: string[] = ["Mattéo", "Nicolas", "Samuel", "Arthur", "Jérémie", "Ianis", "Emilien",
      "Hugo", "Julien", "Joseph", "Judicaël", "Klemens", "Kagnana", "Yamen"]
    for (const player of playerList) {
      await addDoc(this.playersCollection, {name: player});
    }
  }

  async savePlayer(playerName: string): Promise<void> {
    await addDoc(this.playersCollection, {name: playerName});
  }

  async getPlayerList(): Promise<any> {
    const querySnapshot = await getDocs(query(
      this.playersCollection,
    ))
    return querySnapshot.docs.map(
      doc => (
        doc.data()
      ))
  }
}
