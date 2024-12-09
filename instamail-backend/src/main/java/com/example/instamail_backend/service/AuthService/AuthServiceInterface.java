package com.example.instamail_backend.service.AuthService;

import com.example.instamail_backend.dto.request.LoginRequest;
import com.example.instamail_backend.dto.request.SignUpRequest;
import com.example.instamail_backend.dto.response.LoginResponse;
import com.example.instamail_backend.dto.response.SignUpResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthServiceInterface {
    LoginResponse login(LoginRequest loginRequest);

    SignUpResponse signUp(SignUpRequest signUpRequest);

    void logout(HttpServletRequest request, HttpServletResponse response);
}