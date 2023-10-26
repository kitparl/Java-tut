package org.example.Statements.IterativeStatements;

public class While {


    public static void main(String[] args) {

        // print all odd numbers using while loop

        int i = 1;
        while(i<=20){
            if(i%2 == 1){
                System.out.println(i);
            }
            i++;
        }


        // print 20 to 1 print divisible of 2


        int j = 20;
        while (j>=1){
            if(j%2 == 0){
                System.out.println(j);
            }
            j--;
        }






    }
}
