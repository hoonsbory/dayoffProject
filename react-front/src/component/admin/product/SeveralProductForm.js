import axios from 'axios';
import React, { Component } from 'react';
import { Button, ButtonToolbar, Row, Col, Form } from 'react-bootstrap';
import ProductImageForm from './ProductImageForm';
import ProductsFileForm from './ProductsFileForm';

class SeveralProductForm extends Component {
    state = {
        products: [],
        error: '',
        post: false,
        selectedProductImage: [],
        typeError: '',
        colors:[],
        categories:[]
    }

    handleProductAdd = (products) => {
        this.setState({
            products: products
        })
    }

    setTypeError = (typeError) => {
        this.setState({
            typeError: typeError
        })
    }

    handleClick = async () => {
        let flag = true;

        if (this.state.selectedProductImage.length === 0 || this.state.products.length === 0) {
            flag = false;
        }
        if (flag) {
            document.getElementById("severalProductLoading").style.display = "block";

            let params = new FormData();
            params.append('json', JSON.stringify(this.state.products));
            const file = this.state.selectedProductImage;

            file.forEach((f) => {
                params.append('file', f);
            })
            await axios({
                method: 'post',
                url: '/addSeveralProductProcess',
                data: params
            }).then(success => {
                const data = success.data;
                this.props.createMessage({
                    latestProduct: data.latestProduct,
                    productCount: data.productCount
                });
                document.getElementById("severalProductLoading").style.display = "none";
            }).catch(
                error => console.log(error)
            );
            this.setState({
                products: [],
                error: '',
                post: true,
                selectedProductImage: [],
                typeError: ''
            });
        } else {
            this.setState({
                error: '모든 항목을 입력해주세요.'
            });
        }
    }

    handleFileAdd = (file, stateKey) => {
        this.setState({
            [stateKey]: this.state[stateKey].concat(file),
            typeError: '',
            error: '',
            post: false
        });
    };

    handleFileRemove = (file, stateKey) => {
        this.setState({
            [stateKey]: this.state[stateKey].filter(f => f.name !== file.name)
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            colors:nextProps.colors,
            categories:nextProps.categories
        })
    }
    render() {
        const { error, post, typeError, colors, categories } = this.state;
        const { handleClick, handleProductAdd, handleFileAdd, handleFileRemove, setTypeError } = this;
        return (
            <div className="ProductForm SeveralProductForm">
                <ProductsFileForm addProduct={handleProductAdd} typeError={typeError} setTypeError={setTypeError} colors={colors} categories={categories}></ProductsFileForm>
                <Row>
                <Form.Label column sm="2">
                    이미지 파일
                </Form.Label>
                <Col>
                <ProductImageForm onAdd={handleFileAdd} onRemove={handleFileRemove} post={post} stateKey="selectedProductImage" name="상품 이미지"></ProductImageForm>
                </Col>
                </Row>
                <div className="error pt-4">{error}</div>
                <div className="loading pt-4" id="severalProductLoading"><img alt="loading" src="/images/loading25.gif"></img></div>
                <ButtonToolbar className="justify-content-center mt-4 pb-4 mb-4">
                    <Button variant="outline-dark" size="lg" className="formButton" onClick={handleClick}>등록</Button>
                </ButtonToolbar>
            </div>
        );
    };
}

export default SeveralProductForm;