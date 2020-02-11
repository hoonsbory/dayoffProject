import React, { Component } from 'react';
import axios from 'axios';
import FourBarChart from './chart/FourBarChart';
import { Form, Row, Col } from 'react-bootstrap';

class UserSexAndAgeChart extends Component {
    state = {
        title: '월 연령대별 남녀 가입과 탈퇴 수',
        data: [],
        selected:'',
        label:['여성 가입','여성 탈퇴','남성 가입','남성 탈퇴']
    }

    handleChange = (e) => {
        this.setState({
            selected:e.target.value
        })
    }

    getData = async () => {
        const {selected}=this.state;
        try {

            const response = await axios.get(`/usersAnalysis/user/sexAndAge/${selected}`);

            const data = response.data.userSexAndAge.map(
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



export default UserSexAndAgeChart;
