package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Orders
 */
@Data
@ToString(exclude = {"orderGroup","product"})
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
@DynamicInsert
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="code")
    private Code code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="groupId")
    private OrderGroup orderGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="productId")
    private Product product;

    private String color;
    private String size;
    private Integer quantity;
    private Integer price;
    private Date deliverDate;
}