package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.CartView;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CartViewRepository extends JpaRepository<CartView,Integer>{

	List<CartView> findByUserId(Integer userId);
   
}

