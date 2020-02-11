import React, { Component } from 'react';
import axios from 'axios';
import FourBarChart from './chart/FourBarChart';
import { Form, Row, Col } from 'react-bootstrap';

class OrderSexAndAgeChart extends Component {
    state = {
        title: '월 연령대별 남녀 매출액과 환불액',
        data: [],
        selected:'',
        label:['여성 매출','여성 환불','남성 매출','남성 환불']
    }

    handleChange = (e) => {
        this.setState({
            selected:e.target.value
        })
    }

    getData = async () => {
        const {selected}=this.state;
        try {

            const response = await axios.get(`/ordersAnalysis/order/sexAndAge/${selected}`);

            const data = response.data.orderSexAndAge.map(
                (candle) => ({
                    sex: candle[0],
                    age: candle[1],
                    col1: candle[2],
                    col2: candle[3]
                })
            );
            this.setState({
                data
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        const data = this.props.data.map(
            (candle) => ({
                sex: candle[0],
                age: candle[1],
                col1: candle[2],
                col2: candle[3]
            })
            );
        this.setState({
            data,
            selected:this.props.select[0]
        })
       
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected && prevState.selected !== this.state.selected) {
            this.getData();
        }
        
    }

    render() {
        const {selected,data,title,label}=this.state;
        const yearMonthOp=this.props.select.map(y=>(<option key={y} value={y}>{y}</option>));
        return (
            <div>
                <Form.Group as={Row} className="ml-4">
                    <Col sm="3">
                        <Form.Control as="select"value={selected} onChange={this.handleChange}>
                        {yearMonthOp}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}></Form.Group>
                {data.length > 0 && <FourBarChart data={data} title={title} label={label} selected={selected&&selected.substring(selected.indexOf('-')+1)} />}
            </div>
        );
    }
}



export default OrderSexAndAgeChart;
