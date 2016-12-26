package com.example.nhatnguyen.tdtforum.adapter;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.nhatnguyen.tdtforum.QuestionDetailsActivity;
import com.example.nhatnguyen.tdtforum.R;
import com.example.nhatnguyen.tdtforum.entity.Question;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

/**
 * Created by nhatnguyen on 26/11/2016.
 */

public class CustomRecylerQuestionAdapter extends RecyclerView.Adapter<CustomRecylerQuestionAdapter.RecyclerViewHolder> {
    private List<Question> listQuestion = new ArrayList<>();

    public CustomRecylerQuestionAdapter(List<Question> listQuestion){
        this.listQuestion= listQuestion;
    }

    public void updateList(List<Question> questions){
        listQuestion = questions;
        notifyDataSetChanged();
    }
    @Override
    public RecyclerViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View itemView = inflater.inflate(R.layout.question_item, parent,false);
        return new RecyclerViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(RecyclerViewHolder holder, int position) {
        holder.textViewQuestion.setText(listQuestion.get(position).getTitle());
        holder.textViewContentQuestion.setText(listQuestion.get(position).getContent());
        holder.textViewUserQuestion.setText("Bởi: "+listQuestion.get(position).getUserQuestion());
        holder.textViewCreateDate.setText("Lúc: "+listQuestion.get(position).getCreateDate().toLocaleString());
    }

    @Override
    public int getItemCount() {
        return listQuestion.size();
    }

    public class RecyclerViewHolder extends RecyclerView.ViewHolder {
        public TextView textViewQuestion;
        public TextView textViewContentQuestion;
        public TextView textViewUserQuestion;
        public TextView textViewCreateDate;
        public RecyclerViewHolder(View itemView) {
            super(itemView);
            textViewQuestion = (TextView) itemView.findViewById(R.id.text_view_question);
            textViewContentQuestion = (TextView) itemView.findViewById(R.id.text_view_content_question);
            textViewUserQuestion = (TextView) itemView.findViewById(R.id.text_view_user_question);
            textViewCreateDate = (TextView) itemView.findViewById(R.id.text_view_create_date);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {

                    Intent intent = new Intent(view.getContext(), QuestionDetailsActivity.class);
                    Bundle bundle = new Bundle();
                    bundle.putSerializable("id",listQuestion.get(getAdapterPosition()).get_id());
                    bundle.putSerializable("question",  listQuestion.get(getAdapterPosition()));
                    intent.putExtra("bundle", bundle);
                    view.getContext().startActivity(intent);
                }
            });
        }


    }
}
