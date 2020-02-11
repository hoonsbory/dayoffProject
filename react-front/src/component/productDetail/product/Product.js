import React, { Component } from 'react';
import ProductInfoAdmin from './ProductInfoAdmin';
import ProductInfo from './ProductInfo';

class Product extends Component {
    render() {
        return (
            <div>
                {sessionStorage.getItem("userRole")==="admin"?<ProductInfoAdmin productId={this.props.match.params.productId}></ProductInfoAdmin>:<ProductInfo productId={this.props.match.params.productId}></ProductInfo>}
                
            </div>
        );
    }
}

export default Product;