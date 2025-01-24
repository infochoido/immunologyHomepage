package com.immunologyHomepage.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.immunologyHomepage.common.ResponseCode;
import com.immunologyHomepage.common.ResponseMessage;
import com.immunologyHomepage.dto.response.ResponseDto;
import com.immunologyHomepage.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetBoardCategoryResponseDto extends ResponseDto {

    private List<BoardListViewEntity> categoryList;

    private GetBoardCategoryResponseDto(List<BoardListViewEntity> boardEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.categoryList = boardEntities;  // BoardListViewEntity 목록을 직접 저장
    }

    public static ResponseEntity<GetBoardCategoryResponseDto> success(List<BoardListViewEntity> boardEntities) {
        GetBoardCategoryResponseDto result = new GetBoardCategoryResponseDto(boardEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
