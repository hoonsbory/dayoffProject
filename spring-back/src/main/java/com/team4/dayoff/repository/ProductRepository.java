package com.team4.dayoff.repository;


import java.util.List;

import com.team4.dayoff.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * ProductRepository
 */
public interface ProductRepository extends JpaRepository<Product,Integer>{

    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.isAvailable=:isAvailable WHERE p.id= :productId")
    void changeAvailabilityOfProduct(@Param("productId") int productId, @Param("isAvailable") int isAvailable);
    
    @Query(value="select  distinct p.id productId ,p.price price, p.name productName, pic.name productThumbnailName  from (select ogresult.tid, ogresult.productId from (select distinct og.tid, o.id , o.productId from product p join orders o on p.id = o.productId join orderGroup og on o.groupId = og.tid join users user on og.userId = user.id where user.id in (select distinct u.id from users u join orderGroup og on u.id = og.userid join orders o on o.groupId = og.tid join product p on p.id = o.productId where p.id = :productId)) ogresult where ogresult.productId = :productId) finalresult join orders o on finalresult.tid = o.groupId join product p on p.id = o.productId join (SELECT pib.* FROM (SELECT productId, MIN(id) id FROM productImage GROUP BY productId) pia INNER JOIN productImage pib ON pia.id=pib.id) pic ON p.id=pic.productId where o.productId not in(:productId)", nativeQuery=true)
    List<Object[]> togetherBuy(@Param("productId") int productId);
    //현재 조회중인 상품과 함께 구매했던 다른 상품들.
    @Query(value="select  distinct p.id productId ,p.price price, p.name productName, pic.name productThumbnailName  from (select ogresult.tid, ogresult.productId from (select distinct og.tid, o.id , o.productId from product p join orders o on p.id = o.productId join orderGroup og on o.groupId = og.tid join users user on og.userId = user.id where user.id in (select distinct u.id from users u join orderGroup og on u.id = og.userid join orders o on o.groupId = og.tid join product p on p.id = o.productId where p.id = :productId)) ogresult where ogresult.productId = :productId) finalresult join orders o on finalresult.tid = o.groupId join product p on p.id = o.productId join (SELECT pib.* FROM (SELECT productId, MIN(id) id FROM productImage GROUP BY productId) pia INNER JOIN productImage pib ON pia.id=pib.id) pic ON p.id=pic.productId where o.productId not in(:productId)", nativeQuery=true)
    List<String[]> togetherBuy2(@Param("productId") int productId);
    //현재 조회중인 상품과 함께 구매했던 다른 상품들.
}