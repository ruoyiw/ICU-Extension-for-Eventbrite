package com.icuServer;

import com.icuServer.util.Database;
import com.icuServer.util.Response;
import org.glassfish.jersey.server.JSONP;
import org.simplejavamail.email.Email;
import org.simplejavamail.email.EmailBuilder;
import org.simplejavamail.mailer.Mailer;
import org.simplejavamail.mailer.config.TransportStrategy;

import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.util.regex.Pattern;

/**
 * Root resource (exposed at "webapi/example" path)
 */
@Path("example")
public class Example {

    /**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as JSON or JSONP s.t. Accept header specified.
     *
     */

    @GET
    @JSONP(queryParam = "callback")
    @Produces({"application/javascript", "application/json"})
    public String echo(
            @DefaultValue("Hello world") @QueryParam("content") String content) {  //Extract parameters from url query string
        return content;
    }

    @GET
    @Path("db")
    @JSONP(queryParam = "callback")
    @Produces({"application/javascript", "application/json"})
    public String db(@Context ServletContext context) {
        Database db = new Database(context);
        // todo db test stub
        return "done";
    }

    @GET
    @Path("sendMail")
    @JSONP(queryParam = "callback")
    @Produces({"application/javascript", "application/json"})
    public String sendEmailExample(
            @QueryParam("mailto") String mailto,
            @DefaultValue("Hello world") @QueryParam("content") String content) {
        String REGEX_EMAIL = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";

        if (mailto != null && Pattern.matches(REGEX_EMAIL,mailto)) {
            String name = mailto.split("@")[0];

            Email email = new EmailBuilder()
                    .from("Project ICU", "icu.swen90014@gmail.com")
                    .to(name, mailto)
                    .subject("Java Mail Test")
                    .text("This is a test mail sent with java mail\n"+content)
                    .build();

            new Mailer("smtp.gmail.com", 587, "icu.swen90014@gmail.com", "swen90014",
                    TransportStrategy.SMTP_TLS).sendMail(email);

            return Response.success();
        }
        else return Response.error("wrong email address");
    }




}
