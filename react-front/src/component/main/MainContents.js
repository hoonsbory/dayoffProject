import React, { Component } from 'react'
import './MainContents.css';
import axios from 'axios';
import MainContentsHeader from './MainContentsHeader';
import {Link} from 'react-router-dom';

export default class MainContentItem extends Component {
  state = {
    products: [],
    value : '',
    selected:'Register',
  }
  
  test1() {
    axios.get('/productRegister').then(res=>{
      const products =res.data;
      this.setState({ products });
    });
}
  componentDidMount() {
    this.test1();
  }

  Change=(e)=> {
    this.setState({
      selected:e.target.value
    })

    switch(e.target.value){
      case 'Top':
              axios.get(`/productTop`).then(res => {
                const products =res.data;
                this.setState({ products });
              });
              break;      

      case 'Asc' :
          axios.get(`/productPriceAsc`).then(res => {
            const products =res.data;
            this.setState({ products });
          });
          break;

      case 'Desc' :
            axios.get(`/productPriceDesc`).then(res => {
              const products =res.data;
              this.setState({ products });
            });
            break;

      case 'Register' :
            axios.get(`/productRegister`).then(res => {
              const products =res.data;
              this.setState({ products });
            });
            break;

        default:
          break;
    }
  }

  
    render() {
      return (
          <div className="MContents">
        <MainContentsHeader title='NEW ARRIVAL'/>
          <div className='MDropButton'>
            <select value={this.state.selected} onChange={this.Change.bind(this)}> 
            <option value='Register'> 등록날짜순 </option>
            <option value='Top'> 인기상품순 </option>
            <option value='Desc'> 높은가격순 </option>
            <option value='Asc'> 낮은가격순 </option>
            </select>
            </div>
        
        <div className='MContentItem_box'>
        {this.state.products.map(product => {
          return (
            <Link to={"/product/"+product.id}>
            <div className='MContentItem'>
          <img alt="productImg" src={"https://storage.googleapis.com/bit-jaehoon/" + product.productThumbnailName}  />
          <p>{product.id}</p>
          <h4>{product.name}</h4>
          <h2>{product.price}원</h2>
          </div>
          </Link>
          )
        })}

        </div>
        </div>
        )
        }
    }