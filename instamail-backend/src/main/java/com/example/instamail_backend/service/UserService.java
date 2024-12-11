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

    public Long getIdByToken(String token) {
        System.out.println(token);
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        System.out.println(token);
        try {
            Long Id = jwtUtil.extractId(token);
            System.out.println("Id: " + Id);
            return Id;
        } catch (Exception e) {
            System.out.println("Error : token is wrong or expired ");
            throw new RuntimeException("Invalid or expired token");
        }
    }

    public User getUserByToken(String token) {
        Long Id = getIdByToken(token);
        User user = userRepository.findById(Id).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user);
        return user;
    }
}
