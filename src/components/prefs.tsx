"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultPrefs, htmlAttributes, parsePrefs, prefsKey, type Prefs } from "@/lib/prefs";
import { readLens } from "@/lib/lens";

type Panel = null | "controls" | "command" | "intro";
type Ctx = { prefs: Prefs; ready: boolean; update: (patch: Partial<Prefs>) => void; reset: () => void; panel: Panel; open: (panel: Panel) => void };
const PrefsContext = createContext<Ctx | null>(null);

function apply(prefs: Prefs) {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  for (const [key, value] of Object.entries(htmlAttributes(prefs, dark))) document.documentElement.setAttribute(key, value);
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [ready, setReady] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);

  useEffect(() => {
    let stored: unknown = null;
    try { stored = JSON.parse(localStorage.getItem(prefsKey) ?? "null"); } catch {}
    let next = parsePrefs(stored);
    // A shared link (?for=hiring, or the retired ?tour=) sets the persona and skips the intro.
    const fromUrl = readLens(window.location.search);
    if (fromUrl !== "all" || /[?&](for|tour)=/.test(window.location.search)) next = parsePrefs({ ...next, persona: fromUrl, interests: fromUrl !== next.persona ? undefined : next.interests, onboarded: true });
    // The intro belongs to the homepage; a first visit straight to a case page is never interrupted.
    const frame = requestAnimationFrame(() => { setPrefs(next); setReady(true); if (!next.onboarded && window.location.pathname === "/") setPanel("intro"); });
    apply(next);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => setPrefs(current => { apply(current); return current; });
    media.addEventListener("change", onScheme);
    return () => { cancelAnimationFrame(frame); media.removeEventListener("change", onScheme); };
  }, []);

  const save = useCallback((next: Prefs) => {
    apply(next);
    try { localStorage.setItem(prefsKey, JSON.stringify(next)); } catch {}
  }, []);
  const update = useCallback((patch: Partial<Prefs>) => setPrefs(current => { const next = parsePrefs({ ...current, ...patch }); save(next); return next; }), [save]);
  const reset = useCallback(() => { const next = { ...defaultPrefs, onboarded: true }; setPrefs(next); save(next); }, [save]);

  // ⌘K / Ctrl+K opens the command menu from anywhere.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPanel(p => p === "command" ? null : "command"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ prefs, ready, update, reset, panel, open: setPanel }), [prefs, ready, update, reset, panel]);
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside PrefsProvider");
  return ctx;
}
