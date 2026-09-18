"use client";
import { useEffect,useRef,useState } from "react";
import { ArrowUpRight,Play } from "lucide-react";
import { TrackedLink } from "./analytics";
declare global { interface Window { twttr?:{widgets:{createTweet:(id:string,element:HTMLElement,options:Record<string,string|boolean>)=>Promise<HTMLElement|undefined>}}; } }
let xScript:Promise<void>|undefined;
function loadX() {
  if(window.twttr?.widgets) return Promise.resolve();
  if(!xScript) xScript=new Promise((resolve,reject)=>{const script=document.createElement("script");script.src="https://platform.twitter.com/widgets.js";script.async=true;script.onload=()=>resolve();script.onerror=reject;document.head.appendChild(script);});
  return xScript;
}
export function VideoEmbed() {
  const [load,setLoad]=useState(false);const [failed,setFailed]=useState(false);const mount=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(!load || !mount.current)return;let cancelled=false;const container=document.createElement("div");mount.current.appendChild(container);const timer=setTimeout(()=>{if(!cancelled)setFailed(true);},15000);
    loadX().then(async()=>{if(cancelled)return;const tweet=await window.twttr?.widgets.createTweet("1918282453552341232",container,{theme:"light",dnt:true,align:"center",conversation:"none"});if(!cancelled){clearTimeout(timer);setFailed(!tweet);}}).catch(()=>{if(!cancelled)setFailed(true);});
    return()=>{cancelled=true;clearTimeout(timer);container.remove();};
  },[load]);
  return <div className="launch-embed"><div className="flex items-center justify-between"><span className="eyebrow">FROM THE BUILD LOG</span><span className="font-mono text-xs">𝕏</span></div>{!load?<button className="launch-load" type="button" onClick={()=>setLoad(true)}><span className="launch-play"><Play size={20} fill="currentColor"/></span><span>Watch the original launch<span className="mt-2 block text-xs font-normal text-muted-foreground">@uncommonnayana · May 2, 2025</span></span></button>:<div ref={mount} className="min-h-40"/>}{failed&&<p className="text-sm text-muted-foreground" role="status">X couldn’t load this post here. The original is available below.</p>}<TrackedLink className="text-link text-xs" href="https://x.com/uncommonnayana/status/1918282453552341232" item="cycle-launch-x">Open launch post<ArrowUpRight size={13}/></TrackedLink></div>;
}
