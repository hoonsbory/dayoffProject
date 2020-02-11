import axios from 'axios';
import React, { Component } from 'react';
import TwoBarOneLineChart from './chart/TwoBarOneLineChart';
import { Form, Row, Col } from 'react-bootstrap';

class OrderMonthsChart extends Component {
    state = {
        title: '년 월별 매출액과 환불액',
        data: [],
        selected:'',
        label:['매출','환불','순매출']
    }

    handleChange = (e) => {
        this.setState({
            selected:e.target.value
        })
    }

    getData = async () => {
        const {selected}=this.state;
        try {

            const response = await axios.get(`/ordersAnalysis/order/month/${selected}`);
            
            const data = response.data.orderMonth.map(
                (candle) => ({
                    label: candle[0],
                    col1: candle[1],
                    col2: candle[2],
                    col3: candle[3]
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
                label: candle[0],
                col1: candle[1],
                col2: candle[2],
                col3: candle[3]
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
        const yearOp=this.props.select.map(y=>(<option key={y} value={y}>{y}</option>));
        return (
            <div>
                <Form.Group as={Row} className="ml-4">
                    <Col sm="3">
                        <Form.Control as="select"value={selected} onChange={this.handleChange}>
                        {yearOp}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}></Form.Group>
                {data.length > 0 && <TwoBarOneLineChart data={data} title={title} label={label} selected={selected} />}
            </div>
        );
    }
}



export default OrderMonthsChart;
