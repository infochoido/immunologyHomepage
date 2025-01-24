package com.immunologyHomepage.service;

import org.springframework.http.ResponseEntity;

import com.immunologyHomepage.dto.request.board.postBoardRequestDto;
import com.immunologyHomepage.dto.response.board.PostBoardResponseDto;
import com.immunologyHomepage.dto.response.board.GetBoardResonseDto;
import com.immunologyHomepage.dto.response.board.GetBoardCategoryResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResonseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDto> postBoard(postBoardRequestDto dto, String userName);
    ResponseEntity<? super GetBoardCategoryResponseDto>  getCategoryBoardList(String category);
    
    // ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String userName);
    // ResponseEntity<? super PatchBoardResoponseDto> patchBoard(PatchBoardRequestDto dto, String userName);
    // ResponseEntity<? super increaseViewContResponseDto> increaseViewCount(Integer boardNumber);

}
