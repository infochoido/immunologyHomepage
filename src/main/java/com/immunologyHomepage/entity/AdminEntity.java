package com.immunologyHomepage.entity;

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
    private String userName;
    private String password;
}
