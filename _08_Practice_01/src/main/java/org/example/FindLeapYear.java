package org.example;

public class FindLeapYear {
    public static void main(String[] args) {

        int year=2073;
        if (year%4==0){
            System.out.println(year + " it is a leap year");
        }
        else {
            System.out.println(year + " it is not a leap year");
        }
    }

}
