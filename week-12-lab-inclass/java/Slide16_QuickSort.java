import java.util.Arrays;

/** Quicksort using the first value as pivot, with partition tracing. */
public class Slide16_QuickSort {
    /**
     * Sorts the array in ascending order using a first-element pivot.
     * Runs in O(n log n) average time and O(n squared) worst-case time.
     * Partitioning uses constant extra space; the recursion stack uses
     * O(log n) space on average and O(n) in the worst case. This sort is unstable.
     *
     * @param values the non-null array to sort in place
     */
    public static void quickSort(int[] values) {
        quickSort(values, 0, values.length - 1);
    }

    /**
     * Partitions an inclusive range, then recursively sorts around the pivot.
     * The pivot is excluded from both recursive calls. No merge is needed.
     *
     * @param values the array being sorted
     * @param low the first index of this range (inclusive)
     * @param high the last index of this range (inclusive)
     */
    private static void quickSort(int[] values, int low, int high) {
        // Inclusive range [low, high]: empty or single-value ranges stop.
        if (low >= high) return;
        // Partition places the pivot in its final sorted position.
        int pivotIndex = partition(values, low, high);
        System.out.printf("pivot %d at %d: %s%n",
                values[pivotIndex], pivotIndex, Arrays.toString(values));
        // Exclude the pivot so both recursive ranges are strictly smaller.
        quickSort(values, low, pivotIndex - 1);
        quickSort(values, pivotIndex + 1, high);
        // No merge is needed: both sorted ranges already surround the pivot.
        return;
    }

    /**
     * Places the first-element pivot in its final sorted position.
     * Values before it are smaller; values after it are greater than or equal.
     *
     * @param values the array to partition
     * @param low the first index, initially holding the pivot
     * @param high the last index of the range (inclusive)
     * @return the final index of the pivot
     */
    private static int partition(int[] values, int low, int high) {
        // Match slide 17: use the FIRST value as pivot.
        int pivot = values[low];
        // Values in [low+1, boundary-1] are smaller than the pivot.
        int boundary = low + 1;
        for (int scan = low + 1; scan <= high; scan++) {
            // Add each smaller value to the left region; ties stay on the right.
            if (values[scan] < pivot) {
                swap(values, boundary, scan);
                boundary++;
            }
        }
        // Move the pivot between the smaller and larger-or-equal regions.
        swap(values, low, boundary - 1);
        return boundary - 1;
    }

    /**
     * Exchanges two array positions; swapping a position with itself is valid.
     *
     * @param values the array to modify
     * @param first the first index
     * @param second the second index
     */
    private static void swap(int[] values, int first, int second) {
        int temp = values[first];
        values[first] = values[second];
        values[second] = temp;
    }

    /**
     * Demonstrates sorting with console output for classroom tracing.
     *
     * @param args command-line arguments (unused)
     */
    public static void main(String[] args) {
        int[] values = {8, 3, 1, 7, 0, 10, 2, 5};
        System.out.println("before: " + Arrays.toString(values));
        quickSort(values);
        System.out.println("after:  " + Arrays.toString(values));
    }
}
