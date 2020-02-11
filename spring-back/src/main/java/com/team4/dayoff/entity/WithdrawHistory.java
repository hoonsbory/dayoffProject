package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Entity;
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

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * WithdrawHistory
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@Entity
@Table(name="withdrawHistory")
public class WithdrawHistory {

    @Id
    private Integer id;
    
    @MapsId
    @OneToOne
	@JoinColumn(name="userId")
    private Users users;

    @ManyToOne
    @JoinColumn(name="code")
    private Code code;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone =  "Asia/Seoul")
    private Date withdrawDate;
    
}