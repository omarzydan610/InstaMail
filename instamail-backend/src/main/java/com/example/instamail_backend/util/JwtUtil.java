package com.example.instamail_backend.util;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Secure 256-bit key

    // Generate a JWT token with the email as the subject
    public String generateToken(Long Id) {
        return Jwts.builder().setSubject(String.valueOf(Id)).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SECRET_KEY).compact();
    }

    // Extract user (subject) from the token
    public Long extractId(String token) {
        String IdString = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody()
                .getSubject();
        Long Id = Long.parseLong(IdString);
        return (Id);
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody().getExpiration()
                .before(new Date());
    }

    // Validate the token
    public boolean isTokenValid(String token) {
        try {
            return extractId(token) != null && !isTokenExpired(token);
        } catch (Exception e) {
            return false; // Invalid token
        }
    }
}