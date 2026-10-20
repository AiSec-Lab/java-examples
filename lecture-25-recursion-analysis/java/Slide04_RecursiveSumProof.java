import java.util.Arrays;

/** Demonstrates the base case, progress, and combination for recursive sum. */
public class Slide04_RecursiveSumProof {
    public static int sum(int[] values) {
        return sum(values, 0);
    }

    private static int sum(int[] values, int index) {
        if (index == values.length) {
            System.out.println("base: empty suffix -> 0");
            return 0;
        }
        int suffixSum = sum(values, index + 1);
        int result = values[index] + suffixSum;
        System.out.printf("index %d: %d + %d = %d%n",
                index, values[index], suffixSum, result);
        return result;
    }

    public static void main(String[] args) {
        int[] values = {4, 7, 2, 5};
        System.out.println(Arrays.toString(values));
        System.out.println("sum = " + sum(values));
    }
}
