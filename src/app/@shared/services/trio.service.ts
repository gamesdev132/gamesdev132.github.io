import { addDoc, collection, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore'
import { collectionData, Firestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Trio } from "../interface/trio";
@Injectable({
  providedIn: 'root',
})
export class TrioService{
  private readonly trioCollection;

  constructor(private firestore: Firestore) {
    this.trioCollection = collection(this.firestore, 'trio');
  }

  async getGamesFromLastXDays(days = 31){
    const querySnapshot = await getDocs(query(this.trioCollection));

    return querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    });
  }

  async saveGame(scores: Trio){
    await addDoc(this.trioCollection, scores);
  }
}
