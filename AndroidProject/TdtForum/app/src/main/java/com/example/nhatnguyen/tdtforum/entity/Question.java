package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Date;

import javax.annotation.Generated;

/**
 * Created by nhatnguyen on 26/11/2016.
 */
public class Question implements Serializable {
    @SerializedName("_id")
    @Expose
    private String _id;
    @SerializedName("CategoryId")
    @Expose
    private String CategoryId;
    @SerializedName("UserQuestion")
    @Expose
    private String UserQuestion;
    @SerializedName("Title")
    @Expose
    private  String Title;
    @SerializedName("Content")
    @Expose
    private  String Content;
    @SerializedName("CreateDate")
    @Expose
    private Date CreateDate;

    public String getUserQuestion() {
        return UserQuestion;
    }

    public void setUserQuestion(String userQuestion) {
        UserQuestion = userQuestion;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }
    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
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

    public String getCategoryId() {
        return CategoryId;
    }

    public void setCategoryId(String categoryId) {
        CategoryId = categoryId;
    }
}
