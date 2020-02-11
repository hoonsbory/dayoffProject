package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="orderView")
public class OrderView {
    @Id
    private Integer orderId;

    private Integer productId;
    private String productThumbnailName;
    private String productName;
    private Integer productIsAvailable;
    private String orderColor;
    private String orderSize;
    private Integer orderQuantity;
    private Integer orderPrice;
    private String groupId;
    private Integer userId;
    private String userName;
    private Integer gradeDiscount;
    private Integer pointUse;
    private Integer totalPay;

    
    private String deliverDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone =  "Asia/Seoul")
    private Date orderDate;
    private String invoice;
    private String code;
    private String codeContent;


}