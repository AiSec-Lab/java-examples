/** Contrasts head recursion with accumulator-style tail recursion. */
public class Slide17_HeadAndTailSum {
    public static int headSum(int n) {
        if (n == 0) return 0;
        int result = headSum(n - 1) + n;
        System.out.println("head returns " + result + " for n=" + n);
        return result;
    }

    public static int tailSum(int n, int total) {
        System.out.println("tail n=" + n + ", total=" + total);
        if (n == 0) return total;
        return tailSum(n - 1, total + n);
    }

    public static void main(String[] args) {
        System.out.println("head result = " + headSum(5));
        System.out.println("tail result = " + tailSum(5, 0));
    }
}
