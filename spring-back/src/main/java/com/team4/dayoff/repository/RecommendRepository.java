package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.RecommendByCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

/**
 * testRepository
 */
@Service
public interface RecommendRepository extends JpaRepository<RecommendByCategory,Integer>{
 List<RecommendByCategory> findByCategoryName(@Param("categoryName") String categoryName);

 RecommendByCategory findByProductThumbnailName(@Param("productThumbnailName")String productThumbnailName);

 RecommendByCategory findByProductId(@Param("id") int id);

 @Query(value="select * from recommendByCategory limit 10", nativeQuery = true)
 List<RecommendByCategory> best10();
 
 @Query(value="select * from recommendByCategory limit 4", nativeQuery = true)
 List<RecommendByCategory> best4();

}