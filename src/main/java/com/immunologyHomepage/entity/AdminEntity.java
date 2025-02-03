package com.immunologyHomepage.entity;

import com.immunologyHomepage.dto.request.auth.SignUpRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "\"user\"")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminEntity {

    @Id
    @Column(name = "\"nickname\"")
    private String userName;
    
    @Column(name = "\"password\"")
    private String password;

    @Column(name = "\"role\"")
    private String role;

    public AdminEntity(SignUpRequestDto dto) {
        this.userName = dto.getUserName();
        this.password = dto.getPassword();
        this.role = "ADMIN";
    }

    public String getRole() {
        return this.role;
    }
}
