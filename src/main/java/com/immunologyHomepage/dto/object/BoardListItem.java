package com.immunologyHomepage.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.immunologyHomepage.entity.BoardListViewEntity;
import com.immunologyHomepage.entity.BoardEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {
    private int boardNumber;
    private String title;
    private String content;
    private String titleImage;
    private int viewCount;
    private String writeDateTime;
    private String writerNickname; 
    private String category;   

    public BoardListItem(BoardListViewEntity boardListViewEntity){
        this.boardNumber =boardListViewEntity.getBoardNumber();
        this.title = boardListViewEntity.getTitle();
        this.content = boardListViewEntity.getContent();
        this.titleImage = boardListViewEntity.getTitleImage();
        this.viewCount = boardListViewEntity.getViewCount();
        this.writeDateTime = boardListViewEntity.getWriteDateTime();
        this.writerNickname = boardListViewEntity.getWriterNickname();
    }

    public BoardListItem(BoardEntity boardEntity) {
        this.boardNumber = boardEntity.getBoardNumber();
        this.title = boardEntity.getTitle();
        this.content = boardEntity.getContent();
        this.writeDateTime = boardEntity.getWriteDateTime();
        this.writerNickname = boardEntity.getWriterNickname();
    }

    public static List<BoardListItem> getListFromViewEntity(List<BoardListViewEntity> boardListViewEntities){
        List<BoardListItem> list = new ArrayList<>();
        for(BoardListViewEntity boardListViewEntity:boardListViewEntities){
            BoardListItem boardListItem = new BoardListItem(boardListViewEntity);
            list.add(boardListItem);
        }

        return list;
    }

    public static List<BoardListItem> getListFromEntity(List<BoardEntity> boardEntities) {
        List<BoardListItem> list = new ArrayList<>();
        for(BoardEntity boardEntity : boardEntities) {
            BoardListItem boardListItem = new BoardListItem(boardEntity);
            list.add(boardListItem);
        }
        return list;
    }
}
