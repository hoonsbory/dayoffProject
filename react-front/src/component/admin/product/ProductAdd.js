import React, { Component } from 'react';
import ProductAddMessage from './ProductAddMessage';
import ProductForm from './ProductForm';
import SeveralProductForm from './SeveralProductForm';
import "./productAdd.css";
import SlideToggle from 'react-slide-toggle';
import axios from 'axios';

class ProductAdd extends Component {
    state = {
        latestProduct: null,
        productCount: 0,
        colors:[],
        categories:[]
    }

    createMessage = ({ latestProduct, productCount }) => {
        this.setState({
            latestProduct: latestProduct,
            productCount: this.state.productCount + productCount
        })
    }

    async getForm() {
        const response = await axios.get("/addProduct");
        if(response.data===1){
            //this.props.history.push("/login")
            window.location.href="https://bit-dayoff.tk/login";
        }
        const { color, category } = response.data;
        this.setState({
            colors: color,
            categories: category
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getForm();
    }


    render() {
        const { latestProduct, productCount, categories, colors } = this.state;
        return (
            <div className="ProductAdd">
                <div className="pageTitle">
                            <div>상품 등록</div>
                </div>
                <div className="productAddMenu">
                <SlideToggle collapsed onExpanding={()=>{const item=document.getElementsByClassName("ProductSlideToggle toggle_EXPANDED").item(0); if(item)item.click(); }}
                    render={({ toggle, setCollapsibleElement, toggleState }) => (
                        <div className="my-collapsible">
                            <div className={"my-collapsible__toggle SeveralProductSlideToggle toggle_"+toggleState} onClick={toggle}>
                                <div className="title"><span className="smallTitle">엑셀 파일을 이용하여</span><br></br>일괄 상품 등록하기</div>
                                <span className="toggleBtn">&or;</span>
                                
                            </div>
                            <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                <div className="my-collapsible__content-inner"><SeveralProductForm createMessage={this.createMessage} colors={colors} categories={categories}/></div>
                            </div>
                        </div>
                    )}
                    />
                <SlideToggle collapsed onExpanding={()=>{const item=document.getElementsByClassName("SeveralProductSlideToggle toggle_EXPANDED").item(0); if(item)item.click(); }}
                    render={({ toggle, setCollapsibleElement, toggleState }) => (
                        <div className="my-collapsible">
                            <div className={"my-collapsible__toggle ProductSlideToggle toggle_"+toggleState} onClick={toggle}>
                            <div className="title">직접 상품 등록하기</div>
                            <span className="toggleBtn">&or;</span>
                            </div>
                            <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                <div className="my-collapsible__content-inner"><ProductForm createMessage={this.createMessage} colors={colors} categories={categories}></ProductForm></div>
                            </div>
                        </div>
                    )}
                    />
                </div>
                
                <ProductAddMessage latestProduct={latestProduct} productCount={productCount}></ProductAddMessage>
            </div>
        );
    };
}

export default ProductAdd;