# Lecture 27 — merge sort and quicksort

Seven browser animations use the existing exercise UI with expression boxes, call-flow arrows that scroll with the code, Previous/Next/Play, independent call frames, live arrays, console output, operation counters, and a dedicated analysis block. Open index.html locally or follow a published link.

The lecture-input merge and quicksort traces use the exact supplied Java sources. Additional traces change only the input: duplicate keys for merge stability, sorted input for first-pivot quicksort's worst-case split, and the same seven-element input from the comparison driver for both algorithms. The pivot-strategy trace uses the exact seeded Java driver. Random-library internals and formatting are single source-level operations; no bytecode or made-up timing is shown.

Every recursive entry/base case/return, loop initialization/guard/update, short-circuit guard, key comparison, swap assignment, buffer write and copy-back is traced. For temp[k++] = values[i++] (or j++), the target index is saved and k increments before evaluating the source index, its increment, array read, and assignment. Evaluation cards are explanatory saved expression values, not invented Java locals. A single statement may therefore span several steps on the same source line.

Counters distinguish key comparisons, A writes, T writes, swap calls (including self-swaps), completed merges/partitions, recursive range calls, and peak active recursive range depth. Wrapper and merge/partition/swap helper frames remain visible but are excluded from the recursive depth metric. Costs describe the sorting core, excluding teaching prints, formatting, verification, and visualization storage. The buffer visualization is a retained view of the one allocation; cells outside the active range may be stale, and after the wrapper returns no active Java local refers to T.

Merge takes the left value first on ties. Quicksort partitions into < pivot and >= pivot regions, with inclusive endpoints and pivot excluded from both recursive calls. Sorted-input quicksort demonstrates the 0 versus n−1 split. The pivot driver selects a random index but does not sort or guarantee a balanced partition. Median-of-three remains a conceptual strategy discussed in the slides, not an implementation claimed by this driver.

- [merge-sort](https://aisec-lab.github.io/java-examples/lecture-27-efficient-sorting/#merge-sort)
- [merge-sort-duplicates](https://aisec-lab.github.io/java-examples/lecture-27-efficient-sorting/#merge-sort-duplicates)
- [merge-sort-comparison](https://aisec-lab.github.io/java-examples/lecture-27-efficient-sorting/#merge-sort-comparison)
- [quick-sort](https://aisec-lab.github.io/java-examples/lecture-27-efficient-sorting/#quick-sort)
- [quick-sort-sorted](https://aisec-lab.github.io/java-examples/lecture-27-efficient-sorting/#quick-sort-sorted)
- [quick-sort-comparison](https://aisec-lab.github.io/java-examples/lecture-27-efficient-sorting/#quick-sort-comparison)
- [pivot-strategies](https://aisec-lab.github.io/java-examples/lecture-27-efficient-sorting/#pivot-strategies)
