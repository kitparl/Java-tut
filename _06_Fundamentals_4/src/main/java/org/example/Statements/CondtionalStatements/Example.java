package org.example.Statements.CondtionalStatements;

public class Example {
    public static void main(String[] args) {

        // check this number is divisible by 2 or not if it is divisble then you need to multiple that number with 3 other wise multiply by 5. then print.


        int number = 11;

        if(number%2 == 0){
            number = number * 3;
        }else{
            number = number * 5;
        }

//        System.out.println(number);

// check this number is divisible by 2 or not if it is divisble by 2 then you need to multiple that number with 3. same with 3 if
// number is divisible by 3 then multiply 5. if number is divisible by 4 then muliply by 7;


        if(number%2 == 0){
            number *= 3;
        } else if (number%3 ==0) {
            number*=5;
        }
        else{
            number*=7;
        }


        // if-if read every if if block

        int num = 12;

        if(num%4 == 0){
            System.out.println("1 Number is Divisible by 2");
        }
        if(num%3 == 0){
            System.out.println("2 Number is Divisible by 3");
        }
        if(num%2 == 0){
            System.out.println("3 Number is even");
        }
        if(num%2 == 1){
            System.out.println("4 Number is Odd");
        }else{
            System.out.println("5 I dont know");
        }

        // this if-else read block only if any one condtion is true
        if(num%4 == 0){
            System.out.println("1 Number is Divisible by 2");
        }
        else if(num%3 == 0){
            System.out.println("2 Number is Divisible by 3");
        }
        else if(num%2 == 1){
            System.out.println("3 Number is odd");
        }
        else if(num%2 == 0){
            System.out.println("4 Number is even");
        }else{
            System.out.println("5 I dont know");
        }



    }
}
