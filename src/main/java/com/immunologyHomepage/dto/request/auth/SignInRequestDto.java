package com.immunologyHomepage.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequestDto {
    @NotBlank
    private String userName;

    @NotBlank
    private String password;


}
