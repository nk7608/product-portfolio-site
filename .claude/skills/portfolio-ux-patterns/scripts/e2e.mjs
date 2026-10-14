// End-to-end check of every visitor flow: intro (all paths), shared links, settings, system theme, ⌘K,
// rows, sections, embeds, copy/download, footer, case pages, 404 and phone layout.
// Usage: node .claude/skills/portfolio-ux-patterns/scripts/e2e.mjs [baseUrl]   (default http://localhost:3100)
// Needs Playwright (see measure.mjs). Exit code 1 if any check fails. The 404 console error is expected.
import {chromium} from "playwright";
const base=process.argv[2]??"http://localhost:3100";
const results=[];let page,ctx;const errs=[];
const ok=(name,cond,info="")=>{results.push([cond?"PASS":"FAIL",name,cond?"":String(info)]);};
const attr=k=>page.evaluate(k=>document.documentElement.getAttribute(k),k);
const prefs=()=>page.evaluate(()=>JSON.parse(localStorage.getItem("nayana-prefs-v2")||"null"));
const order=()=>page.evaluate(()=>[...document.querySelectorAll("main > section.section")].map(s=>s.id).join(">"));
const collapsed=()=>page.evaluate(()=>[...document.querySelectorAll("main > section.section.is-collapsed")].map(s=>s.id).join(","));
const dlg=sel=>page.locator(`dialog.${sel}[open]`);
async function fresh(opts={}){ if(ctx) await ctx.close(); ctx=await browser.newContext({viewport:opts.mobile?{width:390,height:844}:{width:1280,height:900},isMobile:!!opts.mobile,hasTouch:!!opts.mobile,colorScheme:opts.scheme??"light",permissions:["clipboard-read","clipboard-write"]});
  if(opts.prefs) await ctx.addInitScript(p=>localStorage.setItem("nayana-prefs-v2",p),JSON.stringify(opts.prefs));
  page=await ctx.newPage();page.on("pageerror",e=>{if(!/sandboxed and lacks/.test(e.message))errs.push(`${opts.label??""} pageerror ${e.message}`)});page.on("console",m=>{if(["error","warning"].includes(m.type())&&!/Download the React DevTools|\[HMR\]|\[Fast Refresh\]/.test(m.text()))errs.push(`${opts.label??""} ${m.type()} ${m.text().slice(0,200)}`)});
  await page.goto(base+(opts.path??"/"),{waitUntil:"networkidle"});await page.waitForTimeout(400);}
const browser=await chromium.launch();
const step=async(name,fn)=>{try{await fn();}catch(e){ok(name+" (threw)",false,e.message.split("\n")[0]);}};

// 1. Onboarding — full path
await step("onboarding full",async()=>{
  await fresh({label:"onb"});
  ok("intro opens on first visit",await dlg("sheet-intro").count()===1);
  const intro=page.locator("dialog.sheet-intro");
  ok("progress shows step 1",await intro.locator("[role=progressbar]").getAttribute("aria-valuenow")==="1");
  await intro.getByRole("radio",{name:/hiring for a product role/}).click();
  ok("persona advances to step 2",await intro.getByRole("heading",{name:"What should I show first?"}).isVisible());
  const checked=await intro.locator("[role=checkbox][aria-checked=true]").allTextContents();
  ok("hiring pre-ticks roles + teammates",checked.join("|")==="Roles & outcomes|What teammates say",checked.join("|"));
  await intro.getByRole("checkbox",{name:"Roles & outcomes"}).click();await intro.getByRole("checkbox",{name:"What teammates say"}).click();
  ok("Next disabled with nothing ticked",await intro.getByRole("button",{name:"Next",exact:true}).isDisabled());
  await intro.getByRole("checkbox",{name:"Writing"}).click();await intro.getByRole("checkbox",{name:"Roles & outcomes"}).click();
  await intro.getByRole("button",{name:"Back"}).click();
  ok("Back returns to step 1",await intro.getByRole("heading",{name:"What brings you here?"}).isVisible());
  await intro.getByRole("radio",{name:/hiring for a product role/}).click();
  await intro.getByRole("checkbox",{name:"Writing"}).click();
  await intro.getByRole("button",{name:"Next",exact:true}).click();
  ok("step 3 shown",await intro.getByRole("heading",{name:"Make it comfortable"}).isVisible());
  await intro.getByRole("radio",{name:"Night"}).click();
  ok("theme applies live in step 3",await attr("data-theme")==="night");
  await intro.getByRole("radio",{name:"Large"}).click();
  ok("size applies live",await attr("data-size")==="l");
  await intro.getByRole("button",{name:"Show my page"}).click();await page.waitForTimeout(300);
  ok("intro closes",await dlg("sheet-intro").count()===0);
  const p=await prefs();
  ok("prefs saved",p?.onboarded===true&&p.persona==="hiring"&&p.theme==="night"&&p.size==="l",JSON.stringify(p));
  ok("order follows answers",(await order()).startsWith("work>evidence>writing"),await order());
  ok("unchosen sections collapsed",(await collapsed())==="experiments,about",await collapsed());
  ok("hiring opens latest brief",await page.locator("#work-vidrush.is-open").count()===1);
  ok("path note names persona",/hiring for a product role/.test(await page.locator(".path-note").innerText()));
  await page.reload({waitUntil:"networkidle"});await page.waitForTimeout(300);
  ok("no intro after reload",await dlg("sheet-intro").count()===0);
  ok("theme persists before paint",await attr("data-theme")==="night");
});

// 2. Skip / Escape / backdrop
await step("skip paths",async()=>{
  await fresh({label:"skip"});
  await page.locator("dialog.sheet-intro").getByRole("button",{name:"Skip"}).click();await page.waitForTimeout(200);
  let p=await prefs();ok("Skip on step 1 → everything, onboarded",p?.persona==="all"&&p.onboarded,JSON.stringify(p));
  ok("Skip leaves all sections open",(await collapsed())==="",await collapsed());
  await fresh({label:"esc"});await page.keyboard.press("Escape");await page.waitForTimeout(200);
  ok("Escape skips intro",await dlg("sheet-intro").count()===0&&(await prefs())?.onboarded===true);
  await fresh({label:"backdrop"});await page.mouse.click(5,450);await page.waitForTimeout(200);
  ok("backdrop click skips intro",await dlg("sheet-intro").count()===0);
  await fresh({label:"skip2"});const intro=page.locator("dialog.sheet-intro");
  await intro.getByRole("radio",{name:/building something/}).click();await intro.getByRole("button",{name:"Skip"}).click();await page.waitForTimeout(200);
  p=await prefs();ok("Skip on step 2 on first visit → everything",p?.persona==="all",JSON.stringify(p));
});

// 3. Replay intro + shared links
await step("replay and links",async()=>{
  await fresh({label:"replay",prefs:{onboarded:true,persona:"curious",interests:["about","experiments","writing"]}});
  ok("curious order",(await order()).startsWith("about>experiments>writing"),await order());
  await page.locator(".path-note").getByRole("button",{name:"Change"}).click();
  const intro=page.locator("dialog.sheet-intro");
  ok("Change reopens intro",await dlg("sheet-intro").count()===1);
  ok("replay preselects current persona",await intro.getByRole("radio",{name:/Just looking around/}).getAttribute("aria-checked")==="true");
  await intro.getByRole("button",{name:"Skip"}).click();await page.waitForTimeout(200);
  ok("Skip on replay keeps persona",(await prefs())?.persona==="curious");
  await fresh({label:"for",path:"/?for=building"});
  ok("?for= skips intro",await dlg("sheet-intro").count()===0);
  ok("?for=building applied",(await prefs())?.persona==="building"||(await order()).startsWith("work>experiments>writing"),await order());
  await fresh({label:"tour",path:"/?tour=exploring&step=work"});
  ok("legacy ?tour=exploring → curious",(await order()).startsWith("about"),await order());
  await fresh({label:"bad",path:"/?for=__proto__"});
  ok("invalid ?for= → everything, no crash",(await order())==="work>experiments>writing>evidence>about>contact",await order());
  await fresh({label:"deep",prefs:{onboarded:true},path:"/#work-opsmith"});
  ok("#work-opsmith deep link opens that role",await page.locator("#work-opsmith.is-open").count()===1);
});

// 4. Settings
await step("settings",async()=>{
  await fresh({label:"settings",prefs:{onboarded:true}});
  await page.getByRole("button",{name:"Display and reading settings"}).click();
  const s=page.locator("dialog.sheet-side");ok("settings opens",await dlg("sheet-side").count()===1);
  const checks=[["Theme","Stone","data-theme","stone"],["Theme","Ink","data-theme","ink"],["Accent colour","Moss","data-accent","moss"],["Typeface","Serif","data-font","serif"],["Text size","Small","data-size","s"],["Detail","Full","data-density","full"],["Motion","Off","data-motion","off"]];
  for(const [group,name,a,v] of checks){await s.getByRole("radiogroup",{name:group}).getByRole("radio",{name,exact:true}).click();ok(`${group} → ${name}`,await attr(a)===v,await attr(a));}
  ok("Ink sets dark mode",await attr("data-mode")==="dark");
  ok("Full shows row summaries",await page.locator("#work .row-btn .d").first().isVisible());
  await s.getByRole("radiogroup",{name:"Persona"}).getByRole("radio",{name:"Curious"}).click();
  ok("persona switch reorders page",(await order()).startsWith("about"),await order());
  await s.getByRole("button",{name:"Reset to default"}).click();await page.waitForTimeout(150);
  const p=await prefs();ok("reset restores defaults",p.theme==="system"&&p.accent==="rust"&&p.font==="sans"&&p.persona==="all"&&p.onboarded===true,JSON.stringify(p));
  await page.keyboard.press("Escape");await page.waitForTimeout(150);
  ok("Escape closes settings",await dlg("sheet-side").count()===0);
  ok("focus returns to trigger",await page.evaluate(()=>document.activeElement?.getAttribute("aria-label"))==="Display and reading settings");
  await page.getByRole("button",{name:"Display and reading settings"}).click();
  await page.locator("dialog.sheet-side").getByRole("button",{name:"Replay intro"}).click();await page.waitForTimeout(150);
  ok("Replay intro from settings",await dlg("sheet-intro").count()===1&&await dlg("sheet-side").count()===0);
});

// 5. System theme follows device
await step("system theme",async()=>{
  await fresh({label:"sys",prefs:{onboarded:true,theme:"system"},scheme:"dark"});
  ok("system + dark device → ink",await attr("data-theme")==="ink");
  await page.emulateMedia({colorScheme:"light"});await page.waitForTimeout(200);
  ok("live switch to light → paper",await attr("data-theme")==="paper",await attr("data-theme"));
});

// 6. Command menu
await step("command menu",async()=>{
  await fresh({label:"cmd",prefs:{onboarded:true,persona:"curious",interests:["about"]}});
  await page.keyboard.press("Control+k");const c=page.locator("dialog.sheet-command");
  ok("Ctrl+K opens",await dlg("sheet-command").count()===1);
  ok("input focused",await page.evaluate(()=>document.activeElement?.getAttribute("aria-label"))==="Search commands");
  await page.keyboard.type("night");await page.keyboard.press("Enter");await page.waitForTimeout(150);
  ok("search + Enter runs theme",await attr("data-theme")==="night"&&await dlg("sheet-command").count()===0);
  await page.getByRole("button",{name:"Open command menu"}).click();await page.keyboard.type("zzzz");
  ok("empty state",await c.getByText("No matches").isVisible());
  await page.keyboard.press("Escape");
  await page.keyboard.press("Meta+k");await page.waitForTimeout(150);await page.keyboard.type("opsmith");await page.waitForTimeout(100);
  await page.keyboard.press("Enter");await page.waitForTimeout(700);
  ok("role command opens that role even if section collapsed",await page.locator("#work-opsmith.is-open").isVisible(),await collapsed());
  await page.keyboard.press("Meta+k");await page.keyboard.type("recommend");await page.keyboard.press("Enter");await page.waitForTimeout(700);
  ok("go to collapsed section expands it",!(await collapsed()).includes("evidence"),await collapsed());
  await page.keyboard.press("Meta+k");await page.keyboard.press("ArrowDown");await page.keyboard.press("ArrowDown");
  ok("arrow keys move selection",await c.locator("[aria-selected=true]").innerText()==="Writing");
  await page.keyboard.press("Escape");
  await page.keyboard.press("Meta+k");await page.keyboard.type("copy");await page.keyboard.press("Enter");await page.waitForTimeout(300);
  ok("copy email copies",await page.evaluate(()=>navigator.clipboard.readText())==="nayanak872@gmail.com");
  ok("copy shows feedback",await c.getByText("Copied ✓").isVisible());
  await page.keyboard.press("Escape");
  await page.keyboard.press("Meta+k");await page.keyboard.type("settings");await page.keyboard.press("Enter");await page.waitForTimeout(200);
  ok("settings via command",await dlg("sheet-side").count()===1&&await dlg("sheet-command").count()===0);
  await page.keyboard.press("Escape");
  await page.keyboard.press("Meta+k");await page.waitForTimeout(150);await page.keyboard.type("browsing as");await page.waitForTimeout(100);
  const label=await c.locator("[aria-selected=true]").innerText().catch(()=>"none");await page.keyboard.press("Enter");await page.waitForTimeout(250);
  ok("change persona via command",await dlg("sheet-intro").count()===1,`selected: ${label}; cmd open: ${await dlg("sheet-command").count()}`);
});

// 7. Page interactions
await step("page",async()=>{
  await fresh({label:"page",prefs:{onboarded:true}});
  const r=page.locator("#work-blaze .row-btn");await r.click();
  ok("row opens",await r.getAttribute("aria-expanded")==="true"&&await page.locator("#work-blaze .row-body").isVisible());
  await page.locator("#work-phasio .row-btn").click();
  ok("only one role open",await page.locator("#work .row.is-open").count()===1);
  await page.locator("#work-phasio details summary").click();
  ok("details disclosure opens",await page.locator("#work-phasio details").getAttribute("open")!==null);
  ok("full write-up link",await page.locator("#work-phasio").getByRole("link",{name:/Full write-up/}).getAttribute("href")==="/work/phasio");
  await page.locator("#work-phasio .row-btn").click();ok("row closes",await page.locator("#work .row.is-open").count()===0);
  await page.locator("#exp-swish .row-btn").click();
  ok("experiment opens with links",await page.locator("#exp-swish").getByRole("link",{name:/Read case study/}).isVisible());
  const ext=await page.locator("#exp-swish a[href^='https://']").first();ok("external link opens in new tab safely",(await ext.getAttribute("target"))==="_blank"&&/noopener/.test(await ext.getAttribute("rel")));
  ok("writing rows link out",(await page.locator("#writing a.row-btn").count())===3);
  const fig=page.locator(".quote");const first=await fig.locator("figcaption b").innerText();
  await fig.getByRole("button",{name:"Previous recommendation"}).click();ok("quotes wrap backwards","5 / 5"===await fig.locator(".num").innerText());
  await fig.getByRole("button",{name:"Next recommendation"}).click();ok("quotes return",first===await fig.locator("figcaption b").innerText());
  await page.locator("#about").getByRole("button",{name:"Play"}).first().click();await page.waitForTimeout(400);
  ok("song player loads",await page.locator("#about iframe[src*='youtube-nocookie']").count()===1);
  await page.locator("#about").getByRole("button",{name:"Stop"}).click();ok("song stops",await page.locator("#about iframe[src*='youtube']").count()===0);
  await page.locator("#about").getByRole("button",{name:"Play"}).nth(1).click();await page.waitForTimeout(400);
  ok("game loads sandboxed",await page.locator("#about iframe[sandbox='allow-scripts']").count()===1);
  await page.locator(".hero .copy-btn").click();await page.waitForTimeout(200);
  ok("hero copy email",await page.evaluate(()=>navigator.clipboard.readText())==="nayanak872@gmail.com"&&await page.locator(".hero .copy-btn small").isVisible());
  const resume=page.locator(".hero a[download]");ok("résumé link downloads PDF",(await resume.getAttribute("href")).endsWith(".pdf"));
  const [dl]=await Promise.all([page.waitForEvent("download",{timeout:5000}),page.locator("#contact a[download]").click()]);
  ok("résumé download works",/\.pdf$/.test(dl.suggestedFilename()),dl.suggestedFilename());
  ok("mailto present",await page.locator("#contact a[href^='mailto:']").count()===1);
  await page.locator(".margin-index a[href='#writing']").click();await page.waitForTimeout(900);
  ok("margin index highlights section",await page.locator(".margin-index a[aria-current=true]").innerText().then(t=>/Writing/.test(t)));
  await page.getByRole("link",{name:"Contact",exact:true}).first().click();await page.waitForTimeout(800);
  ok("header Contact scrolls",await page.evaluate(()=>{const r=document.getElementById("contact").getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}));
});

// 8. Collapsed section show/hide
await step("collapse",async()=>{
  await fresh({label:"collapse",prefs:{onboarded:true,persona:"hiring",interests:["work"]}});
  const t=page.locator("#experiments .toggle");ok("toggle says Show",await t.innerText()==="Show");
  await t.click();ok("Show expands",!(await collapsed()).includes("experiments")&&await t.getAttribute("aria-expanded")==="true");
  await t.click();ok("Hide collapses",(await collapsed()).includes("experiments"));
  await page.locator(".margin-index a[href='#about']").click();await page.waitForTimeout(600);
  ok("margin link to a collapsed section expands it",!(await collapsed()).includes("about"),await collapsed());
});

// 8b. Footer
await step("footer",async()=>{
  await fresh({label:"footer",prefs:{onboarded:true,persona:"hiring",interests:["work"]}});
  const f=page.locator("footer.site-footer");
  ok("no 'Built by hand' text",!/Built by hand/i.test(await f.innerText()));
  await f.getByRole("link",{name:"Off the clock"}).click();await page.waitForTimeout(700);
  ok("footer link reveals collapsed section",!(await collapsed()).includes("about"),await collapsed());
  ok("…and scrolls to it",await page.evaluate(()=>Math.abs(document.getElementById("about").getBoundingClientRect().top)<200));
  await f.getByRole("button",{name:"Theme & reading settings"}).click();ok("footer opens settings",await dlg("sheet-side").count()===1);await page.keyboard.press("Escape");
  await f.getByRole("button",{name:/Command menu/}).click();ok("footer opens ⌘K",await dlg("sheet-command").count()===1);await page.keyboard.press("Escape");
  await f.getByRole("button",{name:"Personalise this page"}).click();ok("footer opens intro",await dlg("sheet-intro").count()===1);await page.keyboard.press("Escape");
  await f.getByRole("button",{name:/Copy email/}).click();await page.waitForTimeout(150);ok("footer copy email",await page.evaluate(()=>navigator.clipboard.readText())==="nayanak872@gmail.com");
  ok("footer résumé downloads",(await f.locator("a[download]").getAttribute("href")).endsWith(".pdf"));
  await fresh({label:"footer-case",prefs:{onboarded:true,persona:"curious",interests:["about"]},path:"/work/blaze"});
  await page.locator("footer.site-footer").getByRole("link",{name:"Experience"}).click();await page.waitForURL(/\/#work$/);await page.waitForTimeout(900);
  ok("footer on case page goes home and reveals Experience",!(await collapsed()).includes("work"),await collapsed());
  ok("footer on case page: same footer",await page.locator("footer.site-footer .footer-cols nav").count()===3);
});

// 9. Pages
await step("pages",async()=>{
  await fresh({label:"case",prefs:{onboarded:true},path:"/work/vidrush"});
  ok("case page renders",/Vidrush/.test(await page.locator("h1").innerText())&&await page.locator(".prose").count()===1);
  ok("no intro on case page",await dlg("sheet-intro").count()===0);
  await fresh({label:"case-fresh",path:"/work/opsmith"});
  ok("first visit straight to a case page does not interrupt",await dlg("sheet-intro").count()===0);
  await fresh({label:"exp",prefs:{onboarded:true},path:"/experiments"});
  ok("experiments page lists 6",await page.locator(".row").count()===6);
  await fresh({label:"404",prefs:{onboarded:true},path:"/nope"});
  ok("404 page",/wandered off/.test(await page.locator("h1").innerText()));
});

// 10. Mobile
await step("mobile",async()=>{
  await fresh({label:"m",mobile:true});
  ok("mobile intro opens",await dlg("sheet-intro").count()===1);
  await page.locator("dialog.sheet-intro").getByRole("button",{name:"Skip"}).tap();await page.waitForTimeout(200);
  await page.getByRole("button",{name:"Display and reading settings"}).tap();
  const box=await page.locator("dialog.sheet-side").boundingBox();
  ok("settings is a bottom sheet",box&&Math.abs(box.y+box.height-844)<4&&box.width>=389,JSON.stringify(box));
  await page.keyboard.press("Escape");
  ok("no horizontal overflow",await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator("#work-vidrush .row-btn").tap();ok("row opens on tap",await page.locator("#work-vidrush .row-body").isVisible());
});

await browser.close();
for(const [s,n,i] of results) console.log(s,n,i?`— ${i}`:"");
const f=results.filter(r=>r[0]==="FAIL").length;console.log(`\n${results.length-f}/${results.length} passed`);process.exitCode=f?1:0;
console.log(errs.length?"CONSOLE:\n"+[...new Set(errs)].join("\n"):"no console errors");
