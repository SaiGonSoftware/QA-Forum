package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by nhatnguyen on 22/12/2016.
 */

public class QuestionInCategory {
    @SerializedName("found")
    @Expose
    private boolean found;
    @SerializedName("msg")
    @Expose
    private String msg;
    @SerializedName("categories")
    @Expose
    private List<Question> listQuestion;

    public boolean isFound() {
        return found;
    }

    public void setFound(boolean found) {
        this.found = found;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List<Question> getListQuestion() {
        return listQuestion;
    }

    public void setListQuestion(List<Question> listQuestion) {
        this.listQuestion = listQuestion;
    }
}
