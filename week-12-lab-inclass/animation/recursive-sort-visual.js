
const JAVA_SOURCES={"merge": "import java.util.Arrays;\n\n/** Merge sort with output after every merge. */\npublic class Slide09_MergeSort {\n    /**\n     * Sorts the array in ascending order using one reusable merge buffer.\n     * Equal values are taken from the left half first, making the sort stable.\n     * Runs in O(n log n) time with O(n) buffer space and O(log n) stack space.\n     *\n     * @param values the non-null array to sort in place\n     */\n    public static void mergeSort(int[] values) {\n        // Allocate one shared buffer; recursive calls reuse it.\n        int[] temp = new int[values.length];\n        mergeSort(values, temp, 0, values.length - 1);\n    }\n\n    /**\n     * Recursively sorts both halves of an inclusive range, then merges them.\n     * Empty and singleton ranges return immediately.\n     *\n     * @param values the array being sorted\n     * @param temp the shared buffer, with the same length as values\n     * @param left the first index of this range (inclusive)\n     * @param right the last index of this range (inclusive)\n     */\n    private static void mergeSort(int[] values, int[] temp, int left, int right) {\n        // Inclusive range [left, right]: zero or one value is already sorted.\n        if (left >= right) return;\n        int middle = left + (right - left) / 2;\n        // Each recursive call sorts a smaller half before we merge them.\n        mergeSort(values, temp, left, middle);\n        mergeSort(values, temp, middle + 1, right);\n        // Both halves are now sorted, so their front values can be compared.\n        merge(values, temp, left, middle, right);\n        // Teaching trace: report the completed range as recursion unwinds.\n        System.out.printf(\"merged [%d..%d]: %s%n\", left, right,\n                Arrays.toString(Arrays.copyOfRange(values, left, right + 1)));\n    }\n\n    /**\n     * Merges two adjacent sorted ranges into the buffer and copies them back.\n     * The ranges are [left, middle] and [middle + 1, right].\n     *\n     * @param values the array containing the two sorted halves\n     * @param temp the shared destination buffer\n     * @param left the first index of the left half\n     * @param middle the last index of the left half\n     * @param right the last index of the right half\n     */\n    private static void merge(int[] values, int[] temp,\n            int left, int middle, int right) {\n        // i and j read the sorted halves; k writes into the shared buffer.\n        int i = left, j = middle + 1, k = left;\n        while (i <= middle && j <= right) {\n            // Choose the left value on ties to preserve equal-key order.\n            if (values[i] <= values[j]) temp[k++] = values[i++];\n            else temp[k++] = values[j++];\n        }\n        // One side is exhausted; copy every value left on the other side.\n        while (i <= middle) temp[k++] = values[i++];\n        while (j <= right) temp[k++] = values[j++];\n        // Restore this sorted range to the original array for its parent call.\n        for (k = left; k <= right; k++) values[k] = temp[k];\n    }\n\n    /**\n     * Demonstrates sorting with console output for classroom tracing.\n     *\n     * @param args command-line arguments (unused)\n     */\n    public static void main(String[] args) {\n        int[] values = {8, 3, 1, 7, 0, 10, 2, 5};\n        System.out.println(\"before: \" + Arrays.toString(values));\n        mergeSort(values);\n        System.out.println(\"after:  \" + Arrays.toString(values));\n    }\n}\n", "quick": "import java.util.Arrays;\n\n/** Quicksort using the first value as pivot, with partition tracing. */\npublic class Slide16_QuickSort {\n    /**\n     * Sorts the array in ascending order using a first-element pivot.\n     * Runs in O(n log n) average time and O(n squared) worst-case time.\n     * Partitioning uses constant extra space; the recursion stack uses\n     * O(log n) space on average and O(n) in the worst case. This sort is unstable.\n     *\n     * @param values the non-null array to sort in place\n     */\n    public static void quickSort(int[] values) {\n        quickSort(values, 0, values.length - 1);\n    }\n\n    /**\n     * Partitions an inclusive range, then recursively sorts around the pivot.\n     * The pivot is excluded from both recursive calls. No merge is needed.\n     *\n     * @param values the array being sorted\n     * @param low the first index of this range (inclusive)\n     * @param high the last index of this range (inclusive)\n     */\n    private static void quickSort(int[] values, int low, int high) {\n        // Inclusive range [low, high]: empty or single-value ranges stop.\n        if (low >= high) return;\n        // Partition places the pivot in its final sorted position.\n        int pivotIndex = partition(values, low, high);\n        System.out.printf(\"pivot %d at %d: %s%n\",\n                values[pivotIndex], pivotIndex, Arrays.toString(values));\n        // Exclude the pivot so both recursive ranges are strictly smaller.\n        quickSort(values, low, pivotIndex - 1);\n        quickSort(values, pivotIndex + 1, high);\n        // No merge is needed: both sorted ranges already surround the pivot.\n        return;\n    }\n\n    /**\n     * Places the first-element pivot in its final sorted position.\n     * Values before it are smaller; values after it are greater than or equal.\n     *\n     * @param values the array to partition\n     * @param low the first index, initially holding the pivot\n     * @param high the last index of the range (inclusive)\n     * @return the final index of the pivot\n     */\n    private static int partition(int[] values, int low, int high) {\n        // Match slide 17: use the FIRST value as pivot.\n        int pivot = values[low];\n        // Values in [low+1, boundary-1] are smaller than the pivot.\n        int boundary = low + 1;\n        for (int scan = low + 1; scan <= high; scan++) {\n            // Add each smaller value to the left region; ties stay on the right.\n            if (values[scan] < pivot) {\n                swap(values, boundary, scan);\n                boundary++;\n            }\n        }\n        // Move the pivot between the smaller and larger-or-equal regions.\n        swap(values, low, boundary - 1);\n        return boundary - 1;\n    }\n\n    /**\n     * Exchanges two array positions; swapping a position with itself is valid.\n     *\n     * @param values the array to modify\n     * @param first the first index\n     * @param second the second index\n     */\n    private static void swap(int[] values, int first, int second) {\n        int temp = values[first];\n        values[first] = values[second];\n        values[second] = temp;\n    }\n\n    /**\n     * Demonstrates sorting with console output for classroom tracing.\n     *\n     * @param args command-line arguments (unused)\n     */\n    public static void main(String[] args) {\n        int[] values = {8, 3, 1, 7, 0, 10, 2, 5};\n        System.out.println(\"before: \" + Arrays.toString(values));\n        quickSort(values);\n        System.out.println(\"after:  \" + Arrays.toString(values));\n    }\n}\n"};
const LINE_MAP={"merge": {"Call": "private static void mergeSort(", "Base case": "if (left >= right)", "Split": "int middle =", "Left returned": "mergeSort(values, temp, middle + 1, right);", "Combine": "int i = left", "Compare": "if (values[i] <= values[j])", "Merge": "if (values[i] <= values[j])", "Remaining left": "while (i <= middle) temp", "Remaining right": "while (j <= right) temp", "Copy back": "for (k = left;", "Return": "merge(values, temp, left, middle, right);", "Finished": "mergeSort(values);"}, "quick": {"Call": "private static void quickSort(", "Base case": "if (low >= high)", "Choose pivot": "int pivot = values[low];", "Compare": "if (values[scan] < pivot)", "Partition swap": "swap(values, boundary, scan);", "Keep right": "if (values[scan] < pivot)", "Place pivot": "swap(values, low, boundary - 1);", "Left returned": "quickSort(values, pivotIndex + 1, high);", "Return": "return;", "Finished": "quickSort(values);"}};
const EXTRA_LINES={"quick": {"Choose pivot": ["int boundary ="], "Partition swap": ["boundary++;", "int temp = values[first];", "values[first] = values[second];", "values[second] = temp;"], "Place pivot": ["return boundary - 1;", "int temp = values[first];", "values[first] = values[second];", "values[second] = temp;"]}, "merge": {"Split": ["mergeSort(values, temp, left, middle);"], "Merge": ["else temp[k++]"]}};
function renderCode(step,kind){
 const pane=document.getElementById('java-code');if(!pane)return;
 if(!pane.children.length){
  let inComment=false;
  JAVA_SOURCES[kind].split('\n').forEach((line,i)=>{
   const trimmed=line.trim();
   if(inComment){if(trimmed.includes('*/'))inComment=false;return;}
   if(trimmed.startsWith('/*')){inComment=!trimmed.includes('*/');return;}
   if(!trimmed||trimmed.startsWith('//'))return;
   const el=document.createElement('div');el.className='code-line';el.dataset.number=i+1;el.textContent=line;pane.append(el);
  });
 }
 let needles=[LINE_MAP[kind][step.phase],...(EXTRA_LINES[kind][step.phase]||[])].filter(Boolean);
 if(kind==='merge'&&step.phase==='Merge')needles=[step.reason.includes('from the left')?'if (values[i] <= values[j])':'else temp[k++]'];
 let first=null;Array.from(pane.children).forEach(el=>{const active=needles.some(n=>n==='return;'?el.textContent.trim()==='return;':el.textContent.includes(n));el.classList.toggle('executing',active);if(active&&!first)first=el;});
 if(first)pane.scrollTop=Math.max(0,first.offsetTop-pane.offsetTop-pane.clientHeight/3);
}

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
   for(let k=lo;k<=hi;k++){a[k]=buffer[k-lo];emit('Copy back',`Copy buffer value ${buffer[k-lo]} into array index ${k}.`,[k],buffer);}
   nodes[id].values=[...buffer];nodes[id].state='sorted';
   emit('Return',`The merged result [${buffer}] has been copied back to indices ${lo}–${hi}. Return to the parent call.`,[],buffer);
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
if(typeof module!=='undefined')module.exports={buildTrace,JAVA_SOURCES};
if(typeof document!=='undefined'){
 const $=id=>document.getElementById(id),kind=document.body.dataset.algorithm;let steps=[],position=0,timer=null;
 const box=(text,cls='')=>{const el=document.createElement('span');el.className='value '+cls;el.textContent=text;return el;};
 function pause(){clearTimeout(timer);timer=null;$('play').textContent='▶ Play';}
 function render(){
  renderCode(steps[position],kind);
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
 function load(){pause();const raw=$('values').value.trim();if(!raw){$('error').textContent='Enter 2–10 whole numbers from 0 to 99.';return;}const a=raw.split(/[,\s]+/).map(Number);if(a.length<2||a.length>10||a.some(v=>!Number.isInteger(v)||v<0||v>99)){$('error').textContent='Enter 2–10 whole numbers from 0 to 99.';return;}$('error').textContent='';steps=buildTrace(a,kind);position=0;$('scrub').max=steps.length-1;render();}
 function tick(){if(position===steps.length-1){pause();return;}position++;render();timer=setTimeout(tick,Number($('speed').value));}
 $('play').onclick=()=>{if(timer){pause();return;}if(position===steps.length-1)position=0;render();$('play').textContent='⏸ Pause';timer=setTimeout(tick,Number($('speed').value));};
 $('previous').onclick=()=>{pause();position=Math.max(0,position-1);render();};$('next').onclick=()=>{pause();position=Math.min(steps.length-1,position+1);render();};$('reset').onclick=()=>{pause();position=0;render();};$('scrub').oninput=()=>{pause();position=Number($('scrub').value);render();};$('random').onclick=()=>{
  const count=$('values').value.trim().split(/[,\s]+/).length;
  const length=count>=2&&count<=10?count:8;
  $('values').value=Array.from({length},()=>Math.floor(Math.random()*100)).join(',');
  load();
 };
 document.addEventListener('keydown',e=>{
  if(e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;
  if(e.target.closest('input, textarea, select, [contenteditable]'))return;
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
   e.preventDefault();$(''+(e.key==='ArrowLeft'?'previous':'next')).click();
  }
 });
 $('load').onclick=load;$('values').onkeydown=e=>{if(e.key==='Enter')load();};load();
}
