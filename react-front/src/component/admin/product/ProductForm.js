import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, ButtonToolbar, Col, Form, Row } from 'react-bootstrap';
import ProductImageForm from './ProductImageForm';
import SelectPreview from './SelectPreview';

class ProductForm extends Component {
    state = {
        product: {
            name: '',
            price: '',
            category: '',
            color: [],
            productSize: [],
        },
        colors: [],
        categories: [],
        subCategories: [],
        selectedColor: '',
        selectedSize: '',
        selectedCategory: '',
        selectedSubCategory: '',
        selectedDetailImage: [],
        selectedProductImage: [],
        error: '',
        post: false,
    }

    handleSelect = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        });
        if (e.target.name === "selectedSubCategory") {
            this.setState({
                product: {
                    ...this.state.product,
                    category: this.state.categories.find(c=>c.id===parseInt(e.target.value))
                }
            });
        }
    }
    handleChange = (e) => {
        this.setState({
            product: {
                ...this.state.product,
                [e.target.name]: e.target.value
            },
            error: ''
        });
    }

    handleAdd = (e) => {
        switch (e.target.name) {
            case "colorBtn":
                const selectedColor = this.state.colors[this.state.selectedColor];
                if (selectedColor) {
                    if (!this.state.product.color.find(i => i.id === selectedColor.id))
                        this.setState({
                            product: {
                                ...this.state.product,
                                color: this.state.product.color.concat(selectedColor)
                            }
                        });
                }
                this.setState({
                    selectedColor: ''
                });
                break;
            case "sizeBtn":
                const selectedSize = { size: this.state.selectedSize.toUpperCase().trim() };
                if (selectedSize.size.length !== 0) {
                    if (!this.state.product.productSize.find(i => i.size === selectedSize.size))
                        this.setState({
                            product: {
                                ...this.state.product,
                                productSize: this.state.product.productSize.concat(selectedSize)
                            },
                            selectedSize: ''
                        })
                }
                this.setState({
                    selectedSize: ''
                });
                break;
            default:
                break;
        }

    }

    handleClick = async () => {
        let flag = true;
        for (let key of Object.keys(this.state.product)) {
            if (this.state.product[key] === undefined || this.state.product[key].length === 0) {
                flag = false;
                break;
            }
        }
        if (this.state.selectedDetailImage.length === 0 || this.state.selectedProductImage.length === 0) {
            flag = false;
        }
        if (flag) {
            document.getElementById("productLoading").style.display = "block";
            let params = new FormData();
            params.append('json', JSON.stringify(this.state.product));
            const file = this.state.selectedDetailImage.concat(this.state.selectedProductImage);

            file.forEach((f) => {
                params.append('file', f);
            })

            await axios({
                method: 'post',
                url: '/addProductProcess',
                data: params
            }).then(success => {
                const data = success.data;
                this.props.createMessage({
                    latestProduct: data.latestProduct,
                    productCount: data.productCount
                });
                document.getElementById("productLoading").style.display = "none";
            }).catch(
                error => console.log(error)
            );
            this.setState({
                product: {
                    name: '',
                    price: '',
                    category: '',
                    color: [],
                    productSize: []
                },
                subCategories: [],
                selectedColor: '',
                selectedSize: '',
                selectedCategory: '',
                selectedSubCategory: '',
                selectedDetailImage: [],
                selectedProductImage: [],
                error: '',
                post: true
            });
        } else {
            this.setState({
                error: '모든 항목을 입력해주세요.'
            });
        }
    }

    handleDelete = (e) => {
        const name = e.target.getAttribute("name");
        if (name) {
            this.setState({
                product: {
                    ...this.state.product,
                    [name]: this.state.product[name].filter((i, index) => index !== parseInt(e.target.getAttribute("value")))
                }
            });
        }
    }
    handleFileAdd = (file, stateKey) => {
        this.setState({
            [stateKey]: this.state[stateKey].concat(file),
            error: '',
            post: false
        });
    };

    handleFileRemove = (file, stateKey) => {
        this.setState({
            [stateKey]: this.state[stateKey].filter(f => f.name !== file.name)
        });
    }

    handleSub = (e) => {
        this.setState({
            selectedCategory: e.target.value,
            subCategories: this.state.categories.filter((c, index) => { return e.target.value === c.name }),
            selectedSubCategory: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            colors: nextProps.colors,
            categories: nextProps.categories
        })
    }


    render() {
        const { name, price, color, productSize } = this.state.product;
        const { colors, categories, subCategories, selectedColor, selectedSize, selectedCategory, selectedSubCategory, error, post } = this.state;
        const { handleChange, handleClick, handleAdd, handleSelect, handleSub, handleDelete, handleFileAdd, handleFileRemove } = this;
        const colorsOp = colors.map((c, index) => (<option key={c.id} value={index}>{c.color}</option>));
        const categoriesOp = categories.reduce((pre, value) => { if (!pre.includes(value.name)) pre.push(value.name); return pre; }, []).map((c, index) => (<option key={index} value={c}>{c}</option>));
        const subCategoriesOp = subCategories.map((c, index) => (<option key={c.id} value={c.id}>{c.subName}</option>));
        return (
            <div className="ProductForm OneProductForm">
                <Form.Group as={Row}>
                <Form.Label column sm="2">
                    카테고리
                </Form.Label>
                    <Col sm="3">
                        <Form.Control as="select" name="selectedCategory" value={selectedCategory} onChange={handleSub}>
                            <option value="-1">상위 카테고리 선택</option>
                            {categoriesOp}
                        </Form.Control>
                    </Col>
                    <Col sm="3" >
                        <Form.Control as="select" name="selectedSubCategory" value={selectedSubCategory} onChange={handleSelect}>
                            <option value="-1">하위 카테고리 선택</option>
                            {subCategoriesOp}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>

                <Form.Label column sm="2">
                    상품명
                </Form.Label>
                <Col sm="6">
                    <Form.Control type="input" name="name" placeholder="name" value={name} onChange={handleChange}/>
                </Col>
                </Form.Group>
                <Form.Group as={Row}>

                <Form.Label column sm="2">
                    가격
                </Form.Label>
                <Col sm="6">
                    <Form.Control type="input"  name="price" placeholder="price" value={price} onChange={handleChange}/>
                </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Form.Label column sm="2">
                    색상계열
                </Form.Label>
                    <Col sm="3">
                        <Form.Control as="select" name="selectedColor" value={selectedColor} onChange={handleSelect}>
                        <option value="-1">색상 선택</option>
                    {colorsOp}
                        </Form.Control>
                    </Col>
                    <Col sm="1">
                    <ButtonToolbar>
                    <Button variant="secondary" name="colorBtn" onClick={handleAdd}>+</Button>
                    </ButtonToolbar>
                    </Col>
                    <Col>
                    <SelectPreview selects={color} deleteName="color" name="color" onClick={handleDelete} /><br></br>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Form.Label column sm="2">
                    사이즈
                </Form.Label>
                    <Col sm="3">
                    <Form.Control type="input" name="selectedSize" placeholder="size" value={selectedSize} onChange={handleSelect}/>
                </Col>
                    <Col sm="1">
                    <ButtonToolbar>
                    <Button variant="secondary" name="sizeBtn" onClick={handleAdd}>+</Button>
                    </ButtonToolbar>
                    </Col>
                    <Col>
                    <SelectPreview selects={productSize} deleteName="productSize" name="size" onClick={handleDelete} /><br></br>
                    </Col>
                </Form.Group>
                <Row className="mb-4">
                <Form.Label column sm="2">
                    상세 설명 이미지
                </Form.Label>
                <Col>
                <ProductImageForm onAdd={handleFileAdd} onRemove={handleFileRemove} post={post} stateKey="selectedDetailImage" name="상세 설명 이미지" maxFile="1"></ProductImageForm>
                </Col>
                </Row>
                <Row>
                <Form.Label column sm="2">
                    상품 이미지
                </Form.Label>
                <Col>
                <ProductImageForm onAdd={handleFileAdd} onRemove={handleFileRemove} post={post} stateKey="selectedProductImage" name="상품 이미지"></ProductImageForm>
                </Col>
                </Row>
                <div className="error pt-4">{error}</div>
                <div className="loading pt-4" id="productLoading"><img alt="loading" src="/images/loading25.gif"></img></div>
                <ButtonToolbar className="justify-content-center mt-4 pb-4 mb-4">
                    <Button variant="outline-dark" size="lg" onClick={handleClick}>등록</Button>
                </ButtonToolbar>
            </div>
        );
    };
}

export default ProductForm;