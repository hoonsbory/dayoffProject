import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

class GoNextState extends Component {

    changeState = async () => {
        const params = new URLSearchParams();
        params.append("orderId", this.props.orderId)
        await Axios({
          method : "post",
          data : params,
          url : "/goNextState"
        }).then((res)=>{
            //window.location.reload(false)
            this.props.getData();
        })
      
      }

    render() {
        return (
            <div>
                <Button variant="secondary" onClick={this.changeState}>{this.props.buttonName}</Button>
            </div>
        );
    }
}

export default GoNextState;