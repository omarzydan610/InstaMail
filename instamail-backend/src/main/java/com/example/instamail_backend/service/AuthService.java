package com.example.instamail_backend.service;

import com.example.instamail_backend.dto.request.LoginRequest;
import com.example.instamail_backend.dto.request.SignUpRequest;
import com.example.instamail_backend.dto.response.LoginResponse;
import com.example.instamail_backend.dto.response.SignUpResponse;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.UserRepository;
// import com.example.instamail_backend.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    // @Autowired
    // private JwtUtil jwtUtil;

    // public LoginResponse login(LoginRequest loginRequest) {
    // User user = userRepository.findByEmail(loginRequest.getEmail())
    // .orElseThrow(() -> new RuntimeException("User not found"));
    // if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
    // {
    // throw new RuntimeException("Invalid credentials");
    // }

    // String token = jwtUtil.generateToken(user.getEmail());
    // return new LoginResponse(token);
    // }

    public SignUpResponse signUp(SignUpRequest signUpRequest) {

        // Create and save the new user
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        // user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setPassword(signUpRequest.getPassword());
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setUsername(signUpRequest.getUsername());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        userRepository.save(user);

        return new SignUpResponse("User registered successfully");
    }
}
