import React, { Component } from 'react'
import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className='FooterItem1'>
        <div className='Footer_info'>
            <h4>CS CENTER</h4>
            <h2>1234-1234</h2>
            <a href> Week</a> &nbsp;&nbsp;&nbsp;
            <a href> 10:00~17:00</a><br></br>
            <a href> 주말, 공휴일은 휴무입니다.
            통화량 폭주로 전화연결이 안 될 경우, <br></br>
            게시판에 문의 남겨주시면 빠른 처리 해드리겠습니다.
            </a>
        </div>
        </div>

        <div className='FooterItem2'>
        <div className='Footer_info'>
            <h4>ACCOUNT INFO</h4> <br></br>
            <a href> 농협 </a> &nbsp;&nbsp;&nbsp;
            <a href> 123-1234-1234-12</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href> 국민 </a> &nbsp;&nbsp;&nbsp;
            <a href> 12345-123456</a> <br></br>
            <a href> 우체국 </a> &nbsp;&nbsp;&nbsp;
            <a href> 123456-12-123456</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href> 우리 </a> &nbsp;&nbsp;&nbsp;
            <a href> 12345-123-123456</a> <br></br><br></br>
            <a href> 예금주 : (주)데이오프 </a><br></br>
            </div>
            </div>

            <div className='FooterItem3'>
            <div className='Footer_info'>
            <h4>RETURN</h4> <br></br>
            <a href> 교환/반품 정책 확인 </a><br></br>
            <a href> 주소지 : 경기도 남양주시 와부읍 덕소로
            </a>
            </div>
            </div>
                <div className='footerLast'> <br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href>대한민국 ©2020 DayOff.Inc. All Rights Reserved</a><a className='footerLast2' href>이용약관 / 개인정보처리방침</a></div>
      </div>
    )
  }
}
