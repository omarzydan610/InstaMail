package com.example.instamail_backend.service.MailsService;

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
        mailRepository.save(mail);
        System.out.println(mail.getIsDraft());
        return true;
    }

    public String senderOrReceiverDelete(long mailId, boolean isDeleted, String token) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Mail mail = mailRepository.findById(mailId).orElseThrow(() -> new RuntimeException("Mail not found"));
        if (mail.getSenderEmail().equals(user.getEmail())) {
            mailRepository.deleteMailBySenderId(mailId, isDeleted);
            return "Mail deleted successfully";
        } else if (mail.getReceiverEmail().equals(user.getEmail())) {
            mailRepository.deleteMailByReceiverId(mailId, isDeleted);
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
        System.out.println(userId + " isStarred " + isStarred);
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
