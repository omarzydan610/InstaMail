package com.example.instamail_backend.service.AuthService;

import com.example.instamail_backend.dto.request.LoginRequest;
import com.example.instamail_backend.dto.request.SignUpRequest;
import com.example.instamail_backend.dto.response.LoginResponse;
import com.example.instamail_backend.dto.response.SignUpResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthServiceProxy implements AuthServiceInterface {

    @Autowired
    private AuthService authService;

    @Autowired
    private HttpServletRequest request;

    // Map to track login attempts by IP address
    private final Map<String, LoginAttempt> loginAttempts = new ConcurrentHashMap<>();

    // Add a new field to track ban status
    private final Map<String, Long> bannedUsers = new ConcurrentHashMap<>();

    private static class LoginAttempt {
        int count;
        long timestamp;

        LoginAttempt(int count, long timestamp) {
            this.count = count;
            this.timestamp = timestamp;
        }
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        String clientIp = request.getRemoteAddr();
        long currentTime = System.currentTimeMillis();

        // Check if the user is banned
        if (bannedUsers.containsKey(clientIp) && currentTime < bannedUsers.get(clientIp)) {
            throw new RuntimeException("You are temporarily banned from logging in. Please try again later.");
        }

        // Check if the IP address is already in the map
        loginAttempts.putIfAbsent(clientIp, new LoginAttempt(0, currentTime));

        LoginAttempt attempt = loginAttempts.get(clientIp);

        // Reset count if more than a minute has passed
        if (currentTime - attempt.timestamp > 60000) {
            attempt.count = 0;
            attempt.timestamp = currentTime;
        }

        // Check if the count exceeds the limit
        if (attempt.count >= 5) {
            // Ban the user for 2 minutes
            bannedUsers.put(clientIp, currentTime + 120000); // 120000 ms = 2 minutes
            System.out.println("Login attempt limit exceeded for IP: " + clientIp);
            throw new RuntimeException("Too many login attempts. You are banned for 2 minutes.");
        }

        // Increment the count and proceed with login
        attempt.count++;
        System.out.println("Login request received for email: " + loginRequest.getEmail());

        LoginResponse response = authService.login(loginRequest);

        System.out.println("Login successful for email: " + loginRequest.getEmail());
        return response;
    }

    @Override
    public SignUpResponse signUp(SignUpRequest signUpRequest) {
        System.out.println("Sign-up request received for email: " + signUpRequest.getEmail());

        SignUpResponse response = authService.signUp(signUpRequest);

        System.out.println("Sign-up successful for email: " + signUpRequest.getEmail());
        return response;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Logout request received");

        authService.logout(request, response);

        System.out.println("Logout successful");
    }
}