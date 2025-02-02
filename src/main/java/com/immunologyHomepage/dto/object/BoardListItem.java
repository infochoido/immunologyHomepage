package com.immunologyHomepage.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.immunologyHomepage.entity.BoardListViewEntity;

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
    private String writeDatetime;
    private String writerNickname; 
    private String category;   

    public BoardListItem(BoardListViewEntity boardListViewEntity){
        this.boardNumber =boardListViewEntity.getBoardNumber();
        this.title = boardListViewEntity.getTitle();
        this.content = boardListViewEntity.getContent();
        this.titleImage = boardListViewEntity.getTitleImage();
        this.viewCount = boardListViewEntity.getViewCount();
        this.writeDatetime = boardListViewEntity.getWriteDatetime();
        this.writerNickname = boardListViewEntity.getWriterNickname();
    }

    public static List<BoardListItem> getList(List<BoardListViewEntity> boardListViewEntities){
        List<BoardListItem> list = new ArrayList<>();
        for(BoardListViewEntity boardListViewEntity:boardListViewEntities){
            BoardListItem boardListItem = new BoardListItem(boardListViewEntity);
            list.add(boardListItem);
        }

        return list;
    }
}
