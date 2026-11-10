// Run with Playwright installed: NODE_PATH=/path/to/node_modules node verification/browser.cjs
const {chromium}=require('playwright');
const {pathToFileURL}=require('url');
const path=require('path'),assert=require('assert');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const kind of ['merge','quick']){
  await page.goto(pathToFileURL(path.resolve(__dirname,'../animation',kind+'.html')).href);
  assert.equal(await page.locator('#bars .bar').count(),8);
  assert(!(await page.locator('#java-code').textContent()).includes('@param'));
  assert(!(await page.locator('#java-code').textContent()).includes('//'));
  await page.locator('h1').click();
  await page.keyboard.press('ArrowRight');
  assert((await page.locator('#counter').textContent()).startsWith('Step 2 /'));
  await page.keyboard.press('ArrowLeft');
  assert((await page.locator('#counter').textContent()).startsWith('Step 1 /'));
  await page.keyboard.press('ArrowLeft');
  assert((await page.locator('#counter').textContent()).startsWith('Step 1 /'));
  await page.locator('#values').focus();await page.keyboard.press('ArrowRight');
  assert((await page.locator('#counter').textContent()).startsWith('Step 1 /'));
  await page.locator('#random').click();
  let generated=(await page.locator('#values').inputValue()).split(',').map(Number);
  assert.equal(generated.length,8);assert(generated.every(v=>Number.isInteger(v)&&v>=0&&v<=99));
  assert.deepEqual(await page.locator('#bars .bar').allTextContents(),generated.map(String));
  assert((await page.locator('#counter').textContent()).startsWith('Step 1 /'));
  await page.locator('#values').fill('1,2,3');await page.locator('#random').click();
  assert.equal((await page.locator('#values').inputValue()).split(',').length,3);
  await page.locator('#values').fill('8,3,1,7,0,10,2,5');await page.locator('#load').click();
  // Every event must have a real highlighted Java statement.
  const audit=await page.evaluate(()=>{
   const kind=document.body.dataset.algorithm,steps=buildTrace([8,3,1,7,0,10,2,5],kind);
   return steps.map(s=>{renderCode(s,kind);return {phase:s.phase,highlight:document.querySelectorAll('.executing').length};});
  });
  assert(audit.every(s=>s.highlight>0),JSON.stringify(audit.filter(s=>!s.highlight)));
  await page.locator('#next').click();await page.locator('#previous').click();
  assert((await page.locator('#counter').textContent()).startsWith('Step 1 /'));
  await page.selectOption('#speed','250');await page.locator('#play').click();await page.waitForTimeout(350);await page.locator('#play').click();
  assert(!(await page.locator('#counter').textContent()).startsWith('Step 1 /'));
  for(const input of ['4,0,4,1','0,0','1,2,3,4,5','5,4,3,2,1']){
   await page.locator('#values').fill(input);await page.locator('#load').click();
   await page.locator('#scrub').evaluate(e=>{e.value=e.max;e.dispatchEvent(new Event('input'));});
   assert.deepEqual(await page.locator('#bars .bar').allTextContents(),input.split(',').map(Number).sort((a,b)=>a-b).map(String));
   assert.equal(await page.locator('#phase').textContent(),'Finished');
   assert.equal(await page.locator('.node:not(.done)').count(),0);
   await page.locator('#reset').click();assert.deepEqual(await page.locator('#bars .bar').allTextContents(),input.split(','));
  }
  for(const input of ['','invalid','-1,2','100,2','1']){
   await page.locator('#values').fill(input);await page.locator('#load').click();assert((await page.locator('#error').textContent()).includes('Enter'));
  }
  await page.locator('#values').fill('8,3,1,7,0,10,2,5');await page.locator('#load').click();
  await page.locator('#scrub').evaluate(e=>{e.value=Math.floor(e.max/2);e.dispatchEvent(new Event('input'));});
  await page.screenshot({path:path.resolve(__dirname,kind+'.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.setViewportSize({width:1440,height:1000});
  console.log(kind+': all event highlights, playback, stepping, timeline, reset, edge inputs, recursion tree, and mobile layout passed.');
 }
 assert.deepEqual(errors,[]);await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
