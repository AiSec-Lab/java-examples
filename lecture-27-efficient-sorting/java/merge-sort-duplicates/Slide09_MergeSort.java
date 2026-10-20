import java.util.Arrays;

/** Merge sort with output after every merge. */
public class Slide09_MergeSort {
    public static void mergeSort(int[] values) {
        int[] temp = new int[values.length];
        mergeSort(values, temp, 0, values.length - 1);
    }

    private static void mergeSort(int[] values, int[] temp, int left, int right) {
        if (left >= right) return;
        int middle = left + (right - left) / 2;
        mergeSort(values, temp, left, middle);
        mergeSort(values, temp, middle + 1, right);
        merge(values, temp, left, middle, right);
        System.out.printf("merged [%d..%d]: %s%n", left, right,
                Arrays.toString(Arrays.copyOfRange(values, left, right + 1)));
    }

    private static void merge(int[] values, int[] temp,
            int left, int middle, int right) {
        int i = left, j = middle + 1, k = left;
        while (i <= middle && j <= right) {
            if (values[i] <= values[j]) temp[k++] = values[i++];
            else temp[k++] = values[j++];
        }
        while (i <= middle) temp[k++] = values[i++];
        while (j <= right) temp[k++] = values[j++];
        for (k = left; k <= right; k++) values[k] = temp[k];
    }

    public static void main(String[] args) {
        int[] values = {4, 2, 4, 1, 2};
        System.out.println("before: " + Arrays.toString(values));
        mergeSort(values);
        System.out.println("after:  " + Arrays.toString(values));
    }
}
