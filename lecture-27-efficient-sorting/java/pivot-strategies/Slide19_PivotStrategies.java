import java.util.Arrays;
import java.util.Random;

/** Shows first-value and random pivot selection on the same data. */
public class Slide19_PivotStrategies {
    public static void main(String[] args) {
        int[] values = {1, 2, 3, 4, 5, 6, 7};
        int firstPivot = values[0];
        Random random = new Random(151);
        int randomIndex = random.nextInt(values.length);
        int randomPivot = values[randomIndex];

        System.out.println("data: " + Arrays.toString(values));
        System.out.println("first pivot: " + firstPivot);
        System.out.println("random pivot: " + randomPivot
                + " at index " + randomIndex);
    }
}
