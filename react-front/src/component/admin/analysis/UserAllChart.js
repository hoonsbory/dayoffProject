import React, { Component } from 'react';
import DoughnutChart from './chart/DoughnutChart';

class UserAllChart extends Component {
    state = {
        title: '총 가입과 탈퇴 수',
        data: [],
        selected:'',
        label:['현 가입자','현 탈퇴자']
    }

    componentDidMount() {
        
        this.setState({
            data:this.props.data
        })
    }


    render() {
        const {data,title,selected,label}=this.state;
        return (
            <div>
                {data.length > 0 && <DoughnutChart data={data} title={title} selected={selected} label={label} />}
            </div>
        );
    }
}



export default UserAllChart;
