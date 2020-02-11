import axios from 'axios';
import React, { Component } from 'react';
import OrderGroupList from './orderDetail/OrderGroupList';
import PayInfo from './orderDetail/PayInfo';
import "./refundRequest.css";
import { Button, ButtonToolbar, Form, Container, Row, Col } from 'react-bootstrap';

class RefundRequest extends Component {
    state = {
        orderView: null,
        refundAmount: 0,
        code: [],
        selectedCode: '',
        error: '',
        orderCount: null
    }
    async getCode() {
        try {
            const response = await axios.get("/refundRequest");
            this.setState({
                code: response.data
            });

        } catch (e) {
            console.log(e);
        }
    }

    refund = async () => {
        const code = this.state.code[this.state.selectedCode];
        const { orderView, info } = this.state;
        if (code) {
            let refunds = {
                orders: { id: orderView.orderId },
                code: code,
                refundAmount: info.totalRefund
            }
            const response = await axios.post('/refundRequestProcess', refunds);
            this.props.history.push(`/mypage/myorders/orderDetail/${orderView.groupId}?orderId=${orderView.orderId}`);
        } else {
            this.setState({
                error: '환불 사유를 선택해주세요.'
            });
        }
    }

    orderCount = async () => {
        const params = new URLSearchParams();
        params.append("groupId", this.props.location.state.orderView.groupId)
        await axios({
            method: "post",
            data: params,
            url: "/orderCount"
        }).then(async (res) => {
            this.calculateRefundAmount(res.data);

        });
    }

    calculateRefundAmount = (orderCount) => {
        const { orderView } = this.props.location.state;
        const { gradeDiscount, pointUse, orderPrice, totalPay } = orderView;
        const ratio = orderPrice / (totalPay + gradeDiscount + pointUse);
        const refundAmount = orderPrice - Math.round(ratio * gradeDiscount) - - Math.round(pointUse / orderCount);
        const info = {
            totalRefund: refundAmount,
            orderDate: orderView.orderDate,
            gradeDiscount: Math.round(ratio * gradeDiscount),
            pointUse: pointUse / orderCount
        }
        this.setState({
            orderView: orderView,
            info: info,
            orderPrice: orderPrice
        })
    }

    handleSelect = (e) => {
        this.setState({
            error: '',
            selectedCode: e.target.value
        })

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (!this.props.location.state.orderCount) this.orderCount();
        else this.calculateRefundAmount(this.props.location.state.orderCount);
        this.getCode();
    }

    render() {
        const { code, orderView, info, orderPrice } = this.state;
        const { handleSelect, refund } = this;
        const codeOp = code.map((c, index) => (<Form.Check className="p-2" key={c.code} type="radio" value={index} name="code" id={c.content} label={c.content} onChange={handleSelect}/>));
        return (
            <div className="RefundRequest">
                <div className="pageTitle">
                    <div>환불 신청</div>
                </div>
                {orderView && <OrderGroupList data={[].concat(orderView)}></OrderGroupList>}
                <Container>
                <div className="request">
                <div className="tableTitle">환불 정보</div>
                <PayInfo info={info} totalPrice={orderPrice}></PayInfo>
                <Form.Group as={Row} className="p-3 m-auto">
                    <Form.Label column sm="5">
                        환불 사유
                    </Form.Label>
                    <Col sm="6">
                        <Form>
                            {codeOp}
                        </Form>
                    </Col>
                </Form.Group>
                <div className="mb-4"></div>
                <div className="error pt-4">{this.state.error}</div>
                <ButtonToolbar className="justify-content-center pt-4 mt-4 pb-4 mb-4">
                    <Button variant="outline-dark" onClick={refund}>신청</Button>
                </ButtonToolbar>
                </div>
                </Container>
            </div>

        );
    }
}

export default RefundRequest;