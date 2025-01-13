package com.immunologyHomepage.service.implement;

import com.immunologyHomepage.service.AdminService;

public class AdminServiceImplement implements AdminService{

    private String userString;
    private String password;

    @Override
    public String getUserName() {
        return userString;
    }

    @Override
    public void setUserName(String userString) {
        this.userString = userString;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }
    
}
