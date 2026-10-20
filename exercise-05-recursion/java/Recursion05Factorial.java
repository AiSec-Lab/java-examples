public class Recursion05Factorial {
    static long factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n cannot be negative");
        }
        if (n == 0) {
            return 1;
        }
        long rest = factorial(n - 1);
        long result = n * rest;
        return result;
    }
    public static void main(String[] args) {
        long result = factorial(4);
        System.out.println(result);
    }
}
