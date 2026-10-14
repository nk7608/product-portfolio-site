"use client";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import experiments from "../../content/experiments.json";
import { BrandLogo, ProductCover } from "./brand-cover";
import { TrackedLink } from "./analytics";

/** Compact cards (homepage): cover, type chip, name, one-line title, honesty tag, links. Full cards add the summary. */
export function ExperimentLab({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? "experiment-grid is-compact" : "experiment-grid"} role={compact ? "list" : undefined}>{experiments.map(item => <article className="experiment-card" key={item.id} role={compact ? "listitem" : undefined}>
    <div className="experiment-cover"><ProductCover id={item.id} /><span className="cover-chip"><FlaskConical size={11} aria-hidden="true" />{item.type}</span></div>
    <div className="experiment-brand"><BrandLogo id={item.id} /><p className="experiment-name">{item.name}<span>{item.domain}</span></p></div>
    <h3>{item.title}</h3>
    {!compact && <p className="experiment-summary">{item.summary}</p>}
    <p className="experiment-boundary">{item.boundary}</p>
    <div className="experiment-links">{item.links.map(link => <TrackedLink key={link.href} href={link.href} event="artifact_open" item={`${item.id}:${link.label}`}>{link.label}<ArrowUpRight size={14} /></TrackedLink>)}</div>
  </article>)}</div>;
}
