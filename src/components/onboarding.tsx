"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { defaultInterests, interests, sizes, themes, type Interest, type Prefs } from "@/lib/prefs";
import type { Lens } from "@/lib/lens";
import { usePrefs } from "./prefs";
import { Sheet } from "./sheet";
import { useAnalytics } from "./analytics";

const personas: { id: Lens; title: string; detail: string }[] = [
  { id: "hiring", title: "I’m hiring for a product role", detail: "Roles, outcomes and references first" },
  { id: "building", title: "I’m building something", detail: "Decisions, trade-offs, prototypes, writing" },
  { id: "curious", title: "Just looking around", detail: "The person, side projects, what I read" },
];

/** First-visit intro (Xero / pliability pattern): three short steps, Skip on every step, nothing collected beyond this browser. */
export function Onboarding() {
  const { prefs, update, panel, open } = usePrefs();
  const track = useAnalytics();
  const [step, setStep] = useState(0);
  const [persona, setPersona] = useState<Lens>(prefs.persona === "all" ? "hiring" : prefs.persona);
  const [chosen, setChosen] = useState<Interest[]>(prefs.interests);
  useEffect(() => { if (panel === "intro") { const frame = requestAnimationFrame(() => setStep(0)); return () => cancelAnimationFrame(frame); } }, [panel]);

  const finish = (patch: Partial<Prefs>) => { update({ ...patch, onboarded: true }); open(null); window.scrollTo({ top: 0 }); };
  const skip = () => { finish({ persona: prefs.onboarded ? prefs.persona : "all", interests: prefs.onboarded ? prefs.interests : defaultInterests.all }); track("intro_skip", { step }); };
  const toggle = (id: Interest) => setChosen(list => list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  return <Sheet open={panel === "intro"} onClose={skip} label="Personalise this page" className="sheet-intro">
    <div className="intro-top">
      <div className="intro-progress" role="progressbar" aria-label="Intro progress" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}>{[0, 1, 2].map(i => <span key={i} data-on={i <= step} />)}</div>
      <button type="button" className="text-btn" onClick={skip}>Skip</button>
    </div>

    {step === 0 && <div className="intro-step">
      <p className="intro-kicker">Hi, I’m Nayana — a product manager in Bangalore.</p>
      <h2>What brings you here?</h2>
      <p className="intro-sub">I’ll put the most useful parts first. You can change this any time.</p>
      <div className="intro-options" role="radiogroup" aria-label="What brings you here">{personas.map(item => <button key={item.id} type="button" role="radio" aria-checked={persona === item.id} onClick={() => { setPersona(item.id); setChosen(defaultInterests[item.id]); setStep(1); track("intro_persona", { lens: item.id }); }}><b>{item.title}</b><span>{item.detail}</span></button>)}</div>
    </div>}

    {step === 1 && <div className="intro-step">
      <h2>What should I show first?</h2>
      <p className="intro-sub">Picked for you; untick anything you don’t need. Everything else stays one click away.</p>
      <div className="intro-checks" role="group" aria-label="Sections to show first">{interests.map(item => <button key={item.id} type="button" role="checkbox" aria-checked={chosen.includes(item.id)} onClick={() => toggle(item.id)}><span className="check" aria-hidden="true">{chosen.includes(item.id) && <Check size={12} />}</span>{item.label}</button>)}</div>
      <div className="intro-nav"><button type="button" className="text-btn" onClick={() => setStep(0)}><ArrowLeft size={14} />Back</button><button type="button" className="btn" disabled={!chosen.length} onClick={() => setStep(2)}>Next</button></div>
    </div>}

    {step === 2 && <div className="intro-step">
      <h2>Make it comfortable</h2>
      <p className="intro-sub">Optional. More options live in Settings.</p>
      <fieldset className="control"><legend>Theme</legend><div className="segmented" role="radiogroup" aria-label="Theme">{themes.map(theme => <button key={theme.id} type="button" role="radio" aria-checked={prefs.theme === theme.id} onClick={() => update({ theme: theme.id })}>{theme.label}</button>)}</div></fieldset>
      <fieldset className="control"><legend>Text size</legend><div className="segmented" role="radiogroup" aria-label="Text size">{sizes.map(size => <button key={size.id} type="button" role="radio" aria-checked={prefs.size === size.id} onClick={() => update({ size: size.id })}>{size.label}</button>)}</div></fieldset>
      <div className="intro-nav"><button type="button" className="text-btn" onClick={() => setStep(1)}><ArrowLeft size={14} />Back</button><button type="button" className="btn" onClick={() => { finish({ persona, interests: chosen }); track("intro_done", { lens: persona, interests: chosen.join(",") }); }}>Show my page</button></div>
    </div>}
  </Sheet>;
}
