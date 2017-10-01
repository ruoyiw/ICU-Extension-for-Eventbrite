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
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Sankar
 */
public class Email {

    public Email() {
    }
    public int addEmail(String uid,String eid,String content) throws ClassNotFoundException, SQLException
{
     String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        ++c;
        
        String insertStatement = "insert into email values (?,?,?)";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, uid);
        ps.setString(2, eid);
        ps.setString(3, content);
        if(ps.execute()) 
        {
        conn.close();
         return c;
        }
        else
        {
            conn.close();
            return -1;
        }     
}
      public ResultSet getUserEmails(String uid) throws ClassNotFoundException, SQLException
     {
        String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "select * from email where uid = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, uid);
        ResultSet rs = ps.executeQuery();
        return rs;
     }
     
     public ResultSet getEmail(String eid) throws ClassNotFoundException, SQLException
     {
        String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "select * from email where eid = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, eid);
        ResultSet rs = ps.executeQuery();
        return rs;
     }
     public void deleteEmail(String uid) throws ClassNotFoundException, SQLException
{
    String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
      
        String insertStatement = "delete from email where eid = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, uid);
        ps.execute();
}
    public void modifyContent(String eid,String content) throws ClassNotFoundException, SQLException
{
    String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        String insertStatement = "update email set content = ? where eid = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, content);
        ps.setString(2, eid);
        ps.execute();
}  
     
}
