

package com.team4.dayoff.api.kakaoPayAPI;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import com.team4.dayoff.entity.CartView;
import com.team4.dayoff.entity.KakaoPayApprovalVO;
import com.team4.dayoff.entity.KakaoPayReadyVO;

import lombok.extern.java.Log;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Log
@Service
public class KakaoPay {

	private static final String HOST = "https://kapi.kakao.com";

	private KakaoPayReadyVO kakaoPayReadyVO;
	private KakaoPayApprovalVO kakaoPayApprovalVO;
	public List<CartView> list = new ArrayList();
	public int sum=0;
	public String kakaoPayReady(List<CartView> cart, int sum, int userid) {

		RestTemplate restTemplate = new RestTemplate();
		list = cart;
//		for(int i=0;i<list.size();i++ ) {
//			sum+=list.get(i).getTotalPrice();
//		}
		String userId = Integer.toString(list.get(0).getUserId());
		System.out.println("userid==+================"+userId);
		// 서버로 요청할 Header
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "KakaoAK " + "");
		headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
		headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
		String s = Integer.toString(sum);
		// 서버로 요청할 Body
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("cid", "TC0ONETIME");
		params.add("partner_order_id", "1001");
		params.add("partner_user_id", userId);
		params.add("item_name", "상품");
		params.add("quantity", "1");
		params.add("total_amount", s);
		params.add("tax_free_amount", "0");
		params.add("vat_amount", "0");
		params.add("approval_url", "https://jaehoon-dayoff.ml:8443/kakaoPaySuccess");
		params.add("cancel_url", "https://jaehoon-dayoff.ml:8443/kakaoPayCancel");
		params.add("fail_url", "https://jaehoon-dayoff.ml:8443/kakaoPaySuccessFail");
	
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

		try {
			kakaoPayReadyVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body,
					KakaoPayReadyVO.class);

			// log.info("" + kakaoPayReadyVO);

			return kakaoPayReadyVO.getNext_redirect_pc_url();

		} catch (RestClientException e) {

			e.printStackTrace();
		} catch (URISyntaxException e) {

			e.printStackTrace();
		}

		return "/pay";

	}

	public KakaoPayApprovalVO kakaoPayInfo(String pg_token,int sum) {

//		log.info("-----------------------------");
//		log.info("-----------------------------");

		RestTemplate restTemplate = new RestTemplate();
		String s = Integer.toString(sum);
		String userId = Integer.toString(list.get(0).getUserId());
		// 서버로 요청할 Header
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "KakaoAK " + "");
		headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
		headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
		System.out.println(kakaoPayReadyVO.getTid());
		// 서버로 요청할 Body
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("cid", "TC0ONETIME");
		params.add("tid", kakaoPayReadyVO.getTid());
		params.add("partner_order_id", "1001");
		params.add("partner_user_id", userId);
		params.add("pg_token", pg_token);
		params.add("total_amount", s);
		
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

		try {
			kakaoPayApprovalVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body,
					KakaoPayApprovalVO.class);
					System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaa하이");
			// log.info("" + kakaoPayApprovalVO);

			return kakaoPayApprovalVO;

		} catch (RestClientException e) {

			e.printStackTrace();
		} catch (URISyntaxException e) {

			e.printStackTrace();
		}

		return null;
	}


	public String kakaoOrders(String cancelAmount, String tid){
		RestTemplate restTemplate = new RestTemplate();
		// 서버로 요청할 Header
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "KakaoAK " + "");
		headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
		headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
		// 서버로 요청할 Body
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("cid", "TC0ONETIME");
		params.add("tid", "T2711423815140481476");
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

		try {
					System.out.println( restTemplate.postForObject(new URI(HOST + "/v1/payment/order"), body,
					KakaoPayApprovalVO.class));
			// log.info("" + kakaoPayApprovalVO);


		} catch (RestClientException e) {

			e.printStackTrace();
		} catch (URISyntaxException e) {

			e.printStackTrace();
		}
		return tid;

	}
	public void kakaoCancel(String cancelAmount, String tid){
		RestTemplate restTemplate = new RestTemplate();
		// 서버로 요청할 Header
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "KakaoAK " + "");
		headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
		headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
		// 서버로 요청할 Body
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("cid", "TC0ONETIME");
		params.add("tid", tid);
		params.add("cancel_amount", cancelAmount );
		params.add("cancel_tax_free_amount", "0");
		params.add("cancel_vat_amount", "0");
		// params.add("cancel_available_amount", "34650");
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

		try {
					System.out.println( restTemplate.postForObject(new URI(HOST + "/v1/payment/cancel"), body,
					KakaoPayApprovalVO.class));
			// log.info("" + kakaoPayApprovalVO);


		} catch (RestClientException e) {

			e.printStackTrace();
		} catch (URISyntaxException e) {

			e.printStackTrace();
		}

	}
}