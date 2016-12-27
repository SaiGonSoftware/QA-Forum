package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 14/12/2016.
 */

public class RegisData {
    @SerializedName("UsernameRegis")
    @Expose
    private String UsernameRegis;
    @SerializedName("PasswordRegis")
    @Expose
    private String PasswordRegis;
    @SerializedName("EmailRegis")
    @Expose
    private String EmailRegis;

    public String getUsernameRegis() {
        return UsernameRegis;
    }

    public void setUsernameRegis(String usernameRegis) {
        UsernameRegis = usernameRegis;
    }

    public String getPasswordRegis() {
        return PasswordRegis;
    }

    public void setPasswordRegis(String passwordRegis) {
        PasswordRegis = passwordRegis;
    }

    public String getEmailRegis() {
        return EmailRegis;
    }

    public void setEmailRegis(String emailRegis) {
        EmailRegis = emailRegis;
    }
}
