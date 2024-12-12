package com.example.instamail_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.MailRepository;
import com.example.instamail_backend.repository.UserRepository;


@Service
public class AddUpdateMailService {

    @Autowired
    private MailRepository mailRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;


    public boolean sendMail(String token, Mail mail) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mail.setSenderEmail(user.getEmail());
        mailRepository.save(mail);
        return true;
    }
    public void deletedAtSender(long mailId, String email) {
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getSenderEmail().equals(email)) {
            mail.setSenderIsDeleted(true);
            mailRepository.save(mail);
        } else {
            throw new RuntimeException("Mail not found");
        }
    }

    public void deletedAtReceiver(long mailId, String email) {
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getReceiverEmail().equals(email)) {
            mail.setReceiverIsDeleted(true);
            mailRepository.save(mail);
        } else {
            throw new RuntimeException("Mail not found");
        }
    }
    public void updateMailPrioritySender(long mailId, int priority) {
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        mail.setSenderPriority(priority);
        mailRepository.save(mail);
    }
    public void updateMailPriorityReceiver(long mailId, int priority) {
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        mail.setReceiverPriority(priority);
        mailRepository.save(mail);
    }

    public void updateMailStarredSender(long mailId, boolean isStarred) {
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        mail.setSenderIsStarred(isStarred);
        mailRepository.save(mail);
    }

    public void updateMailStarredReceiver(long mailId, boolean isStarred) {
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        mail.setReceiverIsStarred(isStarred);
        mailRepository.save(mail);
    }
}
