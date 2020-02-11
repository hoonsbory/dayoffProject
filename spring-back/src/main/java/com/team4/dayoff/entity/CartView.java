package com.team4.dayoff.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="cartView")
@DynamicInsert
public class CartView{

@Id
private Integer id;
private String color;
private String size;
private Integer quantity;
private Integer productId;
private String name;
private Integer price;
private Integer totalPrice;
private String productThumbnailName;

private Integer userId;

}