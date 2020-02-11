import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderCancel from './OrderCancel';
import Deliver from './Deliver';
import OrderConfirm from './OrderConfirm';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyordersTable extends Component {
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
    render() {
      
        const {list} = this.props
      const detail = "/product/"
      
      const result = list.map((data,index) =>(
      <tr>
        <td>
          <div className="infoDiv"><Link to={detail+data.productId}><img width="90px" height="106px" alt="productImg" src={"https://storage.googleapis.com/bit-jaehoon/"+data.productThumbnailName}></img></Link>
            <ul style={{overflow : 'hidden'}} className="nameColor">
              <li><Link className="info1" to={detail+data.productId}>{data.productName}</Link></li>
              <li>컬러 : {data.orderColor} 사이즈 : {data.orderSize}</li>
            </ul>
          </div>
      </td>

      <td>{data.orderDate}</td>

      <td><Link to={"/mypage/myorders/orderDetail/"+data.groupId+"?orderId="+data.orderId}>{data.groupId}</Link></td>

      <td>{this.numberWithCommas(data.orderPrice)}원

        <br></br>

      <span>{data.orderQuantity}개</span>
      </td>

      <td>{data.codeContent}

      <br></br>
      {data.codeContent === "배송준비중" || data.codeContent === "픽업예정" ? <OrderCancel orderList={this.props.orderList} order={data}></OrderCancel> : ""}
      {data.codeContent === "배송중" ?<Deliver invoice={data.invoice}></Deliver> : ""}
      {data.codeContent === "구매확정" ? <Link to={"/mypage/review/"+data.orderId}><Button variant="outline-dark" className="jaehoon">후기 작성</Button></Link> : ""}
      {data.codeContent === "배송완료" || data.codeContent ==="픽업완료" ? <OrderConfirm  orderList={this.props.orderList} orderId={data.orderId} userId={data.userId} groupId={data.groupId}></OrderConfirm>  : ""}
      <br></br>
      {data.codeContent === "배송완료" || data.codeContent ==="픽업완료" ? <Link to={{
                        pathname:"/mypage/refundRequest",
                        state:{
                            orderView:data
                        }
                      }}><Button variant="outline-dark" className="jaehoon"> 환불신청</Button></Link>  : ""}
      </td>
    </tr>))

        return (
            <div>
            <div className="orderMain">
           <table className="n-table">
          <colgroup>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
            <col style={{width: + 10+'%'}}></col>
          </colgroup>
          <tr >
              <th>상품정보</th>
              <th>주문일자</th>
              <th>주문번호</th>
              <th>주문금액(수량)</th>
              <th>주문상태</th>
          </tr>
          <tbody>
        {result}
        </tbody>
        </table>
        </div>
            </div>
        );
    }
}

export default MyordersTable;