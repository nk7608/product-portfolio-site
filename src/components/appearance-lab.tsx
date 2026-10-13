"use client";
import {useEffect,useRef,useState} from "react";
import {Check,FlaskConical,X,RotateCcw} from "lucide-react";
import {appearances,appearanceKey,validAppearance,type Appearance} from "@/lib/appearance";
import {useAnalytics} from "./analytics";

export function AppearanceLab() {
  const [selected,setSelected]=useState<Appearance>("fieldnotes");
  const [open,setOpen]=useState(false);
  const [notice,setNotice]=useState("");
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const track=useAnalytics();
  useEffect(()=>{
    let saved:unknown;
    try {saved=localStorage.getItem(appearanceKey);} catch {}
    const next=validAppearance(saved)?saved:"fieldnotes";
    document.documentElement.setAttribute("data-appearance",next);
    const frame=requestAnimationFrame(()=>setSelected(next));
    return ()=>cancelAnimationFrame(frame);
  },[]);
  function choose(next:Appearance) {
    setSelected(next);
    document.documentElement.setAttribute("data-appearance",next);
    try {localStorage.setItem(appearanceKey,next);} catch {}
    setNotice(`${appearances.find(item=>item.id===next)!.name} applied. Your route and content are unchanged.`);
    track("appearance_change",{appearance:next});
  }
  function close() {dialog.current?.close();setOpen(false);trigger.current?.focus({preventScroll:true});}
  return <>
    <button ref={trigger} className="appearance-trigger" aria-haspopup="dialog" aria-expanded={open} onClick={()=>{dialog.current?.showModal();setOpen(true);}}><FlaskConical size={16}/><span>A/B <span className="appearance-long">experimentation</span></span><span className="appearance-dot" aria-hidden="true"/></button>
    <dialog className="appearance-dialog" ref={dialog} aria-labelledby="appearance-title" onCancel={()=>setOpen(false)} onClose={()=>setOpen(false)} onClick={event=>{if(event.target===event.currentTarget)close();}}>
      <div className="appearance-heading"><span className="section-label">A/B experimentation · appearance lab</span><button className="icon-button" aria-label="Close appearance lab" onClick={close}><X size={19}/></button></div>
      <h2 id="appearance-title">Same Nayana. Different canvas.</h2><p>Pick the way you like to explore. This changes the look and layout, independently of your guided route.</p>
      <div className="appearance-options" role="group" aria-label="Portfolio appearance">{appearances.map((item,index)=><button key={item.id} className={`appearance-option preview-${item.id}`} aria-pressed={selected===item.id} onClick={()=>choose(item.id)}>
        <span className="appearance-preview" aria-hidden="true"><span className="preview-nav"/><span className="preview-glyph">{item.icon}</span><span className="preview-lines"><i/><i/><i/></span><span className="preview-tiles"><i/><i/><i/></span></span>
        <span className="appearance-option-title"><span>{String.fromCharCode(65+index)} / {item.name}</span>{selected===item.id&&<Check size={16}/>}</span><small>{item.description}</small>
      </button>)}</div>
      <p className="appearance-note" role="status" aria-live="polite">{notice||"Your choice stays in this browser. No signup, no random assignment."}</p>
      <div className="appearance-footer"><button className="text-link" onClick={()=>choose("fieldnotes")}><RotateCcw size={14}/>Reset look</button><button className="button button-primary" onClick={close}>Explore this look <Check size={15}/></button></div>
    </dialog>
  </>;
}
