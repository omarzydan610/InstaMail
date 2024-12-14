package com.example.instamail_backend.DesginPattern;

import java.util.ArrayList;
import java.util.List;

import com.example.instamail_backend.model.Mail;

public class DraftedCriteria implements Criteria {
    private final String email;
    public DraftedCriteria(String email){
        this.email = email;
    }

    @Override
    public List<Mail> meetCriteria(List<Mail> mails) {
        List<Mail> draftedMails = new ArrayList<>();
        for (Mail mail : mails) {
            if (mail.getSenderEmail().equals(email) && mail.getIsDraft() && mail.getIsSenderDeleted() == 0) {
                draftedMails.add(mail);
            }
        }
        return draftedMails;
    }

}
