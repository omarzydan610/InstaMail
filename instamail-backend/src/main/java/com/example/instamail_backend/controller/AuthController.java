package com.example.instamail_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.UserRepository;

@RestController
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
       try {
        
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
       } catch (Exception e) {
        return ResponseEntity.status(400).body("Error registering user");
       }
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
       try {
        User userFromDb = userRepository.findByUsername(user.getUsername());
        if (userFromDb != null && userFromDb.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("User logged in successfully");
        } else {
            return ResponseEntity.status(400).body("Invalid password");
        }
       } catch (Exception e) {
        return ResponseEntity.status(400).body("Error logging in user");
       }
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody User user) {
        return ResponseEntity.ok("User logged out successfully");
    }
}
