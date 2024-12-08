package com.example.instamail_backend.dto.response;

import lombok.Getter;

@Getter
public class SignUpResponse {
    private String message;

    public SignUpResponse(String message) {
        this.message = message;
    }
}