package com.example.instamail_backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.instamail_backend.service.ContactsService;

@RestController
public class ContactsContorller {

    @Autowired
    private ContactsService contactsService;

    @PostMapping("/add-contact")
    public ResponseEntity<?> addContact(@RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> contact) {
        System.out.println("hi");
        try {
            contactsService.addContact(token, contact);
            return ResponseEntity.ok("Contact added");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
