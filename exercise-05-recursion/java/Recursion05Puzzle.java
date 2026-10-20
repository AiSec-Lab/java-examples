public class Recursion05Puzzle {
    static int puzzle(int x) {
        if (x <= 0) {
            return 0;
        }
        int rest = puzzle(x - 2);
        int result = x + rest;
        return result;
    }
    public static void main(String[] args) {
        int result = puzzle(5);
        System.out.println(result);
    }
}
