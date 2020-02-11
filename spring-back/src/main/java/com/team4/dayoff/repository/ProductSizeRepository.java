package com.team4.dayoff.repository;

import com.team4.dayoff.entity.ProductSize;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ProductSizeRepository extends JpaRepository<ProductSize,Integer>{

    @Transactional
    @Modifying
    @Query("DELETE FROM ProductSize WHERE productId=:productId")
    void deleteProductSizeByProductId(@Param("productId") int productId);
}