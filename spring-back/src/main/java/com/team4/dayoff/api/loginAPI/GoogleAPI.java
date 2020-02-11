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
public class GoogleAPI implements LoginAPI {

    @Override
    public Map<String, String> getToken(String code) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Users getUserInfo(String accessToken,String sessionId) {
        Users userInfo = new Users();
        String reqURL = "https://people.googleapis.com/v1/people/me?personFields=birthdays,names,phoneNumbers,genders";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            // 요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            Gson gson = new Gson();
            JsonParser parser = new JsonParser();
            JsonElement json = parser.parse(result);
            Person person = gson.fromJson(result, Person.class);
            String resouceName = person.getResourceName();
            String name = null;
            String socialId = "google_" + resouceName.substring(resouceName.indexOf('/') + 1);
            Date birth = null;
            String phoneNumber = null;
            String gender = null;

            if (result.contains("names")) {

                JsonObject jsonObject = (json.getAsJsonObject().get("names").getAsJsonArray().get(0)).getAsJsonObject();
                name = jsonObject.get("displayName").getAsString();
            }
            if (result.contains("birthdays")) {
                JsonObject jsonObject = (json.getAsJsonObject().get("birthdays").getAsJsonArray().get(0))
                        .getAsJsonObject();
                jsonObject = jsonObject.get("date").getAsJsonObject();
                int year = jsonObject.get("year").getAsInt();
                int month = jsonObject.get("month").getAsInt();
                int day = jsonObject.get("day").getAsInt();
                String birthday = String.format("%4d-%2d-%2d", year, month, day);

                System.out.println(birthday);
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    birth = dateFormat.parse(birthday);
                } catch (ParseException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            if (result.contains("phoneNumbers")) {

                JsonObject jsonObject = (json.getAsJsonObject().get("phoneNumbers").getAsJsonArray().get(0))
                        .getAsJsonObject();
                phoneNumber = jsonObject.get("value").getAsString();
                try {
                    MaskFormatter maskFormatter=new MaskFormatter("###-####-####");
                    maskFormatter.setValueContainsLiteralCharacters(false);
                    phoneNumber=maskFormatter.valueToString(phoneNumber);
                    System.out.println(phoneNumber);
                } catch (ParseException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }

            }
            if (result.contains("genders")) {
                JsonObject jsonObject = (json.getAsJsonObject().get("genders").getAsJsonArray().get(0))
                        .getAsJsonObject();
                gender = jsonObject.get("value").getAsString();
                gender = gender.substring(0, 1).toLowerCase();
            }
            userInfo.setSocialId(socialId);
            userInfo.setName(name);
            userInfo.setBirth(birth);
            userInfo.setSex(gender);
            userInfo.setPhone(phoneNumber);

            System.out.println(userInfo);

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return userInfo;
    }

    @Override
    public int withdrawUser(String accessToken,String Id) {
        // TODO Auto-generated method stub
        Users userInfo = new Users();
        String reqURL = "https://accounts.google.com/o/oauth2/revoke?token=" + accessToken;
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            // // 요청에 필요한 Header에 포함될 내용
            // conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

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