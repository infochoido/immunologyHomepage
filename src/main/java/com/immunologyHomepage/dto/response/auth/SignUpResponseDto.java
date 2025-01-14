package com.immunologyHomepage.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.immunologyHomepage.common.ResponseCode;
import com.immunologyHomepage.common.ResponseMessage;
import com.immunologyHomepage.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class SignUpResponseDto extends ResponseDto{

    private SignUpResponseDto(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
    
    public static ResponseEntity<SignUpResponseDto> success(){
        SignUpResponseDto result = new SignUpResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> duplicateUserName(){
        ResponseDto result = new ResponseDto(ResponseCode.DUPLICATE_USERNAME, ResponseMessage.DUPLICATE_USERNAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
