import type { Metadata } from "next";
import Link from "next/link";
import { ExperimentLab } from "@/components/experiment-lab";
import { Footer } from "@/components/footer";
export const metadata:Metadata={title:"Experiments",description:"Independent product case studies and working prototypes by Nayana Kumari.",alternates:{canonical:"/experiments"},openGraph:{url:"/experiments",title:"Experiments · Nayana Kumari",description:"Independent product case studies and working prototypes by Nayana Kumari."}};
export default function ExperimentsPage() {
  return <><main id="main" className="page doc"><Link href="/#experiments" className="back link">← Back</Link><h1>Experiments</h1><p className="lede">Independent case studies and prototypes, built to understand products I haven’t worked on directly. Not shipped company work.</p><div className="section"><ExperimentLab/></div></main><Footer/></>;
}
