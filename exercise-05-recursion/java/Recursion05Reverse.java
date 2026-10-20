public class Recursion05Reverse {
    static String reverse(String text) {
        if (text.length() <= 1) {
            return text;
        }
        String rest = reverse(text.substring(1));
        String result = rest + text.charAt(0);
        return result;
    }
    public static void main(String[] args) {
        String result = reverse("code");
        System.out.println(result);
    }
}
