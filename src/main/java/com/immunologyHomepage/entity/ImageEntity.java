package com.immunologyHomepage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity(name = "image")
@Table(name = "image")
@NoArgsConstructor
@Getter
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sequence;
    
    @Column(nullable = false)
    private String image;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_number")
    private BoardEntity board;

    public ImageEntity(String image) {
        this.image = image;
    }

    public void setBoard(BoardEntity board) {
        this.board = board;
    }
}
