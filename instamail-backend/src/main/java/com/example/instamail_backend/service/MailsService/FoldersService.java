package com.example.instamail_backend.service.MailsService;

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
import com.example.instamail_backend.util.JwtUtil;

@Service
public class FoldersService {

    @Autowired
    private FoldersRepository foldersRepository;
    @Autowired
    private MailRepository mailsRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

   

    public List<Folders> getFoldersByUserId(String token) {
        Long userId = jwtUtil.extractId(token);
        return foldersRepository.findByUserId(userId);
    }
    public List<Mail> getMailsByFolderId(String token, Long folderId) {
        Long userId = jwtUtil.extractId(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return mailsRepository.findByFolderIdSender(folderId, user.getEmail());
    }
    public Folders createFolder(String token, Map<String, String> request) {
        Long userId = jwtUtil.extractId(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Folders folder = new Folders(request.get("name"), user.getEmail(), userId);
        return foldersRepository.save(folder);
    }
    public void deleteFolder(String token, Long folderId) {
        Long userId = jwtUtil.extractId(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        foldersRepository.deleteById(folderId);
    }
    public void updateFolder(String token,Long folderId, String folderName) {
        Long userId = jwtUtil.extractId(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        foldersRepository.updateFolderName(folderId, folderName);
    }

   
}
