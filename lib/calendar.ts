// Calendar utilities — pure JS Date math, no external dependencies.

export const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// Monday-first short labels (3-char) and single-letter fallback
export const DAYS_FR_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
export const DAYS_FR_LETTER = ["L", "M", "M", "J", "V", "S", "D"];
const DAYS_FR_LONG = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export interface CalendarDay {
  date: Date | null; // null = padding cell
  isToday: boolean;
}

/** Builds a grid of weeks (each week = 7 CalendarDay entries) for the given month. */
export function buildCalendarGrid(year: number, month: number): CalendarDay[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Monday-first offset: Sun→6, Mon→0, Tue→1, …
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= lastDate; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(
      cells.slice(i, i + 7).map((date) => ({
        date,
        isToday: date !== null && date.getTime() === today.getTime()
      }))
    );
  }
  return weeks;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Returns { year, month } offset by `delta` months from the given year/month. */
export function offsetMonth(
  year: number,
  month: number,
  delta: number
): { year: number; month: number } {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

/** "Jeudi 18 Juin 2026" */
export function formatDateFrLong(date: Date): string {
  return `${DAYS_FR_LONG[date.getDay()]} ${date.getDate()} ${MONTHS_FR[date.getMonth()]} ${date.getFullYear()}`;
}
