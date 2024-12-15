package com.example.instamail_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.instamail_backend.service.MailsService.AttachmentService;

@RestController
public class AttachmentController {
    @Autowired
    private AttachmentService attachmentService;
     
    @PostMapping("/upload-attachment/{mailId}")
    public ResponseEntity<String> uploadAttachment(@RequestHeader("Authorization") String token, @PathVariable Long mailId, @RequestParam("files") List<MultipartFile> files) {
        try {   
            attachmentService.saveAttachment(files, mailId);
            return ResponseEntity.ok("Attachments uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // @GetMapping("/download-attachment/{mailId}")
    // public ResponseEntity<String> downloadAttachment(@RequestHeader("Authorization") String token, @PathVariable Long mailId) {
    //     List<Attachment> attachments = attachmentService.getAttachmentsByMailId(mailId);
    //     return ResponseEntity.ok(attachments);
    // }
}
