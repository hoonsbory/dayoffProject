package com.team4.dayoff.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
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
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="productSize")
@IdClass(ProductSizePK.class)
public class ProductSize{

    @Id
    private String size;

    @Id
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="productId")
    @JsonIgnore
    private Product product;
}