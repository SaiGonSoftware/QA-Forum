package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 15/12/2016.
 */

public class ResultLogin {
    @SerializedName("login")
    @Expose
    private boolean login;
    @SerializedName("url")
    @Expose
    private String url;
    @SerializedName("userSession")
    @Expose
    private String userSession;

    public boolean isLogin() {
        return login;
    }

    public void setLogin(boolean login) {
        this.login = login;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUserSession() {
        return userSession;
    }

    public void setUserSession(String userSession) {
        this.userSession = userSession;
    }
}
