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

    public long sendMail(String token, Map<String, Object> requestData) {
        System.out.println("sendMail");
        System.out.println(requestData);
        @SuppressWarnings("unchecked")
        Map<String, Object> mailMap = (Map<String, Object>) requestData.get("mail");

        // Create a new Mail object and set its properties
        Mail mail = new Mail((String) mailMap.get("receiverEmail"), (String) mailMap.get("subject"),
                (String) mailMap.get("content"), (Integer) mailMap.get("priority"));

        @SuppressWarnings("unchecked")
        List<String> remainingReceivers = (List<String>) requestData.get("remainingReceivers");

        long userId;
        System.out.println("userId");   
        System.out.println(token);
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mail.setSenderEmail(user.getEmail());
        Mail savedMail = mailRepository.save(mail);
        System.out.println("savedMail");
        System.out.println(savedMail);
        return savedMail.getId();
    }

    public long draftMail(String token, Map<String, Object> requestData) {

        // Create a new Mail object and set its properties
        Mail mail = new Mail((String) requestData.get("receiverEmail"), (String) requestData.get("subject"),
                (String) requestData.get("content"), (Integer) requestData.get("priority"));

        long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mail.setSenderEmail(user.getEmail());
        mail.setIsDraft(true);
        Mail savedMail = mailRepository.save(mail);
        System.out.println("savedMail");
        System.out.println(savedMail);
        return savedMail.getId();
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

    public void updateMailFolderId(String token, long mailId, Long folderId) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        mailRepository.updateMailFolderIdSender(mailId, folderId, user.getEmail());
        mailRepository.updateMailFolderIdReceiver(mailId, folderId, user.getEmail());
    }

    public boolean editDraft(String token, Map<String, Object> requestData) {
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        long mailId = (Integer) requestData.get("id");
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        mail.setSubject((String) requestData.get("subject"));
        mail.setContent((String) requestData.get("body"));
        mail.setPriority((Integer) requestData.get("priority"));
        mailRepository.save(mail);
        return true;
    }

    public long sendDraft(String token, Map<String, Object> requestData) {
        Long userId;
        try {
            userId = userService.getIdByToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Wrong or Expired Token");
        }
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        long mailId = (Integer) requestData.get("id");
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        mail.setSubject((String) requestData.get("subject"));
        mail.setContent((String) requestData.get("body"));
        mail.setPriority((Integer) requestData.get("priority"));
        mail.setIsDraft(false);
        Mail savedMail = mailRepository.save(mail);
        System.out.println("savedMail");
        System.out.println(savedMail);
        return savedMail.getId();
    }

}
