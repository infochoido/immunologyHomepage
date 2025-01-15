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


@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{
  
    private final AdminRepository adminRepository;
    

    private final JwtProvider jwtProvider;
    

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto){
        
        try{
            String userName = dto.getUserName();
            boolean existedUserName = adminRepository.existsByUserName(userName);
            if(existedUserName) return SignUpResponseDto.databaseError();
            
            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(password);
            AdminEntity adminEntity = new AdminEntity(dto);
            adminRepository.save(adminEntity);



        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }


    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto){
        
        String token = null;


        try{
            String userName = dto.getUserName();
            AdminEntity adminEntity = adminRepository.findByUserName(userName);
            if(adminEntity == null) return SignInResponseDto.signInFailed();

            String password = dto.getPassword();
            String encodedPassword = adminEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password,encodedPassword);
            

            if(!isMatched) return SignInResponseDto.signInFailed();

            
            // if(!isMatched) return SignInResponseDto.signInFailed();

            

            token = jwtProvider.create(userName);


        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
    }

}
