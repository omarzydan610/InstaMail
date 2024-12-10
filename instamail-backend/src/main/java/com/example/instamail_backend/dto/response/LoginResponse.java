package com.example.instamail_backend.dto.response;

import com.example.instamail_backend.model.User;

import lombok.Getter;

@Getter
public class LoginResponse {
    private String token;
    private User user;

    public LoginResponse(String token,User user) {
        this.token = token;
        this.user=user;
    }

}