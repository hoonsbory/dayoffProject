package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.OrderGroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

@Service
public interface OrderGroupRepository extends JpaRepository<OrderGroup, String>{

    @Query(value="SELECT o.sex, o.ageGroup, orders, refunds FROM (SELECT sex, (TIMESTAMPDIFF(year, birth, DATE(CONCAT(:yearMonth,'-01'))) DIV 10)*10  ageGroup, SUM(IF(DATE_FORMAT(orderDate,'%Y-%m')=:yearMonth, totalPay, 0)) orders FROM users u LEFT JOIN orderGroup og ON og.userId=u.id GROUP BY sex, ageGroup HAVING ageGroup>=10 AND ageGroup<=60) o JOIN (SELECT sex, (TIMESTAMPDIFF(year, birth, DATE(CONCAT(:yearMonth,'-01'))) DIV 10)*10  ageGroup, SUM(IF(DATE_FORMAT(refundDate,'%Y-%m')=:yearMonth, refundAmount, 0)) refunds FROM users u LEFT JOIN orderGroup og ON og.userId=u.id LEFT JOIN orders o ON o.groupId=og.tid LEFT JOIN refunds r ON r.orderId=o.id GROUP BY sex, ageGroup HAVING ageGroup>=10 AND ageGroup<=60) r ON o.sex=r.sex AND o.ageGroup=r.ageGroup ORDER BY ageGroup, sex",nativeQuery=true)
    List<String[]> countOrderSexAndAgeGroupByYearMonth(@Param("yearMonth") String yearMonth);

    @Query(value="SELECT *, orders-refunds profits FROM ( "+
        "(SELECT o.month, IFNULL(orders,0) orders, IFNULL(refunds,0) refunds FROM "+
        "(SELECT DATE_FORMAT(orderDate,'%m') month, SUM(totalPay) orders FROM orderGroup WHERE DATE_FORMAT(orderDate,'%Y')=:year GROUP BY month) o "+
        "LEFT JOIN "+ 
        "(SELECT DATE_FORMAT(refundDate,'%m') month, SUM(refundAmount) refunds FROM refunds WHERE DATE_FORMAT(refundDate,'%Y')=:year GROUP BY month) r "+
        "ON o.month=r.month "+
        ") "+
        "UNION "+
        "(SELECT r.month, IFNULL(orders,0) orders, IFNULL(refunds,0) refunds FROM "+
        "(SELECT DATE_FORMAT(orderDate,'%m') month, SUM(totalPay) orders FROM orderGroup WHERE DATE_FORMAT(orderDate,'%Y')=:year GROUP BY month) o "+
        "RIGHT JOIN "+
        "(SELECT DATE_FORMAT(refundDate,'%m') month, SUM(refundAmount) refunds FROM refunds WHERE DATE_FORMAT(refundDate,'%Y')=:year GROUP BY month) r "+
        "ON o.month=r.month "+
        ") "+
        ") un ORDER BY month",nativeQuery = true)
    List<String[]> countOrderMonthByYear(@Param("year") String year);

    @Query(value="SELECT *, orders-refunds profits FROM ( "+
        "(SELECT o.year, IFNULL(orders,0) orders, IFNULL(refunds,0) refunds FROM "+
        "(SELECT DATE_FORMAT(orderDate,'%Y') year, SUM(totalPay) orders FROM orderGroup GROUP BY year) o "+
        "LEFT JOIN "+
        "(SELECT DATE_FORMAT(refundDate,'%Y') year, SUM(refundAmount) refunds FROM refunds WHERE refundDate IS NOT NULL GROUP BY year) r "+
        "ON o.year=r.year "+
        ") "+
        "UNION "+
        "(SELECT r.year, IFNULL(orders,0) orders, IFNULL(refunds,0) refunds FROM "+
        "(SELECT DATE_FORMAT(orderDate,'%Y') year, SUM(totalPay) orders FROM orderGroup GROUP BY year) o "+
        "RIGHT JOIN "+
        "(SELECT DATE_FORMAT(refundDate,'%Y') year, SUM(refundAmount) refunds FROM refunds WHERE refundDate IS NOT NULL GROUP BY year) r "+
        "ON o.year=r.year "+
        ") "+
        ") un ORDER BY year",nativeQuery=true)
    List<String[]> countOrderByYear();

    @Query(value="SELECT yearMonth FROM ( "+
        "SELECT DISTINCT DATE_FORMAT(orderDate,'%Y-%m') yearMonth FROM orderGroup LEFT JOIN users ON orderGroup.userId=users.id WHERE (TIMESTAMPDIFF(year, birth, DATE(CONCAT(DATE_FORMAT(orderDate,'%Y-%m'),'-01'))) DIV 10)*10 BETWEEN 10 AND 60 "+
        "UNION "+
        "SELECT DISTINCT DATE_FORMAT(refunds.refundDate,'%Y-%m') yearMonth FROM refunds LEFT JOIN orderDetailView ON refunds.orderId=orderDetailView.orderId LEFT JOIN users ON orderDetailView.userId=users.id WHERE (TIMESTAMPDIFF(year, birth, DATE(CONCAT(DATE_FORMAT(refunds.refundDate,'%Y-%m'),'-01'))) DIV 10)*10 BETWEEN 10 AND 60) u ORDER BY yearMonth DESC",nativeQuery = true)
    List<String> findYearMonthOfOrders();

    @Query(value="SELECT year FROM ( "+
        "SELECT DISTINCT DATE_FORMAT(orderDate,'%Y') year FROM orderGroup "+
        "UNION "+
        "SELECT DISTINCT DATE_FORMAT(refundDate,'%Y') year FROM refunds) u ORDER BY year DESC",nativeQuery = true)
    List<String> findYearOfOrders();

    
    
}