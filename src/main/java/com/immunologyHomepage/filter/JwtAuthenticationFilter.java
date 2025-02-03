package com.immunologyHomepage.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.immunologyHomepage.entity.AdminEntity;
import com.immunologyHomepage.provider.JwtProvider;
import com.immunologyHomepage.repository.AdminRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final AdminRepository adminRepository;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        log.info("=== JwtAuthenticationFilter 시작 ===");
        log.info("Request URI: {}", request.getRequestURI());
        log.info("Current Authentication: {}", SecurityContextHolder.getContext().getAuthentication());
        
        try {
            // 이미지 요청은 토큰 검증을 건너뜁니다
            if (request.getRequestURI().startsWith("/api/v1/images/")) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = extractToken(request);
            log.info("추출된 토큰: {}", token != null ? "존재" : "없음");
            
            if (token != null && jwtProvider.validateToken(token)) {
                String userName = jwtProvider.validate(token);
                log.info("토큰에서 추출한 userName: {}", userName);
                
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(userName, null, Arrays.asList(new SimpleGrantedAuthority("USER")));
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("인증 정보 설정 완료: {}", authentication);
            } else {
                log.warn("유효한 토큰이 없거나 검증 실패");
            }
        } catch (Exception e) {
            log.error("인증 처리 중 오류 발생", e);
            SecurityContextHolder.clearContext();
            log.info("SecurityContext 초기화됨");
        }
        
        log.info("현재 SecurityContext 인증 정보: {}", SecurityContextHolder.getContext().getAuthentication());
        filterChain.doFilter(request, response);
        log.info("=== JwtAuthenticationFilter 종료 ===\n");
    }

    private String extractToken(HttpServletRequest request) {
        // Authorization 헤더 확인
        String bearerToken = request.getHeader("Authorization");
        log.info("Authorization 헤더: {}", bearerToken);
        
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        
        // 쿠키에서 토큰 확인
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            log.info("쿠키 개수: {}", cookies.length);
            for (Cookie cookie : cookies) {
                log.info("쿠키 이름: {}, 값: {}", cookie.getName(), cookie.getValue() != null ? "존재" : "없음");
                if ("accessToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        } else {
            log.info("쿠키가 없음");
        }
        
        return null;
    }
}
