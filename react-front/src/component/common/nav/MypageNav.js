import React, { Component } from 'react'
import './MyNav.css';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {

  render() {
    return (
      <div className="Nav">
        <div className='Nav_Title'>
        <h5>DayOff</h5>
        <h3>My PAGE</h3>
        </div>
        <div className='Nav_Info1'>
          <h5>쇼핑 정보</h5>
          <p><NavLink to={'/mypage/myorders'} className='Nav_Info_List'>주문 내역</NavLink></p>
          <p><NavLink to={'/mypage/map'} className='Nav_Info_List'>매장 픽업 서비스</NavLink></p>
          <p><NavLink to={'/mypage/myGrade'} className='Nav_Info_List'>회원 등급 현황</NavLink></p>
        </div>

        <div className='Nav_Info2'>
          <h5>나의 정보</h5>
          <p><NavLink to={'/mypage/myInfo'} className='Nav_Info_List'>회원 정보 수정</NavLink></p>
          <p><NavLink to={'/mypage/withdraw'} className='Nav_Info_List'>회원 탈퇴</NavLink></p>
        </div>

          <img className='tphone' alt="phoneImg" src='/images/tphone1.png'></img>
      </div>
    )


  }
}