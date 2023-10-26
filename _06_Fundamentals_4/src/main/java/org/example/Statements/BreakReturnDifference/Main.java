package org.example.Statements.BreakReturnDifference;

public class Main {

    public int multiplyByTwo(int num){
        return num * 2;
    }

    public static void main(String[] args) {

        Main obj = new Main();



//        System.out.println(result);


        // hw tell me about this flow
        for(int i = 1  ; i<=10; i++){
            int result = obj.multiplyByTwo(i);

            if(result == 10){
                break;
            }

            System.out.println(2+" * "+i+" = "+result);
        }


        for (int i = 1; i <=3; i++){
            System.out.println("Chetan");
        }



    }

}
