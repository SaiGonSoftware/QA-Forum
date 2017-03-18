package com.example.nhatnguyen.tdtforum;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.speech.RecognizerIntent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.adapter.CustomRecylerQuestionAdapter;
import com.example.nhatnguyen.tdtforum.entity.Question;
import com.example.nhatnguyen.tdtforum.entity.QuestionFind;
import com.example.nhatnguyen.tdtforum.entity.QuestionSearch;
import com.example.nhatnguyen.tdtforum.entity.Questions;
import com.example.nhatnguyen.tdtforum.service.APIService;
import com.example.nhatnguyen.tdtforum.ultilities.ShowToast;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;

public class FindQuestionActivity extends AppCompatActivity {
    private final int REQ_CODE_SPEECH_INPUT = 100;
    APIService apiService;
    RecyclerView recyclerView;
    EditText editTextFindString;
    LinearLayoutManager layoutManager;
    CustomRecylerQuestionAdapter adapter;
    List<Question> listQuestion =new ArrayList<Question>();
    Button buttonFindQuestion;
    Button buttonSpeak;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_find_question);
        getSupportActionBar().setTitle("Hỏi đáp");
        buttonFindQuestion= (Button)findViewById(R.id.button_find_question);
        apiService = retrofit.create(APIService.class);
        recyclerView = (RecyclerView)findViewById(R.id.recycler_view_find_question);
        editTextFindString= (EditText)findViewById(R.id.edit_text_find_string);
        recyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new CustomRecylerQuestionAdapter(listQuestion);
        recyclerView.setAdapter(adapter);
        buttonSpeak= (Button) findViewById(R.id.button_tap_to_speech_find_question);
        buttonSpeak.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                promptSpeechInput();
            }
        });
        buttonFindQuestion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(!editTextFindString.getText().toString().isEmpty())
                    loadQuestion();
            }
        });

    }
    private void promptSpeechInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT,
                getString(R.string.speech_prompt));
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
        } catch (ActivityNotFoundException a) {
            new ShowToast(FindQuestionActivity.this,
                    getString(R.string.speech_not_supported),
                    Toast.LENGTH_SHORT).show();
        }
    }
    private void loadQuestion(){

       // QuestionFind questionFind = new QuestionFind();
        String queryString= editTextFindString.getText().toString();
        Call<QuestionSearch> call = apiService.findQuestion(queryString);
        call.enqueue(new Callback<QuestionSearch>() {
            @Override
            public void onResponse(Call<QuestionSearch> call, Response<QuestionSearch> response) {
                listQuestion.clear();
                listQuestion.addAll(response.body().getQuestionSearch()) ;
                adapter.notifyDataSetChanged();
            }

            @Override
            public void onFailure(Call<QuestionSearch> call, Throwable t) {
                Log.e("Fail FindQuestion", t.getMessage());
            }
        });

//        call.enqueue(new Callback<Questions>() {
//            @Override
//            public void onResponse(Call<Questions> call, Response<Questions> response) {
//                Log.e("Message Content", response.body().toString());
//                listQuestion.clear();
//              //  listQuestion.addAll(response.body().getQuestions()) ;
//              //  Toast.makeText(FindQuestionActivity.this, response.body().getQuestions().get(0).getContent(),Toast.LENGTH_LONG).show();
//                adapter.notifyDataSetChanged();
//            }
//
//            @Override
//            public void onFailure(Call<Questions> call, Throwable t) {
//                Log.e("Fail FindQuestion", t.getMessage());
//            }
//        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data
                            .getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    editTextFindString.setText(result.get(0));
                }
                break;
            }

        }
    }
}
