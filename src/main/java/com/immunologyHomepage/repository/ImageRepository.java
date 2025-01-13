package com.immunologyHomepage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.immunologyHomepage.entity.ImageEntity;

@Repository
public interface ImageRepository  extends JpaRepository<ImageEntity, Integer>{
    
}
