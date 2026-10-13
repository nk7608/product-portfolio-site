"use client";
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Project } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { ProductCover } from "./brand-cover";
import { ProductGlyph } from "./visual-cues";
import { TrackedLink } from "./analytics";
export function StoryDisclosure({project,index,open,muted,onToggle}:{project:Project;index:number;open:boolean;muted:boolean;onToggle:()=>void}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const contentId = `story-${project.slug}`;
  const mainMetric = project.primaryMetric ?? project.metrics[0];
  return <motion.article layout className={cn("work-story", open && "is-open", muted && "is-muted")} id={`work-${project.slug}`}>
    <button ref={trigger} type="button" className="work-summary" aria-expanded={open} aria-controls={contentId} onClick={onToggle}>
      <ProductCover id={project.slug} caption/><div className="work-summary-meta"><span className="work-number">0{index+1}</span><span className="domain-pill">{project.domain}</span><span>{project.period}</span></div>
      <div className="work-summary-copy"><div className="company-lockup"><ProductGlyph id={project.slug}/><div><p className="work-company">{project.title}</p><p className="work-role">{project.role}</p></div></div><h3>{project.outcome ?? project.subtitle}</h3></div>
      {!muted && <div className="work-metrics"><div className="primary-metric"><strong>{mainMetric?.value}</strong><span>{mainMetric?.label}</span></div><div className="supporting-metrics">{project.supportingMetrics.slice(0,2).map(metric => <span key={metric.label}><strong>{metric.value}</strong>{metric.label}</span>)}</div></div>}
      <span className="story-action">{open ? "Close story" : "Read the product brief"}{open ? <Minus size={16}/> : <ArrowRight size={16}/>}</span>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div id={contentId} className="story-content" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduceMotion?0:.3,ease:[.22,1,.36,1]}}>
        <div className="story-layout">
          <aside className="story-evidence" aria-label={`${project.title} evidence`}>
            {project.metricContext && <p className="detail-label">About these numbers</p>}
            {project.metricContext && <p className="metric-context">{project.metricContext}</p>}
            <div className="evidence-links"><TrackedLink href={`/work/${project.slug}`} event="case_detail_open" item={`${project.slug}:full-case-study`}>Open full case study<ArrowUpRight size={14}/></TrackedLink>{project.links.map(link => <TrackedLink href={link.href} key={link.href} event="evidence_click" item={`${project.slug}:${link.label}`}>{link.label}<ArrowUpRight size={14}/></TrackedLink>)}</div>
          </aside>
          <div className="story-narrative">
            <div className="story-prose"><p className="detail-label">Product context</p><p>{project.product}</p></div>
            <div className="story-prose"><p className="detail-label">Problem statement</p><p>{project.challenge}</p></div>
            <div className="story-prose"><p className="detail-label">Scope & ownership</p><p>{project.ownership}</p></div>
            <div className="story-list"><p className="detail-label">Key decisions & tradeoffs</p><ol>{project.decisions.map((item,i) => <li key={item}><span>0{i+1}</span>{item}</li>)}</ol></div>
            <div className="story-columns"><div className="story-list"><p className="detail-label">Release notes</p><ul>{project.shipped.map(item => <li key={item}>{item}</li>)}</ul></div><div className="story-list"><p className="detail-label">Measured impact</p><ul>{project.impact.map(item => <li key={item}>{item}</li>)}</ul></div></div>
            {(project.alignment || project.reflection) && <details className="story-more"><summary>Alignment & what I’d do differently<Plus size={15} aria-hidden="true"/></summary>
              {project.alignment && <div className="judgment-block"><p className="detail-label">Alignment challenge</p><p>{project.alignment}</p></div>}
              {project.reflection && <div className="judgment-block is-reflection"><p className="detail-label">What I would do differently</p><p>{project.reflection}</p></div>}
            </details>}
          </div>
        </div>
        <button type="button" className="close-story" onClick={() => { onToggle(); trigger.current?.focus({preventScroll:true}); }}>Close product story <Minus size={15}/></button>
      </motion.div>}
    </AnimatePresence>
  </motion.article>;
}
