package com.icuServer;

import com.icuServer.base.Config;
import com.icuServer.util.Database;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@Path("auth")
public class AuthService {
    @Context ServletContext context;

    @GET
    public Response oauth_handler(
            @QueryParam("code") String code) throws URISyntaxException {

        JSONParser parser = new JSONParser();
        Database db = new Database(context);


        CloseableHttpClient httpClient = null;
        HttpResponse response = null;
        BufferedReader rd = null;
        StringBuilder result = null;
        String line = "";
        JSONObject json = null;

        try {
            // get access token
            httpClient = HttpClients.createDefault();
            HttpPost post = new HttpPost(Config.EVENTBRITE_OAUTH_TOKEN_EXCHANGE_URL);

            List<NameValuePair> params = new ArrayList<>();
            params.add(new BasicNameValuePair("code", code));
            params.add(new BasicNameValuePair("client_secret", Config.CLIENT_SECRET));
            params.add(new BasicNameValuePair("client_id", Config.CLIENT_ID));
            params.add(new BasicNameValuePair("grant_type", "authorization_code"));

            post.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));

            response = httpClient.execute(post);
            result = new StringBuilder();

            rd = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));

            while ((line = rd.readLine()) != null) {
                result.append(line);
            }

            json = (JSONObject) parser.parse(result.toString());

            String token = (String) json.get("access_token");
            String token_type = (String) json.get("token_type");

            // retrieve user id
            httpClient = HttpClients.createDefault();
            HttpGet get = new HttpGet(Config.EVENTBRITE_RESTFUL_ME_ENDPOINT_URL);

            get.addHeader("Authorization", "Bearer " + token);

            response = httpClient.execute(get);
            result = new StringBuilder();

            rd = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));

            while ((line = rd.readLine()) != null) {
                result.append(line);
            }

            json = (JSONObject) parser.parse(result.toString());

            String uid = (String) json.get("id");

            // update user
            db.addUser(uid, token);

            URI redirect_target = new URIBuilder(Config.REDIRECT_URL_SUCCESS)
                    .addParameter("token", token)
                    .addParameter("uid", uid)
                    .build();

            return Response.temporaryRedirect(redirect_target).build();

        } catch (Exception e) {
            e.printStackTrace();
            URI redirect_target = new URI(Config.REDIRECT_URL_FAILURE);
            return Response.temporaryRedirect(redirect_target).build();
        }

    }


}
