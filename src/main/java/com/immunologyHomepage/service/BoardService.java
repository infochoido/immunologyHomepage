package com.immunologyHomepage.service;

import org.springframework.http.ResponseEntity;

import com.immunologyHomepage.dto.request.board.postBoardRequestDto;
import com.immunologyHomepage.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(postBoardRequestDto dto, String userName);
}
