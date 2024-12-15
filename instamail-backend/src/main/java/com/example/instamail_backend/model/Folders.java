package com.example.instamail_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "folders")    
@Setter
@Getter
public class Folders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;
    private Long userId;
    private String email;

    public Folders() {
    }

    public Folders(String name, String email, Long userId) {
        this.name = name;
        this.email = email;
        this.userId = userId;
        this.isDeleted = 0;
        this.createdAt = LocalDateTime.now();
        this.deletedAt = null;
    }

}
