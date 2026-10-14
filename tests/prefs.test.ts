import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultPrefs,parsePrefs,sectionOrder,htmlAttributes,themes,accents,interests} from '../src/lib/prefs';
import {lenses,sections} from '../src/lib/lens';
test('stored preferences are validated; anything unknown falls back to defaults',()=>{
  assert.deepEqual(parsePrefs(null),defaultPrefs);
  assert.deepEqual(parsePrefs({theme:'neon',accent:'__proto__',font:1,size:'xl',persona:'hacker',interests:['x']}),defaultPrefs);
  const p=parsePrefs({theme:'ink',accent:'moss',font:'serif',size:'l',density:'full',motion:'off',persona:'hiring',interests:['evidence','evidence','work'],onboarded:true});
  assert.equal(p.theme,'ink');assert.deepEqual(p.interests,['evidence','work']);assert.equal(p.onboarded,true);
  assert.equal(themes.length,5);assert.equal(accents.length,4);
});
test('every persona keeps every section, chosen interests come first and contact is last',()=>{
  for(const lens of Object.keys(lenses) as (keyof typeof lenses)[]) for(const chosen of [[],['about'],interests.map(i=>i.id)]) {
    const order=sectionOrder(lens,chosen as never);
    assert.deepEqual([...order].sort(),[...sections].sort());
    assert.equal(order.at(-1),'contact');
  }
  assert.equal(sectionOrder('hiring',['about'])[0],'about');
});
test('system theme follows the device; dark themes set dark mode',()=>{
  assert.equal(htmlAttributes(defaultPrefs,true)['data-theme'],'ink');
  assert.equal(htmlAttributes(defaultPrefs,false)['data-theme'],'paper');
  assert.equal(htmlAttributes({...defaultPrefs,theme:'night'},false)['data-mode'],'dark');
});

import {brandAssets} from '../src/lib/brand-assets';
import {readFileSync} from 'node:fs';
test('Every work and experiment card has an illustrated cover scene, a brand hue and secure sources',()=>{
  const scenes=readFileSync('src/components/cover-scenes.tsx','utf8');
  for(const id of ['vidrush','opsmith','blaze','phasio','swish','pronto','headout','loans24','foobar','cycle-synced']){
    const brand=brandAssets[id];assert.ok(brand?.name);assert.ok(brand?.motif);
    assert.match(brand.hue,/^#[0-9a-f]{6}$/i);assert.match(brand.hue2,/^#[0-9a-f]{6}$/i);
    assert.ok(scenes.includes(id.includes('-')?`"${id}": <>`:`${id}: <>`),`missing scene for ${id}`);
    if(brand.logo) { assert.ok(brand.logo.startsWith("/brands/")); assert.ok(readFileSync("public"+brand.logo).length>0); }
    if(brand.source) assert.equal(new URL(brand.source).protocol,"https:");
  }
});
test('Retired sticker strip is absent from the portfolio and the resume is a PDF',()=>{
  const home=readFileSync('src/components/portfolio-home.tsx','utf8');assert.ok(!home.includes('DeskNotes'));
  assert.ok(!readFileSync('src/lib/brand-assets.ts','utf8').includes('-cover.jpg'),'company marketing banners must not be used as covers');
  const pdf=readFileSync('public/assets/nayana-kumari-ai-product-manager-resume.pdf');assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
});
