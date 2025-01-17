package com.immunologyHomepage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.immunologyHomepage.dto.request.board.postBoardRequestDto;
import com.immunologyHomepage.dto.response.board.PostBoardResponseDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.immunologyHomepage.service.BoardService;


@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
        @RequestBody @Valid postBoardRequestDto requestBody, String userName
        // @AuthenticationPrincipal String userName
    ){
        ResponseEntity<? super PostBoardResponseDto> response =  boardService.postBoard(requestBody, userName);
        return response;
    }
    
}
