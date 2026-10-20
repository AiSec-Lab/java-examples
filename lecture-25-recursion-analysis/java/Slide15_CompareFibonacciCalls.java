import java.util.Arrays;

/** Compares call counts for naive and memoized Fibonacci. */
public class Slide15_CompareFibonacciCalls {
    private static long naiveCalls;
    private static long memoCalls;

    public static long naiveFib(int n) {
        naiveCalls++;
        if (n <= 1) return n;
        return naiveFib(n - 1) + naiveFib(n - 2);
    }

    public static long memoFib(int n) {
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1);
        return memoFib(n, memo);
    }

    private static long memoFib(int n, long[] memo) {
        memoCalls++;
        if (memo[n] != -1) return memo[n];
        if (n <= 1) memo[n] = n;
        else memo[n] = memoFib(n - 1, memo) + memoFib(n - 2, memo);
        return memo[n];
    }

    public static void main(String[] args) {
        int n = 5; // Small input: every call is animated.
        long first = naiveFib(n);
        long second = memoFib(n);
        System.out.println("naive: " + first + ", calls=" + naiveCalls);
        System.out.println("memoized: " + second + ", calls=" + memoCalls);
    }
}
