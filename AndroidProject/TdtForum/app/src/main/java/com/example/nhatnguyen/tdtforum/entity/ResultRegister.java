package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 14/12/2016.
 */

public class ResultRegister {
    @SerializedName("success")
    @Expose
    private boolean Success;
    @SerializedName("url")
    @Expose
    private String url;
    @SerializedName("foundBoth")
    @Expose
    private boolean foundBoth;
    @SerializedName("foundAccount")
    @Expose
    private boolean foundAccount;
    @SerializedName("foundEmail")
    @Expose
    private boolean foundEmail;

    public boolean isFoundBoth() {
        return foundBoth;
    }

    public void setFoundBoth(boolean foundBoth) {
        this.foundBoth = foundBoth;
    }

    public boolean isFoundAccount() {
        return foundAccount;
    }

    public void setFoundAccount(boolean foundAccount) {
        this.foundAccount = foundAccount;
    }

    public boolean isFoundEmail() {
        return foundEmail;
    }

    public void setFoundEmail(boolean foundEmail) {
        this.foundEmail = foundEmail;
    }

    public boolean isSuccess() {
        return Success;
    }

    public void setSuccess(boolean success) {
        Success = success;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
