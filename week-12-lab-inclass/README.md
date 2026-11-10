# Week 12 in-class lab: merge sort and quicksort

Open `animation/index.html` directly in a browser; no installation, server, or internet connection is required.

## Standalone Java

The commented programs in `java/` include Javadoc and teaching comments. The animation displays the same statements with comments hidden; line numbers refer to the documented file. With JDK 11 or later:

```sh
cd java
javac -Xlint:all *.java
java Slide09_MergeSort
java Slide16_QuickSort
```

## Demonstration

1. Open Merge sort. Step through the recursive split down to singleton base cases.
2. Continue to Compare and Merge: the smaller front value enters the buffer; ties choose the left half. Watch the remaining values drain, then each buffer value copy back. The parent merges only after both child calls return.
3. Open Quicksort. Watch the first-element pivot, scan comparisons, swaps into the smaller region, and pivot placement. The two recursive calls exclude the pivot; they return without merging.
4. Try duplicates (`4,2,4,1,2`), sorted data (`1,2,3,4,5`), and reverse order. Sorted input exposes the unbalanced first-pivot recursion.

Use Previous/Next, Play/Pause, speed, reset, or the timeline. Yellow Java lines correspond to the current visual operation; helper assignments may be grouped in one step. This is a source-level teaching animation, not a Java debugger. The buffer display shows the current merge's output prefix; the Java implementation reuses one full-size temporary array.

Merge sort takes O(n log n) time and O(n) array storage. This quicksort uses O(n log n) average time, O(n²) worst-case time, and recursion stack space up to O(n). Animation snapshots and teaching output are excluded from these costs.

## Verification

Run `python3 verification/java.py` to compile and verify the demos against expected output and randomized sorting cases. Run `node verification/traces.cjs` to check animation traces. `verification/browser.cjs` checks the offline browser UI using Playwright and installed Google Chrome.

Use the Left and Right arrow keys for previous and next steps when focus is outside an input control. The Random array button loads new values from 0 to 99 and keeps the current valid array length (otherwise eight values).
