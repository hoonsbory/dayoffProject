package com.team4.dayoff.entity;

import java.util.List;

import lombok.Data;
@Data
public class payInfoDTO {
String name;
String location;
String postalcode;
String phone;
String store;
String service;
boolean checkeddeliver;
boolean checkedstore;
Integer discount;
Integer totalPay;
Integer emoney;
Integer useEmoney;
Integer userId;
//	List<Delievertrans> delievertrans;
//	
	List<CartView> cartview;
//	@Data
//	public static class Delievertrans{
//		String name;
//		String location;
//		String postalCode;
//		String phone;
//		@Override
//		public String toString() {
//			return "Delievertrans [name=" + name + ", location=" + location + ", postalCode=" + postalCode + ", phone="
//					+ phone + "]";
//		}}
		
//	List<testTags> testTags;
//	public static class testTags{
//		String id;
//		String tag;
//		public String getId() {
//			return id;
//		}
//		public void setId(String id) {
//			this.id = id;
//		}
//		public String getTag() {
//			return tag;
//		}
//		public void setTag(String tag) {
//			this.tag = tag;
//		}
//		@Override
//		public String toString() {
//			return "testTags [id=" + id + ", tag=" + tag + "]";
//		}
		
	}
	
//	String name;
//	String location;
//	Integer postalCode;
//	Integer phone;
//	
//
//List<CartView> cartview;


