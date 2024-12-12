package com.example.instamail_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.MailRepository;
import com.example.instamail_backend.repository.UserRepository;

@Service
public class GetMailServer {

    @Autowired
    private MailRepository mailRepository;

   
   @Autowired
   private UserService userService;
   @Autowired
   private UserRepository userRepository;





   public List<Mail> getMails(String token){
    long userId = userService.getIdByToken(token);
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    List<Mail> mails = mailRepository.findBySenderEmailOrReceiverEmail(user.getEmail(), user.getEmail());        
    return mails;
   }


//    public List<Attachment> getAttachments(long mailId){
//         List<Object[]> result = mailRepository.findByAttachmentMailId(mailId);
//         Mail mail = (Mail) result.get(0)[0];
//         List<Attachment> attachments = new ArrayList<>();
//         for(int i = 1; i < result.size(); i++){
//             attachments.add((Attachment) result.get(i)[1]);
//         }
//         return attachments;
//    }

}
