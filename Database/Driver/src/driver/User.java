/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package driver;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;

/**
 *
 * @author Sankar
 */
public class User {
static int c=0;
static int k=0;

    public User() {
        
    }
public int addUser(int uid,int key) throws ClassNotFoundException, SQLException
{
     String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        ++c;
        ++k;
        String insertStatement = "insert into user values (?,?)";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, ""+uid);
        ps.setString(2, ""+key);
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
public void deleteUser(String uid) throws ClassNotFoundException, SQLException
{
    String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        ++c;
        ++k;
        String insertStatement = "delete from user where UserID = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, uid);
        ps.execute();
}

public ResultSet getUser(String uid) throws ClassNotFoundException, SQLException
{
    String url = "jdbc:mysql://frank.mzalive.org:3306/projectICU";
         Class.forName("com.mysql.jdbc.Driver");
        Connection conn = null;
        conn = (Connection) DriverManager.getConnection(url, "project-icu", ">X)H#XtKy8");
        PreparedStatement ps = null;
        ++c;
        ++k;
        String insertStatement = "select * from user where UserID = ?";
        ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
        ps.setString(1, uid);
        ps.execute();
        ResultSet rs = ps.executeQuery();
        return rs;
    
}


   
    
}
