import test from 'node:test';
import assert from 'node:assert/strict';
import {appearances,validAppearance} from '../src/lib/appearance';
test('Only the four supported appearances can be restored from browser storage',()=>{
  assert.equal(appearances.length,4);
  for(const item of appearances)assert.equal(validAppearance(item.id),true);
  for(const value of [null,undefined,'','__proto__','dark',{},'spotify'])assert.equal(validAppearance(value),false);
});
