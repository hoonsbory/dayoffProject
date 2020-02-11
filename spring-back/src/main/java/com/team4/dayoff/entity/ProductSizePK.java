package com.team4.dayoff.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class ProductSizePK implements Serializable{
    private String size;
    private Integer product;
}