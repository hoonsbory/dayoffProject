import React, { Component } from 'react';

class Total extends Component {
    render() {
      const {cart}= this.props;
        return (
            <div style={{
            "padding": "1.5em 0","marginTop":"10px","border-top":"1px solid #989898","border-bottom":"1px solid #989898"}}>
            <h3 className="row" style={{ fontWeight: 600 }}>
              <span style={{"padding-left":"16px"}}>총 가격:</span>
              <span className="col-6 ">{cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
            </h3></div>
        );
    }
}

export default Total;