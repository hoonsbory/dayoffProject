import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

export default class pickUpConfirm extends Component{
    async pickUpConfirm(groupId){
        const params = new URLSearchParams();
        params.append("groupId", groupId)
        await Axios({
          method : "post",
          data : params,
          url : "/pickUpConfirm"
        }).then((res)=>{
            this.props.orderList();
        })
      }
    render() {
        return (
             <div>
                 <Button className="jaehoon" variant="outline-dark" onClick={()=>this.pickUpConfirm.bind(this)(this.props.groupId)}>픽업완료</Button>
             </div>
        );
    }
}