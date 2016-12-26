package com.example.nhatnguyen.tdtforum.ultilities;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.LoginActivity;
import com.example.nhatnguyen.tdtforum.R;

/**
 * Created by nhatnguyen on 26/12/2016.
 */

public class ShowToast {
    Toast toast;
    public ShowToast(Activity activity, String text, int duration){
        LayoutInflater inflater = activity.getLayoutInflater();
        View toastLayout = inflater.inflate(R.layout.custom_toast, (ViewGroup) activity.findViewById(R.id.custom_toast_layout));
        TextView textViewCustomToast = (TextView)toastLayout.findViewById(R.id.text_view_custom_toast_message);
        toast = Toast.makeText(activity,"", Toast.LENGTH_LONG);
        toast.setDuration(duration);
        toast.setView(toastLayout);
        textViewCustomToast.setText(text);
    }
    public void show(){
        toast.show();
    }
}
