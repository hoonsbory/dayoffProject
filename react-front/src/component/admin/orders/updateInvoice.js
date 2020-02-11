import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SlideToggle from "react-slide-toggle";
import Axios from 'axios';

export default class updateInvoice extends Component{

    state = {
        invoice : ''
    }

    async updateInvoice(invoice, groupId,orderId){
        const params = new URLSearchParams();
        params.append("invoice", invoice);
        params.append("groupId", groupId);
        params.append("orderId", orderId)
        await Axios({
          method : "post",
          data : params,
          url : "/updateInvoice"
        }).then((res)=>{
          this.props.orderList();
          
        })
      }

      handleChangeInput2(e) {
        this.setState({
          [e.target.name] : e.target.value
        })
      }
    render() {
        return (
            <SlideToggle collapsed="true" render={({toggle, setCollapsibleElement})=>(
                <div className="my-collapsible">
                  <Button variant="outline-dark" className="jaehoon" onClick={toggle}>
                  송장번호등록
                  </Button>
                  <div className="my-collapsible__content" ref={setCollapsibleElement}>
                    <div style={{width : '215px', marginRight : '-175px', marginTop : '10px'}} className="my-collapsible__content-inner">
                    <div>
                  <input style={{width : '153px'}} required="required" type="text" onChange={this.handleChangeInput2.bind(this)} name="invoice" value={this.state.invoice}></input>
                        <Button style={{marginBottom : '5px'}} disabled={this.state.invoice==='' ? true:false} className="jaehoon" variant="outline-dark" onClick={()=>this.updateInvoice.bind(this)(this.state.invoice, this.props.groupId, this.props.orderId)}>등록</Button>
                </div>
                    </div>
                  </div>
              </div>
              )}></SlideToggle>
        );
    }
}