package com.example.instamail_backend.DesginPattern.Strategy;

import java.util.List;

import com.example.instamail_backend.model.Mail;

public interface SortStrategy {
    List<Mail> sort(List<Mail> mails);
}
