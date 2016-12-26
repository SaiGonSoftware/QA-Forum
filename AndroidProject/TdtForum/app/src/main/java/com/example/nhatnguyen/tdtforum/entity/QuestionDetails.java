package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by nhatnguyen on 01/12/2016.
 */

public class QuestionDetails {
    @SerializedName("found")
    @Expose
    boolean Found;
    @SerializedName("msg")
    @Expose
    String Msg;
    @SerializedName("questionDetail")
    @Expose
    Question QuestionDetails;
    @SerializedName("answers")
    @Expose
    List<Answer> Answers;

    public boolean isFound() {
        return Found;
    }

    public void setFound(boolean found) {
        Found = found;
    }

    public String getMsg() {
        return Msg;
    }

    public void setMsg(String msg) {
        Msg = msg;
    }

    public Question getQuestionDetails() {
        return QuestionDetails;
    }

    public void setQuestionDetails(Question questionDetails) {
        QuestionDetails = questionDetails;
    }

    public List<Answer> getAnswers() {
        return Answers;
    }

    public void setAnswers(List<Answer> answers) {
        Answers = answers;
    }
}
