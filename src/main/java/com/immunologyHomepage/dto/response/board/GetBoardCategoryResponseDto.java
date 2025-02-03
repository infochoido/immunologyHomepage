package com.immunologyHomepage.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.immunologyHomepage.common.ResponseCode;
import com.immunologyHomepage.common.ResponseMessage;
import com.immunologyHomepage.dto.response.ResponseDto;
import com.immunologyHomepage.entity.BoardListViewEntity;
import com.immunologyHomepage.entity.BoardEntity;
import com.immunologyHomepage.dto.object.BoardListItem;

import lombok.Getter;

@Getter
public class GetBoardCategoryResponseDto extends ResponseDto {

    private List<BoardListItem> categoryList;

    public GetBoardCategoryResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<GetBoardCategoryResponseDto> success(List<BoardEntity> boardEntities) {
        GetBoardCategoryResponseDto result = new GetBoardCategoryResponseDto();
        result.categoryList = BoardListItem.getListFromEntity(boardEntities);
        return ResponseEntity.ok(result);
    }
}
