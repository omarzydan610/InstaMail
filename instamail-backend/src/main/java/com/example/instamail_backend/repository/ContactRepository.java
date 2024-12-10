package com.example.instamail_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instamail_backend.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    boolean existsByUserIdAndContactName(Long userId, String contactName);

}
