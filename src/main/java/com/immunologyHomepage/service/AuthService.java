package com.immunologyHomepage.service;

import org.springframework.http.ResponseEntity;

import com.immunologyHomepage.dto.request.auth.SignInRequestDto;
import com.immunologyHomepage.dto.request.auth.SignUpRequestDto;
import com.immunologyHomepage.dto.response.auth.SignInResponseDto;
import com.immunologyHomepage.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);    
}
