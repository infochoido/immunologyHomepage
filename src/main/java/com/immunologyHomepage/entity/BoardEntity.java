package com.immunologyHomepage.entity;


import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import com.immunologyHomepage.dto.request.board.postBoardRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="board")
@Table(name="board")
public class BoardEntity {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int boardNumber;
    private String title;
    private String content;
    private String writeDateTime;
    private String writerNickname;
    private String category;
    private int viewCount;
    
    public BoardEntity(postBoardRequestDto dto, String userName){
        
        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDateTime = simpleDateFormat.format(now);
        
        this.category = dto.getCategory();
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writeDateTime = writeDateTime;
        this.viewCount = 0;
        this.writerNickname = userName;
    }
}
