package com.example.instamail_backend.service.MailsService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.MailRepository;
import com.example.instamail_backend.repository.UserRepository;
import com.example.instamail_backend.service.UserService;

@Service
public class AddUpdateMailService {

    @Autowired
    private MailRepository mailRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public boolean sendMail(String token, Map<String, Object> requestData) {

        @SuppressWarnings("unchecked")
        Map<String, Object> mailMap = (Map<String, Object>) requestData.get("mail");

        // Create a new Mail object and set its properties
        Mail mail = new Mail((String) mailMap.get("receiverEmail"), (String) mailMap.get("subject"),
                (String) mailMap.get("content"));

        @SuppressWarnings("unchecked")
        List<String> remainingReceivers = (List<String>) requestData.get("remainingReceivers");

        long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mail.setSenderEmail(user.getEmail());
        mailRepository.save(mail);
        return true;
    }

    public boolean draftMail(String token, Map<String, Object> requestData) {

        @SuppressWarnings("unchecked")
        Map<String, Object> mailMap = (Map<String, Object>) requestData.get("mail");

        // Create a new Mail object and set its properties
        Mail mail = new Mail((String) mailMap.get("receiverEmail"), (String) mailMap.get("subject"),
                (String) mailMap.get("content"));

        @SuppressWarnings("unchecked")
        List<String> remainingReceivers = (List<String>) requestData.get("remainingReceivers");

        long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mail.setSenderEmail(user.getEmail());
        mail.setIsDraft(true);
        long mailId = mailRepository.save(mail).getId();
        mailRepository.save(mail);
        System.out.println("isDraft: " + mailRepository.findById(mailId).get().getIsDraft());
        return true;
    }

    public boolean toggleStarMail(long mailId, String token) {
        long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getSenderEmail().equals(user.getEmail())) {
            mail.setIsSenderStarred(!mail.getIsSenderStarred());
        } else if (mail.getReceiverEmail().equals(user.getEmail())) {
            mail.setIsReceiverStarred(!mail.getIsReceiverStarred());
        }
        mailRepository.save(mail);
        return true;
    }

    public boolean toggleDeletion(long mailId, String token) {
        long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getSenderEmail().equals(user.getEmail())) {
            if (mail.getIsSenderDeleted() == 0) {
                mail.setDeletedAtSender(LocalDateTime.now());
                mail.setIsSenderDeleted(1);
            } else {
                mail.setDeletedAtSender(null);
                mail.setIsSenderDeleted(0);
            }
        } else if (mail.getReceiverEmail().equals(user.getEmail())) {
            if (mail.getIsReceiverDeleted() == 0) {
                mail.setDeletedAtReceiver(LocalDateTime.now());
                mail.setIsReceiverDeleted(1);
            } else {
                mail.setDeletedAtReceiver(null);
                mail.setIsReceiverDeleted(0);
            }
        }
        mailRepository.save(mail);
        return true;
    }

    public boolean deleteMailPermanently(long mailId, String token) {
        long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getSenderEmail().equals(user.getEmail())) {
            mail.setDeletedAtSender(null);
            mail.setIsSenderDeleted(2);
        } else if (mail.getReceiverEmail().equals(user.getEmail())) {
            mail.setDeletedAtReceiver(null);
            mail.setIsReceiverDeleted(2);
        }
        mailRepository.save(mail);
        if (mail.getIsSenderDeleted() == 2 && mail.getIsReceiverDeleted() == 2) {
            mailRepository.deleteById(mailId);
        }
        return true;
    }

    public boolean deleteDraft(long mailId, String token) {
        try {
            userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        mailRepository.deleteById(mailId);
        return true;
    }

    public Boolean markAsRead(long mailId, String token) {
        try {
            userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        mail.setIsRead(true);
        mailRepository.save(mail);
        return true;
    }

    public void updateMailPrioritySenderorReceiver(long mailId, int priority, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mailRepository.updateMailPrioritySender(mailId, priority, user.getEmail());
        mailRepository.updateMailPriorityReceiver(mailId, priority, user.getEmail());
    }

}
