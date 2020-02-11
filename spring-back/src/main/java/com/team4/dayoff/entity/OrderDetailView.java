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
@Table(name="orderDetailView")
public class OrderDetailView {
    @Id
    Integer orderId;

    Integer productId;
    String productThumbnailName;
    String productName;
    Integer productPrice;
    Integer productIsAvailable;
    String orderColor;
    String orderSize;
    Integer orderQuantity;
    Integer orderPrice;
    String code;
    String codeContent;
    String groupId;
    Integer userId;
    String userName;
    Integer totalPay;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone =  "Asia/Seoul")
    private Date orderDate;

    private Integer gradeDiscount;
    private Integer pointUse;
    private String invoice;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone =  "Asia/Seoul")
    private Date refundRequestDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone =  "Asia/Seoul")
    private Date refundDate;

    private Integer refundAmount;
    private Integer storesId;
    private String storesName;
    private String storesLocation;
    private Integer deliverId;
    private String deliverName;
    private String deliverLocation;
    private String deliverPostalCode;
    private String deliverPhone;

}