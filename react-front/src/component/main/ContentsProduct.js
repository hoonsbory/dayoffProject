import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StopProductSale from '../admin/product/StopProductSale';
import ResaleProduct from '../admin/product/ResaleProduct';
import "./contentsProduct.css";

class ContentsProduct extends Component {
  state = {
    product: ''
  }

  componentDidMount() {
    this.setState({
      product: this.props.product
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.product !== this.props.product) {
      this.setState({
        product: nextProps.product
      })
    }

  }

  changeAvailability = (availability) => {
    this.setState({
      product: {
        ...this.state.product,
        isAvailable: availability
      }
    })
  }

  handleProductBtnClick = (e) => {
    const element = document.getElementById("product_" + e.target.name);
    element.style.display === "none" ? element.style.display = "block" : element.style.display = "none";
  }

  render() {
    const product = this.state.product;
    return (
      <Link to={"/product/" + product.id} className='PContentItem' id={"product" + product.id}>
        <div className="productMenu" onClick={(e) => { e.preventDefault() }}>
          <button className="listbtn" name={product.id} onClick={this.handleProductBtnClick}>&equiv;</button>
          <div id={"product_" + product.id} style={{ display: "none" }} className="hiddenProductBtns">
            <div>
              <Link to={"/admin/updateProduct/" + product.id}>
                <button className="listbtn" >상품수정</button>
              </Link>
            </div>
            <div>
              {product.isAvailable === 1 ? <StopProductSale className="listbtn" productId={product.id} changeAvailability={this.changeAvailability}></StopProductSale> : <ResaleProduct className="listbtn" productId={product.id} changeAvailability={this.changeAvailability}></ResaleProduct>}
            </div>
          </div>
        </div>
        <div style={product.isAvailable === 0 ? { opacity: "0.3" } : {}}>
          <img alt="productImg" src={"https://storage.googleapis.com/bit-jaehoon/" + product.productThumbnailName} />
          <p>{product.id}</p>
          <h4>{product.name}</h4>
          <h2>{product.price}원</h2>
        </div>
      </Link>
    );
  }
}

export default ContentsProduct;