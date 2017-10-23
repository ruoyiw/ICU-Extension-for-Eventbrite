package com.icuServer.util;

import com.icuServer.base.Config;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.IOException;
import java.util.Properties;

public class ConfigListener implements ServletContextListener{

    private static final String PROP_CONFIG = "/WEB-INF/config.properties";

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        try {
            System.out.println("Loading config file");
            ServletContext app = sce.getServletContext();
            Properties properties = new Properties();
            properties.load(app.getResourceAsStream(PROP_CONFIG));

            Config.CLIENT_ID = properties.getProperty("CLIENT_ID");
            Config.CLIENT_SECRET = properties.getProperty("CLIENT_SECRET");
            Config.EVENTBRITE_OAUTH_TOKEN_EXCHANGE_URL = properties.getProperty("EVENTBRITE_OAUTH_TOKEN_EXCHANGE_URL");
            Config.EVENTBRITE_RESTFUL_ME_ENDPOINT_URL = properties.getProperty("EVENTBRITE_RESTFUL_ME_ENDPOINT_URL");
            Config.REDIRECT_URL_SUCCESS = properties.getProperty("REDIRECT_URL_SUCCESS");
            Config.REDIRECT_URL_FAILURE = properties.getProperty("REDIRECT_URL_FAILURE");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
