package com.team4.dayoff.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.team4.dayoff.entity.Category;
import com.team4.dayoff.entity.ProductView;
import com.team4.dayoff.repository.CategoryRepository;
import com.team4.dayoff.repository.ProductViewRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
@CrossOrigin("*")
@RestController
public class ProductViewController {

    @Autowired
	ProductViewRepository productRepository;
    
    @Autowired
    CategoryRepository categoryRepository;
    

    
    @GetMapping("/productTop")
    public List<ProductView> productTop(){
    	return productRepository.TopproductList();
    }
	
	@GetMapping("/productPriceAsc")
	public List<ProductView> ascproductList(){
		return productRepository.AscpriceList();
	}
	
	@GetMapping("/productPriceDesc")
	public List<ProductView> descproductList(){
		return productRepository.DescpriceList();
	}
	
	@GetMapping("/productRegister")
	public List<ProductView> productRegisterList(){
		return productRepository.RegisterList();
	}
	
	@GetMapping("/MonthProductList")
	public List<ProductView> MonthProductList(){
		return productRepository.MonthProductList();
	}

	@GetMapping("/MonthProductListmax5")
	public List<ProductView> MonthProductListmax5(){
		return productRepository.MonthProductListMax5();
	}

	@GetMapping("/TopBannerList")
	public List<ProductView> TopBannerList(){
		return productRepository.TopBannerList();
	}
	
//	
	@GetMapping("/MainCategory/category/{name}")
	public List<ProductView> MainCategory(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		System.out.println(pageable);
		System.out.println(productRepository.MainCategory(name+"+++++++++++++++++",pageable));
		return productRepository.MainCategory(name,pageable);
	}
	
	@GetMapping("/SubCategory/category/{name}")
	public List<ProductView> SubCateogry(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		System.out.println(name+"12312312312312");
		return productRepository.SubCategory(name,pageable);
	}
	
	@GetMapping("/AdminMainCategory/category/{name}")
	public List<ProductView> AdminMainCategory(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		System.out.println(pageable);
		return productRepository.AdminMainCategory(name,pageable);
	}
	
	@GetMapping("/AdminSubCategory/category/{name}")
	public List<ProductView> AdminSubCateogry(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		System.out.println("=========================================");
		System.out.println(name);
		System.out.println(productRepository.AdminSubCategory(name,pageable));
		return productRepository.AdminSubCategory(name,pageable);
	}
	
//	
//	@GetMapping("/CategoryList/{name}")
//	public List<Category> CategoryList(@PathVariable String name){
//		System.out.println(name+"안녕");
//		return categoryRepository.CategoryList(name);
//	}
	
	@GetMapping("/CategoryNameList/category/{name}")
	public List<Category> CategoryNameList(@PathVariable String name){
		return categoryRepository.CategoryNameList(name);
	}
	
	@GetMapping("/CategorySubList/category/{name}")
	public List<Category> CategorySubList(@PathVariable String name){
		return categoryRepository.CategorySubList(name);
	}
	
	
	
	@GetMapping("/SearchProduct/{name}")
	public List<ProductView> SearchProductList(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		return productRepository.SearchProduct(name,pageable);
	}

	@GetMapping("/SearchAdminProduct/{name}")
	public List<ProductView> SearchAdminProductList(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		return productRepository.SearchAdminProduct(name,pageable);
	}
	
//	@GetMapping("/isAvailableUp/{id}")
//	public void isAvailableUp(@PathVariable("id") int id, Pageable pageable){
//    productRepository.isAvailableUp(id);
//	}
//	
//	@GetMapping("/isAvailableDown/{id}")
//	public void isAvailableDown(@PathVariable("id") int id, Pageable pageable){
//    productRepository.isAvailableDown(id);
//	}
//	@PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC)
	@GetMapping("/ColorProduct/category/{name}")
	public List<ProductView> ColorProduct(@PathVariable String name){
		System.out.println(productRepository.ColorProduct(name));
		return productRepository.ColorProduct(name);
	}
	
	@GetMapping("/AdminColorProduct/category/{name}")
	public List<ProductView> AdminColorProduct(@PathVariable String name){
		System.out.println(productRepository.AdminColorProduct(name));
		return productRepository.AdminColorProduct(name);
	}
}