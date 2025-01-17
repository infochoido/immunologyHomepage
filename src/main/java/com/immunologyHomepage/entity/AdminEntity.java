package com.immunologyHomepage.entity;

import com.immunologyHomepage.dto.request.auth.SignUpRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Id
    @Column(name = "nickname")
    private String userName;
    private String password;

    @Column(name = "role") // 역할을 나타내는 컬럼 추가
    private String role;

    public AdminEntity(SignUpRequestDto dto) {
        this.userName = dto.getUserName();
        this.password = dto.getPassword(); // 비밀번호를 그대로 저장할 경우, 암호화 고려
    }

    public String getRole() {
        return this.role;
    }
}
