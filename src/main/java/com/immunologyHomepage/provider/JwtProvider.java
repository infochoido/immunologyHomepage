package com.immunologyHomepage.provider;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.security.Key;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
    
    private final String secretKey = "S3cr3tK3yS3cr3tK3yS3cr3tK3y1234567890S3cr3tK3y";
    private final Long expiredMs = 1000 * 60 * 60L; // 1시간

    public String create(String userName) {
        Date expiredDate = Date.from(Instant.now().plusMillis(expiredMs));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    
        String jwt = Jwts.builder()
            .signWith(key, SignatureAlgorithm.HS256)
            .setSubject(userName)
            .setIssuedAt(new Date())
            .setExpiration(expiredDate)
            .compact();
    
        return jwt;
    }
    
    public String validate(String jwt) {
        Claims claims = null;
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try {
            claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
        } catch(Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
