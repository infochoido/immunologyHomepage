package com.immunologyHomepage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.immunologyHomepage.entity.BoardListViewEntity;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer> {

    List<BoardListViewEntity> findByCategoryOrderByWriteDateTimeDesc(String category);

    @Query(value = "SELECT * FROM board_list_view WHERE category = ?1 ORDER BY write_date_time DESC", nativeQuery = true)
    List<BoardListViewEntity> findByCategoryWithOrderByWriteDatetimeDesc(String category);
}
