package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.Review;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review,Integer>{
    List<Review> findByProductId(Integer productId);

}