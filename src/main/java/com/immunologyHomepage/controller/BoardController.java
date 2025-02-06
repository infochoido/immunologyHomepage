package com.immunologyHomepage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.immunologyHomepage.dto.request.board.postBoardRequestDto;
import com.immunologyHomepage.dto.request.board.PutBoardRequestDto;
import com.immunologyHomepage.dto.response.board.*;
import com.immunologyHomepage.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://jbnuvetmedimmunelab.store", "http://localhost:3000"}, 
             allowCredentials = "true")
public class BoardController {
    
    private final BoardService boardService;

    @GetMapping("/category")
    public ResponseEntity<? super GetBoardCategoryResponseDto> getCategoryBoardList(
        @RequestParam("category") String category) {
        return boardService.getCategoryBoardList(category);
    }
    
    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResonseDto> getBoard(
        @PathVariable("boardNumber") Integer boardNumber) {
        return boardService.getBoard(boardNumber);
    }
    
    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
        @RequestBody @Valid postBoardRequestDto requestBody,
        @AuthenticationPrincipal String userName
    ) {
        return boardService.postBoard(requestBody, userName);
    }
    
    @RequestMapping(value = "/{boardNumber}", method = RequestMethod.DELETE)
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
        @PathVariable("boardNumber") Integer boardNumber,
        @AuthenticationPrincipal String userName
    ) {
        System.out.println("Delete request received - boardNumber: " + boardNumber);
        System.out.println("User: " + userName);
        return boardService.deleteBoard(boardNumber, userName);
    }
    
    @PutMapping("/{boardNumber}")
    public ResponseEntity<? super PutBoardResponseDto> putBoard(
        @PathVariable("boardNumber") Integer boardNumber,
        @RequestBody @Valid PutBoardRequestDto requestBody,
        @AuthenticationPrincipal String userName
    ) {
        return boardService.putBoard(boardNumber, requestBody, userName);
    }
}

