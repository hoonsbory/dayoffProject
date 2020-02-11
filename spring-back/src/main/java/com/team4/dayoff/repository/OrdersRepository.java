package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.OrderGroup;
import com.team4.dayoff.entity.Orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * OrdersRepository
 */
public interface OrdersRepository extends JpaRepository<Orders,Integer>{

    @Query(value="select count(*) from orders where groupId = :groupId", nativeQuery = true)
    int countGroup(@Param("groupId") String groupId);

    @Query(value="select * from orders where groupId = :groupId", nativeQuery = true)
    List<Orders> findByOrderGroup(@Param("groupId") String groupId);

    @Query(value="select * from orders where id = :orderId",  nativeQuery = true)
    Orders findByOrderId(@Param("orderId") Integer orderId);
}