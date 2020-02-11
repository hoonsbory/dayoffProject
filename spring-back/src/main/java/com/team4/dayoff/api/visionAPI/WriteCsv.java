package com.team4.dayoff.api.visionAPI;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.apache.tomcat.jni.File;
import org.springframework.stereotype.Service;

/**
 * WriteCsv
 */
@Service
public class WriteCsv {

    public void write(String result) {

        try {
            BufferedWriter file = new BufferedWriter(new FileWriter("visionInsert.csv",true));
            System.out.println(12345);
            file.write(result);
            file.newLine();
         
            file.flush();
            file.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
    }

    public void reset() {

        try {
            BufferedWriter file = new BufferedWriter(new FileWriter("visionInsert.csv"));
            System.out.println(12345123);
            file.write("");
         
            file.flush();
            file.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
    }


    
}