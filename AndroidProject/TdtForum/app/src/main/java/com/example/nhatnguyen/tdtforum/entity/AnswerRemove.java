package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 30/12/2016.
 */

public class AnswerRemove {
    @SerializedName("answerId")
    @Expose
    private String answerId;

    public String getAnswerId() {
        return answerId;
    }

    public void setAnswerId(String answerId) {
        this.answerId = answerId;
    }
}
