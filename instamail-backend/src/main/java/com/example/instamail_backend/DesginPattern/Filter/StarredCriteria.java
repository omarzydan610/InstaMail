package com.example.instamail_backend.DesginPattern.Filter;

import java.util.ArrayList;
import java.util.List;

import com.example.instamail_backend.model.Mail;

public class StarredCriteria implements Criteria {

    private final String email;
    public StarredCriteria(String email){
        this.email = email;
    }
    @Override
    public List<Mail> meetCriteria(List<Mail> mails) {
        List<Mail> starredMails = new ArrayList<>();
        for (Mail mail : mails) {
            if (mail.getSenderEmail().equals(email) && mail.getIsSenderStarred()&& mail.getIsSenderDeleted() == 0 || mail.getReceiverEmail().equals(email) && mail.getIsReceiverStarred()&& mail.getIsReceiverDeleted() == 0) {
                starredMails.add(mail);
            }
        }
        return starredMails;
    }

}
