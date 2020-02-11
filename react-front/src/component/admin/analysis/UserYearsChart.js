import React, { Component } from 'react';
import TwoLineChart from './chart/TwoLineChart';

class UserYearsChart extends Component {
    state = {
        title: '연도별 가입과 탈퇴 수',
        data: [],
        selected:'',
        label:['가입','탈퇴']
    }

    componentDidMount() {
        const data = this.props.data.map(
            (candle) => ({
                label: candle[0],
                col1: candle[1],
                col2: candle[2]
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
                {data.length > 0 && <TwoLineChart data={data} title={title} label={label} selected={selected} />}
            </div>
        );
    }
}



export default UserYearsChart;
