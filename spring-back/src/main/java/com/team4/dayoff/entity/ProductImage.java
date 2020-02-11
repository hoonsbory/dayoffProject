package com.team4.dayoff.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(exclude = "product")
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="productImage")
public class ProductImage{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String originalName;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="productId")
    @JsonIgnore
    private Product product;

}