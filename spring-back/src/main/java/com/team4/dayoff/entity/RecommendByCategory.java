package com.team4.dayoff.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

/**
 * recommandByCategory
 */
@Entity
@Table(name="recommendByCategory")
@Getter
@Setter
public class RecommendByCategory implements Comparable<RecommendByCategory>{

    @Column
    private String productName;

    @Column
    private String categoryName;

    @Column
    private String categorysubName;

    @Column
    private int price;
    @Id
    private int productId;

    @Column
    private String productThumbnailName;

    @Column
    private int ordercount;

    @Override
    public String toString() {
        return "recommendByCategory [categoryName=" + categoryName + ", productId=" + productId + ", productName="
                + productName + ", productThumbnailName=" + productThumbnailName + "]";
    }
    
    @Override
       public int compareTo(RecommendByCategory arg0) {
              // TODO Auto-generated method stub
              int targetordercount = arg0.getOrdercount();
              if(ordercount == targetordercount) return 0;
              else if(ordercount > targetordercount) return 1;
              else return -1;
       }
}