package com.example.instamail_backend.DesginPattern.Strategy;

import java.util.List;

import com.example.instamail_backend.model.Mail;

public class MailSorter {
    private SortStrategy sortStrategy;

    public List<Mail> sort(List<Mail> mails) {
        return sortStrategy.sort(mails);
    }

    public void setSortStrategy(SortStrategy sortStrategy) {
        this.sortStrategy = sortStrategy;
    }
}
