package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.Code;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * CodeRepository
 */
public interface CodeRepository extends JpaRepository<Code, String>{
    List<Code> findByCodeLikeOrderByCode(String code);
    Code findByCode(String code);
    
}