import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    

    render() {
        const login=sessionStorage.getItem("userId")?'로그아웃':'로그인';
        return (
            <div>

                <ul>
                    <li><Link to="/signUp">회원가입</Link></li>
                    <li><Link to="/admin/addProduct">상품 등록</Link></li>
                    <li><Link to="/admin/updateProduct/1">상품 수정</Link></li>
                    <li><Link to="/admin/updateInvoice">송장번호 등록</Link></li>
                    <li><Link to="/admin/userList">유저리스트</Link></li>
                    <li><Link to="/admin/usersAnalysis">회원 통계</Link></li>
                    <li><Link to="/admin/ordersAnalysis">매출 통계</Link></li>
                    <li><Link to="/orderDetail/1?orderId=2">주문 상세정보</Link></li>
                    <li><Link to={{
                        pathname:"/mypage/refundRequest",
                        state:{
                            orderCount:2, //해당 order가 있는 orderGroup에 속한 order개수 넘겨주시오
                            orderView:{
                                userId:1,
                                userName:'김상희',
                                groupId:1,
                                orderId:1,
                                orderColor:1,
                                orderSize:'S',
                                orderQuantity:1,
                                productId:1,
                                productName:'jp259 귀여운 페이크퍼 카라장식의 빵빵한 웰론충전재 숏패딩점퍼 jumper',
                                productThumbnailName:'gs://my_products/jp259_red1.jpg',
                                orderDate:'2018-11-18',
                                orderPrice:42000,
                                gradeDiscount:420,
                                pointUse:1000,
                                totalPay:65080,
                                invoice:1,
                                code:'0000',
                                codeContent:'배송준비중'
                            }
                        }
                    }}>환불 신청</Link></li>
                    <li><Link to="/mypage/myInfo">회원정보 수정</Link></li>
                    <li><Link to="/mypage/withdraw">탈퇴하기</Link></li>

                </ul>

            </div>

        );
    }
}

export default Menu;