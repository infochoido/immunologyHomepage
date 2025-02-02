package com.immunologyHomepage.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="board_list_view")
@Table(name="board_list_view")
public class BoardListViewEntity {
    
    @Id
    private int boardNumber;
    private String title;
    private String content;
    private String category;
    private String titleImage;
    private int viewCount;
    @Column(name = "write_date_time")
    private String writeDatetime;
    private String writerNickname;
    
    
}
