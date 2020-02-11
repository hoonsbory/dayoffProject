import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../../common/css/orderList.css'
import { Button,Col, Form , Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Deliver from '../../myPage/orders/Deliver';
import ReactPaginate from 'react-paginate';
import OrderCancel from '../../myPage/orders/OrderCancel';
import UpdateInvoice from './updateInvoice';
import PickUpConfirm from './pickUpConfirm';


export default class orders extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }
  

  state ={
    value : 'all',
    page : 0,
    list : [],
    name : '',
    invoice : '',
    change : 0
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


  

 

 
  async orderList(code,page,name){
    const params = new URLSearchParams();
    params.append("code", code)
    params.append("name", name)
    await Axios({
      method : "post",
      data : params,
      url : "/orderList?page="+page
    }).then((res)=>{
      this.setState({
        list : res.data.content,
        totalPages: res.data.totalPages
      })
      
    })
  }

  change(){
    this.setState({
      change : 1
    })
  }



  handleChangeInput(e) {
    this.setState({
      name : e.target.value
    })
    // this.orderList(this.state.value, 0, e.target.value);
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    this.orderList("all",this.state.page, this.state.name)
  }

  handleChange(event) {
    this.setState({
      value : event.target.value,
    });

    this.orderList(event.target.value,0,this.state.name)
  }
  
  handleKeyPress(e){
    if(e.keyCode === 13){ 
      this.orderList(this.state.value, 0, this.state.name);
    }
  }

  handleCheck = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    }, () => {
      if (this.state.page !== 0)
        document.getElementsByClassName("page-link")[1].click();
      else
      this.orderList(this.state.value,this.state.page,this.state.name)
    })
  }

  handleClick = (e) => {
    if (this.state.page !== 0)
      document.getElementsByClassName("page-link")[1].click();
    else
    this.orderList(this.state.value,this.state.page,this.state.name)
  }

  handlePageClick = data => {
    const selected = data.selected;
    this.setState({ page: selected }, () => {
      this.orderList(this.state.value,this.state.page,this.state.name)
    });
  };

  shouldComponentUpdate(nextProps,nextState){
    if(nextState.change!==this.state.change){
      this.orderList(this.state.value,this.state.page,this.state.name)
    }
    return true;
  }

  render() {
    const {list} = this.state
    const detail = "/product/"
    const detailOrder = "/admin/orders/orderDetail/"
    const result = list.map((data,index) =>(
    <tr>
      <td>
        <div className="infoDiv"><Link to={detail+data.productId}><img width="90px" height="106px" alt="orderDetail" src={"https://storage.googleapis.com/bit-jaehoon/"+data.productThumbnailName}></img></Link>
          <ul style={{overflow : 'hidden'}} className="nameColor">
            <li><Link className="info1" to={detail+data.productId}>{data.productName}</Link></li>
            <li>컬러 : {data.orderColor} 사이즈 : {data.orderSize}</li>
          </ul>
        </div>
    </td>
  
    
    <td><Link to={"/admin/userList/"+data.userId}>{data.userName}</Link></td>

    <td>{data.orderDate}</td>

    <td><Link to={detailOrder+data.groupId+"?orderId="+data.orderId}>{data.groupId}</Link></td>

    <td>{this.numberWithCommas(data.orderPrice)}원

      <br></br>

    <span>{data.orderQuantity}개</span>
    </td>

    <td>{data.codeContent}

    <br></br>

    {data.codeContent === "배송준비중" ? <UpdateInvoice orderList={this.change} groupId={data.groupId} orderId={data.orderId}></UpdateInvoice>: ""}

    {data.codeContent === "배송중" ? <Deliver invoice={data.invoice}></Deliver> : ""}
    {data.codeContent === "환불대기중" ? <OrderCancel orderList={this.change} order={data}></OrderCancel> : ""}
    {data.codeContent === "픽업예정" ? <PickUpConfirm groupId={data.groupId} orderList={this.change}></PickUpConfirm>: ""}
    </td>
  </tr>))


    
    return (
      <div className="TotalTable">
      <div className="pageTitle"> 
        <div>주문 내역</div>
        </div>

        <div className="orderMain">

      <Form.Group as={Row} className="p-3 m-auto">
        <Col sm="5"></Col>
          <Col sm="3">
       <Form.Control as="select" value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value="all">전체</option>
          <option value="0000">배송준비중</option>
          <option value="0001">배송중</option>
          <option value="0002">배송완료</option>
          <option value="0003">픽업예정</option>
          <option value="0004">픽업완료</option>
          <option value="0005">환불대기중</option>
          <option value="0006">환불완료</option>
          <option value="0007">구매확정</option>
          <option value="0008">후기작성완료</option>
        
        </Form.Control> 
        </Col>
      <Col sm="3">
      <Form.Control placeholder="회원이름으로 검색" type="text" name="name" value={this.state.name} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChangeInput.bind(this)}></Form.Control>
      </Col>
      <Button onClick={()=> this.orderList.bind(this)(this.state.value, 0, this.state.name)}>검색</Button>
            
          </Form.Group>
      {/* <button id="prev" className="prev"  onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page-1,this.state.name)}>이전페이지</button> */}

      <div>
         <table className="n-table">
          <colgroup>
            <col style={{width: + 35+'%'}}></col>
            <col style={{width: + 9+'%'}}></col>
            <col style={{width: + 12+'%'}}></col>
            <col style={{width: + 9+'%'}}></col>
            <col style={{width: + 12+'%'}}></col>
            <col style={{width: + 27+'%'}}></col>
          </colgroup>
          <tr >
              <th>상품정보</th>
              <th>회원정보</th>
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

      {/* <button id="next" className="next" disabled={false} onClick={()=>this.orderList.bind(this)(this.state.value,this.state.page+1,this.state.name)}>다음페이지</button> */}
      </div>
      <div className="pagenate1">
      <ReactPaginate
            previousLabel={'이전'}
            nextLabel={'다음'}
            breakLabel={'...'}
            pageCount={this.state.totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
          </div>
      </div>
    );
  }
}
