package org.example.Statements.IterativeStatements;

public class ForClass {

    public static void main(String[] args) {


        // print 1 to 10


        for(int i= 1;   i<=10;   i++){
            if(i == 5){
                break;
            }
            if(i == 2){
                continue;
            }
            System.out.println(i);
        }


        // print 20 to 1 divisible of 2

        for(long i = 20; i>=1; i--){
            if(i%2==0){
                System.out.println(i);
            }
        }






    }

}
