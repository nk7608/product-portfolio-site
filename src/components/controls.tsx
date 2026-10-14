"use client";
import { X } from "lucide-react";
import { accents, densities, fonts, motions, sizes, themes, type Prefs } from "@/lib/prefs";
import { lenses, type Lens } from "@/lib/lens";
import { usePrefs } from "./prefs";
import { Sheet } from "./sheet";
import { useAnalytics } from "./analytics";

function Choice<K extends keyof Prefs>({ name, label, options, value, onChange }: { name: K; label: string; options: readonly { id: string; label: string; note?: string }[]; value: string; onChange: (key: K, id: string) => void }) {
  return <fieldset className="control">
    <legend>{label}</legend>
    <div className="segmented" role="radiogroup" aria-label={label}>{options.map(option => <button key={option.id} type="button" role="radio" aria-checked={value === option.id} title={option.note} onClick={() => onChange(name, option.id)}>{option.label}</button>)}</div>
  </fieldset>;
}

/** Reader-style settings (Matter / X / Perplexity patterns): theme, accent, type, size, detail, motion, persona. */
export function Controls() {
  const { prefs, update, reset, panel, open } = usePrefs();
  const track = useAnalytics();
  const set = <K extends keyof Prefs>(key: K, id: string) => { update({ [key]: id } as Partial<Prefs>); track("preference_change", { key, value: id }); };
  return <Sheet open={panel === "controls"} onClose={() => open(null)} label="Display and reading settings" className="sheet-side">
    <div className="sheet-head"><h2>Settings</h2><button type="button" className="icon-btn" aria-label="Close settings" onClick={() => open(null)}><X size={16} /></button></div>
    <fieldset className="control">
      <legend>Theme</legend>
      <div className="swatches" role="radiogroup" aria-label="Theme">{themes.map(theme => <button key={theme.id} type="button" role="radio" aria-checked={prefs.theme === theme.id} className={`swatch swatch-${theme.id}`} onClick={() => set("theme", theme.id)}><span aria-hidden="true" /><b>{theme.label}</b><small>{theme.note}</small></button>)}</div>
    </fieldset>
    <fieldset className="control">
      <legend>Accent</legend>
      <div className="dots" role="radiogroup" aria-label="Accent colour">{accents.map(accent => <button key={accent.id} type="button" role="radio" aria-checked={prefs.accent === accent.id} aria-label={accent.label} className={`dot dot-${accent.id}`} onClick={() => set("accent", accent.id)} />)}</div>
    </fieldset>
    <Choice name="font" label="Typeface" options={fonts} value={prefs.font} onChange={set} />
    <Choice name="size" label="Text size" options={sizes} value={prefs.size} onChange={set} />
    <Choice name="density" label="Detail" options={densities} value={prefs.density} onChange={set} />
    <Choice name="motion" label="Motion" options={motions} value={prefs.motion} onChange={set} />
    <fieldset className="control">
      <legend>Show me the page as</legend>
      <div className="segmented" role="radiogroup" aria-label="Persona">{(Object.keys(lenses) as Lens[]).map(key => <button key={key} type="button" role="radio" aria-checked={prefs.persona === key} onClick={() => { update({ persona: key, interests: undefined }); track("lens_change", { lens: key }); }}>{lenses[key].label}</button>)}</div>
    </fieldset>
    <div className="sheet-foot">
      <button type="button" className="text-btn" onClick={() => open("intro")}>Replay intro</button>
      <button type="button" className="text-btn" onClick={() => { reset(); track("preference_change", { key: "reset", value: "default" }); }}>Reset to default</button>
    </div>
    <p className="sheet-note">Saved in this browser only. Press <kbd>⌘</kbd><kbd>K</kbd> for the command menu.</p>
  </Sheet>;
}
