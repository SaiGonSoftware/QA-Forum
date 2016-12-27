package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 28/12/2016.
 */

public class QuestionFind {
    @SerializedName("findString")
    @Expose
    String findString;

    public String getFindString() {
        return findString;
    }

    public void setFindString(String findString) {
        this.findString = findString;
    }
}
