import axios from 'axios';
import React, { Component } from 'react';
import OrderSexAndAgeChart from './OrderSexAndAgeChart';
import OrderMonthsChart from './OrderMonthsChart';
import OrderYearsChart from './OrderYearsChart';
import RefundReasonChart from './RefundReasonChart';

class OrderAnalysis extends Component {
    state = {
        data: null
    }


    getData = async () => {
        try {

            const response = await axios.get('/ordersAnalysis');

            this.setState({
                data:response.data
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        //첫 로딩시에 getData 호출
        window.scrollTo(0, 0);
        this.getData();
    }

    render() {
        const {data}=this.state;
        
        return (
            <div className="OrderAnalysisWrapper">
                <div className="pageTitle">
                            <div>매출 통계</div>
                </div >
                {data &&
               (
                <div className="OrderAnalysis">
                <OrderSexAndAgeChart data={data.orderSexAndAge} select={data.yearMonthsOfOrders}></OrderSexAndAgeChart>
                <OrderMonthsChart data={data.orderMonth} select={data.yearsOfOrders}></OrderMonthsChart>
                <OrderYearsChart data={data.orderYear}></OrderYearsChart>
                <RefundReasonChart data={data.refundReasons} code={data.allRefundReasons} select={data.yearsOfRefunds}></RefundReasonChart>
                </div>
                )}
                
            </div>
        );
    }
}



export default OrderAnalysis;
