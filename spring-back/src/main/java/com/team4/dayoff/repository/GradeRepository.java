package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.Grade;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * GradeRepository
 */
public interface GradeRepository extends JpaRepository<Grade, String> {

    public List<Grade> findAllByOrderByRate();
    
}