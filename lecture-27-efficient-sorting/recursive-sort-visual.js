"use strict";
function buildTrace(input,kind){
 const a=[...input],nodes=[],steps=[];let active=-1,stack=[];
 function emit(phase,reason,indices=[],buffer=[]){steps.push({a:[...a],nodes:JSON.parse(JSON.stringify(nodes)),active,stack:[...stack],phase,reason,indices:[...indices],buffer:[...buffer]});}
 function node(lo,hi,parent){const id=nodes.length;nodes.push({id,parent,lo,hi,depth:stack.length,values:a.slice(lo,hi+1),state:'waiting',pivot:null});return id;}
 function run(lo,hi,parent=null){
  const id=node(lo,hi,parent);active=id;stack.push(id);nodes[id].state='active';
  emit('Call',`Enter ${kind==='merge'?'mergeSort':'quickSort'}(${lo}, ${hi}). This call owns indices ${lo} through ${hi}.`);
  if(lo>=hi){nodes[id].state='sorted';emit('Base case',lo>hi?'This range is empty: return without sorting.':'One value is already sorted: return it unchanged.');stack.pop();active=stack.at(-1)??id;return;}
  if(kind==='merge'){
   const mid=Math.floor((lo+hi)/2);nodes[id].state='split';emit('Split',`Split [${a.slice(lo,hi+1)}] at index ${mid}: left ${lo}–${mid}, right ${mid+1}–${hi}.`);
   run(lo,mid,id);active=id;emit('Left returned','The left half is sorted. Keep its result while recursively sorting the right half.');
   run(mid+1,hi,id);active=id;nodes[id].state='merging';
   const left=a.slice(lo,mid+1),right=a.slice(mid+1,hi+1),buffer=[];let i=0,j=0;
   emit('Combine','Both child calls have returned sorted halves. Merge them by repeatedly taking the smaller front value.');
   while(i<left.length&&j<right.length){
    const li=lo+i,rj=mid+1+j;emit('Compare',`Compare left value ${left[i]} with right value ${right[j]}. Equal values come from the left first.`,[li,rj],buffer);
    const takeLeft=left[i]<=right[j],value=takeLeft?left[i++]:right[j++];buffer.push(value);
    emit('Merge',`Append ${value} from the ${takeLeft?'left':'right'} half to the merge buffer.`,[takeLeft?li:rj],buffer);
   }
   while(i<left.length){buffer.push(left[i++]);emit('Remaining left','The right half is exhausted. Append the next remaining left value.',[lo+i-1],buffer);}
   while(j<right.length){buffer.push(right[j++]);emit('Remaining right','The left half is exhausted. Append the next remaining right value.',[mid+j],buffer);}
   a.splice(lo,buffer.length,...buffer);nodes[id].values=[...buffer];nodes[id].state='sorted';
   emit('Return',`Copy the merged result [${buffer}] back to indices ${lo}–${hi}. Return to the parent call.`,[],buffer);
  }else{
   const pivot=a[lo];let boundary=lo+1;nodes[id].pivot=pivot;nodes[id].state='partitioning';
   emit('Choose pivot',`Use the first value, ${pivot}, as pivot. The boundary starts at index ${boundary}.`,[lo]);
   for(let scan=lo+1;scan<=hi;scan++){
    emit('Compare',`Compare ${a[scan]} at index ${scan} with pivot ${pivot}. Values smaller than the pivot belong before boundary ${boundary}.`,[lo,scan]);
    if(a[scan]<pivot){const v=a[scan];[a[boundary],a[scan]]=[a[scan],a[boundary]];nodes[id].values=a.slice(lo,hi+1);
     emit('Partition swap',`Move ${v} into the smaller-values region by swapping indices ${boundary} and ${scan}${boundary===scan?' (same position; no visible change)':''}. Advance the boundary.`,[boundary,scan]);boundary++;}
    else emit('Keep right',`${a[scan]} is not smaller than ${pivot}; leave it in the right-side region.`,[scan]);
   }
   const p=boundary-1;[a[lo],a[p]]=[a[p],a[lo]];nodes[id].values=a.slice(lo,hi+1);nodes[id].state='partitioned';nodes[id].pivotIndex=p;
   emit('Place pivot',`Swap the pivot into index ${p}. It is in its final position: smaller values on the left, values at least ${pivot} on the right.`,[p]);
   run(lo,p-1,id);active=id;emit('Left returned','The left range is sorted. Now recursively sort the range to the right of the pivot.');
   run(p+1,hi,id);active=id;nodes[id].values=a.slice(lo,hi+1);nodes[id].state='sorted';
   emit('Return','Both sides are sorted and the pivot is already in place. Return directly: quicksort needs no merge buffer or merging pass.');
  }
  stack.pop();active=stack.at(-1)??id;
 }
 run(0,a.length-1);active=0;emit('Finished','All recursive calls have returned. The complete array is sorted.');return steps;
}
if(typeof module!=='undefined')module.exports={buildTrace};
if(typeof document!=='undefined'){
 const $=id=>document.getElementById(id),kind=document.body.dataset.algorithm;let steps=[],position=0,timer=null;
 const box=(text,cls='')=>{const el=document.createElement('span');el.className='value '+cls;el.textContent=text;return el;};
 function pause(){clearTimeout(timer);timer=null;$('play').textContent='▶ Play';}
 function render(){
  const s=steps[position],max=Math.max(1,...steps[0].a);$('bars').replaceChildren();
  s.a.forEach((v,i)=>{const col=document.createElement('div');col.className='column';const b=document.createElement('div');b.className='bar'+(s.indices.includes(i)?' selected':'')+(s.phase==='Finished'?' done':'');b.style.height=Math.max(8,v/max*90)+'%';b.textContent=v;col.append(b);const label=document.createElement('small');label.textContent=i;col.append(label);$('bars').append(col);});
  $('tree').replaceChildren();const maxDepth=Math.max(...s.nodes.map(n=>n.depth));
  for(let d=0;d<=maxDepth;d++){
   const row=document.createElement('div');row.className='tree-row';
   s.nodes.filter(n=>n.depth===d).forEach(n=>{const card=document.createElement('div');card.className='node '+(n.id===s.active?'active ':'')+(n.state==='sorted'?'done':'');const heading=document.createElement('small');heading.textContent=`Call #${n.id} · ${n.lo}…${n.hi}`+(n.parent===null?' · root':` · child of #${n.parent}`);card.append(heading);const values=document.createElement('div');if(n.values.length)n.values.forEach((v,i)=>values.append(box(v,n.pivotIndex===n.lo+i?'pivot':'')));else values.textContent='empty';card.append(values);const state=document.createElement('small');state.textContent=n.state+(n.pivot!==null?` · pivot ${n.pivot}`:'');card.append(state);row.append(card);});$('tree').append(row);
  }
  $('buffer').replaceChildren();s.buffer.forEach(v=>$('buffer').append(box(v)));$('buffer-row').hidden=kind!=='merge';
  $('phase').textContent=s.phase;$('reason').textContent=s.reason;$('stack').textContent=s.stack.length?s.stack.map(id=>'#'+id).join(' → '):'All calls returned';$('counter').textContent=`Step ${position+1} / ${steps.length}`;$('scrub').value=position;$('previous').disabled=position===0;$('next').disabled=position===steps.length-1;
 }
 function load(){pause();const a=$('values').value.trim().split(/[,\s]+/).map(Number);if(a.length<2||a.length>10||a.some(v=>!Number.isInteger(v)||v<0||v>99)){$('error').textContent='Enter 2–10 whole numbers from 0 to 99.';return;}$('error').textContent='';steps=buildTrace(a,kind);position=0;$('scrub').max=steps.length-1;render();}
 function tick(){if(position===steps.length-1){pause();return;}position++;render();timer=setTimeout(tick,Number($('speed').value));}
 $('play').onclick=()=>{if(timer){pause();return;}if(position===steps.length-1)position=0;render();$('play').textContent='⏸ Pause';timer=setTimeout(tick,Number($('speed').value));};
 $('previous').onclick=()=>{pause();position=Math.max(0,position-1);render();};$('next').onclick=()=>{pause();position=Math.min(steps.length-1,position+1);render();};$('reset').onclick=()=>{pause();position=0;render();};$('scrub').oninput=()=>{pause();position=Number($('scrub').value);render();};$('load').onclick=load;$('values').onkeydown=e=>{if(e.key==='Enter')load();};load();
}
