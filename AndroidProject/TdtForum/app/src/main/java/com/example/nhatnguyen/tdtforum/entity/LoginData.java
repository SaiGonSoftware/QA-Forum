package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 15/12/2016.
 */

public class LoginData {
    @SerializedName("UsernameLogin")
    @Expose
    private String UsernameLogin;
    @SerializedName("PasswordLogin")
    @Expose
    private String PasswordLogin;

    public String getUsernameLogin() {
        return UsernameLogin;
    }

    public void setUsernameLogin(String usernameLogin) {
        UsernameLogin = usernameLogin;
    }

    public String getPasswordLogin() {
        return PasswordLogin;
    }

    public void setPasswordLogin(String passwordLogin) {
        PasswordLogin = passwordLogin;
    }
}
