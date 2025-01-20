package com.immunologyHomepage.filter;

import java.io.IOException;
import java.util.ArrayList;
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
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    
    private final JwtProvider jwtProvider;
    private final AdminRepository adminRepository;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                
                String requestPath = request.getRequestURI();

                if (requestPath.startsWith("/api/v1/auth")) {
                    filterChain.doFilter(request, response);
                    return;
                }

        try{
            String token = parseBearerToken(request);

        if(token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String userName = jwtProvider.validate(token);

        if(userName == null ){
            filterChain.doFilter(request, response);
            return;
        }

        AdminEntity adminEntity = adminRepository.findByUserName((userName));
        String role = adminEntity.getRole(); //ROLE_USER, ROLE_ADMIN


        if (role == null || role.isEmpty()) {
            throw new IllegalArgumentException("Role is missing or empty for user: " + userName);
        }

        System.out.println("User: " + userName + " with role: " + role);  // 권한 정보 로그

        
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

        //ROLE_DEVELOPER ROLE_BOSS
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));

        AbstractAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(userName, null, authorities);

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

           
            securityContext.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(securityContext);

        }catch(Exception exception){
            System.out.println("JWT Authentication failed");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            exception.printStackTrace();
        }
        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);

        if(!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if(!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }

    
}
