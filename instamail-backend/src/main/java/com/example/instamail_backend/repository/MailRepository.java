package com.example.instamail_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instamail_backend.model.Mail;

public interface MailRepository extends JpaRepository<Mail, Long> {
    public List<Mail> findBySenderEmail(String senderEmail);

    // @Query("SELECT m,a FROM Mail m JOIN Attachment a ON m.mailId = a.mailId WHERE a.mailId = :mailId")
    // public List<Object[]> findByAttachmentMailId(@Param("mailId") long mailId);

    public List<Mail> findByReceiverEmail(String receiverEmail);

    public List<Mail> findBySenderEmailAndSenderIsDeleted(String senderEmail, boolean senderIsDeleted);

    public List<Mail> findBySenderEmailOrReceiverEmail(String senderEmail, String receiverEmail);

    public List<Mail> findByReceiverEmailAndReceiverIsDeleted(String receiverEmail, boolean receiverIsDeleted);
}
