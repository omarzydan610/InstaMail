package com.example.instamail_backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignUpRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String username;
    private String phoneNumber;
}