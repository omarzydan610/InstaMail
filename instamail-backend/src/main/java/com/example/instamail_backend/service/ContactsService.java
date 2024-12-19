package com.example.instamail_backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.instamail_backend.model.Contact;
import com.example.instamail_backend.model.ContactEmail;
import com.example.instamail_backend.repository.ContactEmailRepository;
import com.example.instamail_backend.repository.ContactRepository;

@Service
public class ContactsService {

    @Autowired
    private UserService userService;
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ContactEmailRepository contactEmailRepository;

    public void addContact(String token, Map<String, String> contact) {
        long userId = userService.getIdByToken(token);
        String contactName = contact.get("name");
        Contact newContact = new Contact(userId, contactName);
        try {
            contactRepository.save(newContact);
        } catch (Exception e) {
            throw new RuntimeException("Contact already exists");
        }
        Long contactId = newContact.getContactId();
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

    }

    public List<Contact> getContacts(String token) {
        try {
            long userId = userService.getIdByToken(token);
            List<Contact> contacts = contactRepository.findByUserId(userId);
            contacts.sort((c1, c2) -> c1.getContactId().compareTo(c2.getContactId()));
            return contacts;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch contacts");
        }
    }

    public List<ContactEmail> getContactEmails(String token, Long contactId) {
        try {
            userService.getIdByToken(token);
            List<ContactEmail> contactEmails = contactEmailRepository.findByContactId(contactId);
            contactEmails.sort((e1, e2) -> e1.getId().compareTo(e2.getId()));
            return contactEmails;
        } catch (Exception e) {

            throw new RuntimeException("Failed to fetch contact emails");
        }
    }

    @Transactional
    public void deleteContact(String token, Long contactId) {
        try {
            contactEmailRepository.deleteByContactId(contactId);
            contactRepository.deleteById(contactId);
        } catch (Exception e) {

            throw new RuntimeException("Failed to delete contact");
        }
    }

    @Transactional
    public void updateContact(String token, Long contactId, Map<String, String> contact) {
        try {
            userService.getIdByToken(token);
            Contact updatedContact = contactRepository.findById(contactId)
                    .orElseThrow(() -> new RuntimeException("Contact not found"));
            updatedContact.setContactName(contact.get("name"));
            contactRepository.save(updatedContact);

            List<String> emails = new ArrayList<String>();
            for (Map.Entry<String, String> entry : contact.entrySet()) {
                if (entry.getKey().startsWith("email")) {
                    emails.add(entry.getValue());
                }
            }

            contactEmailRepository.deleteByContactId(contactId);
            for (String email : emails) {
                ContactEmail newEmail = new ContactEmail(contactId, email);
                contactEmailRepository.save(newEmail);
            }
        } catch (Exception e) {

            throw new RuntimeException("Failed to update contact");
        }
    }

}
