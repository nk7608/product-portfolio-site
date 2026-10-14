import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, getProjects } from "@/lib/content";
import { TrackedLink } from "@/components/analytics";
import { ProductCover } from "@/components/brand-cover";
import { Footer } from "@/components/footer";
export async function generateStaticParams(){return (await getProjects()).map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const p=await getProject((await params).slug);return {title:p?.title??"Not found",description:p?.summary};}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const p=await getProject((await params).slug);
  if(!p)notFound();
  const metrics=[p.primaryMetric,...p.supportingMetrics,...p.metrics].filter((m,i,all)=>m&&all.findIndex(x=>x?.label===m.label)===i).slice(0,4);
  return <><main id="main" className="page doc">
    <Link href="/#work" className="back link">← All work</Link>
    <h1>{p.title}</h1>
    <p className="meta">{p.role} · {p.period}{p.domain&&` · ${p.domain}`}</p>
    <p className="lede">{p.outcome??p.subtitle}</p>
    {metrics.length>0&&<div className="facts-grid">{metrics.map(m=><div key={m!.label}><b>{m!.value}</b><span>{m!.label}</span></div>)}</div>}
    <ProductCover id={p.slug}/>
    <article className="prose"><MDXRemote source={p.body}/></article>
    {p.metricContext&&<p className="proof-note">{p.metricContext}</p>}
    <p className="row-links" style={{marginTop:24}}>{p.links.map(link=><TrackedLink className="link" href={link.href} key={link.href} item={`${p.slug}:${link.label}`}>{link.label} ↗</TrackedLink>)}</p>
  </main><Footer/></>;
}
