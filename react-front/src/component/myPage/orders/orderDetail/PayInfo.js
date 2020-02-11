import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class PayInfo extends Component {
    static defaultProps = {
        info: []
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        if (this.props.info) {
            const sum = this.props.totalPrice;
            const { totalPay, orderDate, gradeDiscount, pointUse, totalRefund } = this.props.info;
            return (
                <div className="PayInfo">
                    {sum&&
                    <Table bordered>
                        <tbody>

                    <tr><th>주문날짜</th><td>{orderDate}</td></tr>
                    <tr><th>주문금액</th><td>{this.numberWithCommas(sum)}원</td></tr>
                    <tr><th>등급할인</th><td>-{gradeDiscount?this.numberWithCommas(gradeDiscount):0}원</td></tr>
                    <tr><th>적립금사용</th><td>-{pointUse?this.numberWithCommas(pointUse):0}원</td></tr>
            {totalPay?<tr><th>최종 결제금액</th><td>{this.numberWithCommas(totalPay)}원</td></tr>:<tr><th>환불받을 금액</th><td>{this.numberWithCommas(totalRefund)}원</td></tr>}
                        </tbody>
                    </Table>
                    }
                </div>
            );
        }
        else return (<div></div>);
    }
}

export default PayInfo;