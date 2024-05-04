package InputTaking;

import java.util.Scanner;

public class InputByUser {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in); // whenever we want input by user (keyboard input)

        System.out.print("Enter Mobile Number: ");
//         input integer value
        int numInt = input.nextInt();
        System.out.print("You entered: --------->>>>> "+ numInt);

        // input long value
        long numLong = input.nextLong();
        System.out.print("You entered: --------->>>>> "+ numLong);

        // input String value
        String str = input.nextLine();
        System.out.print("You entered: --------->>>>> "+ str);
    }


}
