package com.example.instamail_backend.controller;

import com.example.instamail_backend.dto.request.LoginRequest;
import com.example.instamail_backend.dto.request.SignUpRequest;
import com.example.instamail_backend.dto.response.LoginResponse;
import com.example.instamail_backend.dto.response.SignUpResponse;
import com.example.instamail_backend.service.AuthService.AuthServiceProxy;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthServiceProxy authServiceProxy;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authServiceProxy.login(loginRequest); // Proxy method
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            System.out.println(ex);
            return ResponseEntity.status(401).body(null); // Unauthorized
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        try {
            SignUpResponse response = authServiceProxy.signUp(signUpRequest); // Proxy method
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new SignUpResponse(ex.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        authServiceProxy.logout(request, response); // Proxy method
        return ResponseEntity.ok("Logout successful");
    }
}