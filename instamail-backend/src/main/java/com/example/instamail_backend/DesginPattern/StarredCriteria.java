package com.example.instamail_backend.DesginPattern;

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
            if (mail.getSenderEmail().equals(email) && mail.getIsSenderStarred() || mail.getReceiverEmail().equals(email) && mail.getIsReceiverStarred()) {
                starredMails.add(mail);
            }
        }
        return starredMails;
    }

}
