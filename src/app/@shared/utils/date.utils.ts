export function getPastTimestampDate(days: number): Date {
  const pastDate: Date = new Date();
  pastDate.setDate(pastDate.getDate() - days);
  return pastDate;
}
