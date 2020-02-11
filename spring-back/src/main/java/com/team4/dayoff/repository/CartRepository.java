package com.team4.dayoff.repository;

import com.team4.dayoff.entity.Cart;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Integer>{

	void deleteById(Integer id);
   
}

