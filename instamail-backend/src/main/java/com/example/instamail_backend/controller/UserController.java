package com.example.instamail_backend.controller;

import com.example.instamail_backend.model.User;
import com.example.instamail_backend.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
            // Return the user data as JSON
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    @PostMapping("/user/add-contact")
    public ResponseEntity<?> addContact(@RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> contact) {
        System.out.println("hi");
        try {
            userService.addContact(token, contact);
            return ResponseEntity.ok("Contact added");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
