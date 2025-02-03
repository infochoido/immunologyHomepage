package com.immunologyHomepage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

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
        @RequestBody @Valid SignInRequestDto requestBody) {
        try {
            System.out.println("Sign-in request received for user: " + requestBody.getUserName());
            ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
            System.out.println("Sign-in response: " + response.getStatusCode());
            return response;
        } catch (Exception e) {
            System.err.println("Error in sign-in: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    }