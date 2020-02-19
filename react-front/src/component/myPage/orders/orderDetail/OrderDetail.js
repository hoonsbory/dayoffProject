import axios from 'axios';
import React, { Component, Fragment } from 'react';
import OrderGroupList from './OrderGroupList';
import OrderType from './OrderType';
import PayInfo from './PayInfo';
import queryString from 'query-string';
import RefundList from './RefundList';
import "./orderDetail.css"
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class OrderDetail extends Component {
    state = {
        orderId: null,
        groupId: null,
        data: [],
        info: null,
        totalPrice: null
    }

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    async getData() {
        const groupId = this.props.match.params.groupId;
        const orderId = parseInt(queryString.parse(this.props.location.search).orderId);
        this.setState({
            groupId: groupId,
            orderId: orderId
        });
        try {
            const response = await axios.get("/orderDetail/" + groupId);
            const sum = response.data.reduce((prev, i) => {
                return prev + i.orderPrice;
            }, 0);
            this.setState({
                data: response.data,
                info: response.data[0],
                totalPrice: sum,
                userId: response.data[0].userId,
                userName: response.data[0].userName
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }

    
    render() {
        const isAdmin = localStorage.getItem("userRole") === "admin";
        const isMine = parseInt(localStorage.getItem("userId")) === this.state.userId;
        // const isMine=true;
        const refundData = this.state.data.filter(d => d.refundRequestDate);

        return (
            <div className="OrderDetail">
                {(isMine || isAdmin) && this.state.totalPrice &&

                    <Fragment>
                        <div className="pageTitle">
                            <div>주문 상세 정보</div>
                        </div>
                        {isAdmin && <div className="orderDetailUser"><Link to={`/admin/userList/${this.state.userId}`}><span>회원: {this.state.userName}</span><span>(회원번호: {this.state.userId})</span></Link></div>}
                        <div className="orderDetailOrder">주문번호: {this.state.info.groupId}</div>
                        <OrderGroupList data={this.state.data} orderId={this.state.orderId} isAdmin={isAdmin} getData={this.getData} needState={true}></OrderGroupList>
                        {refundData && <RefundList data={refundData} orderId={this.state.orderId}></RefundList>}
                        <Row style={{width:"90%", margin:"auto"}}>
                            <Col>
                        <OrderType info={this.state.info} />
                            </Col>
                            <Col>
                        <div className="tableTitle">결제 정보</div>
                        <PayInfo totalPrice={this.state.totalPrice} info={this.state.info} />
                            </Col>
                        </Row>
                    </Fragment>
                }
            </div>

        );
    }
}

export default OrderDetail;