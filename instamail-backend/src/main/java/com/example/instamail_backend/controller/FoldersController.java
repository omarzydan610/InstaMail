package com.example.instamail_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.instamail_backend.model.Folders;
import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.service.MailsService.FoldersService;
@RestController
public class FoldersController {

    @Autowired
    private FoldersService foldersService;

    @PostMapping("/create-folder")
    public String createFolder(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        foldersService.createFolder(token, request);
        return "success";
    }
    @DeleteMapping("/delete-folder/{folderId}")
    public String deleteFolder(@RequestHeader("Authorization") String token, @PathVariable Long folderId) {
        foldersService.deleteFolder(token, folderId);
        return "success";
    }
    @GetMapping("/get-folders-mails/{folderId}")
    public List<Mail> getMailsByFolderId(@RequestHeader("Authorization") String token, @PathVariable Long folderId) {
        return foldersService.getMailsByFolderId(token, folderId);
    }
    @GetMapping("/get-folders")
    public List<Folders> getFolders(@RequestHeader("Authorization") String token) {
        return foldersService.getFoldersByUserId(token);
    }
    @PutMapping("/update-folder/{folderId}")
    public String updateFolder(@RequestHeader("Authorization") String token, @PathVariable Long folderId, @RequestBody String folderName) {
        foldersService.updateFolder(token, folderId, folderName);
        return "success";
    }
}
