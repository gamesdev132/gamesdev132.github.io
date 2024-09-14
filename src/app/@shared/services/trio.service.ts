import { Injectable } from "@angular/core";
import { Firestore, orderBy, where } from "@angular/fire/firestore";
import { getPastTimestampDate } from "app/@shared/utils/date.utils";
import { addDoc, collection, getDocs, query, Timestamp } from 'firebase/firestore'
import { Trio } from "../interface/trio";

@Injectable({
  providedIn: 'root',
})
export class TrioService {
  private readonly trioCollection;

  constructor(private firestore: Firestore) {
    this.trioCollection = collection(this.firestore, 'trio');
  }

  async saveGame(scores: Trio): Promise<void> {
    await addDoc(this.trioCollection, scores);
  }

  async getGamesFromLastXDays(days: number = 31): Promise<Trio[]> {
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
}
