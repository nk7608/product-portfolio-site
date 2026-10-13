"use client";
/* eslint-disable @next/next/no-img-element -- Local brand logos have explicit dimensions, lazy loading and error fallbacks. */
import {useState} from "react";
import {Box,Clapperboard,Code2,Compass,Heart,House,MapPin,Radio,Utensils} from "lucide-react";
import {brandAssets} from "@/lib/brand-assets";
import {CoverScene} from "./cover-scenes";
const motifs={film:Clapperboard,terminal:Code2,campaign:Radio,parts:Box,meal:Utensils,travel:Compass,home:House,verify:MapPin,wellness:Heart};
export function BrandLogo({id}:{id:string}) {
  const brand=brandAssets[id];const [failed,setFailed]=useState(false);const Icon=motifs[brand?.motif??"terminal"];
  return <span className={`brand-logo brand-${id}`} aria-hidden="true">{brand?.logo&&!failed?<img src={brand.logo} alt="" width={48} height={48} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>:<Icon size={23} strokeWidth={1.6}/>}</span>;
}
/** Illustrated product scene, tinted by the brand hue and restyled by each appearance. Optional caption names what was shipped. */
export function ProductCover({id,caption,label}:{id:string;caption?:boolean;label?:string}) {
  const brand=brandAssets[id];
  const style={"--brand":brand?.hue??"var(--accent)","--brand-2":brand?.hue2??"var(--accent)"} as React.CSSProperties;
  return <div className={`product-cover cover-${id} ${caption&&brand?.shipped?"has-caption":""}`} style={style} aria-hidden="true">
    <span className="cover-texture"/>
    {caption&&brand?.shipped&&<div className="cover-note"><span>{label??"What shipped"}</span><p>{brand.shipped}</p></div>}
    <CoverScene id={id}/>
  </div>;
}
