package com.example.instamail_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.instamail_backend.model.Mail;

public interface MailRepository extends JpaRepository<Mail, Long> {
    public List<Mail> findBySenderEmail(String senderEmail);

    // @Query("SELECT m,a FROM Mail m JOIN Attachment a ON m.mailId = a.mailId WHERE a.mailId = :mailId")
    // public List<Object[]> findByAttachmentMailId(@Param("mailId") long mailId);

    public List<Mail> findByReceiverEmail(String receiverEmail);

    public List<Mail> findBySenderEmailAndIsSenderDeleted(String senderEmail, boolean isSenderDeleted);

    public List<Mail> findBySenderEmailOrReceiverEmail(String senderEmail, String receiverEmail);

    public List<Mail> findByReceiverEmailAndIsReceiverDeleted(String receiverEmail, boolean isReceiverDeleted);

    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.isSenderDeleted = :isDeleted WHERE m.id = :mailId") 
    public void deleteMailBySenderId(@Param("mailId") long mailId, @Param("isDeleted") boolean isDeleted);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.isReceiverDeleted = :isDeleted WHERE m.id = :mailId")
    public void deleteMailByReceiverId(@Param("mailId") long mailId, @Param("isDeleted") boolean isDeleted);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.isSenderStarred = :isStarred WHERE m.id = :mailId AND m.senderEmail = :senderEmail")
    public void starMailSender(@Param("mailId") long mailId, @Param("isStarred") boolean isStarred, @Param("senderEmail") String senderEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.isReceiverStarred = :isStarred WHERE m.id = :mailId AND m.receiverEmail = :receiverEmail")
    public void  starMailReceiver(@Param("mailId") long mailId, @Param("isStarred") boolean isStarred, @Param("receiverEmail") String receiverEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.isDraft = :isDrafted WHERE m.id = :mailId AND m.senderEmail = :senderEmail")
    public void draftMailSender(@Param("mailId") long mailId, @Param("isDrafted") boolean isDrafted, @Param("senderEmail") String senderEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.isRead = :isRead WHERE m.id = :mailId AND m.receiverEmail = :receiverEmail")
    public void readMailReceiver(@Param("mailId") long mailId, @Param("isRead") boolean isRead, @Param("receiverEmail") String receiverEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.senderPriority = :priority WHERE m.id = :mailId AND m.senderEmail = :senderEmail")
    public void updateMailPrioritySender(@Param("mailId") long mailId, @Param("priority") int priority, @Param("senderEmail") String senderEmail);
    @Modifying
    @Transactional
    @Query("UPDATE Mail m SET m.receiverPriority = :priority WHERE m.id = :mailId AND m.receiverEmail = :receiverEmail")
    public void updateMailPriorityReceiver(@Param("mailId") long mailId, @Param("priority") int priority, @Param("receiverEmail") String receiverEmail);

}
