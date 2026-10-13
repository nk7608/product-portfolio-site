import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { readJourney, routes, chapters, journeyUrl, type Route } from "../src/lib/journey";
import { safeHref } from "../src/lib/schema";
import experiments from "../content/experiments.json";

test("every tailored route retains every chapter, with the personal chapter last",()=>{
  for(const route of Object.values(routes)) {
    assert.deepEqual([...route.steps].sort(),Object.keys(chapters).sort());
    assert.equal(new Set(route.steps).size,route.steps.length);
    assert.equal(route.steps.at(-1),"about");
  }
});
test("shared tour links round-trip and invalid input falls back safely",()=>{
  for(const route of Object.keys(routes) as Route[]) for(const chapter of routes[route].steps) {
    const url=new URL(journeyUrl(route,chapter),"https://example.com");
    assert.deepEqual(readJourney(url.search),{route,chapter});
  }
  assert.deepEqual(readJourney("?tour=unknown&step=work"),{route:null,chapter:"brief"});
  assert.deepEqual(readJourney("?tour=building&step=unknown"),{route:"building",chapter:"work"});
  assert.deepEqual(readJourney("?tour=__proto__"),{route:null,chapter:"brief"});
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
