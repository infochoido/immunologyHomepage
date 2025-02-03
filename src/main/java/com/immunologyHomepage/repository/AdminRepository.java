package com.immunologyHomepage.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.immunologyHomepage.entity.AdminEntity;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, String> {

    // 주어진 userName이 존재하는지 확인하는 메서드
    boolean existsByUserName(String userName);

    @Query("SELECT a FROM AdminEntity a WHERE a.userName = :userName")
    AdminEntity findByUserName(@Param("userName") String userName);
}
