package com.example.nhatnguyen.tdtforum;

import android.app.ProgressDialog;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.ProgressBar;

import com.example.nhatnguyen.tdtforum.adapter.CustomRecylerQuestionAdapter;
import com.example.nhatnguyen.tdtforum.entity.Category;
import com.example.nhatnguyen.tdtforum.entity.Question;
import com.example.nhatnguyen.tdtforum.entity.QuestionInCategory;
import com.example.nhatnguyen.tdtforum.service.APIService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;

public class QuestionsInCategoryActivity extends AppCompatActivity {
    String idCategory;
    RecyclerView recyclerView;
    LinearLayoutManager layoutManager;
    CustomRecylerQuestionAdapter adapter;
    List<Question> listQuestion =new ArrayList<Question>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_questions_in_category);

        Intent callerIntent = getIntent();
        Bundle bundle=callerIntent.getBundleExtra("bundle");
        idCategory = bundle.getString("id");
        getSupportActionBar().setTitle(bundle.getString("name"));
        initInstances();

        loadQuestions();

    }
    private void initInstances(){

        recyclerView = (RecyclerView)findViewById(R.id.recycler_view_question_in_category);
        recyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new CustomRecylerQuestionAdapter(listQuestion);
        recyclerView.setAdapter(adapter);
    }
    private void loadQuestions(){
        APIService apiService = retrofit.create(APIService.class);
        Call<QuestionInCategory> call = apiService.loadQuestionInCategory(idCategory);
        call.enqueue(new Callback<QuestionInCategory>() {
            @Override
            public void onResponse(Call<QuestionInCategory> call, Response<QuestionInCategory> response) {
                if (response.isSuccessful() && response.body() != null) {
                    listQuestion.addAll(response.body().getListQuestion());
                    adapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<QuestionInCategory> call, Throwable t) {

            }
        });
    }
}
