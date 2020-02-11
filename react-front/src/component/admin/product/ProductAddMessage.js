import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ProductAddMessage extends Component {

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.latestProduct!==this.props.latestProduct;
    }

    render() {
        const { latestProduct, productCount } = this.props;
        const completeMessage = latestProduct?
                (<div className="ProductAddMessage">
                    <Link to={"/product/"+latestProduct.id}>
                    <div className="latestProduct">
                        <img alt="latestProduct" src={"https://storage.googleapis.com/bit-jaehoon/" + latestProduct.productImage[0].name}></img>
                    </div>
                    </Link>
                    <span className="productCount">{productCount}</span>
                    <span className="completeMessage">등록 완료</span>
                </div>):null;

        return (
            <div>

                {completeMessage}
            </div>
        );
    }


}

export default ProductAddMessage;