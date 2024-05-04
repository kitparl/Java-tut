package immutable;

public class ImmutableString {


    public static void main(String[] args) {

        // Question 1) Why strings are immutable in java?

// Because when we change the value of any string then their reference(address) will also change

        String name = "jatin";   // name = "G6 Neelmatha"
//        System.out.println(name);
        System.out.println(name.hashCode());

        name = "jati";
        System.out.println(name.hashCode());

        // If you want to make immutable string then in java you can use StringBuffer or StringBuilder






    }

}
