package com.example.nhatnguyen.tdtforum;

import android.app.FragmentManager;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Handler;

import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;

import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.adapter.CustomRecyclerAnswerAdapter;
import com.example.nhatnguyen.tdtforum.entity.Answer;
import com.example.nhatnguyen.tdtforum.entity.Question;
import com.example.nhatnguyen.tdtforum.entity.QuestionDetails;
import com.example.nhatnguyen.tdtforum.entity.ResultPost;
import com.example.nhatnguyen.tdtforum.service.APIService;
import com.example.nhatnguyen.tdtforum.ultilities.HidingScrollListener;
import com.example.nhatnguyen.tdtforum.ultilities.SessionManager;
import com.example.nhatnguyen.tdtforum.ultilities.ShowToast;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;


public class QuestionDetailsActivity extends AppCompatActivity implements SwipeRefreshLayout.OnRefreshListener {
    String idQuestion;
    QuestionDetails questionDetails;
    EditText editTextAnswer;
    Button buttonSendAnswer;
    List<Answer> listAnswer= new ArrayList<>();
    Question question;
    RecyclerView recyclerView;
    RecyclerView.LayoutManager layoutManager;
    CustomRecyclerAnswerAdapter adapter;
    LinearLayout layoutReply;
    SwipeRefreshLayout swipeRefreshLayout;
    APIService apiService;
    SessionManager sessionManager;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_details);
        getSupportActionBar().setTitle("Câu trả lời");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        sessionManager = new SessionManager(this);
        apiService = retrofit.create(APIService.class);

        editTextAnswer = (EditText)findViewById(R.id.edit_text_answer);
        buttonSendAnswer= (Button)findViewById(R.id.button_send_answer);
        buttonSendAnswer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(sessionManager.isLoggedIn()){
                    Answer answer = new Answer();
                    answer.setUserAnswer(sessionManager.getUserSession().getUsernameLogin());
                    answer.setQuestionId(idQuestion);
                    answer.setContent(editTextAnswer.getText().toString());
                    answer.setCreateDate(gmttoLocalDate(new Date()));
                    answer.setReferences(new ArrayList<>(Arrays.asList("http://references1.com","http://references2.com")));
                    Call<ResultPost> call = apiService.postAnswer(idQuestion,answer);
                    call.enqueue(new Callback<ResultPost>() {
                        @Override
                        public void onResponse(Call<ResultPost> call, Response<ResultPost> response) {
                            new ShowToast(QuestionDetailsActivity.this,response.body().getMsg(), Toast.LENGTH_LONG).show();
                            editTextAnswer.setText("");
                            loadData();
                        }

                        @Override
                        public void onFailure(Call<ResultPost> call, Throwable t) {
                            new ShowToast(QuestionDetailsActivity.this,t.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });

                }
                else {
                    new ShowToast(QuestionDetailsActivity.this,"Đăng nhập trước khi trả lời", Toast.LENGTH_LONG).show();
                }

            }
        });
        swipeRefreshLayout= (SwipeRefreshLayout)findViewById(R.id.swipe_refresh_layout_question_details);
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.post(new Runnable() {
            @Override
            public void run() {
                swipeRefreshLayout.setRefreshing(true);
                loadData();
            }
        });
        Intent callerIntent = getIntent();
        Bundle bundle=callerIntent.getBundleExtra("bundle");
        question = (Question) bundle.getSerializable("question");
        idQuestion = bundle.getString("id");

        layoutReply =(LinearLayout)findViewById(R.id.layout_reply);
        recyclerView = (RecyclerView)(findViewById(R.id.recycler_view_question_details));
        recyclerView.setOnScrollListener(new HidingScrollListener() {
            @Override
            public void onHide() {

                layoutReply.animate().translationY(layoutReply.getHeight()).setInterpolator(new AccelerateInterpolator(2));
                layoutReply.setVisibility(View.GONE);

            }
            @Override
            public void onShow() {
                layoutReply.setVisibility(View.VISIBLE);
                layoutReply.animate().translationY(0).setInterpolator(new DecelerateInterpolator(2));
            }
        });
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new CustomRecyclerAnswerAdapter(listAnswer, question);
        recyclerView.setAdapter(adapter);


    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public void loadData(){

      //  new LoadData().execute();

        Call<QuestionDetails> call = apiService.loadQuestionDetails(idQuestion);
        call.enqueue(new Callback<QuestionDetails>() {
            @Override
            public void onResponse(Call<QuestionDetails> call, Response<QuestionDetails> response) {
                if (response.isSuccessful() && response.body() != null) {
                    listAnswer.clear();
                    questionDetails = response.body();
                    listAnswer.addAll(questionDetails.getAnswers());
                    adapter.notifyDataSetChanged();
                    swipeRefreshLayout.setRefreshing(false);
                }
            }

            @Override
            public void onFailure(Call<QuestionDetails> call, Throwable t) {
                new ShowToast(QuestionDetailsActivity.this, "Fail "+ t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });


    }

    @Override
    public void onRefresh() {
        loadData();
    }
    public static Date gmttoLocalDate(Date date) {

        String timeZone = Calendar.getInstance().getTimeZone().getID();
        Date local = new Date(date.getTime() + TimeZone.getTimeZone(timeZone).getOffset(date.getTime()));
        return local;
    }
}
