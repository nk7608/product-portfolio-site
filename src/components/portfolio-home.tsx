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
type CaseStudyItem = {eyebrow:string;title:string;summary:string;links:{label:string;href:string}[]};

const resumeUrl = "https://docs.google.com/document/d/16Wz-oAqgGcgZ36rLB6bt4ICtLqCMLMaLhXMBpRDPePA/preview";
const storyCtas:Record<string,string> = {
  vidrush:"How I improved long-form AI video economics",
  opsmith:"How I moved an enterprise MVP into pilots",
};

function SectionIntro({id,number,label,title,copy}:{id?:string;number:string;label:string;title:string;copy:string}) {
  return <div className="section-intro-block"><span className="section-index">{number}</span><div><p className="section-label">{label}</p><h2 id={id}>{title}</h2><p>{copy}</p></div></div>;
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
      <span className="story-action">{open ? "Close story" : storyCtas[project.slug] ?? "View product story"}{open ? <Minus size={16}/> : <ArrowRight size={16}/>}</span>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div id={contentId} className="story-content" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3,ease:[.22,1,.36,1]}}>
        <div className="story-layout">
          <aside className="story-evidence" aria-label={`${project.title} evidence`}>
            <p className="detail-label">Role & evidence</p>
            <p className="story-role">{project.role}<br/><span>{project.period}</span></p>
            <div className="story-metric-list">{[mainMetric,...project.supportingMetrics].filter(Boolean).map(metric => <div key={metric!.label}><strong>{metric!.value}</strong><span>{metric!.label}</span></div>)}</div>
            {project.metricContext && <p className="metric-context">{project.metricContext}</p>}
            <div className="evidence-links"><TrackedLink href={`/work/${project.slug}`} event="case_detail_open" item={`${project.slug}:full-case-study`}>Open full case study<ArrowUpRight size={14}/></TrackedLink>{project.links.map(link => <TrackedLink href={link.href} key={link.href} event="evidence_click" item={`${project.slug}:${link.label}`}>{link.label}<ArrowUpRight size={14}/></TrackedLink>)}</div>
          </aside>
          <div className="story-narrative">
            <div className="story-prose"><p className="detail-label">The product</p><p>{project.product}</p></div>
            <div className="story-prose"><p className="detail-label">Product challenge</p><p>{project.challenge}</p></div>
            <div className="story-prose"><p className="detail-label">My ownership</p><p>{project.ownership}</p></div>
            <div className="story-list"><p className="detail-label">Key decisions & tradeoffs</p><ol>{project.decisions.map((item,i) => <li key={item}><span>0{i+1}</span>{item}</li>)}</ol></div>
            <div className="story-columns"><div className="story-list"><p className="detail-label">What shipped</p><ul>{project.shipped.map(item => <li key={item}>{item}</li>)}</ul></div><div className="story-list"><p className="detail-label">Measured impact</p><ul>{project.impact.map(item => <li key={item}>{item}</li>)}</ul></div></div>
            {project.alignment && <div className="judgment-block"><p className="detail-label">Alignment challenge</p><p>{project.alignment}</p></div>}
            {project.reflection && <div className="judgment-block is-reflection"><p className="detail-label">What I would do differently</p><p>{project.reflection}</p></div>}
          </div>
        </div>
        <button type="button" className="close-story" onClick={onToggle}>Close product story <Minus size={15}/></button>
      </motion.div>}
    </AnimatePresence>
  </motion.article>;
}

function MoreWorkCard({project,index}:{project:Project;index:number}) {
  const mainMetric = project.primaryMetric ?? project.metrics[0];
  return <TrackedLink href={`/work/${project.slug}`} event="project_open" item={`${project.slug}:more-work`} className="more-work-card"><span className="work-number">0{index+1}</span><div><p className="work-company">{project.title}</p><span>{project.domain} · {project.period}</span><h3>{project.outcome ?? project.subtitle}</h3></div><div className="more-work-metric"><strong>{mainMetric?.value}</strong><span>{mainMetric?.label}</span></div><ArrowUpRight size={17}/></TrackedLink>;
}

function WorkSection({featured,more}:{featured:Project[];more:Project[]}) {
  const track = useAnalytics();
  const [openSlug,setOpenSlug] = useState<string|null>(null);
  useEffect(() => {
    const slug = window.location.hash.replace("#work-", "");
    if(!featured.some(project => project.slug === slug)) return;
    const frame = window.requestAnimationFrame(() => setOpenSlug(slug));
    return () => window.cancelAnimationFrame(frame);
  }, [featured]);
  const toggle = (slug:string) => {
    const next = openSlug === slug ? null : slug;
    setOpenSlug(next);
    track(next ? "case_expand" : "case_collapse", {project:slug});
    window.history.replaceState(null,"",next ? `#work-${slug}` : "#work");
  };
  return <section className={cn("section work-section", openSlug && "has-open-story")} id="work" aria-labelledby="work-title">
    <div className="page-grid"><SectionIntro id="work-title" number="01" label="Selected work" title="Product decisions, with the outcomes attached." copy="Two deeper stories show the reasoning behind the numbers. Two more shipped products stay compact for faster scanning."/><div><div className="work-stage">{featured.map((project,index) => <StoryDisclosure key={project.slug} project={project} index={index} open={openSlug===project.slug} muted={Boolean(openSlug && openSlug!==project.slug)} onToggle={() => toggle(project.slug)}/>)}</div><div className="more-work"><p className="detail-label">More shipped work</p>{more.map((project,index) => <MoreWorkCard key={project.slug} project={project} index={index+featured.length}/>)}</div></div></div>
  </section>;
}

function CaseStudyCard({item,index}:{item:CaseStudyItem;index:number}) {
  return <article className="case-study-card"><div className="case-study-index">0{index+1}</div><div className="case-study-copy"><p>{item.eyebrow}</p><h3>{item.title}</h3><span>{item.summary}</span></div><div className="case-study-links">{item.links.map(link => <TrackedLink href={link.href} key={link.href} event="case_detail_open" item={`${item.title}:${link.label}`}>{link.label}<ArrowUpRight size={14}/></TrackedLink>)}</div></article>;
}

function RecommendationCard({item,featured=false}:{item:Testimonial;featured?:boolean}) {
  const headline = item.name.startsWith("Elaya") ? "Product Designer · Vidrush" : item.headline;
  return <figure className={cn("quote-card",featured&&"is-featured")}><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{headline}</span><small>{item.relationship}{item.excerpt ? " · excerpt" : ""}</small></figcaption></figure>;
}

export function PortfolioHome({projects,testimonials,writing}:{projects:Project[];testimonials:Testimonial[];writing:WritingItem[]}) {
  const professional = useMemo(() => ["vidrush","opsmith","blaze","phasio"].map(slug => projects.find(project => project.slug === slug)).filter(Boolean) as Project[], [projects]);
  const quotes = useMemo(() => ["Elaya (Ali) Moosavi","Sudharshan Raman","Noah Morris"].map(name => testimonials.find(item => item.name === name)).filter(Boolean) as Testimonial[], [testimonials]);
  const caseStudies:CaseStudyItem[] = [
    {eyebrow:"Headout · Onboarding UX",title:"Making first use feel lighter.",summary:"A product critique and redesign of onboarding friction, paired with an interactive prototype.",links:[{label:"Read case study",href:"https://www.notion.so/Headout-Feature-Improvements-Nayana-s-pitch-2e4d02adcce880ef813de74917da579f"},{label:"Open prototype",href:"https://headout-pitch-nayana.lovable.app/"}]},
    {eyebrow:"Pronto · Checkout UX",title:"Reducing doubt at the point of booking.",summary:"A focused checkout teardown that turns usability observations into a testable product direction.",links:[{label:"Read case study",href:"https://pm-pitch-nayana.notion.site/Pronto-Checkout-Experience-Improvements-2f5d02adcce880068d6ac31d5d04ff1b"},{label:"Open prototype",href:"https://v0-pronto-pitch-nayana.vercel.app"}]},
    {eyebrow:"Loans24 · Premises verification",title:"Less friction. Better evidence.",summary:"A guided, privacy-conscious premises-verification concept with explicit assumptions and proposed success measures.",links:[{label:"Read concept deck",href:"/assets/loans24-premises-verification.pdf"}]},
    {eyebrow:"Foobar · Technical prototype",title:"A sysadmin idea, made tangible.",summary:"An AI sysadmin prototype exploring script generation and a guided deployment experience, with the remote server and deployment backend clearly simulated.",links:[{label:"Try the demo",href:"https://mvp-foobar-nk.netlify.app/"},{label:"Read the code",href:"https://github.com/nk7608/mvp-foobar"}]},
  ];
  return <>
    <main id="main">
      <section className="hero-section" aria-labelledby="hero-title"><div className="hero-atmosphere"/><div className="page-shell hero-inner"><p className="hero-kicker"><span/>Nayana Kumari · AI Product Manager</p><h1 id="hero-title"><span>AI Product Manager</span> turning complex AI workflows into products people adopt.</h1><p className="hero-role-line">4 years across 0→1 launches, growth, and enterprise workflows.</p><p className="hero-copy">I turn ambiguous customer and technical problems into shipped products, measurable adoption, and revenue.</p><div className="hero-actions"><a href="#work" className="button button-primary">Explore selected work<ArrowDown size={15}/></a><TrackedLink href={resumeUrl} event="resume_link" item="hero-resume" className="button button-secondary">Resume<ArrowUpRight size={14}/></TrackedLink><TrackedLink href="mailto:nayanak872@gmail.com" event="contact_open" item="hero-email" className="text-action">Contact<ArrowUpRight size={14}/></TrackedLink></div><ProofPanel/></div></section>
      <WorkSection featured={professional.slice(0,2)} more={professional.slice(2)}/>
      <section className="section recommendations" id="references" aria-labelledby="recommendations-title"><div className="page-grid"><SectionIntro id="recommendations-title" number="02" label="Manager & teammate references" title="What collaborators noticed." copy="Direct managers and teammates on the clarity, ownership, and energy I bring to product work."/><div className="quotes-grid">{quotes.map((item,index) => <RecommendationCard item={item} featured={index===0} key={item.name}/>)}</div></div></section>
      <section className="section case-studies-section" id="independent-work" aria-labelledby="case-studies-title"><div className="page-shell"><SectionIntro id="case-studies-title" number="03" label="Independent work" title="Product thinking, made reviewable." copy="Focused critiques and prototypes that move from an observed problem to a testable product direction."/><div className="case-study-list">{caseStudies.map((item,index) => <CaseStudyCard item={item} index={index} key={item.title}/>)}</div></div></section>
      <section className="section about-section" id="about" aria-labelledby="about-title"><div className="page-shell about-panel"><div><p className="section-label">04 · About</p><h2 id="about-title">A technical foundation.<br/>A product point of view.</h2></div><div className="about-copy"><p>I started in software and grew into product work that sits between users, engineering, and business outcomes. I am most useful when the problem is still taking shape and the team needs someone to bring evidence, structure, and momentum.</p><p>Outside work, I run, read, and keep looking for a good coffee, meal, or song.</p></div><div className="about-links"><TrackedLink href="mailto:nayanak872@gmail.com" item="about-email" event="contact_open"><Mail size={16}/>Email</TrackedLink><TrackedLink href="https://www.linkedin.com/in/nayana-k-955411170/" item="about-linkedin" event="contact_open"><Linkedin size={16}/>LinkedIn</TrackedLink><TrackedLink href="https://github.com/nk7608" item="about-github"><Github size={16}/>GitHub</TrackedLink><TrackedLink href="https://x.com/uncommonnayana" item="about-x">𝕏 X</TrackedLink><TrackedLink href={resumeUrl} event="resume_link" item="about-resume">Resume<ArrowUpRight size={14}/></TrackedLink></div></div></section>
      <section className="contact-band" id="contact"><div className="page-shell"><p className="section-label">An open conversation</p><h2>Building an AI product or looking for a product manager who can move between users, systems, and outcomes?</h2><div><TrackedLink href="mailto:nayanak872@gmail.com" event="contact_open" item="contact-band-email" className="button button-primary">Email Nayana<ArrowUpRight size={15}/></TrackedLink><TrackedLink href="https://www.linkedin.com/in/nayana-k-955411170/" event="contact_open" item="contact-band-linkedin" className="button button-secondary">Connect on LinkedIn<ArrowUpRight size={15}/></TrackedLink></div></div></section>
      <section className="writing-footer" id="writing" aria-labelledby="writing-title"><div className="page-shell"><div><p className="section-label">Selected writing</p><h2 id="writing-title">Technical notes</h2></div><div className="writing-footer-links">{writing.map(item => <TrackedLink href={item.href} event="article_click" item={item.title} key={item.href}><span>{item.publication} · {item.date}</span><strong>{item.title}</strong><ArrowUpRight size={15}/></TrackedLink>)}</div><div className="profile-row" aria-label="Writing and social profiles"><TrackedLink href="https://medium.com/@nayanak872" item="medium">Medium<ArrowUpRight size={13}/></TrackedLink><TrackedLink href="https://hashnode.com/@nayanak" item="hashnode">Hashnode<ArrowUpRight size={13}/></TrackedLink><TrackedLink href="https://dev.to/uncommonnayana" item="dev">DEV<ArrowUpRight size={13}/></TrackedLink><TrackedLink href="https://github.com/nk7608" item="github">GitHub<ArrowUpRight size={13}/></TrackedLink><TrackedLink href="https://x.com/uncommonnayana" item="x">X<ArrowUpRight size={13}/></TrackedLink></div></div></section>
    </main>
    <footer className="site-footer"><div className="page-shell"><span>© {new Date().getFullYear()} Nayana Kumari</span><span>Product, with evidence.</span><a href="#main">Back to top ↑</a></div></footer>
  </>;
}
