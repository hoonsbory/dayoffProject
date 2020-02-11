package com.team4.dayoff.controller;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import com.team4.dayoff.api.kakaoPayAPI.KakaoPay;
import com.team4.dayoff.entity.Cart;
import com.team4.dayoff.entity.CartView;
import com.team4.dayoff.entity.Code;
import com.team4.dayoff.entity.Deliver;
import com.team4.dayoff.entity.KakaoPayApprovalVO;
import com.team4.dayoff.entity.OrderGroup;
import com.team4.dayoff.entity.Orders;
import com.team4.dayoff.entity.Users;
import com.team4.dayoff.entity.payInfoDTO;
import com.team4.dayoff.entity.Product;
import com.team4.dayoff.entity.Stores;
import com.team4.dayoff.repository.CartRepository;
import com.team4.dayoff.repository.CartViewRepository;
import com.team4.dayoff.repository.CodeRepository;
import com.team4.dayoff.repository.DeliverRepository;
import com.team4.dayoff.repository.OrderGroupRepository;
import com.team4.dayoff.repository.OrdersRepository;
import com.team4.dayoff.repository.StoresRepository;
import com.team4.dayoff.repository.UsersRepository;

import org.apache.http.client.methods.HttpHead;
import org.apache.tomcat.util.json.JSONParser;
import org.hibernate.validator.constraints.SafeHtml.Attribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.tags.Param;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class PayController {
	@Autowired
	private CartViewRepository cartViewRepository;
	@Autowired
	private KakaoPay kakaopay;
	@Autowired
	private UsersRepository userRepository;
	@Autowired
	private OrderGroupRepository orderGroupRepository;
	@Autowired
	private OrdersRepository ordersRepository;
	@Autowired
	private DeliverRepository deliverRepository;
	@Autowired
	private StoresRepository storesRepository;
	@Autowired
	private CodeRepository codeRepository;
	@Autowired
	private CartRepository cartRepository;
	public List<CartView> list;
	private String store;
	private String service;
	private Integer pay;
	private Integer discount;
	private Integer emoney;
	private Integer useEmoney;
	private Integer savedDeliverId;
	int user;
//	@GetMapping
//	public List<Cart> listCart() {
//		return cartdao.findAll();
//	}

	@PostMapping("/order")
	public void order(@RequestBody List<Cart> carts) {
		System.out.print("carts" + carts);
		return;
	}

	@GetMapping("/payInfoList{userId}")
	public Users listCart(@PathVariable int userId) {
		System.out.println("ㅇㄹㄴ                ");
		System.out.println(userRepository.findById(userId));
		return userRepository.findById(userId);
	}

	@GetMapping("/kakaoPay")
	public void kakaoPayGet() {
		System.out.println("a");

	}

	//@PostMapping("/kakaoPay3")
	//public String kakaoPay3(@RequestBody List<CartView> cartview) {
		// Deliver deliver, List<CartView> cartView
		// gson, jackson
//		new Gson();
		// Deliever delievertrans=new Deliever();
		// delievertrans=deliever;
		// System.out.println(delievertrans);
		//System.out.println("deliever 성공");
		//System.out.println("kakaoPay post............................................");
		//System.out.println("aa         " + cartview);
		// list = new ArrayList();
		// list = cartview;
		// int sum = 0;
		// for (int i = 0; i < list.size(); i++) {
		// 	sum += list.get(i).getTotalPrice();
		// }
		//System.out.println(kakaopay.kakaoPayReady(list, sum));
		// Users user=new Users();
		// user.setId(list.get(0).getId());
		// delievertrans.setUsers(user);;
		// delieverRepository.save(delievertrans);
		// response.sendRedirect(kakaopay.kakaoPayReady());
		//return kakaopay.kakaoPayReady(list, sum);
	//}

	@PostMapping("/kakaoPay")
	public String kakaoPay(@RequestBody payInfoDTO s) {
		// Deliver deliver, List<CartView> cartView
		// gson, jackson
//		new Gson();
		System.out.println(s);
		user = s.getCartview().get(0).getUserId();
		System.out.println(user);

		// delievertrans = deliever;
		// System.out.println(delievertrans);

		// System.out.println(s);
		System.out.println("deliever 성공");
		System.out.println("kakaoPay post............................................");
		
		// System.out.println("aa " + cartview);
		list = new ArrayList();
		list = s.getCartview();
		// int sum = 0;
		// for (int i = 0; i < list.size(); i++) {
		// 	sum += list.get(i).getTotalPrice();
		// }
		pay=s.getTotalPay();
		emoney=s.getEmoney();
		useEmoney=s.getUseEmoney();
		System.out.println(kakaopay.kakaoPayReady(list, s.getTotalPay(),s.getUserId()));
		service=s.getService();
		discount=s.getDiscount();
		
		if (s.getService().equals("1")) {
		    System.out.println("a");
			Deliver deliever = new Deliver();
			Users user = new Users();
			user.setId(list.get(0).getUserId());
			deliever.setUsers(user);
			deliever.setLocation(s.getLocation());
			deliever.setName(s.getName());
			deliever.setPhone(s.getPhone());
			deliever.setPostalcode(s.getPostalcode());
			Deliver savedDeliver=deliverRepository.save(deliever);
			savedDeliverId=savedDeliver.getId();
		}
	if(s.getService().equals("0")){
		store=s.getStore();
	}
		return kakaopay.kakaoPayReady(list, s.getTotalPay(),s.getUserId());
	}
//	    @PostMapping("/kakaoPay")
//	    public String kakaoPay(@RequestBody List<Cart> carts) {
//	       System.out.println("kakaoPay post............................................");
//	        System.out.println(kakaopay.kakaoPayReady());
//	        return "redirect:" + kakaopay.kakaoPayReady();
//	 
//	    }

//KakaoPayApprovalVO	[aid=A2708011463624675988, tid=T2708011390609359508, cid=TC0ONETIME, sid=null, partner_order_id=1001, 
//partner_user_id=1, payment_method_type=MONEY, amount=AmountVO [total=94000, tax_free=100, vat=8536, 
//point=0, discount=0], card_info=null, item_name=상품, item_code=null, payload=null, quantity=1,
//tax_free_amount=null, vat_amount=null,created_at=Tue Dec 24 22:07:15 KST 2019, approved_at=Tue Dec 24 22:07:34 KST 2019]
	@GetMapping("/kakaoPaySuccess")
	public void kakaoPaySuccess(@RequestParam("pg_token") String pg_token, HttpServletResponse response)
			throws IOException {
		OrderGroup ordergroup = new OrderGroup();

		Users users = new Users();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			sum += list.get(i).getTotalPrice();
		}
		System.out.println("kakaoPaySuccess get............................................");
		System.out.println("kakaoPaySuccess pg_token : " + pg_token);
		KakaoPayApprovalVO info = kakaopay.kakaoPayInfo(pg_token, pay);
		
		int userId = user;
		System.out.println(userId);
		userRepository.userEmoney(emoney,userId);
		users = userRepository.findById(userId);
		ordergroup.setAid(info.getAid());
		ordergroup.setCid(info.getCid());
		//ordergroup.setOrderDate(info.getApproved_at());
		ordergroup.setGradeDiscount(discount);
		ordergroup.setPointUse(useEmoney);
//		ordergroup.setPointUser(0);
		ordergroup.setTid(info.getTid());
		if(service.equals("0")){
			Stores s=storesRepository.findByname(store);
			ordergroup.setStores(s);
			
		}else{
			Deliver deliver=new Deliver();
			System.out.println(savedDeliverId);
			deliver.setId(savedDeliverId);
			ordergroup.setDeliver(deliver);
		}
		ordergroup.setTotalPay(info.getAmount().getTotal());
		ordergroup.setUsers(users);
		System.out.println(ordergroup);
		orderGroupRepository.save(ordergroup);
		Code c = new Code();

		for (int i = 0; i < list.size(); i++) {
			Orders order = new Orders();
			Product product = new Product();
			product.setId(list.get(i).getProductId());
			order.setProduct(product);
			order.setColor(list.get(i).getColor());
			order.setOrderGroup(ordergroup);
			order.setPrice(list.get(i).getTotalPrice());
			order.setQuantity(list.get(i).getQuantity());
			order.setSize(list.get(i).getSize());
			System.out.println("dfsdfs"+service);
			if(service.equals("0")){
				System.out.println("werew");
				c= codeRepository.findByCode("0003");
				order.setCode(c);
				
			}
			else{
				System.out.println("pppp");
			c=codeRepository.findByCode("0000");
			order.setCode(c);
			}
			System.out.println(order);
			ordersRepository.save(order);
		}
		for (int i = 0; i < list.size(); i++) {
			if(list.get(i).getId()!=-1){
				cartRepository.deleteById(list.get(i).getId());
			;}
		}
		System.out.println("approvalvo   " + info);
		// return new ModelAndView("redirct:?pg_token=");
		response.sendRedirect("https://jaehoon-dayoff.ml/mypage/myorders");

	}

	@GetMapping("/kakaoPayCancel")
	public void kakaoPaySuccess3(HttpServletResponse response, HttpServletRequest request)
			throws URISyntaxException, IOException {
		// // @RequestBody KakaoPayApprovalVO kakaoPayApprovalVO
		// int sum = 0;
		// for (int i = 0; i < list.size(); i++) {
		// 	sum += list.get(i).getTotalPrice();
		// }
		// System.out.println("kakaoPaySuccess get............................................");
		// // URI uri = new URI("http://localhost:3000/");
		// KakaoPayApprovalVO a = kakaopay.kakaoPayInfo(pg_token, sum);
		// HttpHeaders headers = new HttpHeaders();
		// headers.setLocation(URI.create("https://bit-dayoff.tk:3000/"));
		// ResponseEntity<KakaoPayApprovalVO> r = new ResponseEntity<KakaoPayApprovalVO>(a, headers, HttpStatus.OK);
		// System.out.println(r);
		// // r.created(uri);
		// // System.out.println(uri);
		// System.out.println("kakaoPaySuccess pg_token : " + pg_token);
		// // return new ModelAndView("redirct:?pg_token=");

		response.sendRedirect("https://jaehoon-dayoff.ml");

	}

}