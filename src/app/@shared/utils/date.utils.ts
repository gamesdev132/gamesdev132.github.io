import { Timestamp } from 'firebase/firestore';

export function getPastTimestampDate(days: number): Timestamp {
  const futureDate: Date = new Date();
  futureDate.setDate(futureDate.getDate() - days);
  return Timestamp.fromDate(futureDate);
}
