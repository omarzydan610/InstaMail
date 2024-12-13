package com.example.instamail_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instamail_backend.model.Attachment;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

   
    // @Query("SELECT a FROM Attachment a WHERE a.mailId = :mailId")
    // List<Attachment> findByMailId(@Param("mailId") long mailId);    
}
