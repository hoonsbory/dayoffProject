package com.team4.dayoff.repository;


import java.util.List;

import com.team4.dayoff.entity.ProductView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

/**
 * ProductViewRepository
 */
@Repository
public interface ProductViewRepository extends JpaRepository<ProductView,Integer>{
    //한달간 베스트
    @Query(value="select * from productView where isAvailable!=0 && registerDate BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND now() ORDER BY orderCount desc limit 4" , nativeQuery=true)
    List<ProductView> TopBannerList();
    //상품 판매 베스트
    @Query(value="select * from productView where isAvailable!=0 && registerDate BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND now() ORDER BY orderCount desc limit 8" , nativeQuery=true)
    List<ProductView> TopproductList();
    
    //낮은가격순
    @Query(value="select * from productView where isAvailable!=0 ORDER BY price Asc limit 8" , nativeQuery=true)
    List<ProductView> AscpriceList();
    
    //높은가격순
    @Query(value="select * from productView where isAvailable!=0 ORDER BY price Desc limit 8" , nativeQuery=true)
    List<ProductView> DescpriceList();
    
    //날짜순
    @Query(value="select * from productView where isAvailable!=0 ORDER BY registerDate desc limit 8" , nativeQuery=true)
    List<ProductView> RegisterList();
     
    /////////////////////////
    
    //한달간 베스트
    @Query(value="select * from productView where isAvailable!=0 && registerDate BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND now() ORDER BY orderCount desc" , nativeQuery=true)
    List<ProductView> MonthProductList();

    @Query(value="select * from productView where isAvailable!=0 && registerDate BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND now() ORDER BY orderCount desc limit 5" , nativeQuery=true)
    List<ProductView> MonthProductListMax5();
    
    @Query(value="select * from productView where isAvailable!=0 && categoryName=:name" , nativeQuery=true)
    List<ProductView> MainCategory(@Param("name") String name, Pageable pageable);
    
    @Query(value="select * from productView where isAvailable!=0 && categorySubName=:name" , nativeQuery=true)
    List<ProductView> SubCategory(@Param("name") String name, Pageable pageable);
    
    @Query(value="select * from productView where categoryName=:name" , nativeQuery=true)
    List<ProductView> AdminMainCategory(@Param("name") String name, Pageable pageable);
    
    @Query(value="select * from productView where categorySubName=:name" , nativeQuery=true)
    List<ProductView> AdminSubCategory(@Param("name") String name, Pageable pageable);
//    
//    //카테고리
//    @Query(value="select name, subName from category where name =:name" , nativeQuery=true)
//    List<Category> keywordCategory(@Param("name") String name);
    
    //상품검색
    @Query(value="select * from productView where isAvailable!=0 && productView.name like %:name%" , nativeQuery=true)
    List<ProductView> SearchProduct(@Param("name") String name, Pageable pageable);
    
    //Admin상품검색
    @Query(value="select * from productView where productView.name like %:name%" , nativeQuery=true)
    List<ProductView> SearchAdminProduct(@Param("name") String name, Pageable pageable);
    
    
//    //판매시작
//    @Transactional
//    @Modifying
//    @Query(value="update productView set isAvailable=1 WHERE productView.id=:id", nativeQuery = true)
//    void isAvailableUp(@Param("id") int id);
//    
//    
//    //판매중지
//    @Transactional
//    @Modifying
//    @Query(value="update productView set isAvailable=0 WHERE productView.id=:id", nativeQuery = true)
//    void isAvailableDown(@Param("id") int id);
    
    //컬러조회
    @Query(value="select * from productView where isAvailable=1 and productView.id in (select p.id from product p join productColor pc on p.id=pc.productId join color c on pc.colorId=c.id where c.color=:name)", nativeQuery=true)
    List<ProductView> ColorProduct(@Param("name") String name);
    
  //Admin컬러조회
    @Query(value="select * from productView where productView.id in (select p.id from product p join productColor pc on p.id=pc.productId join color c on pc.colorId=c.id where c.color=:name)" , nativeQuery=true)
    List<ProductView> AdminColorProduct(@Param("name") String name);
}