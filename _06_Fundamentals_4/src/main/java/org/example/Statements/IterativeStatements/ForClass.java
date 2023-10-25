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


//        while (condtion){
//
//        }

        int j = 1;
        while (j<=10){
            if(j==2){
                continue;
            }
            if(j == 5){
                break;
            }
//            System.out.println(j);
            j++;
        }







    }

}
