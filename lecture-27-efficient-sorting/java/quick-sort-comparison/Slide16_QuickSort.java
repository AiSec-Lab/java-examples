import java.util.Arrays;

/** Quicksort using the first value as pivot, with partition tracing. */
public class Slide16_QuickSort {
    public static void quickSort(int[] values) {
        quickSort(values, 0, values.length - 1);
    }

    private static void quickSort(int[] values, int low, int high) {
        if (low >= high) return;
        int pivotIndex = partition(values, low, high);
        System.out.printf("pivot %d at %d: %s%n",
                values[pivotIndex], pivotIndex, Arrays.toString(values));
        quickSort(values, low, pivotIndex - 1);
        quickSort(values, pivotIndex + 1, high);
    }

    private static int partition(int[] values, int low, int high) {
        int pivot = values[low];
        int boundary = low + 1;
        for (int scan = low + 1; scan <= high; scan++) {
            if (values[scan] < pivot) {
                swap(values, boundary, scan);
                boundary++;
            }
        }
        swap(values, low, boundary - 1);
        return boundary - 1;
    }

    private static void swap(int[] values, int first, int second) {
        int temp = values[first];
        values[first] = values[second];
        values[second] = temp;
    }

    public static void main(String[] args) {
        int[] values = {12, 4, 9, 4, 1, 18, 7};
        System.out.println("before: " + Arrays.toString(values));
        quickSort(values);
        System.out.println("after:  " + Arrays.toString(values));
    }
}
