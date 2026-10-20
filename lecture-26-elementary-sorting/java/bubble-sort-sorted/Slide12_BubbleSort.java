import java.util.Arrays;
/** Runs optimized bubble sort and displays the array after every pass. */
public class Slide12_BubbleSort {
    public static void bubbleSort(int[] values) {
        for (int pass = 0; pass < values.length - 1; pass++) {
            boolean swapped = false;
            for (int index = 0; index < values.length - 1 - pass; index++) {
                if (values[index] > values[index + 1]) {
                    ArrayTools.swap(values, index, index + 1);
                    swapped = true;
                }
            }
            ArrayTools.show("after pass " + (pass + 1) + ": ", values);
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] values = {1, 2, 3, 4, 5};
        ArrayTools.show("before: ", values);
        bubbleSort(values);
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
