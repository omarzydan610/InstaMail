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
@Table(name = "mails")
@Getter
@Setter
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   
    private String senderEmail;
    private String receiverEmail;

    private String subject;
    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    private boolean isRead;
    private boolean isDraft;

    private int senderPriority;
    private int receiverPriority;

    private boolean senderIsStarred;
    private boolean receiverIsStarred;

    private boolean senderIsDeleted;
    private boolean receiverIsDeleted;

    private long senderFolderId;
    private long receiverFolderId;

    private LocalDateTime deletedAtSender;
    private LocalDateTime deletedAtReceiver;

    public Mail() {

    }

    public Mail(String senderEmail, String receiverEmail, String subject, String content, int senderPriority,
            int receiverPriority, long senderFolderId, long receiverFolderId, boolean senderIsStarred,
            boolean receiverIsStarred, boolean senderIsDeleted, boolean receiverIsDeleted) {
        this.senderEmail = senderEmail;
        this.receiverEmail = receiverEmail;
        this.subject = subject;
        this.content = content;
        this.senderPriority = senderPriority;
        this.receiverPriority = receiverPriority;
        this.senderFolderId = senderFolderId;
        this.receiverFolderId = receiverFolderId;
        this.senderIsStarred = senderIsStarred;
        this.receiverIsStarred = receiverIsStarred;
        this.senderIsDeleted = senderIsDeleted;
        this.receiverIsDeleted = receiverIsDeleted;
    }
}

