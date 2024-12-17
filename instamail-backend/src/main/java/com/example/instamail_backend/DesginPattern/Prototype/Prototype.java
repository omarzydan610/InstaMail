package com.example.instamail_backend.DesginPattern.Prototype;

public interface Prototype {
    public Prototype clone(String receiverEmail,long mailId);

}
