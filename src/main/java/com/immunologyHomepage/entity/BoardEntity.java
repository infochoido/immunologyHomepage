package com.immunologyHomepage.entity;


import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.time.LocalDateTime;

import com.immunologyHomepage.dto.request.board.postBoardRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"board\"")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"board_number\"")
    private int boardNumber;
    
    @Column(name = "\"title\"", nullable = false)
    private String title;
    
    @Column(name = "\"content\"", nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Column(name = "\"write_date_time\"")
    private String writeDateTime;
    
    @Column(name = "\"writer_nickname\"")
    private String writerNickname;
    
    @Column(name = "\"category\"")
    private String category;
    
    @Column(name = "\"view_count\"")
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

    public BoardEntity(postBoardRequestDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.category = dto.getCategory();
        this.writeDateTime = LocalDateTime.now().toString();
        this.viewCount = 0;
    }

    public void increaseViewCont(){
        this.viewCount++;
    }
}
