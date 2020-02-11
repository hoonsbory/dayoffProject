package com.team4.dayoff.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.team4.dayoff.entity.Product;
import com.team4.dayoff.entity.ProductList;
import com.team4.dayoff.entity.RecommendByCategory;
import com.team4.dayoff.repository.ProductRepository;
import com.team4.dayoff.repository.RecommendRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
public class ProductDetailController{

    @Autowired
   private ProductRepository productRepository;

   @Autowired
   private RecommendRepository recommendRepository;

   


    @PostMapping("/showProductDetail")
    public Product showProductDetail(@RequestParam("id") String id,HttpServletResponse response,HttpServletRequest request){
        Product product = productRepository.findById(Integer.parseInt(id)).get();
            
        Cookie[] cookies = request.getCookies();
        
        Boolean exist = true;

        if(cookies!=null){
        for(Cookie data : cookies){
            System.out.println(data.getValue());
            if(data.getValue().equals(id)){
                exist = false;
            }
        }
    }

        if(exist){
        Cookie cookie = new Cookie("product$"+id, id);
        cookie.setPath("/");
        cookie.setMaxAge(172800);
        response.addCookie(cookie);
        }
        return product ;
    }
    @GetMapping("/showcookie")
    public List<RecommendByCategory> showcookie(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        List<RecommendByCategory> list = new ArrayList<>();
        for(Cookie data : cookies){
            if(data.getName().contains("product$")){
                // int index = data.getValue().indexOf("$");
                // String value = data.getValue().substring(index);
                // int result = Integer.parseInt(value);

            if(recommendRepository.findByProductId(Integer.parseInt(data.getValue()))!=null){
            list.add(0, recommendRepository.findByProductId(Integer.parseInt(data.getValue()))); 
            //인덱스를 0으로 지정해주면 무조건 0번째에 배치되기떄문에 역순으로 리스트에 추가할 수 있다
            
            }

        }
        }
        return list;
    }
    @PostMapping("/togetherBuy")
    public List<ProductList> togetherBuy(@RequestParam("id") Integer id){
        List<ProductList> list = new ArrayList<>();
        List<String[]> list2 = productRepository.togetherBuy2(id);
        System.out.println(productRepository.togetherBuy(id));
        productRepository.togetherBuy(id).forEach(i->{
            ProductList productList = new ProductList();
            System.out.println(i);
            System.out.println(i[2]);
            productList.setProductId((Integer)i[0]);
            productList.setPrice((Integer)i[1]);
            productList.setProductName((String)i[2]);
            productList.setProductThumbnailName((String)i[3]);
            System.out.println(productList);
            list.add(productList);
        });
        System.out.println(list+"222222222222333333333333333333333");
        System.out.println(list2);
        return list;

    }
    
}

  
