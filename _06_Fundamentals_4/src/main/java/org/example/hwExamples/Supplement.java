package org.example.hwExamples;

public class Supplement {

    String supplimentName1 = "Creatine";
    int price1 = 1200;

    String supplimentName2 = "Whey Protien";
    int price2 = 5000;

    public void print(){
        System.out.println(supplimentName1 + " : " + price1);
        System.out.println(supplimentName2 + " : " + price2);
    }

    public static void main(String[] args) {

        Supplement object = new Supplement();
        object.print();

    }



}
