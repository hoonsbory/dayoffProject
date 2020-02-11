package com.team4.dayoff.api.loginAPI;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.swing.text.MaskFormatter;

import com.google.api.services.people.v1.model.Person;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.team4.dayoff.entity.Users;

/**
 * GoogleAPI
 */
public class FacebookAPI implements LoginAPI {

    @Override
    public Map<String, String> getToken(String code) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Users getUserInfo(String accessToken,String sessionId) {
        Users userInfo = new Users();
       String socialId = "facebook_"+sessionId;
            userInfo.setSocialId(socialId);




        return userInfo;
    }

    @Override
    public int withdrawUser(String accessToken, String Id) {
        // TODO Auto-generated method stub
        Users userInfo = new Users();
        String reqURL = "https://graph.facebook.com/v5.0/"+Id+"/permissions?access_token="+accessToken;
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("DELETE");
            // // 요청에 필요한 Header에 포함될 내용
            // conn.setRequestProperty("Authorization", "Bearer " + accessToken);


            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return 0;
    }

}