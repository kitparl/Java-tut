package org.example;

import java.util.Scanner;

public class GreaterOfThree {


//    take 3 inputs from user find from these three number whichone is larger
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        System.out.print("Enter first number : ");
        int num1 = input.nextInt();
        System.out.print("Enter second number : ");
        int num2 = input.nextInt();
        System.out.print("Enter three number : ");
        int num3 = input.nextInt();

        if(num1 > num2 && num1 > num3) {
            System.out.println(num1 + " this number is greater among all");
        }

        if(num2 > num1 && num2 > num3){
            System.out.println(num2 + " this number is greater among all");
        }

        if(num3 > num1 && num3 > num2){
            System.out.println(num3 + " this number is greater among all");
        }

        // for equal  number cases you have to do







    }
}
