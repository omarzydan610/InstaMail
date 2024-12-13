package com.example.instamail_backend.service.MailsService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.DesginPattern.DeleteCriteria;
import com.example.instamail_backend.DesginPattern.DraftedCriteria;
import com.example.instamail_backend.DesginPattern.InboxCriteria;
import com.example.instamail_backend.DesginPattern.SenderCriteria;
import com.example.instamail_backend.DesginPattern.StarredCriteria;
import com.example.instamail_backend.model.Mail;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.MailRepository;
import com.example.instamail_backend.repository.UserRepository;
import com.example.instamail_backend.service.UserService;


@Service
public class GetMailService {

    @Autowired
    private MailRepository mailRepository;

   
   @Autowired
   private UserService userService;
   @Autowired
   private UserRepository userRepository;
   
   

   public List<Mail> getMails(String token, String type){
    long userId = userService.getIdByToken(token);
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    List<Mail> mails = mailRepository.findBySenderEmailOrReceiverEmail(user.getEmail(), user.getEmail());        
    if(type.equals("inbox")){
        InboxCriteria inboxCriteria = new InboxCriteria(user.getEmail());
        mails = inboxCriteria.meetCriteria(mails);
    } else if(type.equals("sent")){
        SenderCriteria senderCriteria = new SenderCriteria(user.getEmail());
        mails = senderCriteria.meetCriteria(mails);
    } else if(type.equals("starred")){
        StarredCriteria starredCriteria = new StarredCriteria(user.getEmail());
        mails = starredCriteria.meetCriteria(mails);
    } else if(type.equals("deleted")){
        DeleteCriteria deleteCriteria = new DeleteCriteria(user.getEmail());
        mails = deleteCriteria.meetCriteria(mails);
    } else if(type.equals("drafted")){
        DraftedCriteria draftedCriteria = new DraftedCriteria(user.getEmail());
        mails = draftedCriteria.meetCriteria(mails);
    }
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
