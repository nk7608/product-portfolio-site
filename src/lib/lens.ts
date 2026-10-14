/** Persona lens: visitors say who they are and the page reorders itself. It never hides a section. */
export const sections = ["work", "experiments", "writing", "evidence", "about", "contact"] as const;
export type Section = typeof sections[number];
export const lenses = {
  all: { label: "Everything", order: ["work", "experiments", "writing", "evidence", "about", "contact"], open: null },
  hiring: { label: "Hiring", order: ["work", "evidence", "experiments", "writing", "about", "contact"], open: "vidrush" },
  building: { label: "Building", order: ["work", "experiments", "writing", "evidence", "about", "contact"], open: null },
  curious: { label: "Curious", order: ["about", "experiments", "writing", "work", "evidence", "contact"], open: null },
} satisfies Record<string, { label: string; order: Section[]; open: string | null }>;
export type Lens = keyof typeof lenses;
const legacy: Record<string, Lens> = { hiring: "hiring", building: "building", exploring: "curious" };

/** Reads `?for=` (and the retired `?tour=` links that were already shared). Unknown values fall back to "all". */
export function readLens(search: string): Lens {
  const params = new URLSearchParams(search);
  const value = params.get("for");
  if (value && value !== "all" && Object.hasOwn(lenses, value)) return value as Lens;
  const tour = params.get("tour");
  if (tour && Object.hasOwn(legacy, tour)) return legacy[tour];
  return "all";
}
export function lensUrl(lens: Lens) { return lens === "all" ? "/" : `/?for=${lens}`; }
/** Months between "Jan — Sep 2026" / "Jun 2022 — Jan 2024" inclusive, formatted "9 mo" / "1 yr 8 mo". */
export function duration(period: string) {
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  const m = period.toLowerCase().match(/([a-z]{3})\w*\s*(\d{4})?\s*[—–-]+\s*([a-z]{3})\w*\s*(\d{4})/);
  if (!m) return "";
  const end = Number(m[4]); const start = m[2] ? Number(m[2]) : end;
  const total = (end - start) * 12 + months.indexOf(m[3]) - months.indexOf(m[1]) + 1;
  if (total <= 0) return "";
  const y = Math.floor(total / 12), r = total % 12;
  return [y && `${y} yr`, r && `${r} mo`].filter(Boolean).join(" ");
}
