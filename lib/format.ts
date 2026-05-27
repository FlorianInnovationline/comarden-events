const MONTHS_FR = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc"
];

export function splitDate(iso: string) {
  const d = new Date(iso);
  return {
    day: String(d.getUTCDate()).padStart(2, "0"),
    month: MONTHS_FR[d.getUTCMonth()] ?? "",
    year: String(d.getUTCFullYear())
  };
}
