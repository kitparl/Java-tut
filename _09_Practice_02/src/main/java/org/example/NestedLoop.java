package org.example;

public class NestedLoop {
    public static void main(String[] args) {

        // loop inside loop

        for(int i=1; i<=5; i++){
            for(int j=1; j<=5; j++) {
                System.out.println("*");
            }
        }
    }
}
