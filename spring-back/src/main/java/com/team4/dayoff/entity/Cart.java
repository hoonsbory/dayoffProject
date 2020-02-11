package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Entity;
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



  

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="cart")
@DynamicInsert
public class Cart{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="productId")
    private Product product;

    private String color;
    private String size;
    private Integer quantity;

    
    private Date cartDate;
    private Integer price;

    @ManyToOne
    @JoinColumn(name="userId")
    private Users users;

}