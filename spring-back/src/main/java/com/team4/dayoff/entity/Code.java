package com.team4.dayoff.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Code
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="code")
public class Code {

    @Id
    private String code;

    private String content;
    
}