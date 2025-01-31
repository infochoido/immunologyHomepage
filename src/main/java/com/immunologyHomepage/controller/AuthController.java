package com.immunologyHomepage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.immunologyHomepage.dto.request.auth.SignUpRequestDto;
import com.immunologyHomepage.dto.request.auth.SignInRequestDto;
import com.immunologyHomepage.dto.response.auth.SignUpResponseDto;
import com.immunologyHomepage.dto.response.auth.SignInResponseDto;

import com.immunologyHomepage.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
        @RequestBody @Valid SignUpRequestDto requestBody
        ){
            System.out.println("sign-up endpoint called");
            ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
            return response;
        }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
        @RequestBody @Valid SignInRequestDto requestBody){
            System.out.println("sign-in endpoint called");
            ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
            return response;
        }
    
    }