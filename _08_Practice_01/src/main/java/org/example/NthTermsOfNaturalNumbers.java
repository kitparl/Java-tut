package org.example;

public class NthTermsOfNaturalNumbers {



    /*Write a program in Java to display n terms of natural numbers and their sum.

    Sample Output:
    Input a number of terms: 7
    The sum of the natural numbers is: 28
    1+2+3+4+5+6+7
    */


    public static void main(String[] args) {

        int num = 7;
        int res = 0;
        for(int i=1; i<=num; i++){
            res+=i;
        }
        System.out.println(res);


        //	S = n/2[2a + (n − 1) × d]
        int n = 7;
        int firstTerm = 1;
        int difference = 1;

        double sum = (double)n/2 *((2*firstTerm) + ((n-1)*difference));

        System.out.println((int) sum);


    }
}