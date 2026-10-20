# Lecture 25: Recursion Analysis Animations

Six complete, small-input Java execution traces in the same UI as Exercises 2–5. Source highlighting includes an expression box and scroll-attached flow arrows. Previous restores the execution snapshot rather than reversing the arrow. Play, pause, speed, direct links, and the step slider are available.

## Problems and links

- [recursive-sum](https://aisec-lab.github.io/java-examples/lecture-25-recursion-analysis/#recursive-sum) — Lecture 25 slides 4, 5, 7.
- [naive-fibonacci](https://aisec-lab.github.io/java-examples/lecture-25-recursion-analysis/#naive-fibonacci) — Lecture 25 slides 8, 9, 10.
- [memoized-fibonacci](https://aisec-lab.github.io/java-examples/lecture-25-recursion-analysis/#memoized-fibonacci) — Lecture 25 slides 11, 12, 13.
- [compare-calls](https://aisec-lab.github.io/java-examples/lecture-25-recursion-analysis/#compare-calls) — Lecture 25 slides 15.
- [head-tail-sum](https://aisec-lab.github.io/java-examples/lecture-25-recursion-analysis/#head-tail-sum) — Lecture 25 slides 16, 17.
- [backtracking](https://aisec-lab.github.io/java-examples/lecture-25-recursion-analysis/#backtracking) — Lecture 25 slides 18, 19.

## What the analysis means

- Total recursive calls count recursive/helper invocations, including base cases and cache hits. main and public setup wrappers are displayed but excluded from this counter.
- Active recursive frames and peak recursive frames measure stack depth, not total work. Java retains tail-call frames in these traces; tail-call elimination is not assumed.
- Repeated inputs count later invocations with the same algorithm/input, whether they recompute work or return a cached result. Cache hits are tracked separately. Expand call history to see individual calls and returned results.
- Memo frames share one array. A read highlights that actual array card; a write changes its contents. Zero is a valid answer; -1 is the unknown-entry sentinel.
- Pending expression values are explanatory evaluation temporaries, not invented source variables. Java evaluates the left Fibonacci call before the right call. The left answer is preserved while the right subtree runs.
- The program sources match the runnable lecture files exactly, except the call-count comparison uses n=5 to show every call (15 naive versus 9 memoized). The original lecture ZIP retains n=30: both results 832040, with 2692537 naive versus 59 memoized helper calls. Millions of calls are not silently skipped or summarized as if fully animated.
- These are source-level execution traces. Standard library internals (println, printf, Arrays.fill, string formatting) are treated as source operations, rather than tracing JDK implementations. Complexity discussion concerns the recursive algorithm, excluding visualization/logging overhead.

## Verification

All six console outputs are compared byte-for-byte with Java 21. Counters, peak depth, cache-hit counts, final memo contents, and the backtracking traversal are checked independently. All 897 timeline steps are browser-checked for the correct expression focus, call stack, object/frame state, metrics, and history. Navigation, playback, and scrolling arrows are checked as well.

Positive inputs shown here follow the lecture examples; branches not taken (such as negative-input validation in the memo wrapper) are not invented as execution steps. Backtracking explores +3 before doubling, returns to the original parent state on failure, and stops exploring alternatives after success.
