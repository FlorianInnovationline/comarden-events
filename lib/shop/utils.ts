// Catalog display helpers (pure functions, safe on server and client).

/**
 * Formats a price in euros for fr-BE, or "Sur devis" when the price is 0.
 * The Comarden catalog uses a lead/quote model: price_cents === 0 means
 * "ask for a quote", never "free".
 */
export function formatPrice(cents: number, currency: string = "EUR"): string {
  if (cents === 0) return "Sur devis";
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency
  }).format(cents / 100);
}

export interface StockStatus {
  label: string;
  color: string;
  available: boolean;
}

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) {
    return { label: "Sur commande", color: "text-ink-light", available: false };
  }
  if (stock < 10) {
    return { label: "Stock limité", color: "text-amber-600", available: true };
  }
  return { label: "En stock", color: "text-green-600", available: true };
}

export interface SpecEntry {
  label: string;
  value: string | null;
}

/**
 * Parses a spec line of the form "Label : valeur" into { label, value }.
 * Lines without the " : " separator are returned with value null and shown
 * as plain bullet text.
 */
export function parseSpec(spec: string): SpecEntry {
  const idx = spec.indexOf(" : ");
  if (idx === -1) return { label: spec.trim(), value: null };
  return {
    label: spec.slice(0, idx).trim(),
    value: spec.slice(idx + 3).trim()
  };
}
