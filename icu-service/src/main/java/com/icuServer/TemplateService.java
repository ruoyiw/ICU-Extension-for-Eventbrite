package com.icuServer;

import com.icuServer.base.Template;
import com.icuServer.util.Database;
import com.icuServer.util.Response;
import org.glassfish.jersey.server.JSONP;
import org.json.simple.JSONArray;

import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.util.ArrayList;
import java.util.HashMap;

@SuppressWarnings("unchecked")
@Path("template")
public class TemplateService {
    @Context ServletContext context;

    @GET
    @Path("get")
    @JSONP(queryParam = "callback")
    @Produces({"application/javascript", "application/json"})
    public String getAllTemplate(
            @QueryParam("tid") Integer tid,
            @QueryParam("uid") String uid,
            @QueryParam("token") String token) {
        Database db = new Database(context);
        ArrayList<Template> tempSet;

        //auth
        if (!uid.equals("-1"))
            if (token == null || !db.verifyUser(uid, token))
                return Response.authFailure();

        if (tid == null)
            tempSet = db.getTemplate(uid);
        else
            tempSet = db.getTemplate(uid, tid);
        JSONArray tempSetJSON = new JSONArray();
        for (Template t: tempSet) {
            if (t !=null) tempSetJSON.add(t.toJSON());
        }
        HashMap<String, Object> result = new HashMap<>();
        result.put("result", tempSetJSON);

        return Response.success(result);
    }

    @GET
    @Path("remove")
    @JSONP(queryParam = "callback")
    @Produces({"application/javascript", "application/json"})
    public String delTemplate(
            @QueryParam("tid") Integer tid,
            @QueryParam("uid") String uid,
            @QueryParam("token") String token) {
        Database db = new Database(context);

        if ((uid != null) && (tid != null)) {
            //auth
            if (token == null || !db.verifyUser(uid, token))
                return Response.authFailure();

            boolean success = db.delTemplate(uid, tid);

            if (success)
                return Response.success();
        }

        return Response.error("Failed.");
    }

    @POST
    @Path("add")
    @JSONP(queryParam = "callback")
    @Consumes("application/x-www-form-urlencoded")
    @Produces({"application/javascript", "application/json"})
    public String addTemplate(
            @FormParam("tid") Integer tid,
            @FormParam("uid") String uid,
            @FormParam("name") String name,
            @FormParam("content") String content,
            @QueryParam("token") String token) {
        Database db = new Database(context);

        //auth
        if (token == null || !db.verifyUser(uid, token))
            return Response.authFailure();

        if ((tid == null) || (uid == null) || (name == null) || (content == null))
            return Response.error("invalid template");
        Template t = new Template(tid, uid, name, content);
        int newTid = db.addTemplate(t);

        if (newTid != -1) {
            HashMap<String, Object> result = new HashMap<>();
            result.put("tid", newTid);
            return Response.success(result);
        }
        else
            return Response.error("Failed.");
    }
}
