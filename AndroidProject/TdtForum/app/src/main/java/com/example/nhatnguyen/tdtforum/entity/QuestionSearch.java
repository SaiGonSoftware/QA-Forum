package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by nhatnguyen on 07/03/2017.
 */

public class QuestionSearch {

    public List<Question> getQuestionSearch() {
        return questionSearch;
    }

    public void setQuestionSearch(List<Question> questionSearch) {
        this.questionSearch = questionSearch;
    }

    @SerializedName("questions")
    @Expose
    List<Question>questionSearch;






}
