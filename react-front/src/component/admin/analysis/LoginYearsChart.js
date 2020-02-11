import React, { Component } from 'react';
import OneLineChart from './chart/OneLineChart';

class LoginYearsChart extends Component {
    state = {
        title: '연도별 로그인 수',
        data: [],
        selected:'',
        label:['로그인']
    }

    componentDidMount() {
        const data = this.props.data.map(
            (candle) => ({
                label: candle[0],
                col1: candle[1]
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
                {data.length > 0 && <OneLineChart data={data} title={title} label={label} selected={selected} />}
            </div>
        );
    }
}



export default LoginYearsChart;
