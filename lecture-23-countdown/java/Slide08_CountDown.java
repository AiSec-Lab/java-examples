/** Lecture 23, slide 6: trace a base case and recursive progress. */
public class Slide08_CountDown {
    public static void countDown(int value) {
        if (value <= 0) {
            System.out.println("Go!");
            return;
        }
        System.out.println(value);

        // Correct: the next call moves toward the base case.
        countDown(value - 1);
    }

    public static void main(String[] args) {
        countDown(3);
    }
}
