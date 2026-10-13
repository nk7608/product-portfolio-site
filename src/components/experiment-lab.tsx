"use client";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import experiments from "../../content/experiments.json";
import { TrackedLink } from "./analytics";

export function ExperimentLab() {
  return <div className="experiment-grid">{experiments.map((item,index) => <article className="experiment-card" key={item.id}>
    <div className="experiment-meta"><span>EXP / {String(index+1).padStart(2,"0")}</span><span><FlaskConical size={13}/>{item.type}</span></div>
    <p className="experiment-name">{item.name}<span>{item.domain}</span></p>
    <h3>{item.title}</h3><p className="experiment-summary">{item.summary}</p>
    <p className="experiment-boundary">{item.boundary}</p>
    <div className="experiment-links">{item.links.map(link => <TrackedLink key={link.href} href={link.href} event="artifact_open" item={`${item.id}:${link.label}`}>{link.label}<ArrowUpRight size={14}/></TrackedLink>)}</div>
  </article>)}</div>;
}
