package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 14/12/2016.
 */

public class User {
    @SerializedName("_id")
    @Expose
    private String _id;
    @SerializedName("Account")
    @Expose
    private String Account;
    @SerializedName("Password")
    @Expose
    private String Password;
    @SerializedName("Email")
    @Expose
    private String Email;
    @SerializedName("Level")
    @Expose
    private int Level;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getAccount() {
        return Account;
    }

    public void setAccount(String account) {
        Account = account;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public int getLevel() {
        return Level;
    }

    public void setLevel(int level) {
        Level = level;
    }
}

