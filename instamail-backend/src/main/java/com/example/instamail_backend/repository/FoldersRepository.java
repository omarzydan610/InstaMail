package com.example.instamail_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.instamail_backend.model.Folders;

public interface FoldersRepository extends JpaRepository<Folders, Long> {
    List<Folders> findByEmail(String email);
    List<Folders> findByUserId(Long userId);
    @Modifying
    @Query("UPDATE Folders f SET f.name = :folderName WHERE f.id = :folderId")
    void updateFolderName(@Param("folderId") Long folderId, @Param("folderName") String folderName);
    List<Folders> findByEmailAndUserId(String email, Long userId);
}
