package com.immunologyHomepage.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.immunologyHomepage.dto.response.board.DeleteBoardResponseDto;
import com.immunologyHomepage.dto.request.board.PutBoardRequestDto;
import com.immunologyHomepage.dto.response.board.PutBoardResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService{

    private final AdminRepository adminRepository; 
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;

    @Override
    public ResponseEntity<? super GetBoardCategoryResponseDto> getCategoryBoardList(String category) {
        List<BoardEntity> boardEntities = new ArrayList<>();

        try {
            System.out.println("요청된 카테고리: " + category);
            // board 테이블에서 직접 조회
            boardEntities = boardRepository.findByCategoryOrderByWriteDateTimeDesc(category);
            System.out.println("조회된 게시글 수: " + boardEntities.size());
            
            if (!boardEntities.isEmpty()) {
                BoardEntity firstItem = boardEntities.get(0);
                System.out.println("첫 번째 게시글 정보:");
                System.out.println("- 제목: " + firstItem.getTitle());
                System.out.println("- 카테고리: " + firstItem.getCategory());
                System.out.println("- 게시글 번호: " + firstItem.getBoardNumber());
            }

        } catch (Exception exception) {
            System.err.println("데이터베이스 조회 중 오류 발생:");
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardCategoryResponseDto.success(boardEntities);
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

            imageEntities = imageRepository.findByBoard_BoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCont();
            boardRepository.save(boardEntity);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardResonseDto.success(resultSet, imageEntities);
    }

    @Transactional
    public BoardEntity createBoard(postBoardRequestDto dto, String userName) {
        try {
            // 게시글 저장
            BoardEntity boardEntity = new BoardEntity(dto, userName);
            BoardEntity savedBoard = boardRepository.save(boardEntity);
            
            // 이미지 URL 리스트가 있다면 처리
            if (dto.getBoardImageList() != null && !dto.getBoardImageList().isEmpty()) {
                for (String imageUrl : dto.getBoardImageList()) {
                    ImageEntity imageEntity = new ImageEntity(imageUrl);
                    imageEntity.setBoard(savedBoard);
                    imageRepository.save(imageEntity);
                }
            }
            
            return savedBoard;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional
    public ResponseEntity<? super PostBoardResponseDto> postBoard(postBoardRequestDto dto, String userName) {
        try {
            boolean existedUserName = adminRepository.existsByUserName(userName);
            if (!existedUserName) return PostBoardResponseDto.notExistUser();
    
            // 게시글 저장
            BoardEntity boardEntity = new BoardEntity(dto, userName);
            BoardEntity savedBoard = boardRepository.save(boardEntity);
    
            // 이미지 처리
            if (dto.getBoardImageList() != null && !dto.getBoardImageList().isEmpty()) {
                for (String imageUrl : dto.getBoardImageList()) {
                    ImageEntity imageEntity = new ImageEntity(imageUrl);
                    imageEntity.setBoard(savedBoard);
                    imageRepository.save(imageEntity);
                }
            }
    
            return PostBoardResponseDto.success();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
    }
    
    @Override
    @Transactional
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String userName) {
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return DeleteBoardResponseDto.notExistBoard();
            
            // 작성자 본인인지 확인
            if (!boardEntity.getWriterNickname().equals(userName)) {
                return DeleteBoardResponseDto.noPermission();
            }

            // 이미지 먼저 삭제
            imageRepository.deleteByBoard_BoardNumber(boardNumber);

            // 게시글 삭제
            boardRepository.delete(boardEntity);
            
            return DeleteBoardResponseDto.success();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<? super PutBoardResponseDto> putBoard(Integer boardNumber, PutBoardRequestDto dto, String userName) {
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PutBoardResponseDto.notExistBoard();
            
            if (!boardEntity.getWriterNickname().equals(userName)) {
                return PutBoardResponseDto.noPermission();
            }

            boardEntity.setTitle(dto.getTitle());
            boardEntity.setContent(dto.getContent());
            boardEntity.setCategory(dto.getCategory());
            boardRepository.save(boardEntity);
            
            return PutBoardResponseDto.success();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
    }

}