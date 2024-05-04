package JavaStringCompare;

public class CompareString {

    public static void main(String[] args) {

        String name1 = "Jatin";
        String name2 = "Jatiin";
        String name3 = new String("Jatin");
        String name4 = new String("Jatin");

        // equals() method
        // this equals means it will compare only values not reference
        System.out.println(name1.equals(name2));


//         == operator
//        The == operator compares references not values.
        System.out.println(name1 == name2);


        // compareTo() method
        // it compares with unicode of the every character present in string. if it is a same then it will return 0 otherwise -ve or +ve values
        System.out.println(name1.compareTo(name2));
    }

}
