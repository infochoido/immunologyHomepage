package com.immunologyHomepage.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.immunologyHomepage.entity.BoardEntity;



@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{
    
}
