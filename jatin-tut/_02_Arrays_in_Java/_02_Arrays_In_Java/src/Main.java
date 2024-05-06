public class Main {
    public static void main(String[] args) {

        int firstBall = 4;
        int secondBall = 2;
        int thirdBall = 1;
        int fourthBall = 2;
        int fifthBall = 3;
        int sixthBall = 6;

//        Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.
//        array is collection of homogeneous elements

        // 1st way (using new operator)
        int[] run = new int[6];
        run[0] = 4;
        run[1] = 2;
        run[2] = 3;
        run[3] = 5;
        run[4] = 6;
        run[5] = 7;

//        System.out.println(run[0]);

        // 2nd way (using curly bracket)
        int[] run2 = {2,3,4,2,3,1};

//        System.out.println(run2[0]);

        String[] names = {"Rohit", "Mohit", "Jatin"};
        //                  0           1       2
//        System.out.println(names[2]);

        String[] names2 = new String[3];
        names2[0] = "Rohit";
        names2[1] = "Mohit";
        names2[2] = "Jatin";
//        System.out.println(names2[0]);

        for(int i=0; i<names.length; i++){
            System.out.println(names[i]);
        }





    }
}