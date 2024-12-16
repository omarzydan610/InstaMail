package com.example.instamail_backend.service.MailsService;

import java.util.ArrayList;
import java.util.List;  
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.model.Folders;
import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.FoldersRepository;
import com.example.instamail_backend.repository.MailRepository;
import com.example.instamail_backend.repository.UserRepository;
import com.example.instamail_backend.service.UserService;

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
        Long userId = userService.getIdByToken(token);
        return foldersRepository.findByUserId(userId);
    }
    public List<Mail> getMailsByFolderId(String token, Long folderId,int start, int size) {
        Long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Mail> mails = mailsRepository.findByFolderIdSender(folderId, user.getEmail());
        List<Mail> mails2 = mailsRepository.findByFolderIdReceiver(folderId, user.getEmail());
        mails.addAll(mails2);
        if (mails.size() == 0 || start >= mails.size()) {
            return new ArrayList<>();
        }
        System.out.println("start:" + start);
        System.out.println("size:" + Math.min(start + size, mails.size()));
        return mails.subList(start, Math.min(start + size, mails.size()));
    }
    public Folders createFolder(String token, Map<String, String> request) {
        Long userId = userService.getIdByToken(token);
        System.out.println(userId);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Folders folder = new Folders(request.get("name"), user.getEmail(), userId);
        return foldersRepository.save(folder);
    }
    public void deleteFolder(String token, Long folderId) {
        Long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        foldersRepository.deleteById(folderId);
    }
    public void updateFolder(String token,Long folderId, String folderName) {
        Long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        foldersRepository.updateFolderName(folderId, folderName);
    }

   
}
