"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Music2, Disc3 } from "lucide-react";
import { useAnalytics, TrackedLink } from "./analytics";
declare global { interface Window { onYouTubeIframeAPIReady?:()=>void; } }

let apiPromise:Promise<void>|undefined;
function loadYouTube() {
  if(window.YT?.Player) return Promise.resolve();
  if(apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve,reject)=>{
    const timeout=window.setTimeout(()=>reject(new Error("Player unavailable")),15000);
    const previous=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=()=>{previous?.();window.clearTimeout(timeout);resolve();};
    const script=document.createElement("script");script.src="https://www.youtube.com/iframe_api";script.async=true;
    script.onerror=()=>{window.clearTimeout(timeout);reject(new Error("Player unavailable"));};
    document.head.appendChild(script);
  });
  return apiPromise;
}
export function MusicPlayer() {
  const [requested,setRequested]=useState(false);
  const [status,setStatus]=useState<"idle"|"loading"|"ready"|"playing"|"paused"|"error">("idle");
  const mount=useRef<HTMLDivElement>(null);
  const track=useAnalytics();
  useEffect(()=>{
    if(!requested) return;
    let cancelled=false;let player:YT.Player|undefined;
    loadYouTube().then(()=>{
      if(cancelled || !mount.current) return;
      const target=document.createElement("div");mount.current.appendChild(target);
      player=new window.YT.Player(target,{host:"https://www.youtube-nocookie.com",width:"100%",height:240,videoId:"k4V3Mo61fJM",playerVars:{autoplay:0,controls:1,playsinline:1,origin:window.location.origin},events:{
        onReady:()=>{if(!cancelled)setStatus("ready");},
        onStateChange:event=>{if(cancelled)return;if(event.data===YT.PlayerState.PLAYING){setStatus("playing");track("music_play",{track:"coldplay-fix-you"});}else if(event.data===YT.PlayerState.PAUSED){setStatus("paused");track("music_pause",{track:"coldplay-fix-you"});}},
        onError:event=>{if(!cancelled){setStatus("error");track("music_error",{code:event.data});}},
      }});
    }).catch(()=>{if(!cancelled)setStatus("error");});
    return ()=>{cancelled=true;player?.destroy();};
  },[requested,track]);
  return <section className="music-note" id="music" aria-labelledby="music-title"><div className="flex items-center justify-between"><span className="eyebrow">THE SOUNDTRACK</span><Music2 size={16}/></div><div className="record-row"><div className={`record ${status==="playing"?"record-playing":""}`} aria-hidden="true"><Disc3/><span>NK<br/>SIDE A</span></div><div><p className="eyebrow mb-2">A LITTLE COLDPLAY, ALWAYS</p><h3 id="music-title">Fix You</h3><p className="mt-1 text-sm text-muted-foreground">Coldplay · X&Y</p></div></div><p className="music-caption">For the piano intro. And everything that follows.</p>{!requested?<button type="button" className="music-load" onClick={()=>{setRequested(true);setStatus("loading");track("music_load",{track:"coldplay-fix-you"});}}>Listen to Fix You <Music2 size={16}/></button>:<div className="mt-5"><div ref={mount} className="youtube-player"/><p className="mt-2 text-xs text-muted-foreground" role="status">{status==="error"?"The embedded player is unavailable here. Listen on YouTube below.":status==="loading"?"Loading the YouTube player…":status==="playing"?"Playing · Coldplay — Fix You":"Use the YouTube controls to play."}</p></div>}<div className="mt-4 flex items-center justify-between gap-2"><span className="text-[11px] text-muted-foreground">{requested?"Official music video":"Plays here via YouTube · no autoplay"}</span><TrackedLink href="https://www.youtube.com/watch?v=k4V3Mo61fJM" item="fix-you-youtube" className="text-link text-xs">YouTube<ArrowUpRight size={12}/></TrackedLink></div></section>;
}
