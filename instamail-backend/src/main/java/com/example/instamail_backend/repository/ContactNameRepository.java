package com.example.instamail_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instamail_backend.model.ContactName;

public interface ContactNameRepository extends JpaRepository<ContactName, Long> {

}
