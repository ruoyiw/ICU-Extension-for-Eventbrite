package com.icuServer.base;

import java.util.HashMap;

public class CertPkg {
    private Integer tid;
    private String uid;

    private HashMap<String, String> placeholders = new HashMap<>();
    private HashMap<String, String> namelist = new HashMap<>();

    public CertPkg(Integer tid, String uid, HashMap<String, String> placeholders, HashMap<String, String> namelist) {
        this.tid = tid;
        this.uid = uid;
        this.placeholders = placeholders;
        this.namelist = namelist;
    }

    public Integer getTid() {
        return tid;
    }

    public void setTid(Integer tid) {
        this.tid = tid;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public HashMap<String, String> getPlaceholders() {
        return placeholders;
    }

    public void setPlaceholders(HashMap<String, String> placeholders) {
        this.placeholders = placeholders;
    }

    public HashMap<String, String> getNamelist() {
        return namelist;
    }

    public void setNamelist(HashMap<String, String> namelist) {
        this.namelist = namelist;
    }
}
