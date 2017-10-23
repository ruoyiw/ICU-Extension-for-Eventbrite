package com.icuServer.util;


import org.apache.commons.dbcp2.BasicDataSourceFactory;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBCPListener implements ServletContextListener {

    public static DataSource dataSource;

    private static final String PROP_DBCP_DEPLOY = "/WEB-INF/dbcp.properties";
    private static final String PROP_DBCP_DEV = "/WEB-INF/dbcp_local.properties";
    private static final String PROP_DBCP = PROP_DBCP_DEPLOY;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        try {
            System.out.println("Init DB connection pool");
            ServletContext application = sce.getServletContext();
            Properties properties=new Properties();
            properties.load(application.getResourceAsStream(PROP_DBCP));
            dataSource = BasicDataSourceFactory.createDataSource(properties);
            application.setAttribute("dataSource", dataSource);
        }
        catch(Exception e) {
            System.err.println("Err：" + e.getMessage());
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sec) {
        System.out.println("ServletContextListener destroyed");
    }

}