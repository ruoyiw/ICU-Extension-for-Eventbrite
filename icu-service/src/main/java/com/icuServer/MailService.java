package com.icuServer;

import com.icuServer.base.EmailPkg;
import com.icuServer.util.Database;
import com.icuServer.util.Response;
import com.icuServer.util.Util;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.glassfish.jersey.server.JSONP;
import org.json.simple.JSONArray;
import org.simplejavamail.email.Email;
import org.simplejavamail.mailer.Mailer;
import org.simplejavamail.mailer.config.TransportStrategy;

import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.io.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;

@SuppressWarnings("unchecked")
@Path("mail")
public class MailService {
    @Context ServletContext context;

    @POST
    @Path("add")
    @Consumes("application/x-www-form-urlencoded")
    @Produces({"application/javascript", "application/json"})
    public String addEmail(
            @FormParam("uid") String uid,
            @FormParam("eid") Integer eid,
            @DefaultValue("Project ICU") @FormParam("from")  String from,
            @FormParam("to_list")   String tolist,
            @FormParam("cc_list")   String cclist,
            @FormParam("bcc_list")  String bcclist,
            @DefaultValue("No Subject")   @FormParam("subject")   String subject,
            @DefaultValue("")   @FormParam("content")   String content,
            @FormParam("attachment_list")   String attachment_list,
            @FormParam("send_time") String timeStr,
            @FormParam("tid") Integer tid,
            @FormParam("placeholders") String placeholders,
            @QueryParam("token") String token) {

        Database db = new Database(context);
        HashMap<String, String> nameList = null;
        HashMap<String, String> placehoderList = null;
        Timestamp sendTime = null;
        EmailPkg ep = null;

        //auth
        if (uid == null || token == null || !db.verifyUser(uid, token))
            return Response.authFailure();

        // send time
        if (timeStr != null)
            sendTime = Timestamp.valueOf(timeStr);

        // parse recipient name - address list
        try {
            nameList = Util.convertNameListFromJSON(tolist);
        } catch (Exception e) {
            e.printStackTrace();
            return Response.error("Wrong mail-to list format");
        }

        // parse a template (if exist)
        if (tid != null){
            try {
                placehoderList = Util.convertPlaceHolderListFromJSON(placeholders);
            } catch (Exception e) {
                e.printStackTrace();
                return Response.error("Wrong placeholder list format");
            }

            ep = new EmailPkg(eid, uid, sendTime, tid, placehoderList, nameList,
                    from, cclist, bcclist, subject, content, attachment_list);
        } else {
            // no template
            ep = new EmailPkg(eid, uid, sendTime, null, null, nameList,
                    from, cclist, bcclist, subject, content, attachment_list);
        }

        int newEid = db.addEmlPkg(ep);

        Mailer mailer = new Mailer("smtp.gmail.com", 587,
        "icu.swen90014@gmail.com", "swen90014",
        TransportStrategy.SMTP_TLS);

        ArrayList<Email> emailSet = ep.expand();

        for (Email email: emailSet) {
            mailer.sendMail(email, true);
        }


        if (newEid != -1) {
            HashMap<String, Object> result = new HashMap<>();
            result.put("eid", newEid);
            return Response.success(result);
        }
        else
            return Response.error("Failed.");

    }

    @GET
    @Path("get")
    @JSONP(queryParam = "callback")
    @Produces({"application/javascript", "application/json"})
    public String getAllTemplate(
            @QueryParam("eid") Integer eid,
            @QueryParam("uid") String uid,
            @QueryParam("token") String token) {
        Database db = new Database(context);
        ArrayList<EmailPkg> epSet;

        //auth
        if (uid == null || token == null || !db.verifyUser(uid, token))
            return Response.authFailure();

        if (eid == null)
            epSet = db.getEmlPkg(uid);
        else
            epSet = db.getEmlPkg(uid, eid);
        JSONArray epSetJSON = new JSONArray();
        for (EmailPkg ep: epSet) {
            if (ep !=null) epSetJSON.add(ep.toJSON());
        }
        HashMap<String, Object> result = new HashMap<>();
        result.put("result", epSetJSON);

        return Response.success(result);
    }

    @GET
    @Path("remove")
    @JSONP(queryParam = "callback")
    @Produces({"application/javascript", "application/json"})
    public String delEmlPkg(
            @QueryParam("tid") Integer eid,
            @QueryParam("uid") String uid,
            @QueryParam("token") String token) {
        Database db = new Database(context);

        //auth
        if (uid == null || token == null || !db.verifyUser(uid, token))
            return Response.authFailure();

        if (eid != null) {
            boolean success = db.delEmlPkg(uid, eid);

            if (success)
                return Response.success();
        }

        return Response.error("Failed.");
    }

    @POST
    @Path("uploadFile")
    @JSONP(queryParam = "callback")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public String uploadFile(
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail) {

        String timestamp = String.valueOf(new Timestamp(System.currentTimeMillis()).getTime());
        String fileName = fileDetail.getFileName();
        String fileName_New = timestamp + fileName;
        String uploadPath = "/tmp/icu/uploadedFiles/";

        // save it
        boolean success = writeToFile(uploadedInputStream, uploadPath + fileName_New);

        HashMap <String, Object> result = new HashMap<>();
        result.put("filename", fileName_New);
        if (success)
            return Response.success(result);
        else
            return Response.error("Failed");

    }

    // save uploaded file to new location
    private boolean writeToFile(InputStream uploadedInputStream,
                             String uploadedFileLocation) {

        try {
            OutputStream out = new FileOutputStream(new File(
                uploadedFileLocation));
            int read = 0;
            byte[] bytes = new byte[1024];

            while ((read = uploadedInputStream.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            out.flush();
            out.close();

            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }

}