import React, { Component } from 'react';
import RefundInfo from './RefundInfo';
import { Table } from 'react-bootstrap';

class RefundList extends Component{
    static defaultProps={
        data:[]
    }

    render(){
        const {data}=this.props;
        const list = data.map(
            (order,index) => {
                const thisOrder=order.orderId===this.props.orderId&&true;
                return (
                    <RefundInfo key={order.orderId} order={order} thisOrder={thisOrder}/>
                )
            }
        );

        return (
            <div className="RefundList">
                <div className="tableTitle">환불 내역</div>
                <Table className="OrderGroupListTable" hover>
                <thead><tr><th>번호</th><th>상품정보</th><th>환불금액</th><th>환불신청날짜</th><th>환불날짜</th></tr></thead>
                <tbody>{list.length>0?list:<tr><td colSpan="5">환불 상태인 상품이 없습니다.</td></tr>}</tbody>
                </Table>
            </div>
        )
    }
}

export default RefundList;