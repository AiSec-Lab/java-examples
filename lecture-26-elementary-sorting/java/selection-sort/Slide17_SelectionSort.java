import java.util.Arrays;
/** Runs selection sort and displays the array after every pass. */
public class Slide17_SelectionSort {
    public static void selectionSort(int[] values) {
        for (int start = 0; start < values.length - 1; start++) {
            int minIndex = start;
            for (int scan = start + 1; scan < values.length; scan++) {
                if (values[scan] < values[minIndex]) minIndex = scan;
            }
            ArrayTools.swap(values, start, minIndex);
            ArrayTools.show("after pass " + (start + 1) + ": ", values);
        }
    }

    public static void main(String[] args) {
        int[] values = {6, 2, 9, 1, 5};
        ArrayTools.show("before: ", values);
        selectionSort(values);
        System.out.println("sorted? " + ArrayTools.isSorted(values));
    }
}



/** Shared array operations for the lecture's sorting examples. */
class ArrayTools {
    public static void swap(int[] values, int first, int second) {
        int temp = values[first];
        values[first] = values[second];
        values[second] = temp;
    }

    public static boolean isSorted(int[] values) {
        for (int index = 1; index < values.length; index++) {
            if (values[index - 1] > values[index]) return false;
        }
        return true;
    }

    public static void show(String label, int[] values) {
        System.out.println(label + Arrays.toString(values));
    }
}
