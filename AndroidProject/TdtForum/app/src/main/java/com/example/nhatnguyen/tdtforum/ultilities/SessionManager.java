package com.example.nhatnguyen.tdtforum.ultilities;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.Toast;

import com.example.nhatnguyen.tdtforum.LoginActivity;
import com.example.nhatnguyen.tdtforum.entity.LoginData;

import java.util.HashMap;

/**
 * Created by nhatnguyen on 22/12/2016.
 */

public class SessionManager {
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    Context context;
    int PRIVATE_MODE = 0;
    private static final String PREF_NAME = "Pref";
    private static final String IS_LOGIN = "IsLoggedIn";
    public static final String KEY_NAME = "username";
    public static final String KEY_PASS ="password";
    public SessionManager(Context context){
        this.context = context;
        pref = context.getSharedPreferences(PREF_NAME, PRIVATE_MODE);
        editor = pref.edit();
    }

    public void createLoginSession(String name, String password){
        editor.putBoolean(IS_LOGIN, true);
        editor.putString(KEY_NAME, name);
        editor.putString(KEY_PASS, password);
        editor.commit();
    }



    /**
     * Get stored session data
     * */
    public LoginData getUserSession(){
        LoginData loginData = new LoginData();
        loginData.setUsernameLogin(pref.getString(KEY_NAME, null));
        loginData.setPasswordLogin(pref.getString(KEY_PASS,null));
        return loginData;
    }

    /**
     * Clear session details
     * */
    public void logoutUser(){
        // Clearing all data from Shared Preferences
        editor.clear();
        editor.commit();
    }

    /**
     * Quick check for login
     * **/
    // Get Login State
    public boolean isLoggedIn(){
        return pref.getBoolean(IS_LOGIN, false);
    }
}
