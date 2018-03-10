
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.*;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;

public class Execute {

    public static void main(String[] args) throws FileNotFoundException {
        final String dir = System.getProperty("user.dir");
       // String real = dir.replace("execute", "");
        Scanner input = new Scanner(new FileReader(dir + "/system/server.js"));

        String ip = "";
        ArrayList<String> a = new ArrayList<>();
        String right = "var ip=";

        try {
            InetAddress ipAddr = InetAddress.getLocalHost();
            ip = ipAddr.getHostAddress().toString();

            System.out.println(ipAddr.getHostAddress());
        } catch (UnknownHostException ex) {
            ex.printStackTrace();
        }
        a.add(right + "'" + ip + "'" + ";");

        while (input.hasNextLine()) {
            a.add(input.nextLine());
        }
        input.close();
        a.remove(1);

        PrintWriter writer = new PrintWriter(dir + "/system/server.js");
        writer.print("");
        int i = 0;
        while (i < a.size()) {
            writer.println(a.get(i));
            i++;
        }
        writer.close();

    }
}
