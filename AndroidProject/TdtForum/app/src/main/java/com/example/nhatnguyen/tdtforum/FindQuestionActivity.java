package com.example.nhatnguyen.tdtforum;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.EditText;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.adapter.CustomRecylerQuestionAdapter;
import com.example.nhatnguyen.tdtforum.entity.Question;
import com.example.nhatnguyen.tdtforum.entity.QuestionFind;
import com.example.nhatnguyen.tdtforum.entity.Questions;
import com.example.nhatnguyen.tdtforum.service.APIService;
import com.example.nhatnguyen.tdtforum.ultilities.ShowToast;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;

public class FindQuestionActivity extends AppCompatActivity {
    APIService apiService;
    RecyclerView recyclerView;
    EditText editTextFindString;
    LinearLayoutManager layoutManager;
    CustomRecylerQuestionAdapter adapter;
    List<Question> listQuestion =new ArrayList<Question>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_find_question);
        apiService = retrofit.create(APIService.class);
        recyclerView = (RecyclerView)findViewById(R.id.recycler_view_find_question);
        editTextFindString= (EditText)findViewById(R.id.edit_text_find_string);
        recyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new CustomRecylerQuestionAdapter(listQuestion);
        recyclerView.setAdapter(adapter);
        editTextFindString.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                loadQuestion();
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
    }

    private void loadQuestion(){
        if(editTextFindString.getText().toString().equals("")){
            listQuestion.clear();
            adapter.notifyDataSetChanged();
            return;
        }
        QuestionFind questionFind = new QuestionFind();
        questionFind.setFindString(editTextFindString.getText().toString());
        Call<Questions> call = apiService.findQuestion(questionFind);
        call.enqueue(new Callback<Questions>() {
            @Override
            public void onResponse(Call<Questions> call, Response<Questions> response) {
                listQuestion.clear();
                listQuestion.addAll(response.body().getQuestions()) ;
                adapter.notifyDataSetChanged();
            }

            @Override
            public void onFailure(Call<Questions> call, Throwable t) {

            }
        });
    }
}
