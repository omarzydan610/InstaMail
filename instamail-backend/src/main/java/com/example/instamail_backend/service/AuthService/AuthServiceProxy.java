package com.example.instamail_backend.service.AuthService;

import com.example.instamail_backend.dto.request.LoginRequest;
import com.example.instamail_backend.dto.request.SignUpRequest;
import com.example.instamail_backend.dto.response.LoginResponse;
import com.example.instamail_backend.dto.response.SignUpResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceProxy implements AuthServiceInterface {

    @Autowired
    private AuthService authService;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        // Pre-processing logic (e.g., logging, validation)
        System.out.println("Login request received for email: " + loginRequest.getEmail());

        // Delegate to the real service
        LoginResponse response = authService.login(loginRequest);

        // Post-processing logic (e.g., logging, transformation)
        System.out.println("Login successful for email: " + loginRequest.getEmail());
        return response;
    }

    @Override
    public SignUpResponse signUp(SignUpRequest signUpRequest) {
        // Pre-processing logic
        System.out.println("Sign-up request received for email: " + signUpRequest.getEmail());

        // Delegate to the real service
        SignUpResponse response = authService.signUp(signUpRequest);

        // Post-processing logic
        System.out.println("Sign-up successful for email: " + signUpRequest.getEmail());
        return response;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        // Pre-processing logic
        System.out.println("Logout request received");

        // Delegate to the real service
        authService.logout(request, response);

        // Post-processing logic
        System.out.println("Logout successful");
    }
}