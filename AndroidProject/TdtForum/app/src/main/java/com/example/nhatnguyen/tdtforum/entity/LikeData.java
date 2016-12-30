package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 26/12/2016.
 */

public class LikeData {
    @SerializedName("AnswerId")
    @Expose
    private String AnswerIdLike;
    @SerializedName("UserLike")
    @Expose
    private String UserLike;

    public String getAnswerIdLike() {
        return AnswerIdLike;
    }

    public void setAnswerIdLike(String answerIdLike) {
        AnswerIdLike = answerIdLike;
    }

    public String getUserLike() {
        return UserLike;
    }

    public void setUserLike(String userLike) {
        UserLike = userLike;
    }
}
