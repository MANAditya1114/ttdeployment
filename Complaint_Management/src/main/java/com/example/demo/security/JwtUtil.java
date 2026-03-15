package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey key;
    private final long expiration;

    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.expiration}") long expiration) {

        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expiration = expiration;
    }

    // ==============================
    // GENERATE TOKEN
    // ==============================
    public String generateToken(String email, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }

    // ==============================
    // EXTRACT EMAIL
    // ==============================
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // ==============================
    // EXTRACT ROLE
    // ==============================
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    // ==============================
    // VALIDATE TOKEN
    // ==============================
    public boolean validateToken(String token) {

        try {

            Claims claims = extractClaims(token);

            // ⭐ check expiration
            return !claims.getExpiration().before(new Date());

        } catch (Exception e) {
            return false;
        }
    }

    // ==============================
    // COMMON METHOD
    // ==============================
    private Claims extractClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}