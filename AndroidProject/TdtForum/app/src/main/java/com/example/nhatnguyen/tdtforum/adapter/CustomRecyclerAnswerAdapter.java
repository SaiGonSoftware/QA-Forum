package com.example.nhatnguyen.tdtforum.adapter;

import android.media.Image;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.R;
import com.example.nhatnguyen.tdtforum.entity.Answer;
import com.example.nhatnguyen.tdtforum.entity.LikeData;
import com.example.nhatnguyen.tdtforum.entity.Question;
import com.example.nhatnguyen.tdtforum.entity.ResultPost;
import com.example.nhatnguyen.tdtforum.service.APIService;
import com.example.nhatnguyen.tdtforum.ultilities.SessionManager;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;

/**
 * Created by nhatnguyen on 01/12/2016.
 */

public class CustomRecyclerAnswerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private List<Answer> listAnswer = new ArrayList<>();
    private Question question;
    public static final int QUESTION=0;
    public static final int ANSWER=1;
    SessionManager sessionManager;
    APIService apiService;
    public CustomRecyclerAnswerAdapter(List<Answer> listAnswer, Question question){
        this.listAnswer= listAnswer;
        this.question=question;
        apiService = retrofit.create(APIService.class);

    }

    @Override
    public int getItemViewType(int position) {
        if(position ==0) return QUESTION;
        return ANSWER;

    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        switch (viewType){
            case QUESTION:
                View itemViewQuestion = inflater.inflate(R.layout.question_item,parent,false);
                return new QuestionViewHolder(itemViewQuestion);
            case ANSWER:
                View itemViewAnswer = inflater.inflate(R.layout.answer_item, parent,false);
                return new AnswerViewHolder(itemViewAnswer);
        }
        return null;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        switch (getItemViewType(position)) {
            case QUESTION:
                QuestionViewHolder questionViewHolder = (QuestionViewHolder) holder;
                questionViewHolder.textViewQuestion.setText(question.getTitle());
                questionViewHolder.textViewContentQuestion.setText(question.getContent());
                questionViewHolder.textViewUserQuestion.setText("Bởi: "+question.getUserQuestion());
                questionViewHolder.textViewCreateDate.setText("Lúc: "+question.getCreateDate());
                break;
            case ANSWER:
                int newPosition = position-1;
                AnswerViewHolder answerViewHolder = (AnswerViewHolder)holder;
                answerViewHolder.textViewContentAnswer.setText(listAnswer.get(newPosition).getContent());
                answerViewHolder.textViewUserAnswer.setText("Trả lời bởi: "+ listAnswer.get(newPosition).getUserAnswer());
                answerViewHolder.textViewLikes.setText(listAnswer.get(newPosition).getLike().size()+"");
                answerViewHolder.textViewDislikes.setText(listAnswer.get(newPosition).getDislike().size()+"");
                answerViewHolder.textViewCreateDateAnswer.setText("Lúc: "+ listAnswer.get(newPosition).getCreateDate());
                if(listAnswer.get(newPosition).getLike().contains(sessionManager.getUserSession().getUsernameLogin())){
                    answerViewHolder.imageViewLike.setImageResource(R.mipmap.like_icon);
                }
                if(listAnswer.get(newPosition).getDislike().contains(sessionManager.getUserSession().getUsernameLogin())){
                    answerViewHolder.imageViewDisLike.setImageResource(R.mipmap.dislike_icon);
                }
                break;
        }
    }



    @Override
    public int getItemCount() {
        return 1+listAnswer.size();
    }

    public class AnswerViewHolder extends RecyclerView.ViewHolder{
        public TextView textViewUserAnswer;
        public TextView textViewContentAnswer;
        public TextView textViewLikes;
        public TextView textViewDislikes;
        public TextView textViewCreateDateAnswer;
        public ImageView imageViewLike;
        public ImageView imageViewDisLike;
        public AnswerViewHolder(View itemView) {

            super(itemView);
            sessionManager = new SessionManager(itemView.getContext());
            textViewContentAnswer = (TextView)itemView.findViewById(R.id.text_view_content_answer);
            textViewUserAnswer = (TextView)itemView.findViewById(R.id.text_view_user_answer);
            textViewLikes = (TextView)itemView.findViewById(R.id.text_view_like);
            textViewDislikes = (TextView)itemView.findViewById(R.id.text_view_dislike);
            textViewCreateDateAnswer = (TextView)itemView.findViewById(R.id.text_view_create_date_answer);
            imageViewLike = (ImageView)itemView.findViewById(R.id.image_view_like);
            imageViewLike.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(final View view) {

                    LikeData likeData = new LikeData();
                    likeData.setUserLike(sessionManager.getUserSession().getUsernameLogin());
                    likeData.setAnswerIdLike(listAnswer.get(getAdapterPosition()-1).get_id());
                    if(listAnswer.get(getAdapterPosition()-1).getLike().contains(sessionManager.getUserSession().getUsernameLogin())){
                        //listAnswer.get(getAdapterPosition()-1).getLike().remove(getAdapterPosition()-1);
                        for(String removeLike: listAnswer.get(getAdapterPosition()-1).getLike()){
                            if(removeLike.equals(sessionManager.getUserSession().getUsernameLogin())){
                                listAnswer.get(getAdapterPosition()-1).getLike().remove(removeLike);
                            }
                        }
                        int likeNumber = Integer.parseInt(textViewLikes.getText().toString())-1;
                        textViewLikes.setText(likeNumber+"");
                        imageViewLike.setImageResource(R.mipmap.unlike_icon);
                        Call<ResultPost> call = apiService.unLike(likeData);
                        call.enqueue(new Callback<ResultPost>() {
                            @Override
                            public void onResponse(Call<ResultPost> call, Response<ResultPost> response) {
                               // Toast.makeText(view.getContext(), response.body().getMsg(), Toast.LENGTH_SHORT).show();

                            }

                            @Override
                            public void onFailure(Call<ResultPost> call, Throwable t) {
                               // Toast.makeText(view.getContext(), t.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        });
                        return;
                    }
                    else {
                        listAnswer.get(getAdapterPosition()-1).getLike().add(sessionManager.getUserSession().getUsernameLogin());
                        int likeNumber = Integer.parseInt(textViewLikes.getText().toString())+1;
                        textViewLikes.setText(likeNumber+"");
                        imageViewLike.setImageResource(R.mipmap.like_icon);
                        Call<ResultPost> call = apiService.addLike(likeData);
                        call.enqueue(new Callback<ResultPost>() {
                            @Override
                            public void onResponse(Call<ResultPost> call, Response<ResultPost> response) {
                               // Toast.makeText(view.getContext(), response.body().getMsg(), Toast.LENGTH_LONG).show();

                            }

                            @Override
                            public void onFailure(Call<ResultPost> call, Throwable t) {
                              //  Toast.makeText(view.getContext(), t.getMessage(), Toast.LENGTH_LONG).show();

                            }
                        });
                    }
                }
            });
            imageViewDisLike = (ImageView)itemView.findViewById(R.id.image_view_dislike);
            imageViewDisLike.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    LikeData likeData = new LikeData();
                    likeData.setUserLike(sessionManager.getUserSession().getUsernameLogin());
                    likeData.setAnswerIdLike(listAnswer.get(getAdapterPosition()-1).get_id());
                    if(listAnswer.get(getAdapterPosition()-1).getDislike().contains(sessionManager.getUserSession().getUsernameLogin())){
                        //listAnswer.get(getAdapterPosition()-1).getLike().remove(getAdapterPosition()-1);
                        for(String removeLike: listAnswer.get(getAdapterPosition()-1).getDislike()){
                            if(removeLike.equals(sessionManager.getUserSession().getUsernameLogin())){
                                listAnswer.get(getAdapterPosition()-1).getDislike().remove(removeLike);
                            }
                        }
                        int likeNumber = Integer.parseInt(textViewDislikes.getText().toString())-1;
                        textViewDislikes.setText(likeNumber+"");
                        imageViewDisLike.setImageResource(R.mipmap.undislike_icon);
                        Call<ResultPost> call = apiService.unDislike(likeData);
                        call.enqueue(new Callback<ResultPost>() {
                            @Override
                            public void onResponse(Call<ResultPost> call, Response<ResultPost> response) {
                                // Toast.makeText(view.getContext(), response.body().getMsg(), Toast.LENGTH_SHORT).show();

                            }

                            @Override
                            public void onFailure(Call<ResultPost> call, Throwable t) {
                                // Toast.makeText(view.getContext(), t.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        });
                        return;
                    }
                    else {
                        listAnswer.get(getAdapterPosition()-1).getDislike().add(sessionManager.getUserSession().getUsernameLogin());
                        int likeNumber = Integer.parseInt(textViewDislikes.getText().toString())+1;
                        textViewDislikes.setText(likeNumber+"");
                        imageViewDisLike.setImageResource(R.mipmap.dislike_icon);
                        Call<ResultPost> call = apiService.addDislike(likeData);
                        call.enqueue(new Callback<ResultPost>() {
                            @Override
                            public void onResponse(Call<ResultPost> call, Response<ResultPost> response) {
                                // Toast.makeText(view.getContext(), response.body().getMsg(), Toast.LENGTH_LONG).show();

                            }

                            @Override
                            public void onFailure(Call<ResultPost> call, Throwable t) {
                                //  Toast.makeText(view.getContext(), t.getMessage(), Toast.LENGTH_LONG).show();

                            }
                        });
                    }
                }
            });
        }
    }
    public class QuestionViewHolder extends RecyclerView.ViewHolder{
        public TextView textViewQuestion;
        public TextView textViewContentQuestion;
        public TextView textViewUserQuestion;
        public TextView textViewCreateDate;

        public QuestionViewHolder(View itemView) {
            super(itemView);
            textViewQuestion = (TextView) itemView.findViewById(R.id.text_view_question);
            textViewContentQuestion = (TextView) itemView.findViewById(R.id.text_view_content_question);
            textViewUserQuestion = (TextView) itemView.findViewById(R.id.text_view_user_question);
            textViewCreateDate = (TextView) itemView.findViewById(R.id.text_view_create_date);
        }
    }
}
