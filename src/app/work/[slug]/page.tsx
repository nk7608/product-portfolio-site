import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft,ArrowUpRight } from "lucide-react";
import { getProject,getProjects } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { CaseDetails } from "@/components/project-card";
import { TrackedLink } from "@/components/analytics";
import { Footer } from "@/components/footer";
export async function generateStaticParams(){return (await getProjects()).map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const p=await getProject((await params).slug);return {title:p?.title??"Not found",description:p?.summary};}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const p=await getProject((await params).slug);if(!p)notFound();return <><main id="main" className="shell case-page"><Link href="/#work" className="text-link"><ArrowLeft size={14}/>All work</Link><div className="case-header"><div className="flex flex-wrap items-center gap-3"><Badge>#{p.domain??p.category}</Badge><span className="eyebrow">{p.period}</span></div><h1>{p.title}</h1><p className="case-subtitle">{p.outcome??p.subtitle}</p><p className="eyebrow mt-6">{p.role}</p><div className="mt-7 flex flex-wrap gap-3">{p.links.map(link=><TrackedLink href={link.href} key={link.href} item={`${p.slug}:${link.label}`} className="button button-primary">{link.label}<ArrowUpRight size={15}/></TrackedLink>)}</div></div><div className="case-body-grid"><article className="prose"><MDXRemote source={p.body}/></article><aside className="case-aside"><span className="eyebrow">IN THE DETAILS</span><div className="mt-4"><CaseDetails project={p}/></div>{[p.primaryMetric,...p.supportingMetrics,...p.metrics].filter(Boolean).slice(0,4).map(metric=><div key={metric!.label} className="case-metric"><strong>{metric!.value}</strong><span>{metric!.label}</span></div>)}</aside></div><div className="case-back"><Link href="/#work" className="text-link"><ArrowLeft size={14}/>Back to selected work</Link></div></main><Footer/></>;}
