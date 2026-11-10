import java.util.Arrays;

/** Merge sort with output after every merge. */
public class Slide09_MergeSort {
    /**
     * Sorts the array in ascending order using one reusable merge buffer.
     * Equal values are taken from the left half first, making the sort stable.
     * Runs in O(n log n) time with O(n) buffer space and O(log n) stack space.
     *
     * @param values the non-null array to sort in place
     */
    public static void mergeSort(int[] values) {
        // Allocate one shared buffer; recursive calls reuse it.
        int[] temp = new int[values.length];
        mergeSort(values, temp, 0, values.length - 1);
    }

    /**
     * Recursively sorts both halves of an inclusive range, then merges them.
     * Empty and singleton ranges return immediately.
     *
     * @param values the array being sorted
     * @param temp the shared buffer, with the same length as values
     * @param left the first index of this range (inclusive)
     * @param right the last index of this range (inclusive)
     */
    private static void mergeSort(int[] values, int[] temp, int left, int right) {
        // Inclusive range [left, right]: zero or one value is already sorted.
        if (left >= right) return;
        int middle = left + (right - left) / 2;
        // Each recursive call sorts a smaller half before we merge them.
        mergeSort(values, temp, left, middle);
        mergeSort(values, temp, middle + 1, right);
        // Both halves are now sorted, so their front values can be compared.
        merge(values, temp, left, middle, right);
        // Teaching trace: report the completed range as recursion unwinds.
        System.out.printf("merged [%d..%d]: %s%n", left, right,
                Arrays.toString(Arrays.copyOfRange(values, left, right + 1)));
    }

    /**
     * Merges two adjacent sorted ranges into the buffer and copies them back.
     * The ranges are [left, middle] and [middle + 1, right].
     *
     * @param values the array containing the two sorted halves
     * @param temp the shared destination buffer
     * @param left the first index of the left half
     * @param middle the last index of the left half
     * @param right the last index of the right half
     */
    private static void merge(int[] values, int[] temp,
            int left, int middle, int right) {
        // i and j read the sorted halves; k writes into the shared buffer.
        int i = left, j = middle + 1, k = left;
        while (i <= middle && j <= right) {
            // Choose the left value on ties to preserve equal-key order.
            if (values[i] <= values[j]) temp[k++] = values[i++];
            else temp[k++] = values[j++];
        }
        // One side is exhausted; copy every value left on the other side.
        while (i <= middle) temp[k++] = values[i++];
        while (j <= right) temp[k++] = values[j++];
        // Restore this sorted range to the original array for its parent call.
        for (k = left; k <= right; k++) values[k] = temp[k];
    }

    /**
     * Demonstrates sorting with console output for classroom tracing.
     *
     * @param args command-line arguments (unused)
     */
    public static void main(String[] args) {
        int[] values = {8, 3, 1, 7, 0, 10, 2, 5};
        System.out.println("before: " + Arrays.toString(values));
        mergeSort(values);
        System.out.println("after:  " + Arrays.toString(values));
    }
}
