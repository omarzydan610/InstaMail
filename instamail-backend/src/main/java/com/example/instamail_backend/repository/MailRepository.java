package com.example.instamail_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instamail_backend.model.Mail;

public interface MailRepository extends JpaRepository<Mail, Long>  {
    
}
