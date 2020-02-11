package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@Entity
@Table(name="users")
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String socialId;
	private String name;

	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone =  "Asia/Seoul") //json이랑 서로 변환할때 문제 생기지 않게 함. 시간 기준은 우리나라 시간으로 하자
	private Date birth;
	
	private String sex;
    private String height;
    private String weight;
	private String phone;
	
	@ColumnDefault("0")
	private Integer accrue;
	
	@ManyToOne
	@JoinColumn(name="level")
    @ColumnDefault("브론즈")
	private Grade grade;

	@ColumnDefault("user")
	private String role;
	
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone =  "Asia/Seoul")
	private Date signUpDate;
	
    private String accessToken;
	private String refreshToken;
	
	@ColumnDefault("0")
    private Integer totalEmoney;
    
	
    
}