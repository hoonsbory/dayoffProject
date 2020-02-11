package com.team4.dayoff.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * orderView
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orderGroup")
@DynamicInsert
public class OrderGroup {

    @Id
    private String tid;

    @ManyToOne
	@JoinColumn(name="userId")
    private Users users;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "orderGroup")
    private List<Orders> orders;

    private Integer totalPay;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone =  "Asia/Seoul")
    @Column(updatable = false)
    private Date orderDate;

    private Integer gradeDiscount;
    private Integer pointUse;

    @ManyToOne
    @JoinColumn(name="deliverId")
    private Deliver deliver;

    @ManyToOne
    @JoinColumn(name="storesId")
    private Stores stores;
    private String invoice;
    private String aid;
    private String cid;

}