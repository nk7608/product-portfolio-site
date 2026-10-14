"use client";
import { useId } from "react";
import { Plus } from "lucide-react";
import type { Project } from "@/lib/schema";
import { duration } from "@/lib/lens";
import { BrandLogo, ProductCover } from "./brand-cover";
import { TrackedLink } from "./analytics";

/** Numbered index of roles (newest first). The row is the summary; the brief opens in place. */
export function ExperienceList({ projects, places, openSlug, onToggle }: { projects: Project[]; places: { location: string }[]; openSlug: string | null; onToggle: (slug: string) => void }) {
  return <ol className="rows">{projects.map((project, index) => <ExperienceRow key={project.slug} n={index + 1} project={project} location={places[index]?.location} open={openSlug === project.slug} onToggle={() => onToggle(project.slug)} />)}</ol>;
}

function ExperienceRow({ n, project, location, open, onToggle }: { n: number; project: Project; location?: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  const metric = project.primaryMetric ?? project.metrics[0];
  const span = duration(project.period);
  const year = project.period.match(/\d{4}(?!.*\d{4})/)?.[0];
  return <li className={`row ${open ? "is-open" : ""}`} id={`work-${project.slug}`}>
    <button type="button" className="row-btn" aria-expanded={open} aria-controls={id} onClick={onToggle}>
      <span className="n">{String(n).padStart(2, "0")}</span>
      <span className="t"><BrandLogo id={project.slug} /><b>{project.role.split(" · ")[0]}</b> <span>· {project.title}</span></span>
      <span className="y" title={project.period}>{year}{span && ` · ${span}`}</span>
      <Plus className="chev" size={15} aria-hidden="true" />
      {metric && <span className="r"><b>{metric.value}</b> {metric.label}</span>}
      <span className="d">{project.outcome ?? project.subtitle}</span>
    </button>
    {open && <div className="row-body" id={id}>
      <p className="tldr">{project.outcome ?? project.subtitle}</p>
      <p className="boundary">{project.period}{location && ` · ${location}`}{project.domain && ` · ${project.domain}`}</p>
      <ProductCover id={project.slug} />
      <div className="brief-cols">
        {project.challenge && <div><h3>Challenge</h3><p>{project.challenge}</p></div>}
        {project.decisions.length > 0 && <div><h3>Approach</h3><ul>{project.decisions.slice(0, 2).map(item => <li key={item}>{item}</li>)}</ul></div>}
        {project.impact.length > 0 && <div><h3>Results</h3><ul>{project.impact.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul></div>}
      </div>
      <details>
        <summary>Scope, release notes and what I’d change</summary>
        {project.ownership && <p>{project.ownership}</p>}
        {project.shipped.length > 0 && <ul>{project.shipped.map(item => <li key={item}>{item}</li>)}</ul>}
        {project.alignment && <p><b>Alignment.</b> {project.alignment}</p>}
        {project.reflection && <p><b>Differently next time.</b> {project.reflection}</p>}
        {project.metricContext && <p><b>About the numbers.</b> {project.metricContext}</p>}
      </details>
      <div className="row-links">
        <TrackedLink className="link" href={`/work/${project.slug}`} event="case_detail_open" item={`${project.slug}:full`}>Full write-up →</TrackedLink>
        {project.links.map(link => <TrackedLink className="link" href={link.href} key={link.href} event="evidence_click" item={`${project.slug}:${link.label}`}>{link.label} ↗</TrackedLink>)}
      </div>
    </div>}
  </li>;
}
