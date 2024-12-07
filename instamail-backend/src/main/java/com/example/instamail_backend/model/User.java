package com.example.instamail_backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String password;
}
