package com.icuServer.base;

import com.icuServer.util.Response;
import com.icuServer.util.Util;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.simplejavamail.email.Email;

import javax.activation.FileDataSource;
import java.io.File;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class EmailPkg {
    private Integer eid;
    private String uid;
    private Timestamp time;
    private Integer tid;
    private HashMap<String, String> placeholders = new HashMap<>();
    private HashMap<String, String> namelist = new HashMap<>();

    private String from;
    private String cclist;
    private String bcclist;
    private String subject;
    private String content;
    private String attachment_list;

    public EmailPkg(Integer eid, String uid, Timestamp time, Integer tid, HashMap<String, String> placeholders, HashMap<String, String> namelist, String from, String cclist, String bcclist, String subject, String content, String attachment_list) {
        this.eid = eid;
        this.uid = uid;
        this.time = time;
        this.tid = tid;
        this.placeholders = placeholders;
        this.namelist = namelist;
        this.from = from;
        this.cclist = cclist;
        this.bcclist = bcclist;
        this.subject = subject;
        this.content = content;
        this.attachment_list = attachment_list;
    }

    public ArrayList<Email> expand() {
        ArrayList<Email> emailList = new ArrayList<>();

        // pre-process certs
        // TODO certs expand

        // generate single email
        for (Map.Entry<String, String> rc : namelist.entrySet()) {
            String rcAddr = rc.getKey();
            String rcName = rc.getValue();
            Email email = new Email();

            // set sender
            email.setFromAddress(from, "icu.swen90014@gmail.com");

            //set subject
            if (subject.equals(""))
                email.setSubject("No Subject");
            else
                email.setSubject(subject);

            //set content
            email.setTextHTML(content);

            // handle recipients, rcName can be null or empty str
            email.addNamedToRecipients(rcName, rcAddr);

            if (cclist != null && !cclist.equals(""))
                email.addCcRecipients(cclist);

            if (bcclist != null && !bcclist.equals(""))
                email.addBccRecipients(bcclist);

            // handle attachment
            if (attachment_list != null) {
                String[] attachments = attachment_list.split(";");
                for (String filename : attachments) {
                    String filePath = "/tmp/icu/uploadedFiles/" + filename;
                    if (new File(filePath).isFile())
                        email.addAttachment(filename, new FileDataSource(filePath));
                    else {
                        // TODO handle exception
                    }
                }
            }

            // TODO handle certificate

            emailList.add(email);
        }

        return emailList;
    }

    @SuppressWarnings("unchecked")
    public JSONObject toJSON() {
        JSONObject json = new JSONObject();

        json.put("eid", eid);
        json.put("uid", uid);
        json.put("time", getTimeString());
        json.put("tid", tid);
        json.put("from", from);
        json.put("cclist", cclist);
        json.put("bcclist", bcclist);
        json.put("subject", subject);
        json.put("content", content);
        json.put("attachment_list", attachment_list);
        json.put("placeholders", getPlaceholdersJSON());
        json.put("namelist", getNamelistJSON());

        return json;
    }

    public Integer getEid() {
        return eid;
    }

    public String getUid() {
        return uid;
    }

    public Timestamp getTime() {
        return time;
    }

    public String getTimeString() {
        if (time != null)
            return time.toString();
        else
            return null;
    }

    public Integer getTid() {
        return tid;
    }

    public HashMap<String, String> getPlaceholders() {
        return placeholders;
    }

    public HashMap<String, String> getNamelist() {
        return namelist;
    }

    public JSONArray getPlaceholdersJSON() {
        if (placeholders == null)
            return null;
        else
            return Util.convertPlaceholderListToJSON(placeholders);
    }

    public JSONArray getNamelistJSON() {
        return Util.convertNameListToJSON(namelist);
    }

    public String getFrom() {
        return from;
    }

    public String getCclist() {
        return cclist;
    }

    public String getBcclist() {
        return bcclist;
    }

    public String getSubject() {
        return subject;
    }

    public String getContent() {
        return content;
    }

    public String getAttachment_list() {
        return attachment_list;
    }
}
