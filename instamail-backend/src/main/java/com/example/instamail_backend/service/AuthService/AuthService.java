package com.example.instamail_backend.service.AuthService;

import com.example.instamail_backend.dto.request.LoginRequest;
import com.example.instamail_backend.dto.request.SignUpRequest;
import com.example.instamail_backend.dto.response.LoginResponse;
import com.example.instamail_backend.dto.response.SignUpResponse;
import com.example.instamail_backend.model.User;
import com.example.instamail_backend.repository.UserRepository;
import com.example.instamail_backend.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.Cookie;

@Service
public class AuthService implements AuthServiceInterface {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong Email or Password");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return new LoginResponse(token);
    }

    @Override
    public SignUpResponse signUp(SignUpRequest signUpRequest) {
        // Check if email already exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            System.out.println("Email already exists");
            throw new RuntimeException("Email already exists");
        }

        // Check if username already exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            System.out.println("Username already exists");
            throw new RuntimeException("Username already exists");
        }

        // Check if phone number already exists
        if (userRepository.existsByPhoneNumber(signUpRequest.getPhoneNumber())) {
            System.out.println("Phone number already exists");
            throw new RuntimeException("Phone number already exists");
        }

        // Proceed with user creation
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setUsername(signUpRequest.getUsername());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());

        try {
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException("An unexpected error occurred while saving the user");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new SignUpResponse(token);
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setValue(null);
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }
    }
}