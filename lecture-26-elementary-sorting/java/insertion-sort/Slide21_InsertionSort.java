import java.util.Arrays;
/** Runs insertion sort and displays the array after every insertion. */
public class Slide21_InsertionSort {
    public static void insertionSort(int[] values) {
        for (int index = 1; index < values.length; index++) {
            int current = values[index];
            int position = index;
            while (position > 0 && values[position - 1] > current) {
                values[position] = values[position - 1];
                position--;
            }
            values[position] = current;
            ArrayTools.show("insert " + current + ": ", values);
        }
    }

    public static void main(String[] args) {
        int[] values = {6, 2, 4, 1, 5};
        ArrayTools.show("before: ", values);
        insertionSort(values);
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
