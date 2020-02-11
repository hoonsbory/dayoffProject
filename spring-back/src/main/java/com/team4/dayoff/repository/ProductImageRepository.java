package com.team4.dayoff.repository;

import com.team4.dayoff.entity.ProductImage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * ProductImageRepository
 */
public interface ProductImageRepository extends JpaRepository<ProductImage,Integer>{
    ProductImage findTop1ByProduct_IdOrderById(int productId);

    @Transactional
    @Modifying
    @Query("DELETE FROM ProductImage WHERE name=:name")
    void  deleteByName(@Param("name") String name);
}