package com.example.instamail_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "mails")
@Getter
@Setter
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false) // Sender reference
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false) // Receiver reference
    private User receiver;

    private String subject;
    private String content;

    private LocalDateTime createdAt;

    private boolean isRead;
    private boolean isDraft;
    private int priority;

    private boolean isStarred;
    private boolean isDeletedForSender;
    private boolean isDeletedForReceiver;

    private LocalDateTime deletedAtSender;
    private LocalDateTime deletedAtReceiver;
}

