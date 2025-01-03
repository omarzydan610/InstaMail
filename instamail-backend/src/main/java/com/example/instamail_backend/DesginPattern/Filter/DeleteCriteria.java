package com.example.instamail_backend.DesginPattern.Filter;

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
            if (mail.getSenderEmail().equals(email) && mail.getIsSenderDeleted() == 1 || mail.getReceiverEmail().equals(email) && mail.getIsReceiverDeleted() == 1) {
                deletedMails.add(mail);
            }
        }
        return deletedMails;
    }

}
