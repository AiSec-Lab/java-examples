"use strict";
const algorithm=document.body.dataset.algorithm;
const $=id=>document.getElementById(id);
function makeSteps(input,kind){
 const a=[...input],steps=[];let comparisons=0,moves=0;
 const add=(reason,active=[],sorted=[],hole=-1,key=null,phase="Inspect")=>steps.push({a:[...a],reason,active:[...active],sorted:[...sorted],hole,key,phase,comparisons,moves});
 add("Start with the unsorted array. Bar heights represent the values.");
 if(kind==="bubble"){
  for(let end=a.length-1;end>0;end--){
   let swapped=false;const sorted=Array.from({length:a.length-end-1},(_,i)=>end+1+i);
   add(`Start a pass through indices 0 to ${end}. The largest remaining value will move to index ${end}.`,[],sorted,-1,null,"New pass");
   for(let j=0;j<end;j++){
    comparisons++;add(`Compare adjacent values ${a[j]} and ${a[j+1]}. Swap only if the left value is larger.`,[j,j+1],sorted,-1,null,"Compare");
    if(a[j]>a[j+1]){const left=a[j],right=a[j+1];[a[j],a[j+1]]=[a[j+1],a[j]];moves++;swapped=true;add(`Swap ${left} and ${right}: the larger value moves one position right.`,[j,j+1],sorted,-1,null,"Swap");}
    else add("This pair is already in order; leave it unchanged.",[j,j+1],sorted,-1,null,"Keep order");
   }
   sorted.unshift(end);add(`Pass complete. The value ${a[end]} at index ${end} is now in its final position.`,[],sorted,-1,null,"Pass complete");
   if(!swapped){add("No swaps occurred in this pass, so the whole array is sorted. Stop early.",[],a.map((_,i)=>i),-1,null,"Early stop");break;}
  }
 }else{
  add("The first value alone forms a sorted prefix.",[],[0],-1,null,"Sorted prefix");
  for(let i=1;i<a.length;i++){
   const key=a[i];let j=i-1,hole=i;
   add(`Save ${key} as the key outside the array. Its position is now a logical hole. Insert it into the sorted prefix.`,[i],Array.from({length:i},(_,k)=>k),hole,key,"Pick up key");
   while(j>=0){
    comparisons++;add(`Compare ${a[j]} with the saved key ${key}. Shift right only if ${a[j]} is larger.`,[j],[],hole,key,"Compare");
    if(a[j]<=key){add(`${a[j]} is not larger than ${key}; the key belongs immediately to its right.`,[j],[],hole,key,"Position found");break;}
    const shifted=a[j];a[j+1]=a[j];moves++;hole=j;
    add(`Shift ${shifted} one position right. The hole moves left; the key remains safely stored outside the array.`,[j+1],[],hole,key,"Shift");j--;
   }
   if(j<0)add(`The key ${key} is smaller than every value in the prefix, so insert it at index 0.`,[],[],hole,key,"Position found");
   a[j+1]=key;add(`Place the saved key ${key} at index ${j+1}. Indices 0 through ${i} are now sorted relative to each other.`,[j+1],Array.from({length:i+1},(_,k)=>k),-1,null,"Insert");
  }
 }
 add("Finished: every value is in ascending order.",[],a.map((_,i)=>i),-1,null,"Sorted");return steps;
}
let steps=[],position=0,timer=null;
function pause(){clearTimeout(timer);timer=null;$("play").textContent="▶ Play";}
function render(){const s=steps[position],max=Math.max(...steps[0].a);$("chart").replaceChildren();s.a.forEach((value,i)=>{const column=document.createElement("div");column.className="column";const bar=document.createElement("div");bar.className="bar"+(s.sorted.includes(i)?" sorted":"")+(s.active.includes(i)?" compare":"")+(s.phase==="Swap"||s.phase==="Shift"?s.active.includes(i)?" move":"":"")+(s.hole===i?" hole":"");bar.style.height=`${Math.max(7,value/max*90)}%`;bar.textContent=s.hole===i?"□":value;column.append(bar);const label=document.createElement("small");label.textContent=i;column.append(label);$("chart").append(column);});$("reason").textContent=s.reason;$("phase").textContent=s.phase;$("counter").textContent=`Step ${position+1} / ${steps.length}`;$("stats").textContent=`Comparisons: ${s.comparisons} · ${algorithm==="bubble"?"Swaps":"Shifts"}: ${s.moves}`;$("key").textContent=s.key===null?"":`Saved key: ${s.key}`;$("scrub").value=position;$("previous").disabled=position===0;$("next").disabled=position===steps.length-1;}
function load(){pause();const raw=$("values").value.trim().split(/[,\s]+/);const a=raw.map(Number);if(a.length<2||a.length>14||a.some(x=>!Number.isInteger(x)||x<1||x>99)){ $("error").textContent="Enter 2–14 whole numbers from 1 to 99, separated by commas or spaces.";return;}$("error").textContent="";steps=makeSteps(a,algorithm);position=0;$("scrub").max=steps.length-1;render();}
function tick(){if(position>=steps.length-1){pause();return;}position++;render();timer=setTimeout(tick,Number($("speed").value));}
$("play").onclick=()=>{if(timer){pause();return;}if(position===steps.length-1)position=0;$("play").textContent="⏸ Pause";render();timer=setTimeout(tick,Number($("speed").value));};
$("next").onclick=()=>{pause();position=Math.min(position+1,steps.length-1);render();};$("previous").onclick=()=>{pause();position=Math.max(0,position-1);render();};$("reset").onclick=()=>{pause();position=0;render();};$("load").onclick=load;$("scrub").oninput=()=>{pause();position=Number($("scrub").value);render();};$("values").onkeydown=e=>{if(e.key==="Enter")load();};load();
