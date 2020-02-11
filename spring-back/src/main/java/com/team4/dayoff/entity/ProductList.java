package com.team4.dayoff.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * ProductList
 */
//재훈 사용
@Setter
@Getter
@ToString
public class ProductList {

    private int productId;
    private String productName;
    private String productThumbnailName;
    private int price;
}