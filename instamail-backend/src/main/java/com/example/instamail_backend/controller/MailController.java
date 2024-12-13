package com.example.instamail_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/get-mails/inbox")
    public ResponseEntity<?> getMails(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(getMailServer.getMails(token, "inbox"));
    }

    @GetMapping("/get-mails/sent")
    public ResponseEntity<?> getSentMails(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(getMailServer.getMails(token, "sent"));
    }

    @GetMapping("/get-mails/starred")
    public ResponseEntity<?> getStarredMails(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(getMailServer.getMails(token, "starred"));
    }
    @GetMapping("/get-mails/deleted")
    public ResponseEntity<?> getDeletedMails(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(getMailServer.getMails(token, "deleted"));
    }
    @GetMapping("/get-mails/drafted")
    public ResponseEntity<?> getDraftedMails(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(getMailServer.getMails(token, "drafted"));
    }
    @PutMapping("/{mailId}/star")
    public String starMail(@RequestHeader("Authorization") String token, @PathVariable long mailId, @RequestBody boolean isStarred) {
        //TODO: process PUT request
        addUpdateMailService.starMail(mailId, isStarred, token);
        return "success";
        
    }
    @PutMapping("/{mailId}/priority")
    public String updateMailPriority(@RequestHeader("Authorization") String token, @PathVariable long mailId, @RequestBody int priority) {
        //TODO: process PUT request
        addUpdateMailService.updateMailPrioritySenderorReceiver(mailId, priority, token);
        return "success";
        
    }
    @PutMapping("/{mailId}/read")
    public String readMail(@RequestHeader("Authorization") String token, @PathVariable long mailId, @RequestBody boolean isRead) {
        //TODO: process PUT request
        addUpdateMailService.readMail(mailId, isRead, token);
        return "success";
        
    }
    @PutMapping("/{mailId}/draft")
    public String draftMail(@RequestHeader("Authorization") String token, @PathVariable long mailId, @RequestBody boolean isDrafted) {
        //TODO: process PUT request
        addUpdateMailService.draftMail(mailId, isDrafted, token);
        return "success";
        
    }
    // @GetMapping("/get-attachments/{mailId}")
    // public ResponseEntity<?> getAttachments(@PathVariable long mailId){
    //     return ResponseEntity.ok(getMailServer.getAttachments(mailId));
    // }
    @PostMapping("/send-mail")
    public ResponseEntity<?> sendMail(@RequestHeader("Authorization") String token, @RequestBody Mail mail){
        return ResponseEntity.ok(addUpdateMailService.sendMail(token, mail));
    }

    @DeleteMapping("/{mailId}/delete-mail")
    public ResponseEntity<?> deleteMail(@RequestHeader("Authorization") String token, @PathVariable long mailId){
        return ResponseEntity.ok(addUpdateMailService.senderOrReceiverDelete(mailId, token));
    }

}


