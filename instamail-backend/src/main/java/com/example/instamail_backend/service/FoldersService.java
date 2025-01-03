package com.example.instamail_backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.DesginPattern.Strategy.MailSorter;
import com.example.instamail_backend.DesginPattern.Strategy.SortByDateAsc;
import com.example.instamail_backend.DesginPattern.Strategy.SortByDateDecs;
import com.example.instamail_backend.DesginPattern.Strategy.SortByPriority;
import com.example.instamail_backend.DesginPattern.Strategy.SortBySubjectAsc;
import com.example.instamail_backend.DesginPattern.Strategy.SortBySubjectDesc;
import com.example.instamail_backend.model.Folders;
import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.FoldersRepository;
import com.example.instamail_backend.repository.MailRepository;
import com.example.instamail_backend.repository.UserRepository;

@Service
public class FoldersService {

    @Autowired
    private FoldersRepository foldersRepository;
    @Autowired
    private MailRepository mailsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    public List<Folders> getFoldersByUserId(String token) {
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
        return foldersRepository.findByUserId(userId);
    }

    public List<Mail> getMailsByFolderId(String token, Long folderId, int start, int size, int sortStrategy) {
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Mail> mails = mailsRepository.findByFolderIdSender(folderId, user.getEmail());
        List<Mail> mails2 = mailsRepository.findByFolderIdReceiver(folderId, user.getEmail());
        mails.addAll(mails2);

        MailSorter mailSorter = new MailSorter();
        switch (sortStrategy) {
            case 1:
                mailSorter.setSortStrategy(new SortByDateAsc());
                break;
            case 2:
                mailSorter.setSortStrategy(new SortByDateDecs());
                break;
            case 3:
                mailSorter.setSortStrategy(new SortBySubjectAsc());
                break;
            case 4:
                mailSorter.setSortStrategy(new SortBySubjectDesc());
                break;
            case 5:
                mailSorter.setSortStrategy(new SortByPriority());
                break;
        }
        mails = mailSorter.sort(mails);
        if (mails.size() == 0 || start >= mails.size()) {
            return new ArrayList<>();
        }
        return mails.subList(start, Math.min(start + size, mails.size()));
    }

    public Folders createFolder(String token, Map<String, String> request) {
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Folders folder = new Folders(request.get("name"), user.getEmail(), userId);
        return foldersRepository.save(folder);
    }

    public void deleteFolder(String token, Long folderId) {
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        foldersRepository.deleteById(folderId);
    }

    public void renameFolder(String token, Long folderId, String folderName) {
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }

        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        String cleanedFolderName = folderName.replace("\"", "");
        foldersRepository.updateFolderName(folderId, cleanedFolderName);
    }

    public String getFolderName(String token, Long folderId) {
        if (folderId == 0) {
            return "No folder";
        }
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return foldersRepository.findById(folderId).orElseThrow(() -> new RuntimeException("Folder not found"))
                .getName();
    }
}
