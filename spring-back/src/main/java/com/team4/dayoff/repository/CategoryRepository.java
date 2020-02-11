package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * CategoryRepository
 */
public interface CategoryRepository extends JpaRepository<Category,Integer>{

    List<Category> findByName(String categoryName);
    
  //카테고리목록
//    @Query(value="select * from category where category.name =:name or category.subName =:name" , nativeQuery=true)
//    List<Category> CategoryList(@Param("name") String name);
    
    @Query(value="select * from category where category.name =(select name from category where subName=:name)" , nativeQuery=true)
    List<Category> CategorySubList(@Param("name") String name);
    
    @Query(value="select * from category where name=:name" , nativeQuery=true)
    List<Category> CategoryNameList(@Param("name") String name);
}