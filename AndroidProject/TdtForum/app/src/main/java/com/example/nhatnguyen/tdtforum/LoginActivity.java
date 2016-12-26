package com.example.nhatnguyen.tdtforum;

import android.app.ProgressDialog;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.Toast;

import static com.example.nhatnguyen.tdtforum.service.APIService.retrofit;

import com.example.nhatnguyen.tdtforum.entity.LoginData;
import com.example.nhatnguyen.tdtforum.entity.RegisData;
import com.example.nhatnguyen.tdtforum.entity.ResultLogin;
import com.example.nhatnguyen.tdtforum.entity.ResultRegister;
import com.example.nhatnguyen.tdtforum.service.APIService;
import com.example.nhatnguyen.tdtforum.ultilities.ExpandCollapseLayout;
import com.example.nhatnguyen.tdtforum.ultilities.SessionManager;
import com.example.nhatnguyen.tdtforum.ultilities.ShowToast;
import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    RadioButton radioButtonSignIn;
    RadioButton radioButtonSignUp;
    LinearLayout linearLayoutSignIn;
    LinearLayout linearLayoutSignUp;
    EditText editTextAccountSignIn;
    EditText editTextPasswordSignIn;
    EditText editTextAccountSignUp;
    EditText editTextPasswordSignUp;
    EditText editTextEmailSignUp;
    Button buttonSignIn;
    Button buttonSignUp;
    Button buttonSignOut;
    LoginButton loginButton;
    CallbackManager callbackManager;
    APIService apiService;
    ProgressDialog progressDialog;
    SessionManager sessionManager;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
        callbackManager = CallbackManager.Factory.create();
        setContentView(R.layout.activity_login);
        apiService = retrofit.create(APIService.class);
        initial();

    }

    private void initial() {
        sessionManager = new SessionManager(this);
        getSupportActionBar().setTitle(R.string.sign_in);
        progressDialog = new ProgressDialog(LoginActivity.this);
        progressDialog.setMessage("Đang xử lý...");


        editTextAccountSignIn= (EditText)findViewById(R.id.edit_text_account_sign_in);
        editTextPasswordSignIn= (EditText)findViewById(R.id.edit_text_password_sign_in);
        editTextAccountSignUp= (EditText)findViewById(R.id.edit_text_account_sign_up);
        editTextPasswordSignUp=(EditText)findViewById(R.id.edit_text_password_sign_up);
        editTextEmailSignUp = (EditText)findViewById(R.id.edit_text_email_sign_up);

        buttonSignOut =(Button)findViewById(R.id.button_sign_out);
        buttonSignIn = (Button)findViewById(R.id.button_sign_in);
        buttonSignUp = (Button)findViewById(R.id.button_sign_up);

        //Facebook Sigin In

        loginButton = (LoginButton)findViewById(R.id.button_sign_in_facebook);
        loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Toast.makeText(LoginActivity.this,"Đăng nhập thành công"+ loginResult.toString(), Toast.LENGTH_LONG).show();
            }

            @Override
            public void onCancel() {
                Toast.makeText(LoginActivity.this,"Đã hủy.", Toast.LENGTH_LONG).show();
            }

            @Override
            public void onError(FacebookException error) {
                Toast.makeText(LoginActivity.this,"Xảy ra lỗi", Toast.LENGTH_LONG).show();
            }
        });

        radioButtonSignIn = (RadioButton)findViewById(R.id.radio_button_sign_in);
        radioButtonSignUp= (RadioButton)findViewById(R.id.radio_button_sign_up);
        linearLayoutSignIn = (LinearLayout)findViewById(R.id.layout_sign_in);
        linearLayoutSignUp = (LinearLayout)findViewById(R.id.layout_sign_up);
        if(isLoggedIn()){
            linearLayoutSignIn.setVisibility(View.GONE);
            linearLayoutSignUp.setVisibility(View.GONE);
        }

        radioButtonSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(radioButtonSignUp.isChecked()){
                    getSupportActionBar().setTitle(R.string.sign_up);
                    ExpandCollapseLayout.collapse(linearLayoutSignIn);
                    ExpandCollapseLayout.expand(linearLayoutSignUp);
                }
            }
        });
        radioButtonSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(radioButtonSignIn.isChecked()){
                    getSupportActionBar().setTitle(R.string.sign_in);
                    ExpandCollapseLayout.collapse(linearLayoutSignUp);
                    ExpandCollapseLayout.expand(linearLayoutSignIn);
                }
            }
        });
        buttonSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progressDialog.show();
                RegisData data = new RegisData();
                data.setUsernameRegis(editTextAccountSignUp.getText().toString());
                data.setEmailRegis(editTextEmailSignUp.getText().toString());
                data.setPasswordRegis(editTextPasswordSignUp.getText().toString());
                Call<ResultRegister> call= apiService.registerUser(data);
                call.enqueue(new Callback<ResultRegister>() {
                    @Override
                    public void onResponse(Call<ResultRegister> call, Response<ResultRegister> response) {
                        if(response.body().isSuccess()) Toast.makeText(LoginActivity.this, "Tạo tài khoản thành công", Toast.LENGTH_LONG).show();
                        if(response.body().isFoundAccount()) Toast.makeText(LoginActivity.this, "Tên tài khoản đã có người sử dụng", Toast.LENGTH_LONG).show();
                        if(response.body().isFoundEmail()) Toast.makeText(LoginActivity.this, "Email đã có người sử dụng", Toast.LENGTH_LONG).show();
                        if(response.body().isFoundBoth()) Toast.makeText(LoginActivity.this, "Tên tài khoản và Email đã có người sử dụng", Toast.LENGTH_LONG).show();
                        progressDialog.dismiss();
                        finish();
                    }

                    @Override
                    public void onFailure(Call<ResultRegister> call, Throwable t) {
                        Toast.makeText(LoginActivity.this, "Đăng ký không thành công", Toast.LENGTH_LONG).show();
                        progressDialog.dismiss();
                        finish();
                    }
                });


            };
        });
        buttonSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progressDialog.show();
                LoginData loginData = new LoginData();
                loginData.setUsernameLogin(editTextAccountSignIn.getText().toString());
                loginData.setPasswordLogin(editTextPasswordSignIn.getText().toString());

                Call<ResultLogin> call = apiService.loginUser(loginData);
                call.enqueue(new Callback<ResultLogin>() {
                    @Override
                    public void onResponse(Call<ResultLogin> call, Response<ResultLogin> response) {

                        if(response.body().getUserSession() != null){
                            new ShowToast(LoginActivity.this,"Đăng nhập thành công",Toast.LENGTH_LONG).show();
                            sessionManager.createLoginSession(editTextAccountSignIn.getText().toString(),editTextPasswordSignIn.getText().toString());
                            finish();
                        }
                        else new ShowToast(LoginActivity.this,"Đăng nhập không thành công",Toast.LENGTH_LONG).show();
                        progressDialog.dismiss();
                    }

                    @Override
                    public void onFailure(Call<ResultLogin> call, Throwable t) {
                        new ShowToast(LoginActivity.this,"Đăng nhập không thành công",Toast.LENGTH_LONG).show();
                        progressDialog.dismiss();
                    }
                });

            }
        });
        buttonSignOut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(sessionManager.isLoggedIn()){
                    sessionManager.logoutUser();
                }
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode,resultCode,data);
        setResult(MainActivity.RESULT_CODE, data);

    }
    public boolean isLoggedIn() {
        AccessToken accessToken = AccessToken.getCurrentAccessToken();
        return accessToken != null;
    }
}
