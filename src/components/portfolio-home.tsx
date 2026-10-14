"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowDown, ArrowUpRight, BookOpen, Clock3, FileText, GitBranch, Mail, MapPin, Play, X } from "lucide-react";
import type { Project } from "@/lib/schema";
import { lenses, lensUrl, readLens, type Lens, type Section } from "@/lib/lens";
import { TrackedLink, useAnalytics } from "./analytics";
import { ExperienceList } from "./experience";
import { ExperimentLab } from "./experiment-lab";
import { MusicPlayer } from "./music-player";
import { Github, Linkedin } from "./social-icons";
import { BrandLogo } from "./brand-cover";
import life from "../../content/life.json";

type Testimonial = {name:string;headline:string;date:string;relationship:string;quote:string;excerpt?:boolean};
type WritingItem = {date:string;publication:string;title:string;topic:string;href:string};
const resumeUrl = "/assets/nayana-kumari-ai-product-manager-resume.pdf";
const resumeFilename = "Nayana-Kumari-AI-Product-Manager-Resume.pdf";
const email = "mailto:nayanak872@gmail.com";
const linkedin = "https://www.linkedin.com/in/nayana-k-955411170/";
const proof = [["10K → 80K","weekly product access"],["$4.2M → $6M","ARR supported"],["MVP → 3 pilots","in four months"]];

function SectionHeading({label,title,children}:{label:string;title:string;children?:React.ReactNode}) {
  return <div className="chapter-heading"><p className="section-label">{label}</p><h2>{title}</h2>{children&&<p>{children}</p>}</div>;
}
function Availability() {
  return <div className="availability-strip" aria-label="Work status, location and availability"><span className="is-open">Open to work</span><span>Bangalore, India</span><span>Remote or hybrid</span><span>Europe & US hours</span></div>;
}
function Recommendation({item,featured=false}:{item:Testimonial;featured?:boolean}) {
  const [open,setOpen]=useState(false);
  const long=!featured&&item.quote.length>180;
  return <figure className={`quote-card ${featured?"is-featured":""} ${long&&!open?"is-clamped":""}`}><blockquote>{item.quote}</blockquote>{long&&<button type="button" className="quote-more" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?"Show less":"Read more"}</button>}<figcaption><strong>{item.name}</strong><span>{item.name.startsWith("Elaya") ? "Product Designer · Vidrush" : item.headline}</span><small>{item.relationship}</small></figcaption></figure>;
}
/** Bangalore time, rendered after mount so server and client markup match. */
function LocalTime() {
  const [now,setNow]=useState<Date|null>(null);
  useEffect(()=>{const tick=()=>setNow(new Date());tick();const timer=setInterval(tick,30000);return ()=>clearInterval(timer);},[]);
  const hour=now?Number(new Intl.DateTimeFormat("en-GB",{hour:"numeric",hourCycle:"h23",timeZone:"Asia/Kolkata"}).format(now)):null;
  return <><strong className="widget-time">{now?new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Kolkata"}).format(now):"--:--"}<small> IST</small></strong><span className="widget-note">{hour===null?"":hour>=9&&hour<20?"Probably at my desk":"Probably offline. Email anyway."}</span></>;
}

export function PortfolioHome({projects,testimonials,writing}:{projects:Project[];testimonials:Testimonial[];writing:WritingItem[]}) {
  const track = useAnalytics();
  const { resolvedTheme } = useTheme();
  const [lens,setLens] = useState<Lens>("all");
  const [openSlug,setOpenSlug] = useState<string|null>(null);
  const [gameOpen,setGameOpen] = useState(false);
  const [moreQuotes,setMoreQuotes] = useState(false);
  const professional = useMemo(() => ["vidrush","opsmith","blaze","phasio"].map(slug => projects.find(p=>p.slug===slug)).filter(Boolean) as Project[],[projects]);
  const quotes = useMemo(() => ["Elaya (Ali) Moosavi","Noah Morris","Amit Mishra","Sudharshan Raman","Lauren Rothwell"].map(name=>testimonials.find(t=>t.name===name)).filter(Boolean) as Testimonial[],[testimonials]);
  const book = life.books[0];

  useEffect(() => {
    const sync = () => {
      const next = readLens(window.location.search);
      setLens(next);
      const slug = window.location.hash.replace("#work-","");
      setOpenSlug(professional.some(p=>p.slug===slug) ? slug : lenses[next].open);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("popstate",sync);
    return () => {cancelAnimationFrame(frame);window.removeEventListener("popstate",sync);};
  },[professional]);

  function chooseLens(next:Lens) {
    setLens(next);
    setOpenSlug(lenses[next].open);
    window.history.replaceState(null,"",lensUrl(next));
    track("lens_change",{lens:next});
    requestAnimationFrame(()=>document.getElementById("lens")?.scrollIntoView({behavior:"smooth",block:"start"}));
  }
  function toggleBrief(slug:string) {
    const next = openSlug===slug ? null : slug;
    setOpenSlug(next);
    track(next?"case_expand":"case_collapse",{project:slug});
    if(next) requestAnimationFrame(()=>document.getElementById(`work-${slug}`)?.scrollIntoView({behavior:"smooth",block:"nearest"}));
  }

  const blocks:Record<Section,React.ReactNode> = {
    work: <section className="chapter-section" id="work">
          <SectionHeading label="Experience" title="One role builds on the next.">Newest first. Open a role for the problem, the approach and what changed.</SectionHeading>
          <ExperienceList projects={professional} places={life.journey} openSlug={openSlug} onToggle={toggleBrief}/>
        </section>,
    experiments: <section className="chapter-section" id="independent-work">
          <SectionHeading label="Experiment lab" title="Small bets. Working ideas.">Independent case studies and prototypes, built to learn. Not shipped company work.</SectionHeading>
          <ExperimentLab compact/>
        </section>,
    evidence: <section className="chapter-section" id="references">
          <SectionHeading label="Evidence" title="Product work is a team sport."/>
          <div className="quotes-grid">{quotes.slice(0,moreQuotes?quotes.length:3).map((item,index)=><Recommendation key={item.name} item={item} featured={index===0}/>)}</div>
          {quotes.length>3&&!moreQuotes&&<button type="button" className="show-more" onClick={()=>setMoreQuotes(true)}>{quotes.length-3} more recommendations</button>}
          <div className="working-notes" id="writing"><p className="section-label"><BookOpen size={13}/> Writing</p>{writing.map(item=><TrackedLink className="note-row" href={item.href} event="article_click" item={item.title} key={item.href}><span>{item.publication} · {item.date}</span><strong>{item.title}</strong><ArrowUpRight size={16}/></TrackedLink>)}</div>
        </section>,
    about: <section className="chapter-section" id="about">
          <SectionHeading label="Off the clock" title="The person behind the PRDs."/>
          <div className="widget-row">
            <div className="personal-card widget music-card"><MusicPlayer/></div>
            <article className="personal-card widget"><p className="section-label"><Clock3 size={13}/> Bangalore</p><LocalTime/><div className="pitstop-tags" aria-label="Favourite neighbourhoods"><MapPin size={12} aria-hidden="true"/>{life.pitstops.slice(0,3).join(" · ")}</div></article>
            <article className="personal-card widget"><p className="section-label"><BookOpen size={13}/> {book.status}</p><TrackedLink className="widget-book" href={book.href} item={`book:${book.title}`}><strong>{book.title}</strong><span>{book.author}</span></TrackedLink><button type="button" className="widget-game" onClick={()=>{setGameOpen(!gameOpen);if(!gameOpen)track("game_open",{from:"about"});}} aria-expanded={gameOpen} aria-controls="scope-runner"><GitBranch size={13}/>{gameOpen?"Close Scope Runner":"Play Scope Runner"}{gameOpen?<X size={13}/>:<Play size={13}/>}</button></article>
          </div>
          {gameOpen&&<div id="scope-runner" className="game-embed"><iframe title="Scope Runner — optional game" sandbox="allow-scripts" referrerPolicy="no-referrer" src={`/offline.html?play=1&theme=${resolvedTheme==='dark'?'dark':'light'}`} loading="lazy"/></div>}
        </section>,
    contact: <section className="chapter-section" id="contact">
          <div className="conversation-panel">
            <p className="section-label">Contact</p><h2>Say hello.</h2>
            <p>Open to product roles. Also happy to swap notes on AI products.</p>
            <div className="contact-actions">
              <TrackedLink href={email} event="contact_open" item="contact-email" className="button button-primary"><Mail size={15}/>Email<ArrowUpRight size={14}/></TrackedLink>
              <TrackedLink href={linkedin} event="contact_open" item="contact-linkedin" className="button button-secondary"><Linkedin size={15}/>LinkedIn</TrackedLink>
              <TrackedLink href={resumeUrl} download={resumeFilename} event="resume_link" item="about-resume" className="text-link">Résumé (PDF)<ArrowDown size={14}/></TrackedLink>
            </div>
            <div className="personal-socials"><TrackedLink href="https://github.com/nk7608" item="about-github"><Github size={14}/>GitHub</TrackedLink><TrackedLink href="https://x.com/uncommonnayana" item="about-x">𝕏 @uncommonnayana</TrackedLink></div>
          </div>
        </section>,
  };

  return <>
    <main id="main" className="product-portfolio is-simple">
      <section className="profile-hero page-shell" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <p className="hero-kicker"><span/>Nayana Kumari / AI Product Manager</p>
          <h1 id="welcome-title">Behind every launch,<br/><em>a product decision.</em></h1>
          <p className="welcome-description">Product manager with an engineering background. Four years across AI video, DevOps, CRM and manufacturing, from first spec to measured results.</p>
          <Availability/>
          <div className="hero-actions">
            <TrackedLink href={email} event="contact_open" item="hero-email" className="button button-primary"><Mail size={15}/>Email</TrackedLink>
            <TrackedLink href={resumeUrl} download={resumeFilename} event="resume_link" item="hero-resume" className="button button-secondary"><FileText size={15}/>Résumé</TrackedLink>
            <TrackedLink href={linkedin} event="contact_open" item="hero-linkedin" className="icon-link" aria-label="LinkedIn"><Linkedin size={17}/></TrackedLink>
            <TrackedLink href="https://github.com/nk7608" item="hero-github" className="icon-link" aria-label="GitHub"><Github size={17}/></TrackedLink>
          </div>
        </div>
        <aside className="proof-card" aria-label="Selected outcomes">
          <p className="section-label">Selected outcomes</p>
          <div className="proof-tiles">{proof.map(([value,label])=><div className="proof-tile" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
          <div className="trust-strip"><span>Shipped with</span><div className="trust-logos">{professional.map(p=><BrandLogo key={p.slug} id={p.slug}/>)}</div></div>
          <p className="metric-footnote">Team outcomes I contributed to. Definitions sit in each brief.</p>
        </aside>
      </section>

      <div className="lens-bar page-shell" id="lens">
        <p id="lens-label">What brings you here?</p>
        <div className="lens-options" role="radiogroup" aria-labelledby="lens-label">{(Object.keys(lenses) as Lens[]).map(key=><button key={key} type="button" role="radio" aria-checked={lens===key} onClick={()=>chooseLens(key)}>{lenses[key].label}</button>)}</div>
      </div>

      <div className="sections page-shell" data-lens={lens}>
        {lenses[lens].order.map(key=><Fragment key={key}>{blocks[key]}</Fragment>)}
      </div>
      <ContactBar/>
    </main>
    <footer className="site-footer"><div className="page-shell"><span>© {new Date().getFullYear()} Nayana Kumari</span><button type="button" className="footer-appearance" onClick={()=>window.dispatchEvent(new Event("open-appearance"))}>Appearance</button><a href="#main">Back to top ↑</a></div></footer>
  </>;
}

/** Phones: a slim Email/Résumé bar once the hero has scrolled away, hidden while the contact block is on screen. */
function ContactBar() {
  const [show,setShow]=useState(false);
  useEffect(()=>{
    const hero=document.querySelector(".profile-hero"),contact=document.getElementById("contact");
    if(!hero||!contact)return;
    let pastHero=false,atContact=false;
    const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.target===hero)pastHero=!e.isIntersecting&&e.boundingClientRect.top<0;else atContact=e.isIntersecting;}setShow(pastHero&&!atContact);});
    observer.observe(hero);observer.observe(contact);
    return ()=>observer.disconnect();
  },[]);
  return <div className="contact-bar" data-show={show} aria-hidden={!show}>
    <TrackedLink href={email} event="contact_open" item="bar-email" className="button button-primary" tabIndex={show?0:-1}><Mail size={15}/>Email Nayana</TrackedLink>
    <TrackedLink href={resumeUrl} download={resumeFilename} event="resume_link" item="bar-resume" className="button button-secondary" tabIndex={show?0:-1}><FileText size={15}/>Résumé</TrackedLink>
  </div>;
}
