package com.example.instamail_backend.service.MailsService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.instamail_backend.DesginPattern.Filter.DeleteCriteria;
import com.example.instamail_backend.DesginPattern.Filter.DraftedCriteria;
import com.example.instamail_backend.DesginPattern.Filter.InboxCriteria;
import com.example.instamail_backend.DesginPattern.Filter.SenderCriteria;
import com.example.instamail_backend.DesginPattern.Filter.StarredCriteria;
import com.example.instamail_backend.DesginPattern.Strategy.MailSorter;
import com.example.instamail_backend.DesginPattern.Strategy.SortByDateAsc;
import com.example.instamail_backend.DesginPattern.Strategy.SortByDateDecs;
import com.example.instamail_backend.DesginPattern.Strategy.SortByPriority;
import com.example.instamail_backend.DesginPattern.Strategy.SortBySubjectAsc;
import com.example.instamail_backend.DesginPattern.Strategy.SortBySubjectDesc;
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

    public List<Mail> getMails(String token, String type, int start, int size, int sortStrategy) {
        long userId = userService.getIdByToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Mail> mails = mailRepository.findBySenderEmailOrReceiverEmail(user.getEmail(), user.getEmail());
        if (type.equals("inbox")) {
            InboxCriteria inboxCriteria = new InboxCriteria(user.getEmail());
            mails = inboxCriteria.meetCriteria(mails);
        } else if (type.equals("sent")) {
            SenderCriteria senderCriteria = new SenderCriteria(user.getEmail());
            mails = senderCriteria.meetCriteria(mails);
        } else if (type.equals("starred")) {
            StarredCriteria starredCriteria = new StarredCriteria(user.getEmail());
            mails = starredCriteria.meetCriteria(mails);
        } else if (type.equals("deleted")) {
            DeleteCriteria deleteCriteria = new DeleteCriteria(user.getEmail());
            mails = deleteCriteria.meetCriteria(mails);
        } else if (type.equals("drafted")) {
            DraftedCriteria draftedCriteria = new DraftedCriteria(user.getEmail());
            mails = draftedCriteria.meetCriteria(mails);
        }
        MailSorter mailSorter = new MailSorter();
        switch (sortStrategy) {
        case 1:
            mailSorter.setSortStrategy(new SortByDateAsc());
            break;
        case 2:
            mailSorter.setSortStrategy(new SortByDateDecs());
            break;
        case 3:
            mailSorter.setSortStrategy(new SortBySubjectAsc());
            break;
        case 4:
            mailSorter.setSortStrategy(new SortBySubjectDesc());
            break;
        case 5:
            mailSorter.setSortStrategy(new SortByPriority());
            break;
        }
        mails = mailSorter.sort(mails);
        if (mails.size() == 0 || start >= mails.size()) {
            return new ArrayList<>();
        }

        return mails.subList(start, Math.min(start + size, mails.size()));
    }


}
