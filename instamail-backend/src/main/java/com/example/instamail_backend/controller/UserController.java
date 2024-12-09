package com.example.instamail_backend.controller;

import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.UserRepository;
import com.example.instamail_backend.service.UserService;
import com.example.instamail_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    public ResponseEntity<?> getUserFromToken(@RequestHeader("Authorization") String token) {
        System.out.println("user request");
        try {
            // Extract the token by removing the "Bearer " prefix
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            System.out.println(token);

            // Decode the token and get the username or ID
            String email = jwtUtil.extractEmail(token);
            System.out.println(email);
            // Fetch the user from the database
            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
            System.out.println(user);

            // Return the user data as JSON
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }
}