package com.example.instamail_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.instamail_backend.model.Mail;

public interface MailRepository extends JpaRepository<Mail, Long> {

    public List<Mail> findBySenderEmailOrReceiverEmail(String senderEmail, String receiverEmail);

    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.senderPriority = :priority WHERE m.id = :mailId AND m.senderEmail = :senderEmail")
    public void updateMailPrioritySender(@Param("mailId") long mailId, @Param("priority") int priority, @Param("senderEmail") String senderEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.receiverPriority = :priority WHERE m.id = :mailId AND m.receiverEmail = :receiverEmail")
    public void updateMailPriorityReceiver(@Param("mailId") long mailId, @Param("priority") int priority, @Param("receiverEmail") String receiverEmail);

}
