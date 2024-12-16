package com.example.instamail_backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.instamail_backend.service.MailsService.AddUpdateMailService;
import com.example.instamail_backend.service.MailsService.GetMailService;

@RestController
public class MailController {

    @Autowired
    private GetMailService getMailService;
    @Autowired
    private AddUpdateMailService addUpdateMailService;

    @PostMapping("/send-mail")
    public ResponseEntity<?> sendMail(@RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> requestData) {
        try {

            return ResponseEntity.ok(addUpdateMailService.sendMail(token, requestData));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/draft-mail")
    public ResponseEntity<?> draftMail(@RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> requestData) {
        try {
            System.out.println("draftMail");
            System.out.println();
            System.out.println();
            System.out.println();
            return ResponseEntity.ok(addUpdateMailService.draftMail(token, requestData));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-mails/inbox")
    public ResponseEntity<?> getReceivedMails(@RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int start, @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "1") int sortStrategy) {
        System.out.println("inbox");
        return ResponseEntity.ok(getMailService.getMails(token, "inbox", start, size, sortStrategy));
    }

    @GetMapping("/get-mails/sent")
    public ResponseEntity<?> getSentMails(@RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int start, @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "1") int sortStrategy) {
        return ResponseEntity.ok(getMailService.getMails(token, "sent", start, size, sortStrategy));
    }

    @GetMapping("/get-mails/deleted")
    public ResponseEntity<?> getDeletedMails(@RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int start, @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "1") int sortStrategy) {
        return ResponseEntity.ok(getMailService.getMails(token, "deleted", start, size, sortStrategy));
    }

    @GetMapping("/get-mails/drafted")
    public ResponseEntity<?> getDraftedMails(@RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int start, @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "1") int sortStrategy) {
        return ResponseEntity.ok(getMailService.getMails(token, "drafted", start, size, sortStrategy));
    }

    @GetMapping("/get-mails/starred")
    public ResponseEntity<?> getStarredMails(@RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int start, @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "1") int sortStrategy) {
        return ResponseEntity.ok(getMailService.getMails(token, "starred", start, size, sortStrategy));
    }

    @PutMapping("/toggle-star/{mailId}")
    public ResponseEntity<?> starMail(@RequestHeader("Authorization") String token, @PathVariable long mailId) {
        return ResponseEntity.ok(addUpdateMailService.toggleStarMail(mailId, token));
    }

    @DeleteMapping("/toggle-deletion/{mailId}")
    public ResponseEntity<?> toggleDeletion(@RequestHeader("Authorization") String token, @PathVariable long mailId) {
        return ResponseEntity.ok(addUpdateMailService.toggleDeletion(mailId, token));
    }

    @DeleteMapping("/delete-permanently/{mailId}")
    public ResponseEntity<?> deletePermanently(@RequestHeader("Authorization") String token,
            @PathVariable long mailId) {
        return ResponseEntity.ok(addUpdateMailService.deleteMailPermanently(mailId, token));
    }

    @DeleteMapping("/delete-draft/{mailId}")
    public ResponseEntity<?> deleteDraft(@RequestHeader("Authorization") String token, @PathVariable long mailId) {
        return ResponseEntity.ok(addUpdateMailService.deleteDraft(mailId, token));
    }

    @PutMapping("/mark-as-read/{mailId}")
    public ResponseEntity<?> markAsRead(@RequestHeader("Authorization") String token, @PathVariable long mailId) {
        return ResponseEntity.ok(addUpdateMailService.markAsRead(mailId, token));
    }

    @PutMapping("/change-folder/{mailId}")
    public String updateMailFolderId(@RequestHeader("Authorization") String token, @PathVariable long mailId,
            @RequestBody Map<String, Long> request) {
        addUpdateMailService.updateMailFolderId(mailId, request.get("folderId"), token);
        return "success";
    }

    // @GetMapping("/get-attachments/{mailId}")
    // public ResponseEntity<?> getAttachments(@PathVariable long mailId){
    // return ResponseEntity.ok(getMailServer.getAttachments(mailId));
    // }

}
