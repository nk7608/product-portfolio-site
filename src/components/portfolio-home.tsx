"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, Minus } from "lucide-react";
import type { Project } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { TrackedLink, useAnalytics } from "./analytics";
import { Github, Linkedin } from "./social-icons";

type Testimonial = {name:string;headline:string;date:string;relationship:string;quote:string;excerpt?:boolean};
type WritingItem = {date:string;publication:string;title:string;topic:string;href:string};

const resumeUrl = "https://docs.google.com/document/d/16Wz-oAqgGcgZ36rLB6bt4ICtLqCMLMaLhXMBpRDPePA/edit?usp=sharing";

function SectionIntro({number, label, title, copy}:{number:string;label:string;title:string;copy:string}) {
  return <div className="section-intro-block"><span className="section-index">{number}</span><div><p className="section-label">{label}</p><h2>{title}</h2><p>{copy}</p></div></div>;
}

function ProofPanel() {
  const proofs = [
    ["10K → 80K", "weekly product access"],
    ["$4.2M → $6M", "ARR supported in three months"],
    ["MVP → 3 pilots", "delivered in four months"],
  ];
  return <div className="proof-panel" aria-label="Selected outcomes">{proofs.map(([value,label]) => <div className="proof-item" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>;
}

function StoryDisclosure({project,index,open,muted,onToggle}:{project:Project;index:number;open:boolean;muted:boolean;onToggle:()=>void}) {
  const contentId = `story-${project.slug}`;
  const mainMetric = project.primaryMetric ?? project.metrics[0];
  return <motion.article layout className={cn("work-story", open && "is-open", muted && "is-muted")} id={`work-${project.slug}`}>
    <button type="button" className="work-summary" aria-expanded={open} aria-controls={contentId} onClick={onToggle}>
      <div className="work-summary-meta"><span className="work-number">0{index+1}</span><span className="domain-pill">{project.domain}</span><span>{project.period}</span></div>
      <div className="work-summary-copy"><div><p className="work-company">{project.title}</p><p className="work-role">{project.role}</p></div><h3>{project.outcome ?? project.subtitle}</h3></div>
      {!muted && <div className="work-metrics"><div className="primary-metric"><strong>{mainMetric?.value}</strong><span>{mainMetric?.label}</span></div><div className="supporting-metrics">{project.supportingMetrics.slice(0,2).map(metric => <span key={metric.label}><strong>{metric.value}</strong>{metric.label}</span>)}</div></div>}
      <span className="story-action">{open ? "Close story" : "View product story"}{open ? <Minus size={16}/> : <ArrowRight size={16}/>}</span>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div id={contentId} className="story-content" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3,ease:[.22,1,.36,1]}}>
        <div className="story-layout">
          <aside className="story-evidence" aria-label={`${project.title} evidence`}>
            <p className="detail-label">Role & evidence</p>
            <p className="story-role">{project.role}<br/><span>{project.period}</span></p>
            <div className="story-metric-list">{[mainMetric,...project.supportingMetrics].filter(Boolean).map(metric => <div key={metric!.label}><strong>{metric!.value}</strong><span>{metric!.label}</span></div>)}</div>
            <div className="evidence-links">{project.links.map(link => <TrackedLink href={link.href} key={link.href} event="evidence_click" item={`${project.slug}:${link.label}`}>{link.label}<ArrowUpRight size={14}/></TrackedLink>)}</div>
          </aside>
          <div className="story-narrative">
            <div className="story-prose"><p className="detail-label">The product</p><p>{project.product}</p></div>
            <div className="story-prose"><p className="detail-label">Product challenge</p><p>{project.challenge}</p></div>
            <div className="story-prose"><p className="detail-label">My ownership</p><p>{project.ownership}</p></div>
            <div className="story-list"><p className="detail-label">Key decisions & tradeoffs</p><ol>{project.decisions.map((item,i) => <li key={item}><span>0{i+1}</span>{item}</li>)}</ol></div>
            <div className="story-columns"><div className="story-list"><p className="detail-label">What shipped</p><ul>{project.shipped.map(item => <li key={item}>{item}</li>)}</ul></div><div className="story-list"><p className="detail-label">Measured impact</p><ul>{project.impact.map(item => <li key={item}>{item}</li>)}</ul></div></div>
          </div>
        </div>
        <button type="button" className="close-story" onClick={onToggle}>Close product story <Minus size={15}/></button>
      </motion.div>}
    </AnimatePresence>
  </motion.article>;
}

function WorkSection({projects}:{projects:Project[]}) {
  const track = useAnalytics();
  const [openSlug,setOpenSlug] = useState<string|null>(null);
  useEffect(() => {
    const slug = window.location.hash.replace("#work-", "");
    if(!projects.some(project => project.slug === slug)) return;
    const frame = window.requestAnimationFrame(() => setOpenSlug(slug));
    return () => window.cancelAnimationFrame(frame);
  }, [projects]);
  const toggle = (slug:string) => {
    const next = openSlug === slug ? null : slug;
    setOpenSlug(next);
    track(next ? "case_expand" : "case_collapse", {project:slug});
    window.history.replaceState(null,"",next ? `#work-${slug}` : "#work");
  };
  return <section className={cn("section work-section", openSlug && "has-open-story")} id="work" aria-labelledby="work-title">
    <div className="page-grid"><SectionIntro number="01" label="Selected work" title="Product decisions, with the outcomes attached." copy="Four products across different stages, users, and business models. Open a story for the context behind the numbers."/><div className="work-stage">{projects.map((project,index) => <StoryDisclosure key={project.slug} project={project} index={index} open={openSlug===project.slug} muted={Boolean(openSlug && openSlug!==project.slug)} onToggle={() => toggle(project.slug)}/>)}</div></div>
  </section>;
}

function ArtifactCard({project,index}:{project:Project;index:number}) {
  const type = project.slug === "loans24" ? "Product concept" : project.slug === "foobar" ? "Technical prototype" : "Personal build";
  return <article className="artifact-card"><div className="artifact-top"><span>0{index+1}</span><span>{type}</span></div><div><p className="artifact-subtitle">{project.subtitle}</p><h3>{project.title}</h3><p>{project.summary}</p></div><div className="artifact-boundary">{project.details[0]?.text}</div><div className="artifact-links">{project.links.map(link => <TrackedLink key={link.href} href={link.href} event="build_click" item={`${project.slug}:${link.label}`}>{link.label}<ArrowUpRight size={14}/></TrackedLink>)}</div></article>;
}

function RecommendationCard({item,featured=false}:{item:Testimonial;featured?:boolean}) {
  return <figure className={cn("quote-card",featured&&"is-featured")}><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.headline}</span><small>{item.relationship}{item.excerpt ? " · excerpt" : ""}</small></figcaption></figure>;
}

function WritingRow({item}:{item:WritingItem}) {
  return <TrackedLink href={item.href} event="article_click" item={item.title} className="writing-row"><span className="writing-date">{item.date}</span><span className="writing-publication">{item.publication}</span><strong>{item.title}</strong><span className="writing-topic">{item.topic}</span><ArrowUpRight size={17}/></TrackedLink>;
}

export function PortfolioHome({projects,testimonials,writing}:{projects:Project[];testimonials:Testimonial[];writing:WritingItem[]}) {
  const professional = useMemo(() => ["vidrush","opsmith","blaze","phasio"].map(slug => projects.find(project => project.slug === slug)).filter(Boolean) as Project[], [projects]);
  const artifacts = useMemo(() => ["foobar","cycle-synced","loans24"].map(slug => projects.find(project => project.slug === slug)).filter(Boolean) as Project[], [projects]);
  const quotes = useMemo(() => ["Elaya (Ali) Moosavi","Sudharshan Raman","Noah Morris"].map(name => testimonials.find(item => item.name === name)).filter(Boolean) as Testimonial[], [testimonials]);
  return <>
    <main id="main">
      <section className="hero-section" aria-labelledby="hero-title"><div className="hero-atmosphere"/><div className="page-shell hero-inner"><p className="hero-kicker"><span/>Nayana Kumari · AI Product Manager</p><h1 id="hero-title"><span>0→1 AI Product Manager</span> turning complex AI workflows into products people adopt.</h1><p className="hero-copy">Founding and early-stage product manager helping teams build and grow AI products across video, DevOps, CRM, and manufacturing.</p><div className="hero-actions"><a href="#work" className="button button-primary">Explore selected work<ArrowDown size={15}/></a><TrackedLink href={resumeUrl} event="resume_link" item="hero-resume" className="button button-secondary">Resume<ArrowUpRight size={14}/></TrackedLink><TrackedLink href="mailto:nayanak872@gmail.com" event="contact_open" item="hero-email" className="text-action">Contact<ArrowUpRight size={14}/></TrackedLink></div><ProofPanel/></div></section>
      <WorkSection projects={professional}/>
      <section className="section atmosphere-section" id="builds" aria-labelledby="builds-title"><div className="page-shell"><SectionIntro number="02" label="Builds & artifacts" title="Small bets made tangible." copy="Prototypes and product thinking that show how I explore an idea, make it testable, and state its boundaries clearly."/><div className="artifact-grid">{artifacts.map((project,index) => <ArtifactCard key={project.slug} project={project} index={index}/>)}</div></div></section>
      <section className="section recommendations" aria-labelledby="recommendations-title"><div className="page-grid"><SectionIntro number="03" label="Recommendations" title="What collaborators noticed." copy="Direct managers and teammates on the clarity, ownership, and energy I bring to product work."/><div className="quotes-grid">{quotes.map((item,index) => <RecommendationCard item={item} featured={index===0} key={item.name}/>)}</div></div></section>
      <section className="section writing-section atmosphere-section" id="writing" aria-labelledby="writing-title"><div className="page-shell"><SectionIntro number="04" label="Writing & technical notes" title="Thinking in public." copy="Notes on AI engineering, product metrics, and the technical choices behind software products."/><div className="writing-panel">{writing.map(item => <WritingRow key={item.href} item={item}/>)}</div><div className="profile-row" aria-label="Writing and social profiles"><TrackedLink href="https://medium.com/@nayanak872" item="medium">Medium<ArrowUpRight size={13}/></TrackedLink><TrackedLink href="https://hashnode.com/@nayanak" item="hashnode">Hashnode<ArrowUpRight size={13}/></TrackedLink><TrackedLink href="https://dev.to/uncommonnayana" item="dev">DEV<ArrowUpRight size={13}/></TrackedLink><TrackedLink href="https://github.com/nk7608" item="github">GitHub<ArrowUpRight size={13}/></TrackedLink><TrackedLink href="https://x.com/uncommonnayana" item="x">X<ArrowUpRight size={13}/></TrackedLink></div></div></section>
      <section className="section about-section" id="about" aria-labelledby="about-title"><div className="page-shell about-panel"><div><p className="section-label">05 · About</p><h2 id="about-title">A technical foundation.<br/>A product point of view.</h2></div><div className="about-copy"><p>I started in software and grew into product work that sits between users, engineering, and business outcomes. I am most useful when the problem is still taking shape and the team needs someone to bring evidence, structure, and momentum.</p><p>Outside work, I run, read, and keep looking for a good coffee, meal, or song.</p></div><div className="about-links"><TrackedLink href="mailto:nayanak872@gmail.com" item="about-email" event="contact_open"><Mail size={16}/>Email</TrackedLink><TrackedLink href="https://www.linkedin.com/in/nayana-k-955411170/" item="about-linkedin" event="contact_open"><Linkedin size={16}/>LinkedIn</TrackedLink><TrackedLink href="https://github.com/nk7608" item="about-github"><Github size={16}/>GitHub</TrackedLink><TrackedLink href="https://x.com/uncommonnayana" item="about-x">𝕏 X</TrackedLink><TrackedLink href={resumeUrl} event="resume_link" item="about-resume">Resume<ArrowUpRight size={14}/></TrackedLink></div></div></section>
      <section className="contact-band" id="contact"><div className="page-shell"><p className="section-label">An open conversation</p><h2>Building an AI product or looking for a product manager who can move between users, systems, and outcomes?</h2><div><TrackedLink href="mailto:nayanak872@gmail.com" event="contact_open" item="contact-band-email" className="button button-primary">Email Nayana<ArrowUpRight size={15}/></TrackedLink><TrackedLink href="https://www.linkedin.com/in/nayana-k-955411170/" event="contact_open" item="contact-band-linkedin" className="button button-secondary">Connect on LinkedIn<ArrowUpRight size={15}/></TrackedLink></div></div></section>
    </main>
    <footer className="site-footer"><div className="page-shell"><span>© {new Date().getFullYear()} Nayana Kumari</span><span>Product, with evidence.</span><a href="#main">Back to top ↑</a></div></footer>
  </>;
}
