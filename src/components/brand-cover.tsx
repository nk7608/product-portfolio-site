"use client";
/* eslint-disable @next/next/no-img-element -- Local brand logos have explicit dimensions, lazy loading and error fallbacks. */
import {useState} from "react";
import {Box,Clapperboard,Code2,Compass,Heart,House,MapPin,Radio,Utensils} from "lucide-react";
import {brandAssets} from "@/lib/brand-assets";
import {CoverScene} from "./cover-scenes";
const motifs={film:Clapperboard,terminal:Code2,campaign:Radio,parts:Box,meal:Utensils,travel:Compass,home:House,verify:MapPin,wellness:Heart};
export function BrandLogo({id}:{id:string}) {
  const brand=brandAssets[id];const [failed,setFailed]=useState(false);const Icon=motifs[brand?.motif??"terminal"];
  return <span className={`brand-logo brand-${id}`} aria-hidden="true">{brand?.logo&&!failed?<img src={brand.logo} alt="" width={20} height={20} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>:<Icon strokeWidth={1.8}/>}</span>;
}
/** Flat product illustration tinted by the brand hue (cover-scenes.tsx). Shown only inside an opened row or a case page. */
export function ProductCover({id}:{id:string}) {
  const brand=brandAssets[id];
  return <div className={`product-cover cover-${id}`} style={{"--brand":brand?.hue??"var(--accent)"} as React.CSSProperties} aria-hidden="true"><CoverScene id={id}/></div>;
}
