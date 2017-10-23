package com.icuServer.util;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.HashMap;
import java.util.Map;

public class Util {
    public static HashMap<String, String> convertNameListFromJSON (String jsonString) throws ParseException {
        JSONParser parser = new JSONParser();
        JSONArray json = (JSONArray) parser.parse(jsonString);
        HashMap<String, String> p = new HashMap<>();
        for (int i = 0; i < json.size(); i++) {
            String addr = (String) ((JSONObject) json.get(i)).get("address");
            String name = (String) ((JSONObject) json.get(i)).get("name");
            p.put(addr,name);
        }
        return p;
    }

    public static HashMap<String, String> convertPlaceHolderListFromJSON (String jsonString) throws ParseException {
        JSONParser parser = new JSONParser();
        JSONArray json = (JSONArray) parser.parse(jsonString);
        HashMap<String, String> p = new HashMap<>();
        for (int i = 0; i < json.size(); i++) {
            String ph = (String) ((JSONObject) json.get(i)).get("placeholder");
            String value = (String) ((JSONObject) json.get(i)).get("value");
            p.put(ph,value);
        }
        return p;
    }

    @SuppressWarnings("unchecked")
    public static JSONArray convertNameListToJSON (HashMap<String, String> namelist) {
        JSONArray result = new JSONArray();
        for (Map.Entry<String, String> entry : namelist.entrySet()) {
            String addr = entry.getKey();
            String name = entry.getValue();
            JSONObject obj = new JSONObject();
            obj.put("address", addr);
            obj.put("name", name);
            result.add(obj);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public static JSONArray convertPlaceholderListToJSON (HashMap<String, String> placeholderlist) {
        JSONArray result = new JSONArray();
        for (Map.Entry<String, String> entry : placeholderlist.entrySet()) {
            String placeholder = entry.getKey();
            String value = entry.getValue();
            JSONObject obj = new JSONObject();
            obj.put("placeholder", placeholder);
            obj.put("value", value);
            result.add(obj);
        }
        return result;
    }
}
