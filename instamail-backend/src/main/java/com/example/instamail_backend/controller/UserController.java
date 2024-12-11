package com.example.instamail_backend.controller;

import com.example.instamail_backend.model.User;
import com.example.instamail_backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<?> getUserFromToken(@RequestHeader("Authorization") String token) {
        System.out.println("userrequest");
        System.out.println(userService);
        try {
            User user = userService.getUserByToken(token);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

}
