package com.example.instamail_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instamail_backend.model.Attachment;
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    List<Attachment> findByMailId(Long mailId);
    void deleteByMailId(Long mailId);    
}
