import React, { Component } from 'react'
import './footer.css';

export default class MainFooter extends Component {
  render() {
    return (
      <div className="Mfooter">
        <div className='MFooterItem1'>
        <div className='MFooter_info'>
            <h4>CS CENTER</h4>
            <h2>1688-1360</h2>
            <a href> Week</a> &nbsp;&nbsp;&nbsp;
            <a href> 10:00~17:00</a><br></br>
            <a href> 주말, 공휴일은 휴무입니다.
            통화량 폭주로 전화연결이 안 될 경우, <br></br>
            게시판에 문의 남겨주시면 빠른 처리 해드리겠습니다.
            </a>
        </div>
        </div>

        <div className='MFooterItem2'>
        <div className='MFooter_info'>
            <h4>ACCOUNT INFO</h4> <br></br>
            <a href> 농협 </a> &nbsp;&nbsp;&nbsp;
            <a href> 317-6677-6677-11</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href> 국민 </a> &nbsp;&nbsp;&nbsp;
            <a href> 96677-667751</a> <br></br>
            <a href> 우체국 </a> &nbsp;&nbsp;&nbsp;
            <a href> 400010-02-890732</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href> 우리 </a> &nbsp;&nbsp;&nbsp;
            <a href> 1005-593-667788</a> <br></br><br></br>
            <a href> 예금주 : (주)데이오프 </a><br></br>
            </div>
            </div>

            <div className='MFooterItem3'>
            <div className='MFooter_info'>
            <h4>RETURN</h4> <br></br>
            <a href> 교환/반품 정책 확인 </a><br></br>
            <a href> 주소지 : 경기도 남양주시 도농동 부영아파트 301동 2202호
            </a>
            </div>
            </div>
                <div className='MfooterLast'> <br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href>대한민국 ©2019 DayOff.Inc. All Rights Reserved</a><a className='MfooterLast2' href>이용약관 / 개인정보처리방침</a></div>
      </div>
    )
  }
}
