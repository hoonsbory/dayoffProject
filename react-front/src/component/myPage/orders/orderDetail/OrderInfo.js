import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SlideToggle from "react-slide-toggle";
import GoNextState from '../GoNextState';
import OrderCancel from '../OrderCancel';
import OrderConfirm from '../OrderConfirm';

class OrderInfo extends Component {

    state = {
        newInvoice: ''
    }
    async updateInvoice(invoice, groupId, orderId) {
        const params = new URLSearchParams();
        params.append("invoice", invoice);
        params.append("groupId", groupId);
        params.append("orderId", orderId)
        await axios({
            method: "post",
            data: params,
            url: "/updateInvoice"
        }).then((res) => {

        })
        this.props.getData();
    }

    handleChangeInput2(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    invoiceSubmit = () => {
        if (this.state.newInvoice.length > 0)
            this.updateInvoice(this.state.newInvoice, this.props.order.groupId, this.props.order.orderId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.order !== nextProps.order || this.state.newInvoice !== nextState.newInvoice;
    }


    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { orderId, userId, productName, orderPrice, orderColor, orderSize, orderQuantity, productThumbnailName, productId, codeContent, orderCount, groupId } = this.props.order;
        let adminCodeButton = null;
        if (this.props.isAdmin) {
            switch (codeContent) {
                case "배송준비중":
                    adminCodeButton = (
                        <SlideToggle collapsed="true" render={({ toggle, setCollapsibleElement }) => (
                            <div className="my-collapsible">
                                <Button variant="secondary" className="my-collapsible__toggle" onClick={toggle}>
                                    송장번호 등록
                                </Button>
                                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                    <div className="my-collapsible__content-inner">
                                        <Form.Control style={{ width: "70%", display: "inline" }} type="text" placeholder="송장번호" onChange={this.handleChangeInput2.bind(this)} name="newInvoice" value={this.state.newInvoice} />
                                        <Button variant="secondary" className="ml-1" onClick={this.invoiceSubmit}>등록</Button>
                                    </div>
                                </div>
                            </div>
                        )}></SlideToggle>);
                    break;
                // case "배송중":
                //     adminCodeButton = <Deliver invoice={invoice}></Deliver>;
                //     break;
                case "환불대기중":
                    adminCodeButton = (<GoNextState orderId={orderId} buttonName="환불 승인" getData={this.props.getData}></GoNextState>);
                    break;
                case "픽업예정":
                    adminCodeButton = (<GoNextState orderId={orderId} buttonName="픽업 완료" getData={this.props.getData}></GoNextState>);
                    break;
            }
        }
        let userCodeButton = null;
        if (!this.props.isAdmin) {
            switch (codeContent) {
                case "배송준비중":
                    userCodeButton = <OrderCancel order={this.props.order} orderCount={orderCount} getData={this.props.getData}></OrderCancel>;
                    break;
                // case "배송중":
                //     userCodeButton = <Deliver invoice={invoice}></Deliver>;
                //     break;
                case "구매확정":
                    userCodeButton = <Link style={{display : 'block'}} to={"/mypage/review/" + orderId}><Button variant="secondary">후기 작성</Button></Link>;
                    break;
                case "배송완료":
                    case "픽업완료":
                    userCodeButton = (<div><OrderConfirm orderId={orderId} userId={userId} groupId={groupId} getData={this.props.getData}></OrderConfirm><br></br><Link to={{
                        pathname: "/mypage/refundRequest",
                        state: {
                            orderView: this.props.order,
                            orderCount: this.props.orderCount
                        }
                    }}><Button variant="secondary">환불 신청</Button></Link></div>);
                    break;
            }
        }

        return (
            <tr>
                <td style={{ width: "5%" }}>{orderId}</td>
                <td style={{ width: "50%" }}>
                    <Link to={"/product/" + productId}><div className="orderProduct"><img width="100px" height="100px" alt="productImg" src={"https://storage.googleapis.com/bit-jaehoon/" + productThumbnailName}></img>
                        <div className="orderProductName">
                            {productName}
                        </div>
                    </div></Link>
                </td>
                <td>{orderColor}</td>
                <td>{orderSize}</td>
                <td>{orderQuantity}</td>
                <td>{this.numberWithCommas(orderPrice)}원</td>
                <td style={{ width: "18%" }}>{codeContent}
                    {adminCodeButton}
                    {userCodeButton}
                </td>
            </tr >
        )
    }
}


export default OrderInfo;