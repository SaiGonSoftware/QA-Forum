package com.example.nhatnguyen.tdtforum;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.speech.RecognizerIntent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.entity.Category;
import com.example.nhatnguyen.tdtforum.entity.Question;
import com.example.nhatnguyen.tdtforum.entity.ResultPost;
import com.example.nhatnguyen.tdtforum.service.APIService;
import com.example.nhatnguyen.tdtforum.ultilities.SessionManager;
import com.example.nhatnguyen.tdtforum.ultilities.ShowToast;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;

public class NewQuestionActivity extends AppCompatActivity {
    private final int REQ_CODE_SPEECH_INPUT = 100;
    Spinner spinner;
    EditText editTextTitleQuestion;
    EditText editTextContentQuestion;
    ArrayList<Category> listCategory;
    ArrayAdapter<Category> adapter;
    APIService apiService;
    Button buttonSendQuestion;
    Button buttonSpeak;
    String idCategory;
    SessionManager sessionManager;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_question);
        apiService = retrofit.create(APIService.class);
        sessionManager = new SessionManager(this);
        initInstances();
        loadCategory();
    }

    private void initInstances() {
        android.support.v7.app.ActionBar actionBar = this.getSupportActionBar();
        actionBar.setHomeButtonEnabled(true);
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setTitle("Đặt câu hỏi");
        actionBar.setCustomView(R.layout.custom_action_bar_button);
        actionBar.setDisplayShowCustomEnabled(true);
        editTextTitleQuestion = (EditText)findViewById(R.id.edit_text_title_question);
        editTextContentQuestion = (EditText)findViewById(R.id.edit_text_content_question);
        buttonSpeak = (Button)findViewById(R.id.button_tap_to_speech);
        buttonSpeak.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                promptSpeechInput();
            }
        });
        buttonSendQuestion = (Button)findViewById(R.id.button_send_question);
        buttonSendQuestion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(idCategory.equals("-1")){
                    new ShowToast(NewQuestionActivity.this,"Chưa chọn chủ đề",Toast.LENGTH_LONG).show();
                    return;
                }
                if(!sessionManager.isLoggedIn()){
                    new ShowToast(NewQuestionActivity.this,"Chưa đăng nhập",Toast.LENGTH_LONG).show();
                    return;
                }
                if(editTextTitleQuestion.getText().toString().equals("")|| editTextContentQuestion.getText().toString().equals("")){
                    new ShowToast(NewQuestionActivity.this,"Thiếu tiêu đề hoặc nội dung",Toast.LENGTH_LONG).show();
                    return;
                }
                Question question = new Question();
                question.setCategoryId(idCategory);
                question.setUserQuestion(sessionManager.getUserSession().getUsernameLogin());
                question.setTitle(editTextTitleQuestion.getText().toString());
                question.setContent(editTextContentQuestion.getText().toString());
                question.setCreateDate(gmttoLocalDate(new Date()));
                Call<ResultPost> call = apiService.postQuestion(question);
                call.enqueue(new Callback<ResultPost>() {
                    @Override
                    public void onResponse(Call<ResultPost> call, Response<ResultPost> response) {
                        new ShowToast(NewQuestionActivity.this,response.body().getMsg(),Toast.LENGTH_LONG).show();
                        finish();
                    }

                    @Override
                    public void onFailure(Call<ResultPost> call, Throwable t) {
                        new ShowToast(NewQuestionActivity.this,"Lỗi "+ t.getMessage(),Toast.LENGTH_LONG).show();
                    }
                });
            }
        });

        listCategory = new ArrayList<>();
        listCategory.add(new Category("-1","Chọn chủ đề"));
        spinner = (Spinner)findViewById(R.id.spinner_category);
        adapter=new ArrayAdapter<>(this,android.R.layout.simple_spinner_item, listCategory );
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);

       spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
           @Override
           public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

               if(listCategory.get(0).get_id().equals("-1") && i!=0) listCategory.remove(0);
               idCategory = listCategory.get(i).get_id();

           }

           @Override
           public void onNothingSelected(AdapterView<?> adapterView) {

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
            new ShowToast(NewQuestionActivity.this,
                    getString(R.string.speech_not_supported),
                    Toast.LENGTH_SHORT).show();
        }
    }

    private void loadCategory(){

        Call<List<Category>> call = apiService.loadCategories();
        call.enqueue(new Callback<List<Category>>() {
            @Override
            public void onResponse(Call<List<Category>> call, Response<List<Category>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    listCategory.addAll(response.body()) ;
                    adapter.notifyDataSetChanged();

                }
            }

            @Override
            public void onFailure(Call<List<Category>> call, Throwable t) {

            }
        });
    }
    public static Date gmttoLocalDate(Date date) {

        String timeZone = Calendar.getInstance().getTimeZone().getID();
        Date local = new Date(date.getTime() + TimeZone.getTimeZone(timeZone).getOffset(date.getTime()));
        return local;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data
                            .getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    editTextContentQuestion.setText(result.get(0));
                }
                break;
            }

        }
    }
}
