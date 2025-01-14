package com.immunologyHomepage.entity;

import com.immunologyHomepage.dto.request.auth.SignUpRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="user")
@Table(name="user")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminEntity {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private String userName;
    private String password;

    public AdminEntity(SignUpRequestDto dto){
        this.userName = dto.getUserName();
        this.password = dto.getPassword();
    }
}
