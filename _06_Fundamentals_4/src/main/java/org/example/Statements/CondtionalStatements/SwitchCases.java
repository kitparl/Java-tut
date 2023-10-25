package org.example.Statements.CondtionalStatements;

public class SwitchCases {

    public static void main(String[] args) {

        int num = 2;

        switch (num){
            case 1:
                System.out.println("1 Banking issue");
                break;
            case 2:
                System.out.println("2 Wallet issue");
                break;
            case 3:
                System.out.println("3 Wrong transaction");
                break;
            case 4:
                System.out.println("4 Loan");
                break;
        }

        String chor = "Rekha";

        switch (chor){
            case "Pranshu":
                System.out.println("Pranshu is chor");
                break;
            case "Hritik":
                System.out.println("Hritik is chor");
                break;
            case "Kunal":
                System.out.println("Kunal is Chor");
                break;
            case "Chetan":
                System.out.println("Chetan is chor");
                break;
            default:
                System.out.println("Gaurav is chor");
        }


    }
}
