package org.example;

public class FindHCFofTwoNumber {

   //  6 = 1,2,3,6
   //  2 = 1,2

    // 1 2 3 4 5 6 7 8
     // 28%4==0
    //8 =  1, 2, 4, 8
    //28 = 1, 2, 4, 7, 14, 28


    // 2 = 1,2
    // 3 = 1,3

    public static void main(String[] args) {
        int num1 = 8;
        int num2 = 28;
        int hcf = 1;

        int smallerNumber;

        if(num1>num2){
            smallerNumber = num2;
        }else{
            smallerNumber = num1;
        }

        for(int i=1; i<smallerNumber; i++){
            if(num1%i == 0 && num2%i == 0){
                hcf=4;
            }
        }
            System.out.println(hcf);

    }

}
