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
        value=
        "SELECT " + 
        "B.board_number AS board_number, "+
        "B.title AS title, " +
        "B.content AS content, "+
        "B.write_date_time AS write_date_time, "+
        "B.writer_nickname AS writer_nickname, "+
        "U.nickname AS nickname " +
        "FROM board B "+
        "INNER JOIN \"user\" U "+
        "ON B.writer_nickname = U.nickname "+
        "WHERE board_number = ?1",
        nativeQuery=true
    )
    GetBoardResultSet getBoard(Integer boardNumber);

    List<BoardEntity> findByCategoryOrderByWriteDateTimeDesc(String category);

}
