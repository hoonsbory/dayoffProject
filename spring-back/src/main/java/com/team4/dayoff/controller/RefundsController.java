package com.team4.dayoff.controller;

import java.util.Date;
import java.util.List;

import com.team4.dayoff.api.kakaoPayAPI.KakaoPay;
import com.team4.dayoff.entity.Code;
import com.team4.dayoff.entity.Orders;
import com.team4.dayoff.entity.Refunds;
import com.team4.dayoff.repository.CodeRepository;
import com.team4.dayoff.repository.OrdersRepository;
import com.team4.dayoff.repository.RefundsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * RefundsController
 */
@CrossOrigin("*")
@RestController
public class RefundsController {

    // @Autowired
    // private OrderViewRepository orderViewRepository;
    @Autowired
	private KakaoPay kakaopay;
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private RefundsRepository refundsRepository;

    @Autowired
    private CodeRepository codeRepository;


    @GetMapping("/refundRequest")
    public List<Code> refundRequest() {
        List<Code> list = codeRepository.findByCodeLikeOrderByCode("01%");

        return list;
    }

    @PostMapping("/refundRequestProcess")
    public void refundRequestProcess(@RequestBody Refunds refunds) {
        Orders orders=ordersRepository.findById(refunds.getOrders().getId()).get();
        orders.setCode(new Code("0005","환불대기중"));
        refunds.setOrders(orders);
        Refunds savedRefunds=refundsRepository.save(refunds);
        System.out.println(savedRefunds);
    }

    @PostMapping("/cancelOrder")
    public void cancelOrder(@RequestBody Refunds refunds) {
        System.out.println(refunds);
        Orders orders=ordersRepository.findById(refunds.getOrders().getId()).get();
        refunds.setRefundAmount(refunds.getRefundAmount());
        orders.setCode(new Code("0006","환불완료"));
        refunds.setOrders(orders);
        refunds.setRefundDate(new Date());
        Refunds savedRefunds=refundsRepository.save(refunds);
        System.out.println(savedRefunds);
        System.out.println(refunds.getRefundAmount());
		kakaopay.kakaoCancel(Integer.toString(refunds.getRefundAmount()), refunds.getOrders().getOrderGroup().getTid());
        
    }
   
}