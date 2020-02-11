package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.Refunds;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * RefundsRepository
 */
public interface RefundsRepository extends JpaRepository<Refunds,Integer> {

    //Refunds findByOrders_id(Integer ordersId);

    @Query(value="SELECT c.content reason, IFNULL(COUNT(r.orderId),0) count FROM (SELECT * FROM refunds WHERE DATE_FORMAT(refundDate,'%Y')=:year) r RIGHT JOIN (SELECT * FROM code WHERE code LIKE '01%') c ON r.code=c.code  GROUP BY c.code ORDER BY c.code", nativeQuery=true)
    List<String[]> countReasonByYear(@Param("year") String year);

    @Query(value="SELECT DISTINCT DATE_FORMAT(refundDate,'%Y') year FROM refunds ORDER BY year DESC",nativeQuery = true)
    List<String> findYearOfRefunds();

    @Transactional
    @Modifying
    @Query(value="UPDATE Refunds SET refundDate=CURRENT_TIMESTAMP() WHERE orderId=:orderId")
    void giveRefunds(@Param("orderId") int orderId);

}