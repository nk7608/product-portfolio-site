import type { Metadata } from "next";
import Link from "next/link";
import { ExperimentLab } from "@/components/experiment-lab";
export const metadata:Metadata={title:"Experiment lab",description:"Independent product case studies and working prototypes by Nayana Kumari."};
export default function ExperimentsPage() {
  return <main id="main" className="experiments-page page-shell"><Link href="/#independent-work" className="text-link">← Back to the portfolio</Link><div className="chapter-heading"><p className="section-label">Experiment lab / independent work</p><h1>Small bets. Working ideas.</h1><p>I use these case studies to understand consumer and mobile products I have not worked on directly. Each one starts with a product gap and turns it into a clear idea or prototype.</p></div><ExperimentLab/></main>;
}
