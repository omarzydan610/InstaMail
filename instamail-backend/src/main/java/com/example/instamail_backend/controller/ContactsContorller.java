package com.example.instamail_backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
        try {
            contactsService.addContact(token, contact);
            return ResponseEntity.ok("Contact added");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }

    @GetMapping("/get-contacts")
    public ResponseEntity<?> getContacts(@RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(contactsService.getContacts(token));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }

    @GetMapping("/get-contact-emails/{contactId}")
    public ResponseEntity<?> getContactEmails(@RequestHeader("Authorization") String token,
            @PathVariable Long contactId) {
        try {
            return ResponseEntity.ok(contactsService.getContactEmails(token, contactId));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete-contact/{contactId}")
    public ResponseEntity<?> deleteContact(@RequestHeader("Authorization") String token, @PathVariable Long contactId) {
        try {
            contactsService.deleteContact(token, contactId);
            return ResponseEntity.ok("Contact deleted");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }

    @PutMapping("/update-contact/{contactId}")
    public ResponseEntity<?> updateContact(@RequestHeader("Authorization") String token, @PathVariable Long contactId,
            @RequestBody Map<String, String> contact) {
                try {
            contactsService.updateContact(token, contactId, contact);
            return ResponseEntity.ok("Contact updated");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }
}
