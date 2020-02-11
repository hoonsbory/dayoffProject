import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrderInfoNoState extends Component {

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { orderId, productName, orderPrice, orderColor, orderSize, orderQuantity, productThumbnailName, productId } = this.props.order;
        return (
            <tr>
                <td style={{width:"5%"}}>{orderId}</td>
                <td style={{width:"50%"}}>
                    <Link to={"/product/" + productId}><div className="orderProduct"><img width="100px" height="100px" alt="productImg" src={"https://storage.googleapis.com/bit-jaehoon/" + productThumbnailName}></img>
                        <div className="orderProductName">
                            {productName}
                        </div>
                    </div></Link>
                </td>
                <td>{orderColor}</td>
                <td>{orderSize}</td>
                <td>{orderQuantity}</td>
                <td>{this.numberWithCommas(orderPrice)}원</td>
            </tr>
        )
    }
}


export default OrderInfoNoState;