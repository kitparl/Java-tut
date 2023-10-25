package org.example.Statements.GeneralPurposeStatement;

public class Example {
    String car = "Alto";
    int model = 800;

    public int highSpeed(){
        return 120;
    }


    public static void main(String[] args) {

        Example myObject = new Example();

        String carName = myObject.car;
        int model = myObject.model;
        int highSpeed = myObject.highSpeed();

        System.out.println(carName);
        System.out.println(model);
        System.out.println(highSpeed);
    }

}
