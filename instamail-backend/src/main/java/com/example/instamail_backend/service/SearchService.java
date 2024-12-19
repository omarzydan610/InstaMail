package com.example.instamail_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.repository.MailRepository;
import com.example.instamail_backend.repository.UserRepository;
import com.example.instamail_backend.model.User;

@Service
public class SearchService {

    @Autowired
    private MailRepository mailRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public Map<String, List<Mail>> searchMails(String token, String searchTerm) {
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Mail> mails = mailRepository.findBySenderEmailOrReceiverEmail(user.getEmail(), user.getEmail());
        Map<String, List<Mail>> result = new HashMap<>();
        List<Mail> bySubject = mails.stream().filter(mail -> mail.getSubject().contains(searchTerm))
                .collect(Collectors.toList());
        List<Mail> byBody = mails.stream().filter(mail -> mail.getContent().contains(searchTerm))
                .collect(Collectors.toList());
        List<Mail> bySender = mails.stream().filter(mail -> mail.getSenderEmail().contains(searchTerm))
                .collect(Collectors.toList());
        List<Mail> byReceiver = mails.stream().filter(mail -> mail.getReceiverEmail().contains(searchTerm))
                .collect(Collectors.toList());
        result.put("subject", bySubject);
        result.put("body", byBody);
        result.put("sender", bySender);
        result.put("receiver", byReceiver);
        System.out.println(result);
        return result;
    }
}
