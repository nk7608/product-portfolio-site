"use client";
import type { Project } from "@/lib/schema";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { useAnalytics } from "./analytics";
export function CaseDetails({project}:{project:Project}) {
  const track=useAnalytics();
  return <Accordion type="single" collapsible onValueChange={value=>{if(value) track("case_detail_open",{project:project.slug,detail:value});}}>{project.details.map((detail,i)=><AccordionItem value={detail.title} key={detail.title}><AccordionTrigger><span className="mr-2 font-mono text-[10px] text-muted-foreground">0{i+1}</span><span className="mr-auto">{detail.title}</span></AccordionTrigger><AccordionContent>{detail.text}</AccordionContent></AccordionItem>)}</Accordion>;
}
