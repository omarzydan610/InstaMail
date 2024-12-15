package com.example.instamail_backend.DesginPattern;

import java.util.ArrayList;
import java.util.List;

import com.example.instamail_backend.model.Mail;

public class SenderCriteria implements Criteria {

    private final String senderEmail;

    public SenderCriteria(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    @Override
    public List<Mail> meetCriteria(List<Mail> mails) {
        List<Mail> senderMails = new ArrayList<>();
        for (Mail mail : mails) {
            if (mail.getSenderEmail().equals(senderEmail) && mail.getIsSenderDeleted() == 0
                    && mail.getIsDraft() == false) {
                senderMails.add(mail);
            }
        }
        return senderMails;
    }

}
