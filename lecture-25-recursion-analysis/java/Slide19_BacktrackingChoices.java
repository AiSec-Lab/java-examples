/** Explores +3 first, then backtracks and tries doubling. */
public class Slide19_BacktrackingChoices {
    public static boolean canReach(int current, int target, String path) {
        System.out.println("try " + current + " via " + path);
        if (current == target) return true;
        if (current > target) return false;

        if (canReach(current + 3, target, path + " -> +3")) return true;
        return canReach(current * 2, target, path + " -> x2");
    }

    public static void main(String[] args) {
        System.out.println("reachable? " + canReach(1, 11, "1"));
    }
}
