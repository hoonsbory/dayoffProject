package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.OrderView;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * OrderViewRepository
 */
public interface OrderViewRepository extends JpaRepository<OrderView,Integer>{

    Page<OrderView> findByCode(@Param("code") String code , Pageable pageable);

    @Query(value= "select * from orderView where userName like %:name%", nativeQuery = true)
    Page<OrderView> findByUserName(@Param("name") String name, Pageable pageable);
    
    @Query(value= "select * from orderView where userName like %:name% and code = :code", nativeQuery = true)
    Page<OrderView> findByUserNameAndCode(@Param("name") String name, @Param("code") String code, Pageable pageable);

    @Query(value= "select * from orderView where userId = :userId", nativeQuery = true)
    Page<OrderView> findByIdpage(@Param("userId") Integer userId, Pageable pageable);

    List<OrderView> findByCode(String code);
    List<OrderView> findByCodeAndUserId(String code, Integer UserId);
    List<OrderView> findByCodeOrCode(String code,String code2);
}