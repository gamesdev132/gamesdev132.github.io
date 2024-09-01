import { addDoc, collection, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore'
import { collectionData, Firestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class TrioService{
  constructor(private firestore: Firestore) {}

  async getGamesFromLastXDays(days = 31){
    const trioCollection = collection(this.firestore, 'trio');
    const querySnapshot = await getDocs(query(trioCollection));

    return querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    });
  }
}
