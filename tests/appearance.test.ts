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
test('Every work and experiment card has contextual imagery with secure sources',()=>{
  for(const id of ['vidrush','opsmith','blaze','phasio','swish','pronto','headout','loans24','foobar','cycle-synced']){
    const brand=brandAssets[id];assert.ok(brand?.name);assert.ok(brand?.motif);
    for(const url of [brand.logo,brand.cover].filter(Boolean)) { assert.ok(url!.startsWith("/brands/")); assert.ok(readFileSync("public"+url!).length>0); }
    if(brand.source) assert.equal(new URL(brand.source).protocol,"https:");
  }
});
test('Retired sticker strip is absent from the portfolio and the resume is a PDF',()=>{
  const home=readFileSync('src/components/portfolio-home.tsx','utf8');assert.ok(!home.includes('DeskNotes'));
  const pdf=readFileSync('public/assets/nayana-kumari-ai-product-manager-resume.pdf');assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
});
