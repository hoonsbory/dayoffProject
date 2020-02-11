package com.team4.dayoff.entity;

import java.sql.Date;

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
@Table(name="productView")
public class ProductView{

@Id
private Integer id;

private String name;
private String price;
private Date registerDate;
private Integer categoryId;
private String categoryName;
private String categorySubName;
private Integer isAvailable;
private String productThumbnailName;
private Integer orderCount;
}