package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Refunds
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "refunds")
@DynamicInsert
public class Refunds {

    @Id
    private Integer id;
    
    @MapsId
    @OneToOne
    @JoinColumn(name="orderId")
    private Orders orders;

    @ManyToOne
    @JoinColumn(name="code")
    private Code code;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone =  "Asia/Seoul")
    private Date requestDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone =  "Asia/Seoul")
    private Date refundDate;

    private Integer refundAmount;

    
}