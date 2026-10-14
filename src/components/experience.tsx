"use client";
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Plus } from "lucide-react";
import type { Project } from "@/lib/schema";
import { duration } from "@/lib/lens";
import { cn } from "@/lib/utils";
import { BrandLogo, ProductCover } from "./brand-cover";
import { TrackedLink } from "./analytics";

type Place = { company: string; location: string };

/** One row per role, newest first. The row is the summary; the brief opens inline. */
export function ExperienceList({ projects, places, openSlug, onToggle }: { projects: Project[]; places: Place[]; openSlug: string | null; onToggle: (slug: string) => void }) {
  return <ol className="experience-list">{projects.map((project, index) => <ExperienceRow key={project.slug} project={project} location={places[index]?.location} open={openSlug === project.slug} onToggle={() => onToggle(project.slug)} />)}</ol>;
}

function ExperienceRow({ project, location, open, onToggle }: { project: Project; location?: string; open: boolean; onToggle: () => void }) {
  const trigger = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const metric = project.primaryMetric ?? project.metrics[0];
  const id = `brief-${project.slug}`;
  const span = duration(project.period);
  return <li className={cn("experience-row", open && "is-open")} id={`work-${project.slug}`}>
    <button ref={trigger} type="button" className="experience-summary" aria-expanded={open} aria-controls={id} onClick={onToggle}>
      <BrandLogo id={project.slug} />
      <span className="experience-main">
        <span className="experience-title"><strong>{project.role.split(" · ")[0]}</strong> · {project.title}</span>
        <span className="experience-meta">{project.period}{span && <> · {span}</>}{location && <> · {location}</>}</span>
        {metric && <span className="experience-result"><b>{metric.value}</b> {metric.label}</span>}
      </span>
      <ChevronDown className="experience-chevron" size={18} aria-hidden="true" />
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div id={id} className="experience-brief" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .3, ease: [.22, 1, .36, 1] }}>
        <ProductCover id={project.slug} caption />
        <p className="brief-tldr"><span className="detail-label">TL;DR</span>{project.outcome ?? project.subtitle}</p>
        <div className="brief-grid">
          {project.challenge && <section><p className="detail-label">Challenge</p><p>{project.challenge}</p></section>}
          {project.decisions.length > 0 && <section><p className="detail-label">Approach</p><ul>{project.decisions.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul></section>}
          {project.impact.length > 0 && <section><p className="detail-label">Results</p><ul>{project.impact.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul></section>}
        </div>
        <details className="story-more">
          <summary>Scope, what shipped & what I’d change<Plus size={15} aria-hidden="true" /></summary>
          {project.ownership && <div className="story-prose"><p className="detail-label">Scope & ownership</p><p>{project.ownership}</p></div>}
          {project.shipped.length > 0 && <div className="story-list"><p className="detail-label">Release notes</p><ul>{project.shipped.map(item => <li key={item}>{item}</li>)}</ul></div>}
          {project.alignment && <div className="judgment-block"><p className="detail-label">Alignment challenge</p><p>{project.alignment}</p></div>}
          {project.reflection && <div className="judgment-block is-reflection"><p className="detail-label">What I would do differently</p><p>{project.reflection}</p></div>}
          {project.metricContext && <p className="metric-context">{project.metricContext}</p>}
        </details>
        <div className="brief-links">
          <TrackedLink href={`/work/${project.slug}`} event="case_detail_open" item={`${project.slug}:full-case-study`}>Full brief<ArrowUpRight size={14} /></TrackedLink>
          {project.links.map(link => <TrackedLink href={link.href} key={link.href} event="evidence_click" item={`${project.slug}:${link.label}`}>{link.label}<ArrowUpRight size={14} /></TrackedLink>)}
          <button type="button" className="brief-close" onClick={() => { onToggle(); trigger.current?.focus({ preventScroll: true }); }}>Close</button>
        </div>
      </motion.div>}
    </AnimatePresence>
  </li>;
}
