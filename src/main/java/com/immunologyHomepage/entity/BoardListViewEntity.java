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
@Entity
@Table(name = "\"board_list_view\"")
public class BoardListViewEntity {
    
    @Id
    @Column(name = "\"board_number\"")
    private int boardNumber;
    
    @Column(name = "\"title\"")
    private String title;
    
    @Column(name = "\"content\"")
    private String content;
    
    @Column(name = "\"category\"")
    private String category;
    
    @Column(name = "\"title_image\"")
    private String titleImage;
    
    @Column(name = "\"view_count\"")
    private int viewCount;
    
    @Column(name = "\"write_date_time\"")
    private String writeDateTime;
    
    @Column(name = "\"writer_nickname\"")
    private String writerNickname;

    public static BoardListViewEntity fromBoardEntity(BoardEntity boardEntity) {
        BoardListViewEntity viewEntity = new BoardListViewEntity();
        viewEntity.boardNumber = boardEntity.getBoardNumber();
        viewEntity.title = boardEntity.getTitle();
        viewEntity.writerNickname = boardEntity.getWriterNickname();
        viewEntity.writeDateTime = boardEntity.getWriteDateTime();
        viewEntity.viewCount = boardEntity.getViewCount();
        return viewEntity;
    }
}
