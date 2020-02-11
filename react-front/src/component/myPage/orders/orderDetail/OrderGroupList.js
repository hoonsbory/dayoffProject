import React, { Component } from 'react';
import OrderInfo from './OrderInfo';
import OrderInfoNoState from './OrderInfoNoState';
import { Table } from 'react-bootstrap';

class OrderGroupList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { data, isAdmin, getData, needState } = this.props;
        const header = (<tr><th>번호</th><th>상품정보</th><th>색상</th><th>사이즈</th><th>수량</th><th>주문금액</th>{needState && <th>주문상태</th>}</tr>);
        const list = needState ?
            data.map(
                (order, index) => {
                    const thisOrder = order.orderId === this.props.orderId && true;
                    return (
                        <OrderInfo key={order.orderId} order={order} thisOrder={thisOrder} isAdmin={isAdmin} getData={getData} orderCount={data.length} />
                    )
                })
            :
            data.map((order, index) => {
                const thisOrder = order.orderId === this.props.orderId && true;
                return (
                    <OrderInfoNoState key={order.orderId} order={order} thisOrder={thisOrder} isAdmin={isAdmin} getData={getData} />
                )
            });

        return (
            <div className="OrderGroupList">
                <div className="tableTitle">주문 내역</div>
                <Table className="OrderGroupListTable" hover>
                    <thead>{header}</thead>
                    <tbody>{list}</tbody>
                </Table>
            </div>
        )
    }
}

export default OrderGroupList;