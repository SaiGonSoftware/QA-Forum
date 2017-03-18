package com.example.nhatnguyen.tdtforum.service;

import com.example.nhatnguyen.tdtforum.entity.Answer;
import com.example.nhatnguyen.tdtforum.entity.AnswerEdit;
import com.example.nhatnguyen.tdtforum.entity.AnswerRemove;
import com.example.nhatnguyen.tdtforum.entity.Category;
import com.example.nhatnguyen.tdtforum.entity.LikeData;
import com.example.nhatnguyen.tdtforum.entity.LoginData;
import com.example.nhatnguyen.tdtforum.entity.Question;
import com.example.nhatnguyen.tdtforum.entity.QuestionDetails;
import com.example.nhatnguyen.tdtforum.entity.QuestionInCategory;
import com.example.nhatnguyen.tdtforum.entity.QuestionSearch;
import com.example.nhatnguyen.tdtforum.entity.Questions;
import com.example.nhatnguyen.tdtforum.entity.RegisData;
import com.example.nhatnguyen.tdtforum.entity.ResultLogin;
import com.example.nhatnguyen.tdtforum.entity.ResultPost;
import com.example.nhatnguyen.tdtforum.entity.ResultRegister;
import com.example.nhatnguyen.tdtforum.ultilities.HeaderInterceptor;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;


import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;


/**
 * Created by nhatnguyen on 26/11/2016.
 */

public interface APIService {
    Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").setLenient().create();
    static Retrofit retrofit = new Retrofit.Builder()
             // .baseUrl("http://10.0.0.2:3000/api/")
            .baseUrl("http://192.168.43.110:3000/api/")
             //.baseUrl("http://tdtforum.herokuapp.com/api/")
            // .baseUrl("http://10.0.0.156:3000/api/")
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build();

    @GET("mobile/GetAllQuestion")
    Call<List<Question>> loadQuestions();

    @GET("GetNextQuestion/{page}")
    Call<Questions> loadNextQuestion(@Path("page") int page);

    @GET("GetQuestionDetail/{id}")
    Call<QuestionDetails> loadQuestionDetails(@Path("id") String id);

    @GET("GetCategory")
    Call<List<Category>> loadCategories();

    @POST("Account/Register")
    Call<ResultRegister> registerUser(@Body RegisData regisData);

    @POST("Account/Login")
    Call<ResultLogin> loginUser(@Body LoginData loginData);

    @GET("GetQuestionViaCategory/{id}")
    Call<QuestionInCategory> loadQuestionInCategory(@Path("id") String id);

    @GET("Account/Logout")
    Call<String> logoutUser();

    @POST("Account/PostAnswer/{id}")
    Call<ResultPost> postAnswer(@Path("id")String id, @Body Answer answer);

    @POST("Account/PostQuestion")
    Call<ResultPost> postQuestion(@Body Question question);

    @POST("Account/LikeAnswer")
    Call<ResultPost> addLike(@Body LikeData likeData);

    @POST("Answer/UnLike")
    Call<ResultPost> unLike(@Body LikeData likeData);

    @POST("Answer/AddDislike")
    Call<ResultPost> addDislike(@Body LikeData likeData);

    @POST("Answer/UnDislike")
    Call<ResultPost> unDislike(@Body LikeData likeData);

    @GET("SearchMobile/{queryString}")
    Call<QuestionSearch> findQuestion(@Path("queryString") String queryString);

    @POST("Answer/RemoveAnswer")
    Call<ResultPost> removeAnswer(@Body AnswerRemove answerRemove);

    @POST("Answer/EditAnswer/{id}")
    Call<ResultPost> editAnswer(@Path("id")String id, @Body AnswerEdit answerEdit);



}
