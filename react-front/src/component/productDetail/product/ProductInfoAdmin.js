import React, { Component } from "react";
import axios from "axios";
import "./ProductInfo.css";
import Total from './Total';
import Select from './Select';
import { Link } from "react-router-dom";
import ProductCookie from "./productCookie";
import ProductTogetherBuy from "./productTogetherBuy";
import StopProductSale from "../../admin/product/StopProductSale";
import ResaleProduct from "../../admin/product/ResaleProduct";
import CenterMode from "./CenterMode";

class ProductInfoAdmin extends Component {
  state = {
    product: {
      productImage: [],
      name: "",
      price: "",
      category: [],
      color: [],
      productSize: [],
      detailImage: "",
      id: ""
    },
    cookielist : "",
    Togetherlist : "",
    cart: {
      color: "",
      size: "",
      quantity: 0,
      price: 0
    }
  };
  async showCookie(){
    const response = await axios.get("/showcookie");
   this.setState({
       cookielist : response.data
   })
}

async TogetherBuy(productId){
 const params = new URLSearchParams();
 params.append("id",productId)
 await axios({
   method : "post",
   data : params,
   url : "/togetherBuy"
 }).then((response)=>

 this.setState({
     Togetherlist : response.data
 })
 )
}

  getProductDetail(productId) {
    const params = new URLSearchParams();
    // params.append("id", this.props.productId);
    params.append("id", productId);
    axios({
      method: "post",
      url: "/showProductDetail",
      data: params
    }).then(res => {
      this.setState({
        product: res.data
      });
    });
  }
  scrollToTop (e) {
    document.getElementById("root").scrollTo(0, 0);
  };
  
  componentDidMount() {
    this.getProductDetail(this.props.productId);
    this.showCookie();
    this.TogetherBuy(this.props.productId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.productId !== nextProps.productId) {
      this.getProductDetail(nextProps.productId);
      this.showCookie();
      this.TogetherBuy(nextProps.productId);
      window.scrollTo(0, 0);
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    // console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    return true;
  }
  changeAvailability=(availability)=>{
    this.setState({
      product:{
        ...this.state.product,
        isAvailable:availability
      }
    })
  }
  render() {
    const { product, cart } = this.state;
    const sizeOp = product.productSize
      .map((s, index) => (
        <button
          className="sizeBtn"
          key={index}
          value={s.size}
        >
          {s.size}
        </button>
      ))
      .reverse();
    const colorOp = product.color.map((c, index) => (
      <span>
        <img
          alt="color"
          className="colorBtn"
          key={index}
          name={c.color}
          src={"/images/" + c.image}
        ></img>
      </span>
    ));
    // const image = product.productImage.map((p, index) => (
    //   <img
    //     key={p.id}
    //     value={index}
    //     className="productImage"
    //     src={"https://storage.googleapis.com/bit-jaehoon/" + p.name}
    //     alt="상품이미지"
    //   ></img>
    // ));

    return (
      <div className="product">
        <div className="productData">
          <div className="top">
            <div className="topLeft">
              <div className="images">
                {/* <div
                  className={this.state.product.isAvailable == 0 && "modal2"}
                >
                  <div className="popup2">
                    {this.state.product.isAvailable == 0 && "판매불가"}
                  </div>
                </div>
                {image}
              </div>
            </div> */}
            <div className={this.state.product.isAvailable===0&&"modal2"}><div className="popup2">{this.state.product.isAvailable===0&&"판매불가"}</div></div>
            {product.productImage.length>0&&<CenterMode images={product.productImage}></CenterMode>}
              </div>
              </div>
            <div className="topRight">
            <div>
                <p>
                {product.category.name}/{product.category.subName}
                </p>
                <h1 style={{"margin-bottom":"20px"}}>{product.name}</h1>
                <h2>
                  {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </h2>
                    </div>
                <h4 style={{"border-top":"1px solid #989898","padding-top":"27px"}}>
                  {" "}
                  색상
                  <div className="colorOpt">
                    {" "}
                    {colorOp}
                    <span className="colorName">{this.state.color}</span>{" "}
                  </div>
                </h4>
                <h4>
                  {" "}
                  사이즈
                  <div className="sizeOpt">{sizeOp}</div>
                </h4>
                <h4>
                  {" "}
                  수량
                  <div className="sizeOpt">
                    <Select
                      cart={cart}
                      subtract={this.subtract}
                      add={this.add}
                    />
                  </div>
                </h4>

              <Total cart={cart} />
              <div>
                <Link to={"/admin/updateProduct/"+product.id}>
                  <button className="btnBuy">  {" "} 상품수정 {" "} </button>
                </Link>
                </div>
                <br />
                <div>
                {product.isAvailable===1?<StopProductSale className="btnCart" productId={product.id} changeAvailability={this.changeAvailability}></StopProductSale>:<ResaleProduct className="btnCart" productId={product.id} changeAvailability={this.changeAvailability}></ResaleProduct>}
              </div>
            </div>
          </div>

         
          <div>
            <ProductCookie cookieList={this.state.cookielist}></ProductCookie>
            <ProductTogetherBuy
              Togetherlist={this.state.Togetherlist}
            ></ProductTogetherBuy>
          </div>

        </div>
      </div>
    );
  }
}

export default ProductInfoAdmin;