package org.example;

public class FindFactorial {

    // Find factoial of any number

    public static void main(String[] args) {
        int num = 4;
        int result = 1;
        // factorail of 4 = 4 * 3 * 2* 1;
        // 1 * 2 * 3 * 4

        for(int i = num; i>0; i--){
            result *= i;
        }
        System.out.println(result);
    }
}
