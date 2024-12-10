package com.example.instamail_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.UserRepository;
import com.example.instamail_backend.util.JwtUtil;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public User getUserByToken(String token) {
        System.out.println(token);
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        System.out.println(token);

        // Decode the token and get the username or ID
        Long Id = jwtUtil.extractId(token);
        System.out.println(Id);
        // Fetch the user from the database
        User user = userRepository.findById(Id).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user);
        return user;
    }
}
