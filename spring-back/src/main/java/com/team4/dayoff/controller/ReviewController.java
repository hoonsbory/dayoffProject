package com.team4.dayoff.controller;

import java.util.ArrayList;
import java.util.List;

import com.team4.dayoff.entity.Code;
import com.team4.dayoff.entity.Orders;
import com.team4.dayoff.entity.Review;
import com.team4.dayoff.entity.Users;
import com.team4.dayoff.repository.OrdersRepository;
import com.team4.dayoff.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
public class ReviewController{
    
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    OrdersRepository ordersRepository;

    @PostMapping("/review")
    public List<Review> rivewList(@RequestParam("productId") Integer productId){
        System.out.println(productId);
        List<Review> rv= new ArrayList<Review>();
        rv= reviewRepository.findByProductId(productId);
        System.out.println(rv);
        return rv;
    }

    @PostMapping("/changeCode")
    public int changeCode(@RequestParam("orderId") Integer orderId){
            Orders orders = ordersRepository.findById(orderId).get();
        Code code = new Code();
        code.setCode("0008");    
        code.setContent("후기작성완료");
         orders.setCode(code);
         ordersRepository.save(orders);
        
         return orders.getProduct().getId();

    }

    @PostMapping("/addReview")
    public void addReview(@RequestBody Review review){
        System.out.println("리뷰");
        System.out.println(review);
        reviewRepository.save(review);

    }

   
}