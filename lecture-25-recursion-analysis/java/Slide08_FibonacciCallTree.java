/** Prints the branching calls made by naive Fibonacci. */
public class Slide08_FibonacciCallTree {
    public static long fib(int n, int depth) {
        System.out.println("  ".repeat(depth) + "fib(" + n + ")");
        if (n <= 1) {
            return n;
        }
        return fib(n - 1, depth + 1) + fib(n - 2, depth + 1);
    }

    public static void main(String[] args) {
        System.out.println("result = " + fib(5, 0));
    }
}
