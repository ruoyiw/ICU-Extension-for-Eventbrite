package com.icuServer.util;

import org.json.simple.JSONObject;

import java.util.ArrayList;
import java.util.Map;

@SuppressWarnings("unchecked")
public class Response {
    public static String success() {
        JSONObject response = new JSONObject();
        response.put("response", "success");
        return response.toJSONString();
    }

    public static String success(Map m) {
        JSONObject response = new JSONObject();
        response.put("response", "success");
        response.putAll(m);
        return response.toJSONString();
    }

    public static String error(String errorMsg) {
        JSONObject response = new JSONObject();
        response.put("response", "error");
        response.put("errorMessage", errorMsg);

        return  response.toJSONString();
    }

    public static String authFailure() {
        JSONObject response = new JSONObject();
        response.put("response", "error");
        response.put("errorMessage", "authentication_failed");

        return  response.toJSONString();
    }
}
