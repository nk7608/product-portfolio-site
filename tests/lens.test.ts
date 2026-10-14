import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { readLens, lenses, lensUrl, sections, duration, type Lens } from "../src/lib/lens";
import { safeHref } from "../src/lib/schema";
import experiments from "../content/experiments.json";

test("every persona lens keeps every section, so choosing a lens never hides content",()=>{
  for(const lens of Object.values(lenses)) {
    assert.deepEqual([...lens.order].sort(),[...sections].sort());
    assert.equal(new Set(lens.order).size,lens.order.length);
  }
});
test("lens links round-trip, legacy tour links still work, invalid input falls back",()=>{
  for(const lens of Object.keys(lenses) as Lens[]) assert.equal(readLens(new URL(lensUrl(lens),"https://example.com").search),lens);
  assert.equal(readLens("?tour=exploring&step=work"),"curious");
  assert.equal(readLens("?tour=hiring"),"hiring");
  for(const bad of ["?for=__proto__","?for=unknown","?tour=__proto__",""]) assert.equal(readLens(bad),"all");
});
test("role durations are computed from the period text",()=>{
  assert.equal(duration("Jan — Sep 2026"),"9 mo");
  assert.equal(duration("Jun 2022 — Jan 2024"),"1 yr 8 mo");
  assert.equal(duration("Feb — Dec 2024"),"11 mo");
  assert.equal(duration("not a date"),"");
});
test("experiment cards retain safe evidence links and explicit boundaries",()=>{
  assert.equal(new Set(experiments.map(e=>e.id)).size,experiments.length);
  for(const item of experiments) {
    assert.ok(item.boundary && item.summary && item.links.length);
    for(const link of item.links) {
      assert.ok(safeHref.safeParse(link.href).success);
      if(link.href.startsWith("/assets/"))assert.ok(fs.existsSync(`public${link.href}`));
    }
  }
});
test("offline fallback handles failed navigations without intercepting PDFs or API requests",async()=>{
  const handlers:Record<string,(event:unknown)=>void>={};
  const fallback=new Response("fallback");
  const context={self:{location:{origin:"https://example.com"},addEventListener:(name:string,handler:(event:unknown)=>void)=>{handlers[name]=handler;}},URL,Response,fetch:()=>Promise.reject(new Error("offline")),caches:{match:()=>Promise.resolve(fallback)}};
  vm.runInNewContext(fs.readFileSync("public/sw.js","utf8"),context);
  let result:Promise<Response>|undefined;
  const event=(path:string,mode="navigate")=>({request:{url:`https://example.com${path}`,mode,method:"GET"},respondWith:(r:Promise<Response>)=>{result=r;}});
  handlers.fetch(event("/assets/resume.pdf"));assert.equal(result,undefined);
  handlers.fetch(event("/api/analytics","cors"));assert.equal(result,undefined);
  handlers.fetch(event("/work/vidrush"));assert.equal(await result,fallback);
});
test("offline strategy leaves successful responses and 404s unchanged",async()=>{
  const handlers:Record<string,(event:unknown)=>void>={};
  let response=new Response("live");
  const fallback=new Response("fallback");
  vm.runInNewContext(fs.readFileSync("public/sw.js","utf8"),{self:{location:{origin:"https://example.com"},addEventListener:(name:string,fn:(event:unknown)=>void)=>{handlers[name]=fn;}},URL,Response,fetch:()=>Promise.resolve(response),caches:{match:()=>Promise.resolve(fallback)}});
  for(const status of [200,404,503]) {
    response=new Response("live",{status});let result:Promise<Response>|undefined;
    handlers.fetch({request:{url:"https://example.com/",method:"GET",mode:"navigate"},respondWith:(r:Promise<Response>)=>{result=r;}});
    assert.equal(await result,status===503?fallback:response);
  }
});
