package com.example.nhatnguyen.tdtforum.adapter;


import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.QuestionDetailsActivity;
import com.example.nhatnguyen.tdtforum.QuestionsInCategoryActivity;
import com.example.nhatnguyen.tdtforum.R;
import com.example.nhatnguyen.tdtforum.entity.Category;
import com.example.nhatnguyen.tdtforum.entity.QuestionInCategory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nhatnguyen on 17/12/2016.
 */

public class CustomRecyclerCatgoryAdapter extends RecyclerView.Adapter<CustomRecyclerCatgoryAdapter.RecyclerViewHolder> {
    private List<Category> listCategory = new ArrayList<>();
    public CustomRecyclerCatgoryAdapter(List<Category> listCategory){
        this.listCategory= listCategory;
    }

    @Override
    public CustomRecyclerCatgoryAdapter.RecyclerViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View itemView = inflater.inflate(R.layout.category_item, parent,false);
        return new RecyclerViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(CustomRecyclerCatgoryAdapter.RecyclerViewHolder holder, int position) {
        holder.textViewCategoryName.setText(listCategory.get(position).getName());
    }

    @Override
    public int getItemCount() {
        return listCategory.size();
    }


    public class RecyclerViewHolder extends RecyclerView.ViewHolder {
        public TextView textViewCategoryName;
        public RecyclerViewHolder(View itemView) {
            super(itemView);
            textViewCategoryName = (TextView)itemView.findViewById(R.id.text_view_category_name);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {

                    Intent intent = new Intent(view.getContext(), QuestionsInCategoryActivity.class);
                    Bundle bundle = new Bundle();
                    bundle.putSerializable("id",listCategory.get(getAdapterPosition()).get_id());
                    bundle.putSerializable("name", listCategory.get(getAdapterPosition()).getName());
                    intent.putExtra("bundle", bundle);
                    view.getContext().startActivity(intent);
                }
            });
        }
    }
}
