package com.example.nhatnguyen.tdtforum;

import android.content.Intent;
import android.content.res.Configuration;
import android.support.design.widget.NavigationView;
import android.support.v4.widget.DrawerLayout;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Gravity;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.adapter.CustomRecylerQuestionAdapter;
import com.example.nhatnguyen.tdtforum.entity.LoginData;
import com.example.nhatnguyen.tdtforum.entity.Question;
import com.example.nhatnguyen.tdtforum.entity.Questions;
import com.example.nhatnguyen.tdtforum.entity.ResultLogin;
import com.example.nhatnguyen.tdtforum.service.APIService;
import com.example.nhatnguyen.tdtforum.ultilities.EndlessRecyclerViewScrollListener;
import com.example.nhatnguyen.tdtforum.ultilities.SessionManager;
import com.facebook.AccessToken;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;



import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;


public class MainActivity extends AppCompatActivity implements SwipeRefreshLayout.OnRefreshListener {
    public static final int REQUEST_CODE= 101;
    public static final int RESULT_CODE= 102;
    SwipeRefreshLayout swipeRefreshLayout;
    DrawerLayout drawerLayout;
    ActionBarDrawerToggle drawerToggle;
    NavigationView navigation;
    RecyclerView recyclerView;
    LinearLayoutManager layoutManager;
    CustomRecylerQuestionAdapter adapter;
    List<Question> listQuestion =new ArrayList<Question>();
    EditText editTextAddQuestion;
    AccessToken accessToken;
    SessionManager sessionManager;
    boolean isLoading = false;
    int requestPage= 0;
    APIService apiService;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
        apiService = retrofit.create(APIService.class);

        initInstances();
        autoSignIn();
        if(isLoggedIn()) Toast.makeText(MainActivity.this,"UserId: "+ accessToken.getUserId() , Toast.LENGTH_LONG).show();

    }
    public void autoSignIn(){
        if(sessionManager.isLoggedIn()){
            LoginData loginData = sessionManager.getUserSession();
            Call<ResultLogin> call = apiService.loginUser(loginData);
            call.enqueue(new Callback<ResultLogin>() {
                @Override
                public void onResponse(Call<ResultLogin> call, Response<ResultLogin> response) {

                }

                @Override
                public void onFailure(Call<ResultLogin> call, Throwable t) {

                }
            });
        }
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(!sessionManager.isLoggedIn()) return;
        finish();
        startActivity(getIntent());
    }

    public boolean isLoggedIn() {
        accessToken = AccessToken.getCurrentAccessToken();
        return accessToken != null;
    }
    private void initInstances() {

        sessionManager = new SessionManager(this);
        recyclerView = (RecyclerView)findViewById(R.id.recycler_view_question);
        recyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new CustomRecylerQuestionAdapter(listQuestion);
        recyclerView.setAdapter(adapter);
        recyclerView.addOnScrollListener(new EndlessRecyclerViewScrollListener(layoutManager) {
            @Override
            public void onLoadMore(int page, int totalItemsCount, RecyclerView view) {
                swipeRefreshLayout.setRefreshing(true);
                loadMoreQuestion();
            }
        });

        swipeRefreshLayout = (SwipeRefreshLayout)(findViewById(R.id.swipe_refresh_layout));
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.post(new Runnable() {
            @Override
            public void run() {
                swipeRefreshLayout.setRefreshing(true);
               // loadQuestions();
                loadMoreQuestion();
            }
        });

        android.support.v7.app.ActionBar actionBar = this.getSupportActionBar();
        actionBar.setHomeButtonEnabled(true);
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setTitle("Trang chủ");
        actionBar.setCustomView(R.layout.custom_action_bar_edittext);
        actionBar.setDisplayShowCustomEnabled(true);



        editTextAddQuestion =(EditText)actionBar.getCustomView().findViewById(R.id.edittext_add_question);
        editTextAddQuestion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this, NewQuestionActivity.class);
                startActivity(intent);
            }
        });

        drawerLayout = (DrawerLayout) findViewById(R.id.drawerLayout);
        drawerToggle = new ActionBarDrawerToggle(MainActivity.this, drawerLayout, R.string.hello_world, R.string.hello_world);
        // drawerToggle.syncState();
        drawerLayout.setDrawerListener(drawerToggle);

        navigation = (NavigationView) findViewById(R.id.navigation_view);
        if(sessionManager.isLoggedIn()){
            navigation.getMenu().findItem(R.id.navigation_item_user).setVisible(true);
            navigation.getMenu().findItem(R.id.navigation_view_category_3).setVisible(true);
            navigation.getMenu().findItem(R.id.navigation_item_user).setTitle(sessionManager.getUserSession().getUsernameLogin());
           // navigation.getMenu().getItem(R.id.navigation_item_sign_in).setVisible(false);
        }
       else navigation.getMenu().findItem(R.id.navigation_item_sign_in).setVisible(true);
        navigation.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(MenuItem menuItem) {
                int id = menuItem.getItemId();
                switch (id) {
                    case R.id.navigation_item_sign_in:
                        Intent intentSignIn = new Intent(MainActivity.this, LoginActivity.class);
                        startActivityForResult(intentSignIn,REQUEST_CODE);
                        break;
                    case R.id.navigation_item_main_page:

                        break;
                    case R.id.navigation_item_search:
                        //Do some thing here
                        // add navigation drawer item onclick method here
                        break;
                    case R.id.navigation_item_category:
                        Intent intentCategory = new Intent(MainActivity.this, CategoryActivity.class);
                        startActivity(intentCategory);
                        break;
                    case R.id.navigation_item_sign_out:
                        sessionManager.logoutUser();
                        Call<String> call =apiService.logoutUser();
                        call.enqueue(new Callback<String>() {
                            @Override
                            public void onResponse(Call<String> call, Response<String> response) {

                            }

                            @Override
                            public void onFailure(Call<String> call, Throwable t) {

                            }
                        });
                        finish();
                        startActivity(getIntent());
                        break;
                }
                drawerLayout.closeDrawer(Gravity.LEFT);
                return false;
            }
        });
    }

    @Override
    public void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        drawerToggle.syncState();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        drawerToggle.onConfigurationChanged(newConfig);
        Toast.makeText(this,"Configuration Changed", Toast.LENGTH_SHORT).show();
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (drawerToggle.onOptionsItemSelected(item)) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
    public void loadMoreQuestion(){
        requestPage ++;

        Call<Questions> call = apiService.loadNextQuestion(requestPage);

        call.enqueue(new Callback<Questions>() {
            @Override
            public void onResponse(Call<Questions> call, Response<Questions> response) {
                if (response.isSuccessful() && response.body() != null) {
                    listQuestion.clear();
                    listQuestion.addAll(response.body().getQuestions()) ;
                    adapter.notifyDataSetChanged();
                    swipeRefreshLayout.setRefreshing(false);

                    isLoading=false;

                }
            }

            @Override
            public void onFailure(Call<Questions> call, Throwable t) {

            }
        });
    }

    @Override
    public void onRefresh() {
        loadMoreQuestion();
    }
}