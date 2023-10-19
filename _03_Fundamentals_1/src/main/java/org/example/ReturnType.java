package org.example;

public class ReturnType {

    // this method is for returning integer value
    public static int add(){
        System.out.println("I am Pranshu");
        return 4;
    }
    public static void printName(){
        System.out.println("I am Chetan");
    }

    public static void main(String[] args) {
        printName();
        int result = add();  //4
        System.out.println(result);
    }
}
