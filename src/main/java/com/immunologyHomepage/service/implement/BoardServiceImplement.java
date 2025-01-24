package com.immunologyHomepage.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.immunologyHomepage.dto.request.board.postBoardRequestDto;
import com.immunologyHomepage.dto.response.ResponseDto;
import com.immunologyHomepage.dto.response.board.PostBoardResponseDto;
import com.immunologyHomepage.entity.BoardEntity;
import com.immunologyHomepage.entity.BoardListViewEntity;
import com.immunologyHomepage.entity.ImageEntity;
import com.immunologyHomepage.repository.AdminRepository;
import com.immunologyHomepage.repository.BoardListViewRepository;
import com.immunologyHomepage.repository.BoardRepository;
import com.immunologyHomepage.repository.ImageRepository;
import com.immunologyHomepage.repository.resultSet.GetBoardResultSet;
import com.immunologyHomepage.service.BoardService;
import com.immunologyHomepage.dto.response.board.GetBoardCategoryResponseDto;
import com.immunologyHomepage.dto.response.board.GetBoardResonseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService{

    private final AdminRepository adminRepository; 
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final BoardListViewRepository boardListViewRepository;

    @Override
public ResponseEntity<? super GetBoardCategoryResponseDto> getCategoryBoardList(String category) {
    List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

    try {
        // 카테고리와 작성일시 내림차순으로 게시글 목록 조회
        boardListViewEntities = boardListViewRepository.findByCategoryOrderByWriteDatetimeDesc(category);

    } catch (Exception exception) {
        exception.printStackTrace();
        return ResponseDto.databaseError();  // 예외 발생 시 데이터베이스 오류 응답
    }

    // 성공적으로 게시글 목록을 가져왔으면 응답에 포함하여 반환
    return GetBoardCategoryResponseDto.success(boardListViewEntities);
}
    @Override
    public ResponseEntity<? super GetBoardResonseDto> getBoard(Integer boardNumber){

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();
        try{

            resultSet= boardRepository.getBoard(boardNumber);
            if(resultSet == null){
                return GetBoardResonseDto.noExistBoard();
            }

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCont();
            boardRepository.save(boardEntity);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardResonseDto.success(resultSet, imageEntities);
    }

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(postBoardRequestDto dto, String userName){
        try{
            boolean existedUserName = adminRepository.existsByUserName(userName);
            if(!existedUserName) return PostBoardResponseDto.notExistUser();

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
            return ResponseDto.databaseError(); //데이터베이스 오류
        }

        return PostBoardResponseDto.success(); //게시글 성공적으로 저장시 응답
    }
    


}