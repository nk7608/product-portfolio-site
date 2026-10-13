import test from 'node:test';
import assert from 'node:assert/strict';
import {appearances,validAppearance} from '../src/lib/appearance';
test('Only the four supported appearances can be restored from browser storage',()=>{
  assert.equal(appearances.length,4);
  for(const item of appearances)assert.equal(validAppearance(item.id),true);
  for(const value of [null,undefined,'','__proto__','dark',{},'spotify'])assert.equal(validAppearance(value),false);
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
