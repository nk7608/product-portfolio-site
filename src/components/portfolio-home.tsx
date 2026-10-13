"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Coffee, FileText, FlaskConical, GitBranch, Mail, MapPin, Play, Route as RouteIcon, X } from "lucide-react";
import type { Project } from "@/lib/schema";
import { chapters, routes, readJourney, journeyUrl, type Chapter, type Route } from "@/lib/journey";
import { TrackedLink, useAnalytics } from "./analytics";
import { StoryDisclosure } from "./work-story";
import { ExperimentLab } from "./experiment-lab";
import { MusicPlayer } from "./music-player";
import { Github, Linkedin } from "./social-icons";
import { DeskNotes, ProductGlyph } from "./visual-cues";
import life from "../../content/life.json";

type Testimonial = {name:string;headline:string;date:string;relationship:string;quote:string;excerpt?:boolean};
type WritingItem = {date:string;publication:string;title:string;topic:string;href:string};
const resumeUrl = "/assets/nayana-kumari-ai-product-manager-resume.pdf";
const resumeFilename = "Nayana-Kumari-AI-Product-Manager-Resume.pdf";
const allChapters:Chapter[] = ["brief","journey","work","experiments","evidence","about"];
const careerContext:Record<string,{verb:string;connection:string}> = {
  phasio:{verb:"Make complex choices simpler",connection:"Manufacturing workflows, buyer guidance, integrations, and release reliability."},
  blaze:{verb:"Connect usage to growth",connection:"Customer requests became channel automations, growth experiments, and paid subscriptions."},
  opsmith:{verb:"Find a path from discovery to pilot",connection:"Enterprise needs became PRDs, validated hypotheses, and a demo-ready DevOps agent."},
  vidrush:{verb:"Scale the product and its economics",connection:"Long-form video brought model costs, pricing, usability, and delivery into one product brief."},
};

function ChapterHeading({index,label,title,children}:{index:string;label:string;title:string;children:React.ReactNode}) {
  return <div className="chapter-heading"><p className="section-label"><span>{index}</span> / {label}</p><h2>{title}</h2><p>{children}</p></div>;
}
function ProofPanel() {
  return <div className="proof-panel" aria-label="Selected outcomes">{[["10K → 80K","weekly product access"],["$4.2M → $6M","ARR supported in three months"],["MVP → 3 pilots","delivered in four months"]].map(([value,label]) => <div className="proof-item" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>;
}
function Availability() {
  return <div className="availability-strip" aria-label="Work location and availability"><span>Bangalore, India</span><span>Remote or hybrid</span><span>Europe & US work hours</span></div>;
}
function Recommendation({item,featured=false}:{item:Testimonial;featured?:boolean}) {
  return <figure className={`quote-card ${featured?"is-featured":""}`}><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.name.startsWith("Elaya") ? "Product Designer · Vidrush" : item.headline}</span><small>{item.relationship}{item.excerpt?" · excerpt":""}</small></figcaption></figure>;
}

export function PortfolioHome({projects,testimonials,writing,initialJourney}:{projects:Project[];testimonials:Testimonial[];writing:WritingItem[];initialJourney:{route:Route|null;chapter:Chapter}}) {
  const track = useAnalytics();
  const { resolvedTheme } = useTheme();
  const [route,setRoute] = useState<Route|null>(initialJourney.route);
  const [chapter,setChapter] = useState<Chapter>(initialJourney.chapter);
  const [openSlug,setOpenSlug] = useState<string|null>(null);
  const [gameOpen,setGameOpen] = useState(false);
  const [navOpen,setNavOpen] = useState(false);
  const tourTitle = useRef<HTMLHeadingElement>(null);
  const startPanel = useRef<HTMLDivElement>(null);
  const professional = useMemo(() => ["vidrush","opsmith","blaze","phasio"].map(slug => projects.find(p=>p.slug===slug)).filter(Boolean) as Project[],[projects]);
  const quotes = useMemo(() => ["Elaya (Ali) Moosavi","Sudharshan Raman","Noah Morris"].map(name=>testimonials.find(t=>t.name===name)).filter(Boolean) as Testimonial[],[testimonials]);
  const steps:Chapter[] = route ? routes[route].steps : allChapters;
  const currentIndex = steps.indexOf(chapter);

  useEffect(() => {
    const sync = () => {
      const next = readJourney(window.location.search);
      setRoute(next.route);
      setChapter(next.chapter);
      const slug = window.location.hash.replace("#work-", "");
      setOpenSlug(professional.some(p=>p.slug===slug) ? slug : null);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("popstate",sync);
    window.addEventListener("hashchange",sync);
    return () => {cancelAnimationFrame(frame);window.removeEventListener("popstate",sync);window.removeEventListener("hashchange",sync);};
  },[professional,initialJourney.route,initialJourney.chapter]);

  function navigate(next:Chapter,nextRoute:Route|null=route) {
    setRoute(nextRoute);setChapter(next);setNavOpen(false);
    window.history.pushState(null,"",journeyUrl(nextRoute,next));
    track(nextRoute?"journey_step":"journey_exit",{route:nextRoute??"full",chapter:next});
    requestAnimationFrame(() => {
      if(nextRoute) {tourTitle.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:"instant"});}
      else {const id=next==="experiments"?"independent-work":next==="evidence"?"references":next;document.getElementById(id)?.scrollIntoView({behavior:"instant"});}
    });
  }
  function start(next:Route) {
    track("journey_start",{route:next});navigate(routes[next].steps[0],next);
  }
  function openStory(slug:string) {
    const next = openSlug===slug ? null : slug;
    setOpenSlug(next);
    track(next?"case_expand":"case_collapse",{project:slug});
    window.history.replaceState(null,"",`${window.location.pathname}${window.location.search}${next?`#work-${next}`:"#work"}`);
  }
  function followCareer(slug:string) {
    navigate("work");setOpenSlug(slug);
    window.history.replaceState(null,"",`${window.location.pathname}${window.location.search}#work-${slug}`);
    requestAnimationFrame(()=>document.getElementById(`work-${slug}`)?.scrollIntoView({behavior:"instant",block:"start"}));
  }
  function restart() {
    navigate("brief",null);
    requestAnimationFrame(()=>{startPanel.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:"instant"});});
  }

  return <>
    <main id="main" className={`product-portfolio ${route?"is-guided":"is-browsing"}`}>
      {!route && <section className="welcome-section page-shell" aria-labelledby="welcome-title">
        <div className="welcome-copy"><DeskNotes/><p className="hero-kicker"><span/>Nayana Kumari / AI Product Manager</p><h1 id="welcome-title">Behind every launch,<br/><em>a product decision.</em></h1><p className="welcome-description">I turn complex systems into products people use. Explore the problems, tradeoffs, and outcomes behind four years of building.</p><Availability/><div className="welcome-links"><TrackedLink href={resumeUrl} download={resumeFilename} event="resume_link" item="hero-resume" className="text-link"><FileText size={15}/>Download résumé<ArrowDown size={14}/></TrackedLink><TrackedLink href="mailto:nayanak872@gmail.com" event="contact_open" item="hero-email" className="text-link">Let’s talk<ArrowUpRight size={14}/></TrackedLink></div></div>
        <div className="route-picker" ref={startPanel} tabIndex={-1}><div className="panel-topline"><span><RouteIcon size={14}/> A quick introduction</span><span>OPTIONAL</span></div><h2>What brings you here?</h2><p>Pick a route. I’ll show you where to start.</p><div className="route-options">{(Object.keys(routes) as Route[]).map((key,index)=><button key={key} onClick={()=>start(key)}><span className="route-key">{String.fromCharCode(65+index)}</span><span><strong>{routes[key].label}</strong><small>{routes[key].description}</small></span><ArrowUpRight size={18}/></button>)}</div><a href="#brief" className="browse-link">Skip the intro. Browse everything <ArrowDown size={14}/></a><p className="route-note">No forms to fill. Your route only changes what comes first.</p></div>
      </section>}

      {route && <div className="tour-bar page-shell"><div><p className="section-label">Guided introduction / {routes[route].label}</p><h1 ref={tourTitle} tabIndex={-1}>{chapters[chapter].question}</h1></div><button className="button button-secondary" onClick={()=>navigate(chapter,null)}>View full portfolio<X size={14}/></button><div className="tour-progress" role="progressbar" aria-label="Journey progress" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={currentIndex+1}><span style={{width:`${(currentIndex+1)/steps.length*100}%`}}/></div></div>}

      <div className="workspace page-shell">
        <aside className="chapter-rail" data-expanded={navOpen} aria-label="Portfolio chapters">{route&&<button className="chapter-mobile-toggle" aria-expanded={navOpen} aria-controls="chapter-navigation" onClick={()=>setNavOpen(!navOpen)}>Your route · {currentIndex+1} of {steps.length}<span>{navOpen?"Hide steps":"See all steps"}<ChevronDown size={14}/></span></button>}<p className="section-label">{route?"Your route":"Explore the work"}</p><nav id="chapter-navigation">{steps.map((key,index)=><a key={key} href={journeyUrl(route,key)} aria-current={chapter===key&&route?"step":undefined} onClick={route?e=>{e.preventDefault();navigate(key);}:undefined}><span className="chapter-node">{route&&index<currentIndex?<Check size={12}/>:String(index+1).padStart(2,"0")}</span><span><strong>{chapters[key].label}</strong><small>{chapters[key].hint}</small></span></a>)}</nav><div className="rail-note"><span className="status-dot"/>Open to the next good problem.<a href="mailto:nayanak872@gmail.com">Start a conversation <ArrowUpRight size={12}/></a></div>{route&&<button className="text-link" onClick={restart}><ArrowLeft size={13}/>Choose another route</button>}</aside>

        <div className="chapter-stack">
          <section className="chapter-section brief-section" id="brief" hidden={Boolean(route&&chapter!=="brief")}>
            <ChapterHeading index={String(steps.indexOf("brief")+1).padStart(2,"0")} label="Product brief" title="Complex systems. Clear outcomes.">Founding and early-stage product manager helping teams build and grow AI products across video, DevOps, CRM, and manufacturing.</ChapterHeading>
            <div className="brief-document"><div className="panel-topline"><span><FileText size={14}/> NAYANA / PRODUCT BRIEF</span><span>4 YEARS · 0→1</span></div><h3>I turn unclear customer problems and technical constraints into products that ship, get adopted, and support revenue.</h3><div className="brief-facts"><div><span>Background</span><strong>Software engineering → product management</strong></div><div><span>Where I contribute</span><strong>Discovery, specs, delivery, pricing, and growth</strong></div><div><span>Working together</span><strong>Bangalore · remote or hybrid · Europe & US hours</strong></div></div></div>
            <ProofPanel/><p className="metric-footnote">Weekly access is not weekly active users. ARR is a supported team outcome. Full metric context lives in the product briefs.</p>
          </section>

          <section className="chapter-section" id="journey" hidden={Boolean(route&&chapter!=="journey")}>
            <ChapterHeading index={String(steps.indexOf("journey")+1).padStart(2,"0")} label="Career flow" title="One role builds on the next.">From engineering and manufacturing workflows to growth, enterprise AI, and long-form video. Follow a step to see the decisions and results.</ChapterHeading>
            <ol className="career-flow">{[...professional].reverse().map((project,index)=><li key={project.slug}><div className="flow-marker"><span>{String(index+1).padStart(2,"0")}</span></div><button className="career-step" onClick={()=>followCareer(project.slug)}><div className="career-meta"><span>{project.period}</span><span>{project.domain}</span></div><div className="career-title"><ProductGlyph id={project.slug}/><h3>{project.title}</h3><ArrowUpRight size={18}/></div><p className="career-role">{project.role}</p><h4>{careerContext[project.slug].verb}</h4><p>{careerContext[project.slug].connection}</p><div className="career-result"><strong>{project.primaryMetric?.value}</strong><span>{project.primaryMetric?.label}</span></div><span className="career-open">Open product brief<ArrowRight size={14}/></span></button></li>)}</ol>
          </section>

          <section className="chapter-section" id="work" hidden={Boolean(route&&chapter!=="work")}>
            <ChapterHeading index={String(steps.indexOf("work")+1).padStart(2,"0")} label="Shipped work / product briefs" title="The decisions behind the delivery.">Four teams, different constraints. Open a brief for the problem, my scope, the tradeoffs, and what changed.</ChapterHeading>
            <div className="work-stage">{professional.map((project,index)=><StoryDisclosure key={project.slug} project={project} index={index} open={openSlug===project.slug} muted={Boolean(openSlug&&openSlug!==project.slug)} onToggle={()=>openStory(project.slug)}/>)}</div>
          </section>

          <section className="chapter-section" id="independent-work" hidden={Boolean(route&&chapter!=="experiments")}>
            <ChapterHeading index={String(steps.indexOf("experiments")+1).padStart(2,"0")} label="Experiment lab" title="Small bets. Working ideas.">I use these independent case studies to explore consumer and mobile products I have not worked on directly. Product gaps become proposals and prototypes—not claims of shipped company work.</ChapterHeading>
            <div className="chapter-utility"><span><FlaskConical size={14}/> Case studies + things I built</span><TrackedLink href="/experiments" item="all-experiments">Open the one-page lab<ArrowUpRight size={14}/></TrackedLink></div><ExperimentLab/>
          </section>

          <section className="chapter-section" id="references" hidden={Boolean(route&&chapter!=="evidence")}>
            <ChapterHeading index={String(steps.indexOf("evidence")+1).padStart(2,"0")} label="Evidence & working notes" title="Product work is a team sport.">Managers and teammates on the clarity, ownership, and energy I bring to product work. Plus a few notes on how I think.</ChapterHeading>
            <div className="quotes-grid">{quotes.map((item,index)=><Recommendation key={item.name} item={item} featured={index===0}/>)}</div>
            <div className="working-notes" id="writing"><div className="panel-topline"><span><BookOpen size={14}/> TECHNICAL NOTES</span><span>READ / REFLECT / BUILD</span></div>{writing.map(item=><TrackedLink className="note-row" href={item.href} event="article_click" item={item.title} key={item.href}><span>{item.publication} · {item.date}</span><strong>{item.title}</strong><ArrowUpRight size={16}/></TrackedLink>)}<div className="profile-row">{[["Medium","https://medium.com/@nayanak872"],["Hashnode","https://hashnode.com/@nayanak"],["DEV","https://dev.to/uncommonnayana"],["GitHub","https://github.com/nk7608"],["X","https://x.com/uncommonnayana"]].map(([name,href])=><TrackedLink key={name} href={href} item={`profile:${name}`}>{name}<ArrowUpRight size={12}/></TrackedLink>)}</div></div>
          </section>

          <section className="chapter-section" id="about" hidden={Boolean(route&&chapter!=="about")}>
            <ChapterHeading index={String(steps.indexOf("about")+1).padStart(2,"0")} label="Off the clock" title="The person behind the PRDs.">I started in software engineering and moved into product management. I work best when a problem is still unclear and the team needs user evidence, clear priorities, and steady execution.</ChapterHeading>
            <div className="personal-grid"><article className="personal-card"><Coffee size={20}/><h3>Curiosity doesn’t clock out.</h3><p>Outside work, I run, read, and keep looking for a good coffee, meal, or song.</p><p className="section-label personal-label"><MapPin size={13}/> Bangalore pitstops</p><div className="pitstop-tags">{life.pitstops.map(place=><span key={place}>{place}</span>)}</div></article><article className="personal-card"><BookOpen size={20}/><h3>On my reading list.</h3>{life.books.map(book=><TrackedLink className="book-row" href={book.href} item={`book:${book.title}`} key={book.title}><small>{book.status}</small><strong>{book.title}<ArrowUpRight size={13}/></strong><span>{book.author} · {book.note}</span></TrackedLink>)}</article><div className="personal-card music-card"><MusicPlayer/></div><article className="personal-card game-card"><GitBranch size={20}/><p className="section-label personal-label">A tiny side quest</p><h3>Scope Runner.</h3><p>A quick sprint through scope creep. Jump over blockers, keep moving, and see how far you get.</p><button className="button button-secondary" onClick={()=>{setGameOpen(!gameOpen);if(!gameOpen)track("game_open",{from:"about"});}} aria-expanded={gameOpen} aria-controls="scope-runner">{gameOpen?"Close game":"Take a play break"}{gameOpen?<X size={14}/>:<Play size={14}/>}</button><small>Keyboard + touch. No account. No score tracking.</small></article></div>
            {gameOpen&&<div id="scope-runner" className="game-embed"><iframe title="Scope Runner — optional game" src={`/offline.html?play=1&theme=${resolvedTheme==='dark'?'dark':'light'}`} loading="lazy"/></div>}
            <div className="conversation-panel" id="contact"><p className="section-label">An open conversation</p><h2>What should we build next?</h2><p>Building an AI product or looking for a product manager who can connect users, technology, and business results?</p><Availability/><div className="contact-actions"><TrackedLink href="mailto:nayanak872@gmail.com" event="contact_open" item="contact-email" className="button button-primary"><Mail size={15}/>Email Nayana<ArrowUpRight size={14}/></TrackedLink><TrackedLink href="https://www.linkedin.com/in/nayana-k-955411170/" event="contact_open" item="contact-linkedin" className="button button-secondary"><Linkedin size={15}/>LinkedIn</TrackedLink><TrackedLink href={resumeUrl} download={resumeFilename} event="resume_link" item="about-resume" className="text-link">Download résumé<ArrowDown size={14}/></TrackedLink></div><div className="personal-socials"><TrackedLink href="https://github.com/nk7608" item="about-github"><Github size={14}/>GitHub</TrackedLink><TrackedLink href="https://x.com/uncommonnayana" item="about-x">𝕏 @uncommonnayana</TrackedLink></div></div>
          </section>
        </div>
      </div>
      {route&&<div className="tour-controls"><div className="page-shell"><button className="button button-secondary" onClick={()=>currentIndex>0?navigate(steps[currentIndex-1]):restart()}><ArrowLeft size={15}/>{currentIndex>0?"Back":"Routes"}</button><span aria-live="polite">{String(currentIndex+1).padStart(2,"0")} / {String(steps.length).padStart(2,"0")}<small>{chapters[chapter].label}</small></span>{currentIndex<steps.length-1?<button className="button button-primary" onClick={()=>navigate(steps[currentIndex+1])}>Next: {chapters[steps[currentIndex+1]].label}<ArrowRight size={15}/></button>:<button className="button button-primary" onClick={()=>navigate("work",null)}>Explore all work<ArrowUpRight size={15}/></button>}</div></div>}
    </main>
    <motion.footer className="site-footer" initial={false}><div className="page-shell"><span>© {new Date().getFullYear()} Nayana Kumari</span><span>Thoughtfully built. Always iterating.</span><a href="#main">Back to top ↑</a></div></motion.footer>
  </>;
}
