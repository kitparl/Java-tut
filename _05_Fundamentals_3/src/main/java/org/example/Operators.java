package org.example;

public class Operators {

//    An operator is a symbol, it will perform a particular operation


    public static void main(String[] args) {
//        1. Arithmetic Operators: +, -, *, /, %, ++, --

        //eg:

        int num1 = 5;
        int num2 = 3;

        int result = num1 + num2;

//        System.out.println(result);

// pre increment and post increment;

        int num = 5;

        System.out.println(num++);
        System.out.println(num++);


//        2. Assignment Operators:

//        =, +=, -=, *=, /=, %=

        int a = 4;

//             a =             a             - 2;
        // (variable)    (value of a)    -      2

        a %= 2; //<-- short notation  , a = a + 2; <-- real

        System.out.println(a);

//        3. Comparison Operators: (it return true or false)
// ==, !=, <, >, <=, >=

        int com = 3;

       // com == 4 -----> false
        // com == 3  -----> true
        // com != 4 ------> true
        //  com < 4  ------> true
        // com > 4  -------> false
        // com >= 4  ------> false
        // com <= 4  ------>  true

        if(com <= 4){
            System.out.println("Correct");
        }else{
            System.out.println("Incorrect");
        }

//        4. Boolean Logical Operators:
//       &&, ||

        /*
        and operator
        true && false = false
        false && true = false
        true && true  = true
        false && false = false
         */

        /*
        or operator
        true || false = true
        false || true = true
        true || true  = true
        false || false = false
         */


        // hw 1: theory: | vs || , & vs &&
        // hw 2: example 1,2,3
    }

}
