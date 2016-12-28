package com.example.nhatnguyen.tdtforum.ultilities;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by nhatnguyen on 28/12/2016.
 */

public class HeaderInterceptor {
    public static String currentUser;
    public static OkHttpClient.Builder httpClient;
    public static OkHttpClient client;


    public static HeaderInterceptor create(){
        httpClient = new OkHttpClient.Builder();
        httpClient.addInterceptor(new Interceptor() {
            @Override
            public Response intercept(Interceptor.Chain chain) throws IOException {
                Request original = chain.request();

                Request request = original.newBuilder()
                        .header("User-Agent", "Your-App-Name")
                        .header("Accept", "application/vnd.yourapi.v1.full+json")
                        .header("Cookie", "ls.currentUser=nhatnguyen95")
                        .method(original.method(), original.body())
                        .build();

                return chain.proceed(request);
            }
        });
        client = httpClient.build();
        return null;
    }

}
