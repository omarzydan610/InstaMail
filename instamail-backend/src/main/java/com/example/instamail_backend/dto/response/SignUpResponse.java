package com.example.instamail_backend.dto.response;

import lombok.Getter;

@Getter
public class SignUpResponse {
    private String token;

    public SignUpResponse(String token) {
        this.token = token;
    }
}