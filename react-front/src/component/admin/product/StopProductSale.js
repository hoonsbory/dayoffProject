import React, { Component } from 'react';
import axios from 'axios';

class StopProductSale extends Component {

    async changeProductSale(id,availability) {
        const params = new URLSearchParams();
        params.append('id', id);
        params.append('availability', availability);
        await axios({
            method: 'post',
            url: '/changeProductSale',
            data: params
        });
        this.props.changeAvailability(0)
    }

   
    handleChangeSale = () => {
        this.changeProductSale(this.props.productId, 0);
    }


    render() {
        const { handleChangeSale } = this;

        return (
        <button className={this.props.className} onClick={handleChangeSale}>판매중지</button>
        );
    }
}

export default StopProductSale;