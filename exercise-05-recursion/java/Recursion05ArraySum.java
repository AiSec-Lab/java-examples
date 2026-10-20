public class Recursion05ArraySum {
    static int sum(int[] values, int index) {
        if (index == values.length) {
            return 0;
        }
        int rest = sum(values, index + 1);
        int result = values[index] + rest;
        return result;
    }
    public static void main(String[] args) {
        int[] values = {4, 7, 2, 5};
        int result = sum(values, 0);
        System.out.println(result);
    }
}
