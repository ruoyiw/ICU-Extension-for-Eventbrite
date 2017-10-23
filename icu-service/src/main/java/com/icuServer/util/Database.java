package com.icuServer.util;

import com.icuServer.base.EmailPkg;
import com.icuServer.base.Template;

import javax.servlet.ServletContext;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

public class Database {
    private ServletContext sc;
    private DataSource dataSource;

    public Database(ServletContext sc) {
        this.sc = sc;
        dataSource = (DataSource) sc.getAttribute("dataSource");
    }

    public boolean addUser(String uid, String token) {
        try {
            Connection conn = dataSource.getConnection();
            String insertStatement = "insert into user (uid, token) values (?,?) on duplicate key update token=values(token)";
            PreparedStatement ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
            ps.setString(1, uid);
            ps.setString(2, token);
            int result = ps.executeUpdate();

            ps.close();
            conn.close();

            return (result > 0);

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

    }

    public boolean verifyUser(String uid, String token) {
        try {
            Connection conn = dataSource.getConnection();
            String insertStatement = "select token from user where uid = ?";
            PreparedStatement ps = (PreparedStatement) conn.prepareStatement(insertStatement);
            ps.setString(1, uid);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                String token_genuine = rs.getString("token");
                if (token.equals(token_genuine))
                    return true;
            }

            rs.close();
            ps.close();
            conn.close();
            return false;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public int addTemplate(Template t) {
        try {
            Connection conn = dataSource.getConnection();
            String smt = "{call updateTemplate(?,?,?,?)}";
            CallableStatement call = conn.prepareCall(smt);
            call.registerOutParameter(1, Types.INTEGER);
            call.setInt(1, t.getTid());
            call.setString(2, t.getUid());
            call.setString(3, t.getName());
            call.setString(4, t.getContent());
            call.executeUpdate();

            int tid = call.getInt(1);

            call.close();
            conn.close();
            return tid;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public boolean delTemplate(String uid, Integer tid) {
        try {
            Connection conn = dataSource.getConnection();
            String insertStatement = "delete from template where (tid = ?) and (uid = ?)";
            PreparedStatement ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
            ps.setInt(1, tid);
            ps.setString(2, uid);
            int result = ps.executeUpdate();

            ps.close();
            conn.close();

            return (result > 0);

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public ArrayList<Template> getTemplate(String uid) {
        try {
            Connection conn = dataSource.getConnection();
            String insertStatement = "select * from template where (uid = ?) or (uid is NULL)";
            PreparedStatement ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
            ps.setString(1, uid);
            ResultSet rs = ps.executeQuery();

            ArrayList<Template> tempSet = extractTempSet(rs);

            ps.close();
            conn.close();

            return tempSet;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public ArrayList<Template> getTemplate(String uid, int tid) {
        try {
            Connection conn = dataSource.getConnection();
            String insertStatement = "select * from template where (tid = ?) and ((uid = ?) or (uid is NULL))";
            PreparedStatement ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
            ps.setInt(1, tid);
            ps.setString(2, uid);
            ResultSet rs = ps.executeQuery();

            ArrayList<Template> tempSet = extractTempSet(rs);

            ps.close();
            conn.close();

            return tempSet;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }


    public int addEmlPkg(EmailPkg ep) {
        try {
            Connection conn = dataSource.getConnection();
            String smt = "{call updateEmailPackage(?,?,?,?,?,?,?,?,?,?,?,?)}";
            CallableStatement call = conn.prepareCall(smt);

            call.registerOutParameter(1, Types.INTEGER);

            if (ep.getEid() != null)
                call.setInt(1, ep.getEid());
            else
                call.setNull(1, Types.INTEGER);

            call.setString(2, ep.getUid());

            call.setTimestamp(3, ep.getTime());

            if (ep.getTid() != null)
                call.setInt(4, ep.getTid());
            else
                call.setNull(4, Types.INTEGER);

            if (ep.getPlaceholdersJSON() != null)
                call.setString(5, ep.getPlaceholdersJSON().toJSONString());
            else
                call.setNull(5, Types.BLOB);

            call.setString(6, ep.getNamelistJSON().toJSONString());

            call.setString(7, ep.getFrom());

            if (ep.getCclist() != null)
                call.setString(8, ep.getCclist());
            else
                call.setNull(8, Types.BLOB);

            if (ep.getBcclist() != null)
                call.setString(9, ep.getBcclist());
            else
                call.setNull(9, Types.BLOB);

            call.setString(10, ep.getSubject());

            call.setString(11, ep.getContent());

            if (ep.getAttachment_list() != null)
                call.setString(12, ep.getAttachment_list());
            else call.setNull(12, Types.BLOB);

            call.executeUpdate();

            int eid = call.getInt(1);

            call.close();
            conn.close();
            return eid;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public boolean delEmlPkg(String uid, Integer eid) {
        try {
            Connection conn = dataSource.getConnection();
            String insertStatement = "delete from email where (eid = ?) and (uid = ?)";
            PreparedStatement ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
            ps.setInt(1, eid);
            ps.setString(2, uid);
            int result = ps.executeUpdate();

            ps.close();
            conn.close();

            return (result > 0);

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public ArrayList<EmailPkg> getEmlPkg(String uid) {
        try {
            Connection conn = dataSource.getConnection();
            String insertStatement = "select * from email where (uid = ?)";
            PreparedStatement ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
            ps.setString(1, uid);
            ResultSet rs = ps.executeQuery();

            ArrayList<EmailPkg> epSet = extractEmlPkgSet(rs);

            ps.close();
            conn.close();

            return epSet;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public ArrayList<EmailPkg> getEmlPkg(String uid, Integer eid) {
        try {
            Connection conn = dataSource.getConnection();
            String insertStatement = "select * from email where (eid = ?) and (uid = ?)";
            PreparedStatement ps =  (PreparedStatement) conn.prepareStatement(insertStatement);
            ps.setInt(1, eid);
            ps.setString(2, uid);
            ResultSet rs = ps.executeQuery();

            ArrayList<EmailPkg> epSet = extractEmlPkgSet(rs);

            ps.close();
            conn.close();

            return epSet;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private ArrayList<Template> extractTempSet(ResultSet rs) {
        ArrayList<Template> tempSet = new ArrayList<>();
        try {
            while (rs.next()) {
                int _tid = rs.getInt("tid");
                String _uid = rs.getString("uid");
                String _name = rs.getString("name");
                String _content = rs.getString("content");
                Template t = new Template(_tid, _uid, _name, _content);
                tempSet.add(t);
            }
            return tempSet;
        } catch (SQLException e) {
            e.printStackTrace();
            return tempSet;
        }
    }

    private ArrayList<EmailPkg> extractEmlPkgSet(ResultSet rs) {
        ArrayList<EmailPkg> epSet = new ArrayList<>();
        try {
            while (rs.next()) {
                Integer _eid = rs.getInt("eid");
                String _uid = rs.getString("uid");
                Timestamp _time = rs.getTimestamp("sendtime");
                Integer _tid = rs.getInt("tid");
                String _from = rs.getString("from");
                String _cclist = rs.getString("cclist");
                String _bcclist = rs.getString("bcclist");
                String _subject = rs.getString("subject");
                String _content = rs.getString("content");
                String _attachment_list = rs.getString("attachmentlist");

                HashMap<String, String> _placeholders = null;
                HashMap<String, String> _namelist = null;

                String placeholderStr = rs.getString("placeholderlist");
                String namelistStr = rs.getString("namelist");

                if (placeholderStr != null)
                    _placeholders = Util.convertPlaceHolderListFromJSON(placeholderStr);

                if (namelistStr != null)
                    _namelist = Util.convertNameListFromJSON(namelistStr);

                EmailPkg ep = new EmailPkg(_eid, _uid, _time, _tid, _placeholders, _namelist, _from, _cclist, _bcclist, _subject, _content, _attachment_list);
                epSet.add(ep);
            }
            return epSet;
        } catch (Exception e) {
            e.printStackTrace();
            return epSet;
        }
    }
}