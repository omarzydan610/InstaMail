package com.example.instamail_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.service.AddUpdateMailService;
import com.example.instamail_backend.service.GetMailServer;

@RestController
public class MailController {   

    @Autowired
    private GetMailServer getMailServer;
    @Autowired
    private AddUpdateMailService addUpdateMailService;

    @GetMapping("/get-mails")
    public ResponseEntity<?> getMails(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(getMailServer.getMails(token));
    }

    // @GetMapping("/get-attachments/{mailId}")
    // public ResponseEntity<?> getAttachments(@PathVariable long mailId){
    //     return ResponseEntity.ok(getMailServer.getAttachments(mailId));
    // }
    @PostMapping("/send-mail")
    public ResponseEntity<?> sendMail(@RequestHeader("Authorization") String token, @RequestBody Mail mail){
        return ResponseEntity.ok(addUpdateMailService.sendMail(token, mail));
    }

}


