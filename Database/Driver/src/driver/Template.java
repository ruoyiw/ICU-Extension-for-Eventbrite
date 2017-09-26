/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package driver;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import static driver.User.c;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;

/**
 *
 * @author Sankar
 */
public class Template {

    public Template() {
    }
 public void addTemplate(String id,String tid,String ldir,String name) throws ClassNotFoundException, SQLException
    {
        String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "insert into CustomisedTemplate values (?,?,?,?)";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, id);
        ps.setString(2, tid);
        ps.setString(3, ldir);
        ps.setString(4, name);
        ps.execute();
        
    }
    public void deleteUserTemplates(String uid) throws ClassNotFoundException, SQLException
{
    String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "delete from CustomisedTemplate where uid = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, uid);
        ps.execute();
}
     public void deleteTemplate(String tid) throws ClassNotFoundException, SQLException
{
    String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "delete from CustomisedTemplate where tempID = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, tid);
        ps.execute();
}
     public void updateLocation(String tid,String newLocation) throws ClassNotFoundException, SQLException
{
    String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "update CustomisedTemplate set LocationDir = ? where tempID = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, newLocation);
        ps.setString(2, tid);
        ps.execute();
}
     public ResultSet getUserTemplates(String uid) throws ClassNotFoundException, SQLException
     {
        String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "select * from CustomisedTemplate where uid = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, uid);
        ResultSet rs = ps.executeQuery();
        return rs;
     }
     
     public ResultSet getTemplate(String tid) throws ClassNotFoundException, SQLException
     {
        String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "select * from CustomisedTemplate where tid = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, tid);
        ResultSet rs = ps.executeQuery();
        return rs;
     }
     
}
