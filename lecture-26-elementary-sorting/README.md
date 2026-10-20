# Lecture 26: elementary sorting animations

Open index.html locally, or use the published links below. Each trace includes loop initialization, successful and failed guards, increments, helper calls and returns, each swap assignment, insertion short-circuit checks and shifts, output, and isSorted verification. Java standard-library internals are treated as single source-level operations.

The three lecture-input traces use the supplied lecture Java, with ArrayTools appended as a package-private class so each example compiles independently. Sorted-input traces change only the input. The bubble trace is the adaptive version from slide 13 and the existing IDE example; slide 12 omits the early-exit optimization. Its unoptimized version always completes all n−1 passes. All six runnable sources and exact expected console outputs are included in trace-data.json.

The analysis block explains invariants, stability, time/space costs, and temporary duplicate values during shifts. Counters exclude library work and loop guards; verification comparisons are separate. Selection counts self-swaps because the supplied code executes them. Array writes include both assignments in every swap and insertion writes even when the value is unchanged. Completing a pass is recorded when its data work is complete, before output/loop housekeeping.

Already-sorted inputs are identical across all three sorts, allowing a fair comparison of work. The original randomized 5,000-element timing example remains in the lecture code ZIP; animations do not invent timing results.

- [bubble-sort](https://aisec-lab.github.io/java-examples/lecture-26-elementary-sorting/#bubble-sort)
- [bubble-sort-sorted](https://aisec-lab.github.io/java-examples/lecture-26-elementary-sorting/#bubble-sort-sorted)
- [selection-sort](https://aisec-lab.github.io/java-examples/lecture-26-elementary-sorting/#selection-sort)
- [selection-sort-sorted](https://aisec-lab.github.io/java-examples/lecture-26-elementary-sorting/#selection-sort-sorted)
- [insertion-sort](https://aisec-lab.github.io/java-examples/lecture-26-elementary-sorting/#insertion-sort)
- [insertion-sort-sorted](https://aisec-lab.github.io/java-examples/lecture-26-elementary-sorting/#insertion-sort-sorted)
