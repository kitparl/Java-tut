package org.example.Statements;

public class GeneralPurposeStatements {

    int num1 = 5;   // num1 is instance variable/ non static varible

    // any variable which we can define inside a class and outside the main method

    private void myName(){
        System.out.println("I am Chetan");
    }


    public static void main(String[] args) {
        //    Declaring variables, methods, classes, etc.
//    Creating objects, accessing variables, methods, etc.

        int num2 = 3;  // num2 is local variable




        // how to create object in class
        GeneralPurposeStatements obj = new GeneralPurposeStatements();
        // className  object = new className();

        int res = obj.num1;
//        System.out.println("mera result dekho "+res);


        obj.myName();







    }

}
