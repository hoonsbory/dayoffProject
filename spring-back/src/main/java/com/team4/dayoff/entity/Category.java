package com.team4.dayoff.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
@Table(name="category")
public class Category{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String subName;
    private String engName;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    @JsonIgnore
    private List<Product> product;
}
