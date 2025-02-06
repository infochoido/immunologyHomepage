package com.immunologyHomepage.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.immunologyHomepage.entity.BoardEntity;
import com.immunologyHomepage.repository.resultSet.GetBoardResultSet;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{

    BoardEntity findByBoardNumber(Integer boardNumber);

    @Query(
        value = 
        "SELECT " +
        "B.board_number AS boardNumber, " +
        "B.title AS title, " +
        "B.content AS content, " +
        "B.write_date_time AS writeDateTime, " +
        "U.nickname AS writerNickname " +
        "FROM board AS B " +
        "INNER JOIN user AS U " +
        "ON B.writer_email = U.email " +
        "WHERE B.board_number = ?1",
        nativeQuery = true
    )
    GetBoardResultSet getBoard(Integer boardNumber);

    List<BoardEntity> findByCategoryOrderByWriteDateTimeDesc(String category);

}
