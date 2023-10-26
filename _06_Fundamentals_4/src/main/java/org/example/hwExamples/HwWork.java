package org.example.hwExamples;

/*
A school has following rules for grading system:
        a. Below 25 - F
        b. 25 to 45 - E
        c. 45 to 50 - D
        d. 50 to 60 - C
        e. 60 to 80 - B
        f. Above 80 - A
           print grade
 */

public class HwWork {
    public static void main(String[] args) {

        int marks = 85;

        if(marks<25){
            System.out.println('F');
        }
        else if (marks>=25 && marks<45) {
            System.out.println('E');
        }
        else if (marks>=45 && marks<50) {
            System.out.println('D');
        }
        else if (marks>=50 && marks<60) {
            System.out.println('C');
        }
        else if (marks>=60 && marks<80) {
            System.out.println('B');
        }else{
            System.out.println('A');
        }


    }
}
