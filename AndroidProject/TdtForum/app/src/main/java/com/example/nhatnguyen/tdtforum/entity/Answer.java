package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.Date;
import java.util.List;

/**
 * Created by nhatnguyen on 01/12/2016.
 */

public class Answer {
    @SerializedName("_id")
    @Expose
    private String _id;
    @SerializedName("QuestionId")
    @Expose
    private String QuestionId;
    @SerializedName("UserAnswer")
    @Expose
    private String UserAnswer;
    @SerializedName("Content")
    @Expose
    private String Content;
    @SerializedName("CreateDate")
    @Expose
    private Date CreateDate;
    @SerializedName("references")
    @Expose
    private List<String> references;
    @SerializedName("Dislike")
    @Expose
    private List<String> dislike;
    @SerializedName("Like")
    @Expose
    private List<String> like;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getQuestionId() {
        return QuestionId;
    }

    public void setQuestionId(String questionId) {
        QuestionId = questionId;
    }

    public String getUserAnswer() {
        return UserAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        UserAnswer = userAnswer;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }

    public Date getCreateDate() {
        return CreateDate;
    }

    public void setCreateDate(Date createDate) {
        CreateDate = createDate;
    }

    public List<String> getDislike() {
        return dislike;
    }

    public void setDislike(List<String> dislike) {
        this.dislike = dislike;
    }

    public List<String> getLike() {
        return like;
    }

    public void setLike(List<String> like) {
        this.like = like;
    }

    public List<String> getReferences() {
        return references;
    }

    public void setReferences(List<String> references) {
        this.references = references;
    }
}
