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

    @Query("SELECT m FROM Mail m WHERE m.senderFolderId = :folderId AND m.senderEmail = :senderEmail AND m.isSenderDeleted = 0")
    public List<Mail> findByFolderIdSender(@Param("folderId") Long folderId, @Param("senderEmail") String senderEmail);

    @Query("SELECT m FROM Mail m WHERE m.receiverFolderId = :folderId AND m.receiverEmail = :receiverEmail AND m.isReceiverDeleted = 0")
    public List<Mail> findByFolderIdReceiver(@Param("folderId") Long folderId, @Param("receiverEmail") String receiverEmail);

    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.senderPriority = :priority WHERE m.id = :mailId AND m.senderEmail = :senderEmail")
    public void updateMailPrioritySender(@Param("mailId") long mailId, @Param("priority") int priority, @Param("senderEmail") String senderEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.receiverPriority = :priority WHERE m.id = :mailId AND m.receiverEmail = :receiverEmail")
    public void updateMailPriorityReceiver(@Param("mailId") long mailId, @Param("priority") int priority, @Param("receiverEmail") String receiverEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.senderFolderId = :folderId WHERE m.id = :mailId AND m.senderEmail = :senderEmail")
    public void updateMailFolderIdSender(@Param("mailId") long mailId, @Param("folderId") Long folderId, @Param("senderEmail") String senderEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.receiverFolderId = :folderId WHERE m.id = :mailId AND m.receiverEmail = :receiverEmail")
    public void updateMailFolderIdReceiver(@Param("mailId") long mailId, @Param("folderId") Long folderId, @Param("receiverEmail") String receiverEmail);


}
