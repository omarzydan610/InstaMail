package com.example.instamail_backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.model.Contact;
import com.example.instamail_backend.model.ContactEmail;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.ContactEmailRepository;
import com.example.instamail_backend.repository.ContactRepository;
import com.example.instamail_backend.repository.UserRepository;
import com.example.instamail_backend.util.JwtUtil;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ContactEmailRepository contactEmailRepository;

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

    public void addContact(String token, Map<String, String> contact) {
        Long userId;
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            userId = jwtUtil.extractId(token);
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException("Invalid or expired token");
        }
        String contactName = contact.get("name");
        Contact newContact = new Contact(userId, contactName);
        try {
            contactRepository.save(newContact);
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException("Contact already exists");
        }
        Long contactId = newContact.getContactId();
        System.out.println(contactId);
        List<String> emails = new ArrayList<String>();
        for (Map.Entry<String, String> entry : contact.entrySet()) {
            if (entry.getKey().startsWith("email")) {
                emails.add(entry.getValue());
            }
        }
        for (String email : emails) {
            ContactEmail newEmail = new ContactEmail(contactId, email);
            contactEmailRepository.save(newEmail);
        }
        System.out.println(contactName);
        System.out.println(emails);
    }
}
