import './cards.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'


  class Cards extends Component {
    render() {
      const {cookieList} = this.props;
      const cardData = {cookieList}
      return (
        <section className="cardSection">
        {
          cardData.cookieList.map((card, i) => {
            return (
              <div className="card" id="card" style={this.props.cardStyle} key={i}>
                <Link to={"/product/"+card.productId}><img width="200px" height="200px" alt="productImg" src={"https://storage.googleapis.com/bit-jaehoon/"+card.productThumbnailName} />
                <p className="title">{card.productName}</p>
                <p className="price">{card.price}원</p>
                </Link>
                
              </div>
            )
          })
        }
        </section>
      )
    }
  }
  export default Cards;
  

  