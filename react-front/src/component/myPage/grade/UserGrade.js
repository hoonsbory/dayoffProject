import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import "./userGrade.css";

class UserGrade extends Component {

    state = {
        grades: [],
        currGrade: null,
        nextGrade: null,
        nextGradeAmount: null,
        accrue: null,
        gradesRequiredArray:[]
    }

    async getGrade() {
        const response = await axios.get("/getGrade?userId=" + sessionStorage.getItem("userId"));
        const grades = response.data.grades;
        const currGrade = response.data.userGrade;
        const nextGrade = grades.find((g) => g.rate > currGrade.rate);
        const accrue = response.data.accrue;
        const gradesRequiredArray=[];
        for(let i=0; i<grades.length; i++){
            if(i===grades.length-1){
                gradesRequiredArray.push(this.numberWithCommas(grades[i].required)+"점 ~");
            }
            else
                gradesRequiredArray.push(this.numberWithCommas(grades[i].required)+"점 ~ "+this.numberWithCommas(grades[i+1].required-1)+"점");
        }
        this.setState({
            grades: grades,
            currGrade: currGrade,
            nextGrade: nextGrade,
            accrue: accrue,
            gradesRequiredArray:gradesRequiredArray
        })
    }

    componentDidMount() {
        this.getGrade();
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    render() {
        const { currGrade, nextGrade, accrue, grades, gradesRequiredArray } = this.state;
        const score = parseInt(accrue / 10);
        const scoreRate = nextGrade && (parseFloat(score / nextGrade.required).toFixed(1)) ? parseFloat(score / nextGrade.required * 100).toFixed(1) : 100;
        const gradeName = grades.map(g=>(<th>{g.level}</th>));  
        const gradeRequired=gradesRequiredArray.map(g=>(<td>{g}</td>)) 
        const gradeRate=grades.map(g=>(<td>{g.rate}% 할인</td>));
        const style = {
            width: scoreRate + "%"
        }
        return (
            <div className="UserGradeWrapper">
                <div className="pageTitle">
                    <div>회원 등급 현황</div>
                </div>
                {currGrade && <div className="UserGrade">
                    <div className="state"><span>누적 구매금액: {this.numberWithCommas(accrue)}원</span><span>현재 등급 점수: {this.numberWithCommas(score)}점</span></div>
                    <div>
                        <div className="gradeBarWrapper">
                        {nextGrade && <div>다음 등급인 {nextGrade.level}까지 {this.numberWithCommas(nextGrade.required - score)}점 남았습니다.</div>}
                        <div><div>{currGrade.level}</div><div className="gradeBar"><div style={style}>{scoreRate}%</div></div><div>{nextGrade && nextGrade.level}</div></div>
                        </div>
                    </div>
                    <Table>
                        <thead>
                            <tr><th></th>{gradeName}</tr>
                        </thead>
                        <tbody>
                            <tr><th>등급 점수</th>{gradeRequired}</tr>
                            <tr><th>등급 혜택</th>{gradeRate}</tr>
                        </tbody>
                    </Table>
                </div>}
            </div>
        );
    }
}

export default UserGrade;