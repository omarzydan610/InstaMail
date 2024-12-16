package com.example.instamail_backend.DesginPattern.Filter;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.instamail_backend.model.Mail;
@Component
public interface Criteria {
    public List<Mail> meetCriteria(List<Mail> mails);
}

