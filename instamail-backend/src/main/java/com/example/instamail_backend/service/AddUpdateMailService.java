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
    public String senderOrReceiverDelete(long mailId, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getSenderEmail().equals(user.getEmail())) {
            mailRepository.deleteMailBySenderId(mailId);
            return "Mail deleted successfully";
        } else if (mail.getReceiverEmail().equals(user.getEmail())) {
            mailRepository.deleteMailByReceiverId(mailId);    
            return "Mail deleted successfully";
        } else {
            throw new RuntimeException("Mail not found");
        }
       
    }
   
    public void updateMailPrioritySenderorReceiver(long mailId, int priority, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mailRepository.updateMailPrioritySender(mailId, priority, user.getEmail());
        mailRepository.updateMailPriorityReceiver(mailId, priority, user.getEmail());
    }

    public void updateMailStarredSenderorReceiver(long mailId, boolean isStarred, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getSenderEmail().equals(user.getEmail())) {
            mail.setIsSenderStarred(isStarred);
        } else if (mail.getReceiverEmail().equals(user.getEmail())) {
            mail.setIsReceiverStarred(isStarred);
        } else {
            throw new RuntimeException("Mail not found");
        }
        mailRepository.save(mail);
    }
    public void updateMailReadSenderorReceiver(long mailId, boolean isRead, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getReceiverEmail().equals(user.getEmail())) {
            mail.setIsRead(isRead); 
        } else {
            throw new RuntimeException("Mail not found");
        }
        mailRepository.save(mail);
    }
    public void starMail(long mailId, boolean isStarred, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mailRepository.starMailSender(mailId, isStarred, user.getEmail());
        mailRepository.starMailReceiver(mailId, isStarred, user.getEmail());
    }
    public void draftMail(long mailId, boolean isDrafted, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mailRepository.draftMailSender(mailId, isDrafted, user.getEmail());
    }
    public void readMail(long mailId, boolean isRead, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mailRepository.readMailReceiver(mailId, isRead, user.getEmail());
    }
   
    

    
}
