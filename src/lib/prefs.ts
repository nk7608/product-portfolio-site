/** Visitor preferences. Everything here is a reading preference or a persona choice; nothing identifies the visitor.
 * Stored only in this browser under `prefsKey`, applied to <html> as data attributes before first paint (see layout.tsx). */
import { lenses, type Lens, type Section } from "./lens";

export const themes = [
  { id: "system", label: "System", note: "Paper by day, Ink by night" },
  { id: "paper", label: "Paper", note: "Warm off-white" },
  { id: "stone", label: "Stone", note: "Cool grey-white" },
  { id: "ink", label: "Ink", note: "Warm charcoal" },
  { id: "night", label: "Night", note: "Near-black" },
] as const;
export const accents = [
  { id: "rust", label: "Rust" },
  { id: "cobalt", label: "Cobalt" },
  { id: "moss", label: "Moss" },
  { id: "plum", label: "Plum" },
] as const;
export const fonts = [{ id: "sans", label: "Sans" }, { id: "serif", label: "Serif" }] as const;
export const sizes = [{ id: "s", label: "Small" }, { id: "m", label: "Default" }, { id: "l", label: "Large" }] as const;
export const densities = [{ id: "skim", label: "Skim", note: "One line per item" }, { id: "full", label: "Full", note: "Summaries shown inline" }] as const;
export const motions = [{ id: "auto", label: "Match device" }, { id: "off", label: "Off" }] as const;

/** What a visitor can say they want to see in onboarding; each maps to a section. */
export const interests = [
  { id: "work", label: "Roles & outcomes", section: "work" },
  { id: "experiments", label: "Prototypes & case studies", section: "experiments" },
  { id: "evidence", label: "What teammates say", section: "evidence" },
  { id: "writing", label: "Writing", section: "writing" },
  { id: "about", label: "The person", section: "about" },
] as const;
export type Interest = typeof interests[number]["id"];

export type Prefs = {
  theme: typeof themes[number]["id"];
  accent: typeof accents[number]["id"];
  font: typeof fonts[number]["id"];
  size: typeof sizes[number]["id"];
  density: typeof densities[number]["id"];
  motion: typeof motions[number]["id"];
  persona: Lens;
  interests: Interest[];
  onboarded: boolean;
};
export const prefsKey = "nayana-prefs-v2";
export const defaultInterests: Record<Lens, Interest[]> = {
  all: ["work", "experiments", "evidence", "writing", "about"],
  hiring: ["work", "evidence"],
  building: ["work", "experiments", "writing"],
  curious: ["about", "experiments", "writing"],
};
export const defaultPrefs: Prefs = { theme: "system", accent: "rust", font: "sans", size: "m", density: "skim", motion: "auto", persona: "all", interests: defaultInterests.all, onboarded: false };

const pick = <T extends string>(value: unknown, allowed: readonly { id: T }[], fallback: T): T => allowed.some(item => item.id === value) ? value as T : fallback;
/** Validates anything read from storage or a URL; unknown values fall back to defaults. */
export function parsePrefs(raw: unknown): Prefs {
  const v = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const persona = typeof v.persona === "string" && Object.hasOwn(lenses, v.persona) ? v.persona as Lens : "all";
  const list = Array.isArray(v.interests) ? v.interests.filter((id): id is Interest => interests.some(item => item.id === id)) : [];
  return {
    theme: pick(v.theme, themes, defaultPrefs.theme),
    accent: pick(v.accent, accents, defaultPrefs.accent),
    font: pick(v.font, fonts, defaultPrefs.font),
    size: pick(v.size, sizes, defaultPrefs.size),
    density: pick(v.density, densities, defaultPrefs.density),
    motion: pick(v.motion, motions, defaultPrefs.motion),
    persona,
    interests: list.length ? [...new Set(list)] : defaultInterests[persona],
    onboarded: v.onboarded === true,
  };
}

/** Section order for a persona + chosen interests: the persona's order, with chosen sections pulled to the front. Contact is always last. */
export function sectionOrder(persona: Lens, chosen: Interest[]): Section[] {
  const base: Section[] = lenses[persona].order.filter(s => s !== "contact");
  const wanted: Section[] = interests.filter(i => chosen.includes(i.id)).map(i => i.section);
  const ordered = [...base.filter(s => wanted.includes(s)), ...base.filter(s => !wanted.includes(s))];
  return [...new Set(ordered), "contact"];
}

/** Attributes written to <html>; the same function runs in the pre-paint script, so keep it dependency-free. */
export function htmlAttributes(p: Prefs, prefersDark: boolean) {
  const theme = p.theme === "system" ? (prefersDark ? "ink" : "paper") : p.theme;
  return { "data-theme": theme, "data-mode": theme === "ink" || theme === "night" ? "dark" : "light", "data-accent": p.accent, "data-font": p.font, "data-size": p.size, "data-density": p.density, "data-motion": p.motion };
}
