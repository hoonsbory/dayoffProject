
package com.team4.dayoff.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

import com.team4.dayoff.api.visionAPI.ProductManagement;
import com.team4.dayoff.entity.RecommendByCategory;
import com.team4.dayoff.repository.RecommendRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.Feature.Type;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.ResourceLoader;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * VisionController
 */
@CrossOrigin("*")
@RestController
public class VisionController {

	@Autowired
	private ProductManagement productManagement;
	@Autowired
	private RecommendRepository recommendRepository;

	@PostMapping("/test")
	public Map<String, Object> test(@RequestBody Map<String, RecommendByCategory> recommendByCategory) {

		System.out.println(recommendByCategory.values());

		Map<String, Object> map = new HashMap<String, Object>();

		return map;
	}

	
	@PostMapping("/crop")
	public Map<String, Object> crop(@RequestBody Map<String, String> result) throws IOException {
		System.out.println(result.get("realTest"));

		// BufferedImage srcImg = ImageIO.read(new File(path2));
		// System.out.println(srcImg);
		// int x1 = Integer.parseInt(x);
		// int y1 = Integer.parseInt(y);
		// int w1 = Integer.parseInt(w);
		// int h1 = Integer.parseInt(h);

		// BufferedImage destImg = Scalr.resize(cropImg, dw, dh);
		// String thumbName = "THUMB_" + fileName;
		//
		// try {
		// BufferedImage result = Scalr.crop(srcImg, x1, y1, w1, h1);
		// System.out.println(result);
		// File thumbFile = new File(path2);
		// ImageIO.write(result, "jpg", thumbFile);
		// model.addAttribute("path", path);

		// } catch (Exception e) {
		// e.printStackTrace();
		// }

		String data1 = result.get("result").split(",")[1];

		byte[] imageBytes = DatatypeConverter.parseBase64Binary(data1);

		try {

			BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));

			ImageIO.write(bufImg, "png", new File("newfile"));

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}

		Map<String, Object> map = new HashMap<String, Object>();
		List<RecommendByCategory> realList = new ArrayList<RecommendByCategory>();
		List<RecommendByCategory> realList2 = new ArrayList<RecommendByCategory>();
		List<String> List = productManagement.getSimilarProductsFile("apparel", "newfile");
		// System.out.println(List.get(0));
		// if(List.size()==2&&List.get(1).equals("category")){
		// System.out.println("11111111111111111111111111111111111111");
		// System.out.println(recommendRepository.findByCategoryName(List.get(0)));
		// map.put("recommend", recommendRepository.findByCategoryName(List.get(0)));

		// return map;
		// }

		// if (List.size() == 2 && List.get(1).equals("category")) {
		// map.put("recommend", recommendRepository.findByCategoryName(List.get(0)));
		// map.put("category", List.get(0));
		// return map;
		// }
		String category = "";
		int count = 0;
		List<String> label = new ArrayList<>();
		try {
			if (List.size() == 2 && List.get(1).equals("category")) {
				
				List<EntityAnnotation> labelList = productManagement.detectLabels("./newfile");
				if(labelList.size() !=0){
				for (EntityAnnotation data : labelList) {
					label.add(data.getDescription());
					if (data.getDescription().equals("Hoodie") || data.getDescription().equals("Hood") || data.getDescription().equals("Sleeve")) {
						label.add("Sweatshirt");
					}
				}
				for (String i : label) {
					if (List.get(0).equals(i)) {
						realList =  recommendRepository.findByCategoryName(i);
						map.put("recommend", realList);
						map.put("category", realList.get(0).getCategorysubName());
						return map;
					}
				}
				for (String j : label) {
					realList2 = recommendRepository.findByCategoryName(j);
					if (realList2.size() != 0) {
						realList.addAll(realList2);
						category = category + realList2.get(0).getCategorysubName() + " ,";
						count++;
					}
					if (count == 2)
						break;
				}

				if (count > 0) {
					int index = category.lastIndexOf(",");
					category = category.substring(0, index - 1);
					map.put("recommend", realList);
					map.put("category", category);
					return map;
				}
				if (count == 0) {
					map.put("bestList", recommendRepository.best10());
					map.put("empty", labelList.get(0).getDescription());
					return map;
				}
			}else{
				map.put("recommend", recommendRepository.findByCategoryName(List.get(0)));
				map.put("category", List.get(0));
				return map;
			}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (List.size() == 0) {
			
			try {
				List<EntityAnnotation> labelList = productManagement.detectLabels("./newfile");
				if(labelList.size() != 0){
				for(EntityAnnotation data : labelList){
					label.add(data.getDescription());
					if(data.getDescription().equals("Hoodie")||data.getDescription().equals("Hood")){
						label.add("Sweatshirt");
					}
				}
			
			for(String j : label){
				
				realList2 = recommendRepository.findByCategoryName(j);
					if (realList2.size() != 0) {
						realList.addAll(realList2);
						category = category + realList2.get(0).getCategorysubName() + " ,";
						count++;
					}
				if(count==2) break;
			}
			
				if(count > 0){
				int index = category.lastIndexOf(",");
				category = category.substring(0, index-1);
				map.put("recommend", realList);
				map.put("category", category);
				return map;
				}
				if(count == 0){
			map.put("bestList", recommendRepository.best10());
			map.put("empty", labelList.get(0).getDescription());
			return map;
				}
			}else{
				map.put("bestList", recommendRepository.best10());
				map.put("empty", productManagement.detectObjects("./newfile").get(0).getName());
			}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}

		System.out.println(List + "22222222222222222222222222222222222222222222222");
		
			for (String data : List) {
			realList.add(recommendRepository.findByProductId(Integer.parseInt(data)));
			// realList.add(recommendRepository.findByProductThumbnailName(data));
			}
		System.out.println(realList + "=====================================");
		// for (String data : realList) {
		// data = data.replace("gs://", "https://storage.googleapis.com/");
		// System.out.println(data);
		// data = data + "?hl=ko";
		// realList2.add(data);
		// }
		
		
		map.put("list", realList);
		return map;
	}
}
