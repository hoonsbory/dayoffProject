import React, { Component } from 'react';
import TwoBarOneLineChart from './chart/TwoBarOneLineChart';

class OrderYearsChart extends Component {
    state = {
        title: '연도별 매출액과 환불액',
        data: [],
        selected:'',
        label:['매출','환불','순매출']
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
            data
        })
    }

    render() {
        const {selected,data,title, label}=this.state;
        return (
            <div>
                {data.length > 0 && <TwoBarOneLineChart data={data} title={title} label={label} selected={selected} />}
            </div>
        );
    }
}



export default OrderYearsChart;
