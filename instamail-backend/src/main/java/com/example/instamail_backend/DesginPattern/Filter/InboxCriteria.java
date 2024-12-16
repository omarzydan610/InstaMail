package com.example.instamail_backend.DesginPattern.Filter;

import java.util.ArrayList;
import java.util.List;

import com.example.instamail_backend.model.Mail;

public class InboxCriteria implements Criteria {
    private final String receiverEmail;

    public InboxCriteria(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }

    @Override
    public List<Mail> meetCriteria(List<Mail> mails) {
        List<Mail> receiverMails = new ArrayList<>();
        for (Mail mail : mails) {
            if (mail.getReceiverEmail().equals(receiverEmail) && mail.getIsReceiverDeleted() == 0
                    && !mail.getIsDraft()) {
                receiverMails.add(mail);
            }
        }
        return receiverMails;
    }
}
