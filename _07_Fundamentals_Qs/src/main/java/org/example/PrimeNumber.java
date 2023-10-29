package org.example;

public class PrimeNumber {

    // Question 1: Check any number is Prime number or not.

    public static void main(String[] args) {

        // Prime number : which can divided by 1 and itself. (factor: 2)
        int num = 23;
        int factorCount = 0;

        for(int i=1; i<=num; i++){
            if(num%i == 0){
                factorCount++;
            }
        }

        if(factorCount == 2){
            System.out.println("It is a Prime Number");
        }else{
            System.out.println("It is a Composit number");
        }







    }

}
