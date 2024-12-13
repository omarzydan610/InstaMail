package com.example.instamail_backend.DesginPattern;

import java.util.ArrayList;
import java.util.List;

import com.example.instamail_backend.model.Mail;

public class DeleteCriteria implements Criteria {

    private final String email;

    public DeleteCriteria(String email){
        this.email = email;
    }
    @Override
    public List<Mail> meetCriteria(List<Mail> mails) {
        List<Mail> deletedMails = new ArrayList<>();
        for (Mail mail : mails) {
            if (mail.getSenderEmail().equals(email) && mail.getIsSenderDeleted() || mail.getReceiverEmail().equals(email) && mail.getIsReceiverDeleted()) {
                deletedMails.add(mail);
            }
        }
        return deletedMails;
    }

}
