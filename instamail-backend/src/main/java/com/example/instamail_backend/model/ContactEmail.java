package com.example.instamail_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "contact_email")
@Getter
@Setter
public class ContactEmail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private long contactId;
    private String email;

    public ContactEmail(long contactId, String email) {
        this.contactId = contactId;
        this.email = email;
    }
}
