package com.immunologyHomepage.provider;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.security.Key;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    //function 

    public String create(String userName) {
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)); // SecretKey 생성
    
        String jwt = Jwts.builder()
            .signWith(key, SignatureAlgorithm.HS256) // HMAC 알고리즘 사용
            .setSubject(userName).setIssuedAt(new Date()).setExpiration(expiredDate)
            .compact();
    
        return jwt;
    }
    

    public String validate(String jwt){

        Claims claims = null;
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try{
            claims = Jwts.parserBuilder().setSigningKey(key)
            .build()
            .parseClaimsJws(jwt).getBody();
        }catch(Exception exception){
            exception.printStackTrace();
            return null;

        }

        return claims.getSubject();
    }
}
