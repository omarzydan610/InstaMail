package com.example.instamail_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instamail_backend.model.ContactEmail;

public interface ContactEmailRepository extends JpaRepository<ContactEmail, Long> {

}
