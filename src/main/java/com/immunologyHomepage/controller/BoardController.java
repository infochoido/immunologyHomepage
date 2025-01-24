package com.immunologyHomepage.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.immunologyHomepage.dto.response.board.GetBoardCategoryResponseDto;
import com.immunologyHomepage.dto.response.board.GetBoardResonseDto;


@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

     @GetMapping("/category")
    public ResponseEntity<? super GetBoardCategoryResponseDto> getCategoryBoardList(
        @RequestParam("category") String category) {
            // 서비스에서 카테고리별 게시글을 가져오는 메서드 호출
            return boardService.getCategoryBoardList(category);
    }
    

    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResonseDto>getBoard(
        @PathVariable("boardNumber") Integer boardNumber){
            ResponseEntity<? super GetBoardResonseDto> response = boardService.getBoard(boardNumber);
            return response;
        }
    

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
        @RequestBody @Valid postBoardRequestDto requestBody,
        @AuthenticationPrincipal String userName
    ){
        ResponseEntity<? super PostBoardResponseDto> response =  boardService.postBoard(requestBody, userName);
        return response;
    }
    
}

