import React, { Component } from 'react';
import axios from 'axios';
import Review from './/Review';
import './Reviews.css';

class Reviews extends Component {
    state = {
        reviews:[]
    };
   
    showReview(productId){
      const params = new URLSearchParams();
      params.append("productId",productId);
     axios({
      method: "post",
      url: "/review",
      data: params
    }).then(res => {
      this.setState({
        reviews: res.data
      });
    });
    }
  
      componentDidMount () {
        this.showReview(this.props.productId);
      }

      render() {

        const reviews = this.state.reviews.map((review,index) => {
          return(
          <Review 
          key={review.id} 
          id={index+1}
          title={review.title} 
          user = {review.users.name}
          content = {review.content}
          rating ={review.rating}
          date={review.reviewDate}
          height={review.users.height}
          weight={review.users.weight}
          />
          )
          
           } ).reverse();
        return (

          <div className="reviewboard">
      <h2 className="reviewName">후기게시판({reviews.length})</h2>
     <table  className="reviewTable">
     <colgroup>
       <col style={{ width: +5 + "%" }}></col>
       <col style={{ width: +20 + "%" }}></col>
       <col style={{ width: +5 + "%" }}></col>
       <col style={{ width: +5 + "%" }}></col>
       <col style={{ width: +5 + "%" }}></col>
     </colgroup>
     <thead className="reviewTh">
     <tr>
       <th style={{"padding":"10px","border-right":"1px solid black"}}>글번호</th>
       <th style={{"padding":"10px","border-right":"1px solid black"}}>제목</th>
       <th style={{"padding":"10px","border-right":"1px solid black"}}>작성자</th>
       <th style={{"padding":"10px","border-right":"1px solid black"}}>작성일</th>
       <th>평점</th>
     </tr>
     </thead>
     <tbody>{reviews}</tbody>
   </table>
   </div>
        );
        
      } 
    }

export default Reviews;