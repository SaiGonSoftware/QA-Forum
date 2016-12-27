package com.example.nhatnguyen.tdtforum;

import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.adapter.CustomRecyclerCatgoryAdapter;
import com.example.nhatnguyen.tdtforum.entity.Category;
import com.example.nhatnguyen.tdtforum.service.APIService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;

public class CategoryActivity extends AppCompatActivity implements SwipeRefreshLayout.OnRefreshListener {
    private List<Category> listCategory;
    CustomRecyclerCatgoryAdapter adapter;
    RecyclerView recyclerView;
    RecyclerView.LayoutManager layoutManager;
    SwipeRefreshLayout swipeRefreshLayout;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_category);
        getSupportActionBar().setTitle(R.string.category);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initInstances();

    }
    private void initInstances(){
        listCategory = new ArrayList<>();
        adapter = new CustomRecyclerCatgoryAdapter(listCategory);
        recyclerView = (RecyclerView)findViewById(R.id.recycler_view_category);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setAdapter(adapter);

        swipeRefreshLayout = (SwipeRefreshLayout)(findViewById(R.id.swipe_refresh_layout_category));
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.post(new Runnable() {
            @Override
            public void run() {
                swipeRefreshLayout.setRefreshing(true);
                loadCategory();
            }
        });
    }
    private void loadCategory() {
        APIService apiService = retrofit.create(APIService.class);
        Call<List<Category>> call = apiService.loadCategories();
        call.enqueue(new Callback<List<Category>>() {
            @Override
            public void onResponse(Call<List<Category>> call, Response<List<Category>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    listCategory.addAll(response.body()) ;
                    adapter.notifyDataSetChanged();
                    swipeRefreshLayout.setRefreshing(false);
                }
            }

            @Override
            public void onFailure(Call<List<Category>> call, Throwable t) {

            }
        });
    }

    @Override
    public void onRefresh() {
        loadCategory();
    }
}
