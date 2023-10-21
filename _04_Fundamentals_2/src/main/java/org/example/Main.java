package org.example;

public class Main {
    public static void main(String[] args) {

//        Data Types
//        nteger/Integral Literals:
//        "byte," "short," "int," and "long" are data types used to represent integer values

   /*     Byte:

        Size: 1 byte (8 bits)
        Range: -128 to 127 (signed) or 0 to 2ca5 (unsigned)
                Short:

        Size: 2 bytes (16 bits)
        Range: -32,768 to 32,767 (signed) or 0 to 65,535 (unsigned)
                Int (Integer):

        Size: 4 bytes (32 bits)
        Range: -2,147,483,648 to 2,147,483,647 (signed) or 0 to 4,294,967,295 (unsigned)
                Long:

        Size: 8 bytes (64 bits)
        Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (signed) or 0 to 18,446,744,073,709,551,615 (unsigned)


These data types are used to store different ranges of integer values depending on the specific requirements of your
program.
*/

        byte num = 127;
        num+=4;
        System.out.println(num);


// decimal literals
//        float, and double
        /*
        float
        Size: Typically 32 bits (4 bytes).
Range: Approximately ±3.40282347 × 10^38, with a precision of roughly 7 decimal places.
         */

        float decimalNumber1 = 2.13523453434346345f;

        double decimalNumber2 = 2.434452345523;


        System.out.println(decimalNumber2);

//        Boolean Literals:

        boolean isTrue = false;

        System.out.println(isTrue);


        //String literal

        String name = "Chetan Singh Pokhariya"; // String is a class (group of character)
        System.out.println(name);



    }
}