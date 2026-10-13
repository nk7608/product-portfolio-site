"use client";
/* eslint-disable @next/next/no-img-element -- Local brand assets have explicit dimensions, lazy loading and error fallbacks. */
import {useState} from "react";
import {Box,Clapperboard,Code2,Compass,Heart,House,MapPin,Radio,Utensils} from "lucide-react";
import {brandAssets} from "@/lib/brand-assets";
const motifs={film:Clapperboard,terminal:Code2,campaign:Radio,parts:Box,meal:Utensils,travel:Compass,home:House,verify:MapPin,wellness:Heart};
export function BrandLogo({id}:{id:string}) {
  const brand=brandAssets[id];const [failed,setFailed]=useState(false);const Icon=motifs[brand?.motif??"terminal"];
  return <span className={`brand-logo brand-${id}`} aria-hidden="true">{brand?.logo&&!failed?<img src={brand.logo} alt="" width={48} height={48} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>:<Icon size={23} strokeWidth={1.6}/>}</span>;
}
export function BrandCover({id,kind="Product brief"}:{id:string;kind?:string}) {
  const brand=brandAssets[id];const [failed,setFailed]=useState(false);const Icon=motifs[brand?.motif??"terminal"];
  return <div className={`brand-cover brand-${id} motif-${brand?.motif??"terminal"} ${brand?.cover&&!failed?"has-brand-image":""}`} aria-hidden="true">
    <div className="cover-art"><span className="cover-grid"/><Icon className="cover-symbol" strokeWidth={.8}/><span className="cover-orb"/></div>
    {brand?.cover&&!failed&&<img className="brand-cover-image" src={brand.cover} alt="" loading="lazy" width={1200} height={420} referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>}
    <span className="cover-frame"><span/><span/><span/></span>
    <div className="cover-caption"><span>{kind}</span><strong>{brand?.name??"Product experiment"}</strong><small>{brand?.domain??"Explore · build · learn"}</small></div>
    <div className="cover-theme-detail"><span className="block-detail">BUILD NOTES <i/><i/><i/></span><span className="record-detail">SIDE A <span>◉</span> PRODUCT STORIES</span><span className="editorial-detail">The product issue <span>NK.</span></span></div>
  </div>;
}
