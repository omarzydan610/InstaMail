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

    private Boolean isRead;
    private Boolean isDraft;

    private Integer senderPriority;
    private Integer receiverPriority;

    private Boolean isSenderStarred;
    private Boolean isReceiverStarred;

    private Boolean isSenderDeleted;
    private Boolean isReceiverDeleted;

    private Long senderFolderId;
    private Long receiverFolderId;

    private LocalDateTime deletedAtSender;
    private LocalDateTime deletedAtReceiver;

    public Mail() {

    }

    public Mail(String receiverEmail, String subject, String content) {
        this.senderEmail = null;
        this.receiverEmail = receiverEmail;
        this.subject = subject;
        this.content = content;
        this.senderPriority = 0;
        this.receiverPriority = 0;
        this.senderFolderId = 0L;
        this.receiverFolderId = 0L;
        this.isSenderStarred = null;
        this.isReceiverStarred = null;
        this.isSenderDeleted = null;
        this.isReceiverDeleted = null;
        this.isRead = null;
        this.isDraft = null;
        this.createdAt = LocalDateTime.now();
        this.deletedAtSender = null;
        this.deletedAtReceiver = null;
    }

}
