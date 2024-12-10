package com.example.instamail_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "contacts", 
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"userId", "contactName"})
    }
)
@Getter
@Setter
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Foreign key to ContactEmail
    private Long contactId;

    private Long userId;

    private String contactName;

    public Contact(Long userId, String contactName) {
        this.userId = userId;
        this.contactName = contactName;
    }
}
