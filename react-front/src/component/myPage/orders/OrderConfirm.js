import React, { Component } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router";

class OrderConfirm extends Component {

    async confirm(orderId,userId,groupId){
        const params = new URLSearchParams();
        params.append("orderId", orderId)
        params.append("userId", userId)
        params.append("groupId", groupId)
        await Axios({
          method : "post",
          data : params,
          url : "/confirm"
        }).then((res)=>{
          if(this.props.orderList){
            this.props.orderList();
            }else{
                // window.location.reload(false);
                this.props.getData();
            }
        })
      
      }
      
      f3 = ()=>{
        if(window.confirm(`구매확정 후에는 환불이 불가능합니다. 그래도 구매를 확정하시겠습니까?`)){ //리액트에서는 window. 붙여야함
      
            this.confirm(this.props.orderId,this.props.userId,this.props.groupId);
           
        }

      }

    render() {
        return (
            <div>
              <Button className="jaehoon" variant="outline-dark" onClick={this.f3.bind(this)}>구매 확정</Button>
            </div>
        );
    }
}

export default withRouter(OrderConfirm);