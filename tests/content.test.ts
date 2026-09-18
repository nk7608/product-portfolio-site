import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projectSchema,safeHref,testimonialSchema } from "../src/lib/schema";
import recommendations from "../content/recommendations.json";

test("published case studies validate and have all four PM narrative sections",()=>{
  for(const file of fs.readdirSync("content/projects")){
    const {data,content}=matter(fs.readFileSync(path.join("content/projects",file),"utf8"));
    const project=projectSchema.parse(data);
    if(project.draft)continue;
    for(const section of ["Problem","Insight","Execution","Impact"])assert.match(content,new RegExp(`^## ${section}$`,"m"),`${file} needs ${section}`);
    for(const link of project.links)if(link.href.startsWith("/assets/"))assert.ok(fs.existsSync(path.join("public",link.href)),`${file}: missing asset`);
  }
});
test("unsafe URLs cannot be introduced through content",()=>{
  for(const href of ["javascript:alert(1)","//example.com","data:text/html,hello","http://example.com"])assert.equal(safeHref.safeParse(href).success,false);
});
test("all four professional stories include progressive homepage content",()=>{
  const required=new Set(["vidrush.mdx","opsmith.mdx","blaze.mdx","phasio.mdx"]);
  for(const file of fs.readdirSync("content/projects")){
    if(!required.has(file))continue;
    const {data}=matter(fs.readFileSync(path.join("content/projects",file),"utf8"));
    const project=projectSchema.parse(data);
    assert.ok(project.featured,`${file} must be featured`);
    assert.ok(project.domain&&project.outcome&&project.product&&project.challenge&&project.ownership,`${file} is missing story context`);
    assert.ok(project.primaryMetric&&project.supportingMetrics.length===2,`${file} needs one primary and two supporting metrics`);
    assert.ok(project.decisions.length>=2&&project.shipped.length>=3&&project.impact.length>=3,`${file} needs decisions, shipped work, and impact`);
  }
});
test("the two featured deep dives include metric context, alignment, and reflection",()=>{
  for(const file of ["vidrush.mdx","opsmith.mdx"]){
    const {data}=matter(fs.readFileSync(path.join("content/projects",file),"utf8"));
    const project=projectSchema.parse(data);
    assert.ok(project.metricContext,`${file} needs metric context`);
    assert.ok(project.alignment,`${file} needs an alignment story`);
    assert.ok(project.reflection,`${file} needs a reflection`);
  }
});
test("resume CTAs use the approved downloadable PDF",()=>{
  const resumePath="public/assets/nayana-kumari-ai-product-manager-resume.pdf";
  assert.ok(fs.existsSync(resumePath),"downloadable resume PDF is missing");
  assert.ok(fs.statSync(resumePath).size>0,"downloadable resume PDF is empty");
  for(const source of ["src/components/header.tsx","src/components/portfolio-home.tsx"]){
    const content=fs.readFileSync(source,"utf8");
    assert.match(content,/\/assets\/nayana-kumari-ai-product-manager-resume\.pdf/);
    assert.match(content,/download=\{resumeFilename\}/);
    assert.doesNotMatch(content,/docs\.google\.com\/document/);
  }
  assert.match(fs.readFileSync("next.config.ts","utf8"),/Content-Disposition[\s\S]*attachment;/);
});
test("all five screenshot recommendations retain attribution and the partial quote is explicit",()=>{
  const items=recommendations.map(value=>testimonialSchema.parse(value));
  assert.equal(items.length,5);
  assert.equal(items.find(i=>i.name.startsWith("Elaya"))?.excerpt,true);
  assert.equal(items.find(i=>i.name==="Lauren Rothwell")?.relationship,"Nayana was Lauren’s client");
});
