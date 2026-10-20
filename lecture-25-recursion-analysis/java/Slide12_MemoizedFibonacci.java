import java.util.Arrays;

/** Uses memoization so that each Fibonacci subproblem is solved once. */
public class Slide12_MemoizedFibonacci {
    public static long fib(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be nonnegative");
        }
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1);
        return fib(n, memo);
    }

    private static long fib(int n, long[] memo) {
        if (memo[n] != -1) {
            System.out.println("cache hit for " + n);
            return memo[n];
        }
        System.out.println("computing fib(" + n + ")");
        if (n <= 1) {
            memo[n] = n;
        } else {
            memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
        }
        return memo[n];
    }

    public static void main(String[] args) {
        System.out.println("fib(10) = " + fib(10));
    }
}
