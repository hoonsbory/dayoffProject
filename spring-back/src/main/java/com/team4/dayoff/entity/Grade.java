package com.team4.dayoff.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Grade
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="grade")
public class Grade {
    @Id
    private String level;
    private Integer rate;
    private Integer required;
}