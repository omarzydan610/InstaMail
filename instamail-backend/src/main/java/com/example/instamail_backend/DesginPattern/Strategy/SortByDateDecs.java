package com.example.instamail_backend.DesginPattern.Strategy;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.example.instamail_backend.model.Mail;

public class SortByDateDecs implements SortStrategy {

    @Override
    public List<Mail> sort(List<Mail> mails) {
        return mails.stream().sorted(Comparator.comparing(Mail::getCreatedAt).reversed()).collect(Collectors.toList());
    }
}
