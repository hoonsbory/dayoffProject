package com.team4.dayoff.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.team4.dayoff.api.googleStorageAPI.GoogleCloudStorageUpload;
import com.team4.dayoff.api.visionAPI.ProductManagement;
import com.team4.dayoff.api.visionAPI.WriteCsv;
import com.team4.dayoff.entity.Category;
import com.team4.dayoff.entity.Color;
import com.team4.dayoff.entity.Product;
import com.team4.dayoff.entity.ProductImage;
import com.team4.dayoff.entity.ProductSize;
import com.team4.dayoff.repository.CategoryRepository;
import com.team4.dayoff.repository.ColorRepository;
import com.team4.dayoff.repository.ProductImageRepository;
import com.team4.dayoff.repository.ProductRepository;
import com.team4.dayoff.repository.ProductSizeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
public class AdminProductController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    @Autowired
    private WriteCsv writeCsv;
    @Autowired
    private ProductManagement productManagement;

    @GetMapping("/updateProduct")
    public Map<String, Object> updateProduct(@RequestParam("productId") Integer productId) {
        Map<String, Object> map = new HashMap<String, Object>();
        Product product = productRepository.findById(productId).get();
        List<Color> color = colorRepository.findAll();
        List<Category> category = categoryRepository.findAll();
        map.put("product", product);
        map.put("color", color);
        map.put("category", category);
        return map;
    }

    @PostMapping("/updateProductProcess")
    public void updateProductProcess(String jsonProduct, String jsonSelectedDetailImageForRemove,
            @RequestParam(value = "jsonSelectedProductImageForRemove", required = false) List<String> jsonSelectedProductImageForRemove,
            @RequestParam("file") List<MultipartFile> files) {
        System.out.println(jsonProduct);
        System.out.println(jsonSelectedDetailImageForRemove);
        System.out.println(jsonSelectedProductImageForRemove);
        try {
            Product product = new ObjectMapper().readValue(jsonProduct, Product.class);
            productManagement.deleteProduct(product.getName());
            try {
                int i = 0;
                if (jsonSelectedDetailImageForRemove != null) {
                    GoogleCloudStorageUpload.deleteFile(jsonSelectedDetailImageForRemove);
                    String name = GoogleCloudStorageUpload.saveFile(files.get(i++));
                    product.setDetailImage(name);
                }

                List<ProductSize> productSizes = product.getProductSize();
                productSizes.forEach(ps -> {
                    ps.setProduct(product);
                });
                productSizeRepository.deleteProductSizeByProductId(product.getId());
                List<ProductSize> savedProductSizes = productSizeRepository.saveAll(productSizes);
                product.setProductSize(savedProductSizes);

                Product savedProduct = productRepository.save(product);
                System.out.println(savedProduct);

                if (jsonSelectedProductImageForRemove != null)
                    jsonSelectedProductImageForRemove.forEach(pi -> {
                        GoogleCloudStorageUpload.deleteFile(pi);
                        productImageRepository.deleteByName(pi);
                    });

                for (; i < files.size(); i++) {
                    MultipartFile file = files.get(i);
                    String name = GoogleCloudStorageUpload.saveFile(file);
                    String uriname = "gs://bit-jaehoon/" + name;
                    ProductImage productImage = new ProductImage();
                    productImage.setOriginalName(file.getOriginalFilename());
                    productImage.setName(name);
                    productImage.setProduct(savedProduct);
                    System.out.println("image saving");
                    productImageRepository.save(productImage);
                    System.out.println("image saved");
                    Category category = categoryRepository.findById(product.getCategory().getId()).get();
                    writeCsv.write('"' + uriname + '"' + "," + '"' + productImage.getName() + '"' + "," + '"' + "visionSearch" + '"' + ","
                    + '"' + product.getName()+"visionSearch" + '"' + "," + '"' + "apparel" + '"' + "," + '"' + product.getId()
                    + '"' + "," + '"' + "category=" + category.getEngName() + '"' + ",");

                }

            } catch (IllegalStateException e) {
                // TODO Auto-generated catch block
                System.out.println(e.getMessage());
            } catch (Exception e) {
                // TODO Auto-generated catch block
                System.out.println(e.getMessage());
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        try {
            File file = new File("visionInsert.csv");
            // GoogleCloudStorageUpload.saveFile(file);
            // productManagement.importProductSets("gs://bit-jaehoon/visionInsert.csv");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        writeCsv.reset();

    }

    @RequestMapping("/addProduct")
    public Map<String, Object> addProduct() {
        Map<String, Object> map = new HashMap<String, Object>();
        List<Color> color = colorRepository.findAll();
        List<Category> category = categoryRepository.findAll();
        map.put("color", color);
        map.put("category", category);
        return map;
    }

    @PostMapping("/addProductProcess")
    public Map<String, Object> addProductProcess(String json, @RequestParam("file") List<MultipartFile> files) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            Product product = new ObjectMapper().readValue(json, Product.class);
            Product latestProduct = null;
            try {
                String name = GoogleCloudStorageUpload.saveFile(files.get(0));
                product.setDetailImage(name);
                System.out.println(name);
                Product savedProduct = productRepository.save(product);
                latestProduct = savedProduct;
                System.out.println(product);
                List<ProductSize> productSizes = savedProduct.getProductSize();
                productSizes.forEach(i -> {
                    i.setProduct(savedProduct);
                });
                productSizeRepository.saveAll(productSizes);
                for (int i = 1; i < files.size(); i++) {
                    MultipartFile file = files.get(i);
                    name = GoogleCloudStorageUpload.saveFile(file);
                    String uriname = "gs://bit-jaehoon/" + name;
                    ProductImage productImage = new ProductImage();
                    productImage.setName(name);
                    productImage.setOriginalName(file.getOriginalFilename());
                    productImage.setProduct(savedProduct);
                    productImageRepository.save(productImage);
                    Category category = categoryRepository.findById(product.getCategory().getId()).get();
                    writeCsv.write('"' + uriname + '"' + "," + '"' + productImage.getName() + '"' + "," + '"' + "visionSearch" + '"' + ","
                                + '"' + product.getName()+"visionSearch" + '"' + "," + '"' + "apparel" + '"' + "," + '"' + product.getId()
                                + '"' + "," + '"' + "category=" + category.getEngName() + '"' + ",");
                    System.out.println(product.getCategory().getEngName());
                }

            } catch (IllegalStateException e) {
                // TODO Auto-generated catch block
                System.out.println(e.getMessage());
            } catch (Exception e) {
                // TODO Auto-generated catch block
                System.out.println(e.getMessage());
            }

            ProductImage latestProductImg = productImageRepository.findTop1ByProduct_IdOrderById(latestProduct.getId());
            List<ProductImage> imgList = new ArrayList<ProductImage>();
            imgList.add(latestProductImg);
            latestProduct.setProductImage(imgList);
            System.out.println(latestProduct);
            map.put("latestProduct", latestProduct);
            map.put("productCount", 1);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        try {
            File file = new File("visionInsert.csv");
            GoogleCloudStorageUpload.saveFile(file);
            productManagement.importProductSets("gs://bit-jaehoon/visionInsert.csv");
           
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        writeCsv.reset();

        return map;
    }

    @PostMapping("/addSeveralProductProcess")
    public Map<String, Object> addSeveralProductProcess(String json, @RequestParam("file") List<MultipartFile> files) {
        Map<String, Object> map = new HashMap<String, Object>();

        Product latestProduct = null;
        JsonArray array = new Gson().fromJson(json, JsonArray.class);
        for (int i = 0; i < array.size(); i++) {
            Product product = new Gson().fromJson(array.get(i), Product.class);
            System.out.println(product);
            for (int j = 0; j < files.size(); j++) {
                MultipartFile file = files.get(j);
                if (file.getOriginalFilename().equals(product.getDetailImage())) {
                    String iname = GoogleCloudStorageUpload.saveFile(file);
                    product.setDetailImage(iname);
                    break;
                }
            }

            Product savedProduct = productRepository.save(product);
            latestProduct = savedProduct;

            List<ProductSize> productSizes = savedProduct.getProductSize();
            productSizes.forEach(size -> {
                size.setProduct(savedProduct);
            });
            productSizeRepository.saveAll(productSizes);

            savedProduct.getProductImage().forEach(image -> {
                for (int j = 0; j < files.size(); j++) {
                    MultipartFile file = files.get(j);
                    if (file.getOriginalFilename().equals(image.getOriginalName())) {
                        String iname = GoogleCloudStorageUpload.saveFile(file);
                        String uriname = "gs://bit-jaehoon/" + iname;
                        ProductImage productImage = new ProductImage();
                        productImage.setOriginalName(file.getOriginalFilename());
                        productImage.setName(iname);
                        productImage.setProduct(savedProduct);
                        productImageRepository.save(productImage);
                        Category category = categoryRepository.findById(product.getCategory().getId()).get();
                        writeCsv.write('"' + uriname + '"' + "," + '"' + productImage.getName() + '"' + "," + '"' + "visionSearch" + '"' + ","
                                + '"' + product.getName()+"visionSearch" + '"' + "," + '"' + "apparel" + '"' + "," + '"' + product.getId()
                                + '"' + "," + '"' + "category=" + category.getEngName() + '"' + ",");
                        break;
                    }
                }

            });

        }
        File file = new File("visionInsert.csv");
        try {
            GoogleCloudStorageUpload.saveFile(file);
            productManagement.importProductSets("gs://bit-jaehoon/visionInsert.csv");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        ProductImage latestProductImg = productImageRepository.findTop1ByProduct_IdOrderById(latestProduct.getId());
        List<ProductImage> imgList = new ArrayList<ProductImage>();
        imgList.add(latestProductImg);
        latestProduct.setProductImage(imgList);
        System.out.println(latestProduct);
        map.put("latestProduct", latestProduct);
        map.put("productCount", array.size());
        writeCsv.reset();

        return map;
    }

    @GetMapping("/getProduct")
    public Product getProduct(Integer id) {
        Product product = productRepository.findById(id).get();
        return product;
    }


    @PostMapping("/changeProductSale")
    public void changeProductSale(@RequestParam("id") Integer id, @RequestParam("availability") Integer availability) {
        // productRepository.deleteById(id); //실제 delete 잘 작동한다
        productRepository.changeAvailabilityOfProduct(id, availability); // 상품 이용불가/이용재개로.
    }

}