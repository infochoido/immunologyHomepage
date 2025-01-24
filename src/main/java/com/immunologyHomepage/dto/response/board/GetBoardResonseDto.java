package com.immunologyHomepage.dto.response.board;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.immunologyHomepage.common.ResponseCode;
import com.immunologyHomepage.common.ResponseMessage;
import com.immunologyHomepage.dto.response.ResponseDto;
import com.immunologyHomepage.entity.ImageEntity;
import com.immunologyHomepage.repository.resultSet.GetBoardResultSet;

import lombok.Getter;


@Getter
public class GetBoardResonseDto extends ResponseDto{

        private int boardnNumber;
        private String title;
        private String content;
        private List<String> boardImageList;
        private String writeDateTime;
        private String writer_nickname;

     private GetBoardResonseDto(GetBoardResultSet resultSet, List<ImageEntity> imageEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> boardImageList = new ArrayList<>();
        for(ImageEntity imageEntity: imageEntities){
            String boardImage =  imageEntity.getImage();
            boardImageList.add(boardImage);
        }


        this.boardnNumber = resultSet.getBoardNumber();
        this.title = resultSet.getTitle();
        this.content = resultSet.getContent();
        this.boardImageList = boardImageList;
        this.writeDateTime = resultSet.getWriteDatetime();
        this.writer_nickname=resultSet.getWriterNickname();
     }

     public static ResponseEntity<GetBoardResonseDto> success(GetBoardResultSet resultSet, List<ImageEntity> imageEntities){
        GetBoardResonseDto result = new GetBoardResonseDto(resultSet, imageEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);    
    }
    
    public static ResponseEntity<ResponseDto> noExistBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
    
