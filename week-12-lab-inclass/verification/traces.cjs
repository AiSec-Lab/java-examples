const assert=require('assert');
const {buildTrace,JAVA_SOURCES}=require('../animation/recursive-sort-visual.js');
const fs=require('fs'),path=require('path');
for(const [kind,name] of [['merge','Slide09_MergeSort.java'],['quick','Slide16_QuickSort.java']])assert.equal(JAVA_SOURCES[kind],fs.readFileSync(path.resolve(__dirname,'../java',name),'utf8'));
let seed=151;
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed;}
for(const kind of ['merge','quick']){
 let cases=0;
 for(let n=0;n<=10;n++)for(let t=0;t<80;t++){
  const input=Array.from({length:n},()=>random()%20);
  const steps=buildTrace(input,kind),last=steps.at(-1);
  assert.deepEqual(last.a,[...input].sort((a,b)=>a-b));
  assert.equal(last.stack.length,0);assert(last.nodes.every(n=>n.state==='sorted'));
  if(kind==='merge')for(const s of steps){
   if(s.phase==='Copy back')assert.equal(s.a[s.indices[0]],s.buffer[s.indices[0]-s.nodes[s.active].lo]);
   if(s.buffer.length)assert.deepEqual(s.buffer,[...s.buffer].sort((a,b)=>a-b));
  }
  if(kind==='quick')for(const s of steps.filter(s=>s.phase==='Place pivot')){
   const node=s.nodes[s.active],p=node.pivotIndex;
   assert(s.a.slice(node.lo,p).every(v=>v<s.a[p]));
   assert(s.a.slice(p+1,node.hi+1).every(v=>v>=s.a[p]));
  }
  cases++;
 }
 console.log(kind+': '+cases+' animation traces passed, including empty, singleton, and duplicate inputs.');
}
