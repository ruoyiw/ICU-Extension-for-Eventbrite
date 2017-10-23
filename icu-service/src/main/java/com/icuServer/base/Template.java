package com.icuServer.base;

import org.json.simple.JSONObject;

public class Template {
    private int tid;
    private String uid;
    private String name;
    private String content;

    public Template(int tid, String uid, String name, String content) {
        this.tid = tid;
        this.uid = uid;
        this.content = content;
        this.name = name;
    }

    public Template(String uid, String name, String content) {
        this.tid = -1;
        this.uid = uid;
        this.content = content;
        this.name = name;
    }

    public Template() {
        this.tid = -1;
        this.uid = "";
        this.content = "";
        this.name = "";
    }

    @SuppressWarnings("unchecked")
    public JSONObject toJSON() {
        JSONObject json = new JSONObject();

        json.put("tid", tid);
        json.put("uid", uid);
        json.put("name", name);
        json.put("content", content);

        return json;
    }

    public int getTid() {
        return tid;
    }

    public void setTid(int tid) {
        this.tid = tid;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
