package com.immunologyHomepage.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.immunologyHomepage.dto.request.auth.SignInRequestDto;
import com.immunologyHomepage.dto.request.auth.SignUpRequestDto;
import com.immunologyHomepage.dto.response.ResponseDto;
import com.immunologyHomepage.dto.response.auth.SignInResponseDto;
import com.immunologyHomepage.dto.response.auth.SignUpResponseDto;
import com.immunologyHomepage.entity.AdminEntity;
import com.immunologyHomepage.provider.JwtProvider;
import com.immunologyHomepage.repository.AdminRepository;
import com.immunologyHomepage.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImplement implements AuthService {
  
    private final AdminRepository adminRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final JwtProvider jwtProvider;
    
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto){
        
        try{
            String userName = dto.getUserName();
            boolean existedUserName = adminRepository.existsByUserName(userName);
            if(existedUserName) return SignUpResponseDto.databaseError();
            
            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);
            AdminEntity adminEntity = new AdminEntity(dto);
            adminRepository.save(adminEntity);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
        String token = null;
        
        try {
            String userName = dto.getUserName();
            log.info("Received login request for user: {}", userName);
            
            // DB 연결 테스트
            try {
                log.info("Testing database connection...");
                adminRepository.count();
                log.info("Database connection successful");
            } catch (Exception e) {
                log.error("Database connection failed", e);
                return ResponseDto.databaseError();
            }
            
            // 사용자 조회
            log.info("Attempting to find user in database: {}", userName);
            AdminEntity adminEntity = adminRepository.findByUserName(userName);
            
            if(adminEntity == null) {
                log.warn("User not found in database: {}", userName);
                return SignInResponseDto.signInFailed();
            }
            log.info("User found: {}", adminEntity);

            // 비밀번호 검증
            String password = dto.getPassword();
            String encodedPassword = adminEntity.getPassword();
            log.info("Verifying password for user: {}", userName);
            
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if(!isMatched) {
                log.warn("Password verification failed for user: {}", userName);
                return SignInResponseDto.signInFailed();
            }
            log.info("Password verified successfully");

            // 토큰 생성
            log.info("Generating JWT token for user: {}", userName);
            token = jwtProvider.create(userName);
            log.info("JWT token generated successfully");

        } catch(Exception exception) {
            log.error("Error during sign-in process", exception);
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
    }
}
