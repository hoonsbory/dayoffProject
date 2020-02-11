import React, { Component } from 'react';
import axios from 'axios';

class DeleteProduct extends Component {
    state = {
        id: '',
        product: null
    }

    async getProduct(id) {
        const response = await axios.get("/getProduct", { params: { id: id } });
        const product = response.data;
        this.setState({
            product: product
        });
    }

    async deleteProduct(id) {
        const params = new URLSearchParams();
        params.append('id', id);
        await axios({
            method: 'post',
            url: '/deleteProduct',
            data: params
        });
        this.setState({
            product: null
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleDelete = () => {
        this.deleteProduct(this.state.id);
    }

    handleSearch = () => {
        this.getProduct(this.state.id);
    }

    render() {
        const { product, id } = this.state;
        const { handleSearch, handleDelete, handleChange } = this;
        const detail = product ? (<tr><td>{product.name}</td><td>{product.price}</td><td>{product.category.subName}</td><td>{product.isAvailable===0?'판매중지':'판매중'}</td></tr>) : null;
        const disabled=product?(product.isAvailable?false:true):false;
        return (
            <div>
                <input name="id" placeholder="상품id" value={id} onChange={handleChange}></input>
                <button onClick={handleSearch}>검색</button><hr></hr>
                <table>
                    <thead>
                        <tr><th>상품명</th><th>가격</th><th>카테고리</th><th>판매상태</th></tr>
                    </thead>
                    <tbody>
                        {detail}
                    </tbody>
                </table>
                <button onClick={handleDelete} disabled={disabled}>삭제</button>
            </div>
        );
    }
}

export default DeleteProduct;