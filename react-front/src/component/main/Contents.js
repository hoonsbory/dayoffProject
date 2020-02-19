import React, { Component } from 'react'
import './contents.css';
import ApiService from './ApiService';
import { Link } from 'react-router-dom';
import ContentsProduct from './ContentsProduct';

export default class Content extends Component {
  state = {
    products: [],
    AdminProducts: [],
    value: '',
    selected: '',
    style: '',
    role: false,
    errorMessage: false,
    keyword : '',
    category : ''
  }

  SearchProduct = () => {
    const keyword = this.state.keyword;
    if (keyword) {
      ApiService.SearchProduct(keyword).then(res => {
        if (res.data.length === 0)
          this.setState({
            errorMessage: true,
            products: res.data
          })
        else
          this.setState({
            errorMessage: false,
            products: res.data
          });
      })
    }
    else {
      const category = this.state.category;
      if (category === 'RED' || category === 'BLACK' ||  category === 'GRAY' || category === 'BLUE' || category === 'PINK' || category === 'WHITE' || category === 'GREEN'
        || category === 'PURPLE' || category === 'ORANGE' || category === 'YELLOW' || category ==='BEIGE'|| category ==='BROWN'|| category ==='CREAM'|| category ==='SILVER'|| category ==='GOLD') {
        ApiService.ColorProductList(category, this.state.selected).then(res => {
          this.setState({ errorMessage: false, products: res.data })
        })
      } else if (category === 'OUTER' || category === 'TOP' || category === 'BOTTOM' || category === 'DRESS' || category === 'ACC') {
        ApiService.MainCategoryList(category, this.state.selected).then(res => {
          this.setState({ errorMessage: false, products: res.data })
        });
      } else if (category === 'BEST') {
        ApiService.MonthProductList().then(res => {
          this.setState({ errorMessage: false, products: res.data })
        });
      } else {
        ApiService.SubCategoryList(category, this.state.selected).then(res => {
          this.setState({ errorMessage: false, products: res.data })
        })
      }
    }

  }

  SearchAdminProduct = () => {
    const keyword = this.state.keyword;
    if (keyword) {
      ApiService.SearchAdminProduct(keyword).then(res => {
        if (res.data.length === 0)
          this.setState({
            errorMessage: true,
            AdminProducts: res.data
          })
        else
          this.setState({
            errorMessage: false,
            AdminProducts: res.data
          });
      })
    }
    else {
      const category = this.state.category;
      if (category === 'RED' || category === 'BLACK' || category === 'GRAY' || category === 'BLUE' || category === 'PINK' || category === 'WHITE' || category === 'GREEN'
        || category === 'PURPLE' || category === 'ORANGE' || category === 'YELLOW' || category ==='BEIGE'|| category ==='BROWN'|| category ==='CREAM'|| category ==='SILVER'|| category ==='GOLD') {
        ApiService.AdminColorProductList(category, this.state.selected).then(res => {
          this.setState({ errorMessage: false, AdminProducts: res.data })
        })
      } else if (category === 'OUTER' || category === 'TOP' || category === 'BOTTOM' || category === 'DRESS' || category === 'ACC') {
        ApiService.AdminMainCategoryList(category, this.state.selected).then(res => {

          this.setState({ errorMessage: false, AdminProducts: res.data })
        });
      } else if (category === 'BEST') {
        ApiService.MonthProductList().then(res => {

          this.setState({ errorMessage: false, AdminProducts: res.data })
        });
      } else {
        ApiService.AdminSubCategoryList(category, this.state.selected).then(res => {

          this.setState({ errorMessage: false, AdminProducts: res.data })
        })
      }
    }

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      keyword: this.props.keyword,
      category: this.props.category
    }, localStorage.getItem("userRole") === "admin" ? this.SearchAdminProduct : this.SearchProduct)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.keyword !== nextProps.keyword) {
      
        this.setState({ keyword: nextProps.keyword }, localStorage.getItem("userRole") === "admin" ? this.SearchAdminProduct : this.SearchProduct);
      
      window.scrollTo(0, 0);
    } else if (nextProps.category !== this.props.category) {
      
        this.setState({ category: nextProps.category }, localStorage.getItem("userRole") === "admin" ? this.SearchAdminProduct : this.SearchProduct);
      
      window.scrollTo(0, 0);
    }
  }

  pStop = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.value === '판매중지') {
      document.getElementById("product" + e.target.name).style.opacity = "0.3";
      ApiService.isAvailableDown(e.target.name);
    }
  }

  pStart = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.value === '판매시작') {
      document.getElementById("product" + e.target.name).style.opacity = "1.0";
      ApiService.isAvailableUp(e.target.name);
    }
  }

  Change1 = (e) => {
    this.setState({
      selected: e.target.value
    }, this.SearchProduct);
  }

  Change = (e) => {
    this.setState({
      selected: e.target.value
    }, this.SearchAdminProduct);
    // sessionStorage.getItem("userRole")==="user"?this.SearchProduct():this.SearchAdminProduct();

    // switch(e.target.value){
    //   case 'Top':
    //           axios.get(`/productTop`).then(res => {
    //             const products =res.data;
    //             this.setState({ products });
    //           });
    //           break;      

    //   case 'Asc' :
    //       axios.get(`/productPriceAsc`).then(res => {
    //         const products =res.data;
    //         this.setState({ products });
    //       });
    //       break;

    //   case 'Desc' :
    //         axios.get(`/productPriceDesc`).then(res => {
    //           const products =res.data;
    //           this.setState({ products });
    //         });
    //         break;

    //   case 'Register' :
    //         axios.get(`/productRegister`).then(res => {
    //           const products =res.data;
    //           this.setState({ products });
    //         });
    //         break;

    //     default:
    //       break;
    // }
  }

  

  render() {
    const errorMessage = this.state.errorMessage;
    if (localStorage.getItem("userRole") !== "admin") {
      return (
        <div className="PContents">
          <div className='PDropButton'>
            <select value={this.state.selected} onChange={this.Change1.bind(this)}>
              <option value='registerDate_desc'> 등록날짜순 </option>
              <option value='orderCount_desc'> 인기상품순 </option>
              <option value='price_desc'> 높은가격순 </option>
              <option value='price_asc'> 낮은가격순 </option>
            </select>
          </div>
          {this.state.products.length > 0 ?
            <div className='PContentItem_box'>
              {this.state.products.map(product => {
                return (
                  <Link to={"/product/" + product.id} className='PContentItem'>
                    <img alt="contentItem" src={"https://storage.googleapis.com/bit-jaehoon/" + product.productThumbnailName}  />
                    <p>{product.id}</p>
                    <h4>{product.name}</h4>
                    <h2>{product.price}원</h2>
                  </Link>
                )
              })}

          </div> : <div>{errorMessage&& <img className='nullImg' alt="error" src='/images/SearchImg.png'></img>}</div>}
        </div>
      )
    } else {
      return (
        <div className="PContents">
          <div className='PDropButton'>
            <select value={this.state.selected} onChange={this.Change.bind(this)}>
              <option value='registerDate_desc'> 등록날짜순 </option>
              <option value='orderCount_desc'> 인기상품순 </option>
              <option value='price_desc'> 높은가격순 </option>
              <option value='price_asc'> 낮은가격순 </option>
            </select>
          </div>
          {this.state.AdminProducts.length > 0 ?
            <div className='PContentItem_box'>
              {this.state.AdminProducts.map((product) => {
                  return (
                    <ContentsProduct product={product}></ContentsProduct>
                  )
                
              })}
            </div> : <div>{errorMessage && <img alt="error" className='nullImg' src='/images/SearchImg.png'></img>}</div>}
        </div>
      )
    }
  }
}