package com.immunologyHomepage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.immunologyHomepage.entity.ImageEntity;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
    List<ImageEntity> findByBoard_BoardNumber(Integer boardNumber);
    void deleteByBoard_BoardNumber(Integer boardNumber);
}
