import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // The string data type is a non-primitive data type but it is predefined class in java.
        // it belongs to java.lang package,

        // There are two ways to create a String object in Java:

        // 1. By string literal
        String myName = "Jatin";
//        System.out.println(myName);

        // 2. By new keyword
        String str = new String("Jatin");
//        System.out.println(str);


        // String literal
        String str1 = "Pranshu";
        String str2 = "pranshu";

        if(str1 == str2) {
            System.out.println("str1 and str2 is equal");
        }else{
//            System.out.println("str1 and str2 is not equal");
        }


        // new keyword String
        String city1 = new String("Japan");
        String city2 = new String("Japan");

        if(city1 == city2) { // equal method checks value not reference(address) and == (it checks address not values)
//            System.out.println("city1 and city2 is equal");
        }else{
//            System.out.println("not equal");
        }




        // ************ Some important String methods **************8

        String name = "Pranshu";
        // indexing = "0123456"
        // length() --> length of the string value
//        System.out.println(name.length());




        // charAt(int) ---> character at index
//        System.out.println(name.charAt(4));


        // eg:
//        for (int i = 0; i < name.length(); i++) {
//            System.out.println(name.charAt(i));
//        }
        

        // substring(startingindex, lastIndex)
        // pranshu
        // 0123456
        // ranshu
        // anshu
        // nshu
        // shu
        //hu
        //u
        // System.out.println(name.substring(4,6)); // 6 (end index should be excluded) but 2 (start index) should be included


        // concat()
        String lastName = " Bisht";

        // concat means combine two or more strings

       // System.out.println(name.concat(lastName)); // concat method
       // System.out.println(name + " " + lastName); // concatination operator
       // System.out.println(1 + " " +2); // 1 and 2 now becomes string




        // indexOf()
        // Pranshu
//        System.out.println(name.lastIndexOf('a')); // if not found then it will return -1



        //equal() method --> return boolean value

//        System.out.println(name.equals(lastName));



        //toUpperCase(): ----> capitalise word
        // toLowerCase(): ----> convert into small character

        //Pranshu
//        System.out.println(name.toUpperCase());
//        System.out.println(name.toLowerCase());


        // trim(): ----> cuts empty spaces from starting and last

        String country = " P               India  ";
//        System.out.println(country.trim());



        //  replace() ----> it replace character

//        System.out.println(name.replace("P", "H"));



        // toCharArray(): --> convert whole string character into array of character

        char[] nameArray = name.toCharArray();
        System.out.println(Arrays.toString(nameArray));




        // split(",") ---> convert into array of character of whatever you passed in params
        String example = "Hello world - how are you";
        String[] parts = example.split("-"); // Splitting using comma as the delimiter
        System.out.println(Arrays.toString(parts));
    }
}