package com.team4.dayoff.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
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
@Table(name="color")
public class Color{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String color;
    private String image;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy="color")
    @JsonIgnore
    private List<Product> product;


}