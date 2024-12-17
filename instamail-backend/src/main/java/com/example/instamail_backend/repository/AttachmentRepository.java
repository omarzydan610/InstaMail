package com.example.instamail_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instamail_backend.model.Attachment;
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    List<Attachment> findByMailId(Long mailId);

   
    // @Query("SELECT a FROM Attachment a WHERE a.mailId = :mailId")
    // List<Attachment> findByMailId(@Param("mailId") long mailId);    
}
