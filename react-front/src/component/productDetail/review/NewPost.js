import React, { Component } from 'react';
import BeautyStars from 'beauty-stars';
import { Button, Form,Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './NewPost.css';

 class NewPost extends Component {
    state = {
        title:'',
        content:'',
        rating:0,
        productId:'',
        userId:''
      }
    
    handleChange = (e) =>{
      this.setState({
         [e.target.name]:e.target.value
      })
    }
    handlePostData = async () => {
      const orderId = this.props.match.params.orderId;
      const params = new URLSearchParams();
      params.append("orderId",orderId)
      await axios({
        method : "post",
        data : params,
        url : "/changeCode"
      }).then((response)=>{
       this.setState({
         productId : response.data
       })
      })


        const review ={
            title: this.state.title,
            content: this.state.content,
            rating:this.state.rating,
            productId: this.state.productId,
            users : {
            id : sessionStorage.getItem("userId")
            }
        }

        await axios.post("/addReview",review).then(res=>{
          this.setState({
          review:res.data
        })
        
      })
      window.alert("후기작성이 완료되었습니다.");
      window.location.href='/mypage/myorders';
    }
  render() {
   const {title,content,rating} =this.state;
   const {handleChange,handlePostData}=this;
        return (
            <Form className="form">
            <h2 className="reviewWrite">후기 작성</h2>
              <Form.Group as={Row} className="FormGroup">
                <Form.Label >
                  제목
                </Form.Label>
                  <Form.Control 
                    type="input"
                    name="title"
                    placeholder="제목을 입력해주세요"
                    minLength={5}
                    maxLength={20}
                    value={title}
                    onChange={handleChange}
                    required
                  />
              </Form.Group >
              <Form.Group as={Row} className="FormGroup">
                
                <Form.Label>
                        평점      
                </Form.Label><Col sm="10">
                  <BeautyStars
                    value={rating}
                    size={"20px"}
                    inactiveColor={"gray"}
                    onChange={rating => this.setState({ rating })}
                    name="rating"
                    minLength={1}
                    required/></Col>
                  
              </Form.Group>
              <Form.Group as={Row} className="FormGroup">
                <Form.Label >
                  내용
                </Form.Label>
                  <Form.Control
                    as="textarea"
                    className="textarea"
                    name="content"
                    placeholder="상품후기를 남겨주세요(20자 이상)"
                    required
                    minLength={20}
                    value={content}
                    onChange={handleChange}
                  />
              </Form.Group >
            <Button className="addReviewBtn" onClick={handlePostData}>후기 등록</Button>
            </Form >
        );
    }
}
export default NewPost;