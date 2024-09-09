import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { Trio } from "../interface/trio";

@Injectable({
  providedIn: 'root',
})
export class TrioService {
  private readonly trioCollection;

  constructor(private firestore: Firestore) {
    this.trioCollection = collection(this.firestore, 'trio');
  }

  async getGamesFromLastXDays(days = 31) {
    const querySnapshot = await getDocs(query(this.trioCollection));

    return querySnapshot.docs.map(doc => {
      return doc.data() as Trio
    });
  }

  async saveGame(scores: Trio) {
    await addDoc(this.trioCollection, scores);
  }
}
