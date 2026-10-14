"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { Project } from "@/lib/schema";
import { lenses, type Section } from "@/lib/lens";
import { interests, sectionOrder } from "@/lib/prefs";
import { TrackedLink, useAnalytics } from "./analytics";
import { ExperienceList } from "./experience";
import { ExperimentLab } from "./experiment-lab";
import { usePrefs } from "./prefs";
import { contact } from "./command-menu";
import { CopyEmail } from "./copy-email";
import { Footer } from "./footer";
import experiments from "../../content/experiments.json";
import life from "../../content/life.json";

type Testimonial = {name:string;headline:string;date:string;relationship:string;quote:string;excerpt?:boolean};
type WritingItem = {date:string;publication:string;title:string;topic:string;href:string};
const titles: Record<Section,string> = { work:"Experience", experiments:"Experiments", writing:"Writing", evidence:"Recommendations", about:"Off the clock", contact:"Contact" };
const personaNote: Record<string,string> = { hiring:"hiring for a product role", building:"building something", curious:"looking around", all:"everything" };

function Quotes({items}:{items:Testimonial[]}) {
  const [i,setI]=useState(0);
  const q=items[i];
  return <figure className="quote">
    <blockquote>“{q.quote}”</blockquote>
    <figcaption><b>{q.name}</b> · {q.name.startsWith("Elaya")?"Product Designer, Vidrush":q.headline.split("|")[0].trim()} · {q.relationship}</figcaption>
    <div className="quote-nav"><button type="button" className="icon-btn" aria-label="Previous recommendation" onClick={()=>setI((i-1+items.length)%items.length)}><ChevronLeft size={15}/></button><button type="button" className="icon-btn" aria-label="Next recommendation" onClick={()=>setI((i+1)%items.length)}><ChevronRight size={15}/></button><span className="num" aria-live="polite">{i+1} / {items.length}</span></div>
  </figure>;
}

export function PortfolioHome({projects,testimonials,writing}:{projects:Project[];testimonials:Testimonial[];writing:WritingItem[]}) {
  const track = useAnalytics();
  const { prefs, ready, open } = usePrefs();
  const [openSlug,setOpenSlug] = useState<string|null>(null);
  const [expanded,setExpanded] = useState<Section[]>([]);
  const [song,setSong] = useState(false);
  const [game,setGame] = useState(false);
  const [active,setActive] = useState<Section>("work");
  const professional = useMemo(() => ["vidrush","opsmith","blaze","phasio"].map(slug => projects.find(p=>p.slug===slug)).filter(Boolean) as Project[],[projects]);
  const quotes = useMemo(() => ["Elaya (Ali) Moosavi","Sudharshan Raman","Noah Morris","Amit Mishra","Lauren Rothwell"].map(name=>testimonials.find(t=>t.name===name)).filter(Boolean) as Testimonial[],[testimonials]);
  const order = sectionOrder(prefs.persona, prefs.interests);
  const orderKey = order.join();
  const chosen = new Set<Section>(interests.filter(item => prefs.interests.includes(item.id)).map(item => item.section));
  const isOpen = (s:Section) => !ready || s==="contact" || chosen.has(s) || expanded.includes(s);

  // The hiring path opens the latest brief; a #work-slug link opens that one.
  useEffect(() => {
    // Any hash (margin index, header, ⌘K, shared link) reveals its section before scrolling to it.
    const sync = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const slug = id.replace("work-","");
      const role = id.startsWith("work-") && professional.some(p=>p.slug===slug);
      if (role) setOpenSlug(slug);
      const section = role ? "work" : (id.startsWith("exp-") ? "experiments" : id);
      if ((["work","experiments","writing","evidence","about","contact"] as string[]).includes(section)) {
        setExpanded(list => list.includes(section as Section) ? list : [...list, section as Section]);
        requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" })));
      }
    };
    const frame = requestAnimationFrame(() => { if(location.hash) sync(); else if(ready) setOpenSlug(lenses[prefs.persona].open); });
    window.addEventListener("hashchange",sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange",sync); };
  },[professional,prefs.persona,ready]);

  // The margin index highlights the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id as Section); }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll(".section").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  },[orderKey]);

  const toggleBrief = (slug:string) => { const next = openSlug===slug ? null : slug; setOpenSlug(next); track(next?"case_expand":"case_collapse",{project:slug}); };
  const head = (s:Section, count?:number) => <div className="section-head"><h2 id={`${s}-title`}>{titles[s]}</h2>{count!==undefined&&<span className="count">{String(count).padStart(2,"0")}</span>}{s!=="contact"&&ready&&!chosen.has(s)&&<button type="button" className="toggle" aria-expanded={isOpen(s)} aria-controls={`${s}-body`} onClick={()=>setExpanded(list=>list.includes(s)?list.filter(x=>x!==s):[...list,s])}>{isOpen(s)?"Hide":"Show"}</button>}</div>;

  const blocks: Record<Section,React.ReactNode> = {
    work: <>{head("work",professional.length)}<div className="section-body" id="work-body"><p className="section-intro">Newest first. Open a role for the problem, the approach and what changed.</p><ExperienceList projects={professional} places={life.journey} openSlug={openSlug} onToggle={toggleBrief}/></div></>,
    experiments: <>{head("experiments",experiments.length)}<div className="section-body" id="experiments-body"><p className="section-intro">Independent case studies and prototypes, built to learn. Not shipped company work.</p><ExperimentLab/></div></>,
    writing: <>{head("writing",writing.length)}<div className="section-body" id="writing-body"><ol className="rows">{writing.map((item,i)=><li className="row" key={item.href}><TrackedLink className="row-btn" href={item.href} event="article_click" item={item.title}><span className="n">{String(i+1).padStart(2,"0")}</span><span className="t"><b>{item.title}</b></span><span className="y">{item.publication.split(" · ")[0]} · {item.date.slice(-4)}</span><span className="chev" aria-hidden="true">↗</span></TrackedLink></li>)}</ol></div></>,
    evidence: <>{head("evidence",quotes.length)}<div className="section-body" id="evidence-body"><Quotes items={quotes}/></div></>,
    about: <>{head("about")}<div className="section-body" id="about-body"><ul className="facts">
      <li><span>Listening to</span><span>Fix You, Coldplay. For the piano intro. <button type="button" className="text-btn" aria-expanded={song} onClick={()=>{setSong(!song);if(!song)track("music_play",{track:"fix-you"});}}>{song?<><X size={13}/>Stop</>:<><Play size={13}/>Play</>}</button>{song&&<iframe title="Fix You by Coldplay on YouTube" src="https://www.youtube-nocookie.com/embed/k4V3Mo61fJM?autoplay=1" allow="autoplay; encrypted-media" referrerPolicy="strict-origin-when-cross-origin"/>}</span></li>
      <li><span>Reading</span><span>{life.books.map((b,i)=><Fragment key={b.title}>{i>0&&"; next up, "}<TrackedLink className="link" href={b.href} item={`book:${b.title}`}>{b.title}</TrackedLink> by {b.author}</Fragment>)}.</span></li>
      <li><span>Around town</span><span>Running, coffee and good meals in {life.pitstops.join(", ")}.</span></li>
      <li><span>Side quest</span><span>Scope Runner, a tiny game about scope creep. <button type="button" className="text-btn" aria-expanded={game} onClick={()=>{setGame(!game);if(!game)track("game_open",{from:"about"});}}>{game?"Close":"Play"}</button>{game&&<div className="game-embed"><iframe title="Scope Runner, an optional game" sandbox="allow-scripts" referrerPolicy="no-referrer" src={`/offline.html?play=1&theme=${prefs.theme==="ink"||prefs.theme==="night"?"dark":"light"}`} loading="lazy"/></div>}</span></li>
    </ul></div></>,
    contact: <>{head("contact")}<div className="section-body" id="contact-body"><p className="contact-line">Email is fastest: <CopyEmail item="contact-copy-email"/>. I reply within a day or two.</p><div className="contact-actions"><TrackedLink className="btn" href={`mailto:${contact.email}`} event="contact_open" item="contact-email">Write an email</TrackedLink><TrackedLink className="btn btn-quiet" href={contact.resume} download="Nayana-Kumari-AI-Product-Manager-Resume.pdf" event="resume_link" item="contact-resume">Résumé (PDF)</TrackedLink><TrackedLink className="link" href={contact.linkedin} event="contact_open" item="contact-linkedin">LinkedIn ↗</TrackedLink><TrackedLink className="link" href={contact.github} item="contact-github">GitHub ↗</TrackedLink><TrackedLink className="link" href="https://x.com/uncommonnayana" item="contact-x">X ↗</TrackedLink></div></div></>,
  };

  return <>
    <main id="main" className="page">
      <nav className="margin-index" aria-label="On this page"><ol>{order.map((s,i)=><li key={s}><a href={`#${s}`} aria-current={active===s}><span>{String(i+1).padStart(2,"0")}</span>{titles[s]}</a></li>)}</ol></nav>

      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Nayana Kumari</h1>
        <p className="lede">Product manager with an engineering background. I take AI and B2B products from a fuzzy problem to a shipped, measured result, most recently as <strong>founding PM at Vidrush</strong>.</p>
        <p className="status"><span className="open">Open to PM roles</span><span>Bangalore</span><span>Remote or hybrid</span><span>Europe & US hours</span></p>
        <p className="hero-links"><CopyEmail item="hero-copy-email"/><TrackedLink className="link" href={contact.resume} download="Nayana-Kumari-AI-Product-Manager-Resume.pdf" event="resume_link" item="hero-resume">Résumé</TrackedLink><TrackedLink className="link" href={contact.linkedin} event="contact_open" item="hero-linkedin">LinkedIn</TrackedLink><TrackedLink className="link" href={contact.github} item="hero-github">GitHub</TrackedLink></p>
        <div className="proof" aria-label="Selected outcomes"><div><b>10K → 80K</b><span>weekly product access</span></div><div><b>$4.2M → $6M</b><span>ARR supported</span></div><div><b>MVP → 3 pilots</b><span>in four months</span></div></div>
        <p className="proof-note">Team outcomes I contributed to. Each role explains how they were measured.</p>
        {ready&&<p className="path-note">Arranged for <b>{personaNote[prefs.persona]}</b>: {order.filter(s=>chosen.has(s)).map(s=>titles[s].toLowerCase()).join(", ")} first.<button type="button" className="text-btn" onClick={()=>open("intro")}>Change</button><button type="button" className="text-btn" onClick={()=>open("controls")}>Settings</button></p>}
      </section>

      {order.map(s=><section key={s} id={s} className={`section ${isOpen(s)?"":"is-collapsed"}`} aria-labelledby={`${s}-title`}>{blocks[s]}</section>)}
    </main>
    <Footer/>
  </>;
}
