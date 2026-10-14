"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { themes, type Prefs } from "@/lib/prefs";
import { usePrefs } from "./prefs";
import { Sheet } from "./sheet";
import { useAnalytics } from "./analytics";

export const contact = { email: "nayanak872@gmail.com", resume: "/assets/nayana-kumari-ai-product-manager-resume.pdf", linkedin: "https://www.linkedin.com/in/nayana-k-955411170/", github: "https://github.com/nk7608" };
type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

/** Navigates by hash; the homepage listens for hashchange, expands the target's section and scrolls to it. */
function go(hash: string) {
  if (!document.getElementById(hash)) { window.location.assign(new URL(`/#${hash}`, window.location.origin).href); return; }
  if (location.hash === `#${hash}`) window.dispatchEvent(new HashChangeEvent("hashchange"));
  else location.hash = hash;
}

/** ⌘K menu (Mistral / Magnific pattern): jump anywhere, act, or change a setting without hunting for it. */
export function CommandMenu({ roles }: { roles: { slug: string; label: string }[] }) {
  const { panel, open } = usePrefs();
  // Sheet mounts its children only while open, so every opening starts with an empty search.
  return <Sheet open={panel === "command"} onClose={() => open(null)} label="Command menu" className="sheet-command"><CommandList roles={roles} /></Sheet>;
}

function CommandList({ roles }: { roles: { slug: string; label: string }[] }) {
  const { prefs, update, open } = usePrefs();
  const track = useAnalytics();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const close = () => open(null);

  const items = useMemo<Item[]>(() => [
    ...[["work", "Experience"], ["experiments", "Experiments"], ["writing", "Writing"], ["evidence", "Recommendations"], ["about", "Off the clock"], ["contact", "Contact"]].map(([id, label]) => ({ id: `go-${id}`, group: "Go to", label, run: () => go(id) })),
    ...roles.map(role => ({ id: `role-${role.slug}`, group: "Roles", label: role.label, run: () => go(`work-${role.slug}`) })),
    { id: "copy-email", group: "Contact", label: "Copy email address", hint: copied ? "Copied ✓" : contact.email, run: () => { navigator.clipboard?.writeText(contact.email).then(() => setCopied(true)).catch(() => { location.href = `mailto:${contact.email}`; }); track("contact_open", { item: "command-copy-email" }); } },
    { id: "email", group: "Contact", label: "Write an email", run: () => { location.href = `mailto:${contact.email}`; } },
    { id: "resume", group: "Contact", label: "Download résumé (PDF)", run: () => { const a = document.createElement("a"); a.href = contact.resume; a.download = "Nayana-Kumari-AI-Product-Manager-Resume.pdf"; a.click(); track("resume_link", { item: "command" }); } },
    { id: "linkedin", group: "Contact", label: "Open LinkedIn", run: () => { window.open(contact.linkedin, "_blank", "noopener,noreferrer"); } },
    ...themes.map(theme => ({ id: `theme-${theme.id}`, group: "Appearance", label: `Theme: ${theme.label}${theme.id === "ink" || theme.id === "night" ? " (dark)" : theme.id === "system" ? " (auto)" : " (light)"}`, hint: prefs.theme === theme.id ? "current" : theme.note, run: () => update({ theme: theme.id as Prefs["theme"] }) })),
    { id: "density", group: "Appearance", label: prefs.density === "skim" ? "Show summaries inline (Full)" : "One line per item (Skim)", run: () => update({ density: prefs.density === "skim" ? "full" : "skim" }) },
    { id: "font", group: "Appearance", label: prefs.font === "sans" ? "Read in serif" : "Read in sans", run: () => update({ font: prefs.font === "sans" ? "serif" : "sans" }) },
    { id: "settings", group: "Appearance", label: "All settings…", run: () => open("controls") },
    { id: "intro", group: "Appearance", label: "Change who I'm browsing as…", run: () => open("intro") },
  ], [roles, prefs, update, open, copied, track]);

  const q = query.trim().toLowerCase();
  const shown = q ? items.filter(item => `${item.group} ${item.label} ${item.hint ?? ""}`.toLowerCase().includes(q)) : items;
  const run = (item: Item) => { const keepOpen = item.id === "copy-email"; item.run(); track("command_run", { item: item.id }); if (!keepOpen && !["settings", "intro"].includes(item.id)) close(); };
  let lastGroup = "";

  return <>
    <div className="command-input"><Search size={15} aria-hidden="true" /><input autoFocus value={query} placeholder="Jump to, copy, change…" aria-label="Search commands" aria-controls="command-list" aria-activedescendant={shown[active] ? `cmd-${shown[active].id}` : undefined}
      onChange={event => { setQuery(event.target.value); setActive(0); }}
      onKeyDown={event => {
        if (event.key === "ArrowDown") { event.preventDefault(); setActive(i => Math.min(i + 1, shown.length - 1)); }
        if (event.key === "ArrowUp") { event.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
        if (event.key === "Enter" && shown[active]) { event.preventDefault(); run(shown[active]); }
      }} /><kbd>esc</kbd></div>
    <ul id="command-list" role="listbox" aria-label="Commands" className="command-list">
      {shown.map((item, index) => {
        const header = item.group !== lastGroup ? item.group : null; lastGroup = item.group;
        return <li key={item.id} role="presentation">
          {header && <p className="command-group" aria-hidden="true">{header}</p>}
          <button type="button" id={`cmd-${item.id}`} role="option" aria-selected={index === active} onMouseEnter={() => setActive(index)} onClick={() => run(item)}><span>{item.label}</span>{item.hint && <small>{item.hint}</small>}</button>
        </li>;
      })}
      {!shown.length && <li className="command-empty">No matches. Try “email”, “dark” or a company name.</li>}
    </ul>
  </>;
}
