package immutable;

public class MutableString {

    public static void main(String[] args) {

        StringBuilder builder = new StringBuilder("Hello Pranshu....");
        System.out.println(builder.append("Hello Jatin").append(" I am Hero"));

        builder.insert(1, "adfas"); // it inserted value which we pass (position, inserted value)
//        System.out.println(builder);

        builder.delete(1,6);
//        System.out.println(builder);

        StringBuffer sb = new StringBuffer("Hello Pranshu....");
        sb.insert(5, " I am ");

        System.out.println(sb);
        System.out.println(sb.reverse());


    }
}
