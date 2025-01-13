package com.immunologyHomepage.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.immunologyHomepage.dto.request.board.postBoardRequestDto;
import com.immunologyHomepage.dto.response.ResponseDto;
import com.immunologyHomepage.dto.response.board.PostBoardResponseDto;
import com.immunologyHomepage.entity.BoardEntity;
import com.immunologyHomepage.entity.ImageEntity;
import com.immunologyHomepage.repository.AdminRepository;
import com.immunologyHomepage.repository.BoardRepository;
import com.immunologyHomepage.repository.ImageRepository;
import com.immunologyHomepage.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService{

    private final AdminRepository adminRepository; 
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(postBoardRequestDto dto, String userName){
        try{
            boolean existedAdminName = adminRepository.findByUserName(userName);
            if(!existedAdminName) return PostBoardResponseDto.notExistUser();

            BoardEntity boardEntity = new BoardEntity(dto,userName);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();
            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for(String image: boardImageList){
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }

            imageRepository.saveAll(imageEntities);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();
    }
    


}