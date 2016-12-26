package com.example.nhatnguyen.tdtforum.entity;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by nhatnguyen on 17/12/2016.
 */

public class Category {
    @SerializedName("_id")
    @Expose
    private String _id;
    @SerializedName("Name")
    @Expose String Name;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    @Override
    public String toString() {
        return this.getName();
    }
    public Category(String id, String name){
        this._id= id;
        this.Name = name;
    }
}
