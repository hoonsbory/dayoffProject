import React, { Component } from 'react'
import axios from 'axios';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import LoginMenu from '../common/login/LoginMenu';
import './CartView.css';

 class CartView extends Component {
   state = {
     cartView: [],
     realTotal: 0,
     checkedItem: []
     
   };

   handleCartView = () => {
     const userId = sessionStorage.getItem("userId");
     if (userId !== null) {
       axios
         .get("/cartList", {
           params: { userId: sessionStorage.getItem("userId") }
         })
         .then(res => {
           this.setState({
             cartView: res.data
           });
         });
       this.setState({
         cartView: []
        
       });
     } else {
       const output = localStorage.getItem("cart1");
       const cart1 = JSON.parse(output);
       if (cart1) {
         this.setState({
           cartView: this.state.cartView.concat(cart1)
         });
       }
     }
   };
   handleDeleteItem = async () => {
     const userId = sessionStorage.getItem("userId");
     const cartView = this.state.cartView;
     const checkedItem = this.state.checkedItem;
     const cart1 = cartView.filter(c => !checkedItem.includes(c));
     if (userId !== null) {
       const checkedItemId = this.state.checkedItem.map(c => c.id);
       const params = new URLSearchParams();
       checkedItemId.forEach(c => {
         params.append("id", c);
       });
       await axios({
         method: "post",
         url: "/deleteCartItem",
         data: params
       });
     } else {
       localStorage.setItem("cart1", JSON.stringify(cart1));
     }
     this.setState({
       cartView: cart1,
       realTotal:0,
       checkedItem:[]
     });
   };
   onChange = e => {

     if (e.target.checked) {
       if (e.target.value === "-1") {
         const checkGroup = document.getElementsByClassName("checkGroup");
         for (let i = 0; i < checkGroup.length; i++) {
           checkGroup[i].checked = true;
         }
         this.setState({
           checkedItem: this.state.cartView,
           realTotal:this.state.realTotal+this.state.cartView.reduce((p,c)=>p+c.totalPrice,0)
         });
       } else {
         this.setState({
           checkedItem: this.state.checkedItem.concat(
             this.state.cartView[e.target.value]
           ),
           realTotal:this.state.realTotal+this.state.cartView[e.target.value].totalPrice
         });
       }
     } else {
       if (e.target.value === "-1") {
         const checkGroup = document.getElementsByClassName("checkGroup");
         for (let i = 0; i < checkGroup.length; i++) {
           checkGroup[i].checked = false;
         }
         this.setState({
           checkedItem: [],
           realTotal:0
         });
       } else {
         this.setState({
           checkedItem: this.state.checkedItem.filter(c => {
             return this.state.cartView[e.target.value] !== c;
            }),
            realTotal:this.state.realTotal-this.state.cartView[e.target.value].totalPrice
         });
       }
     }
   };

   handleExit = e => {
     document.getElementById("loginFrame").style.visibility = "hidden";
   };
   componentDidMount() {
    window.scrollTo(0, 0);
     this.handleCartView();
   }
   handleOrder = e => {
     if (!sessionStorage.getItem("userId")) {
       e.preventDefault();
       document.getElementById("loginFrame").style.visibility = "visible";
     }
   };

   render() {
     
     const cartView = this.state.cartView.map((cart, index) => {
       return (
         <Cart
           key={cart.id}
           id={index}
           productImage={
             "https://storage.googleapis.com/bit-jaehoon/" +
             (cart.productThumbnailName
               ? cart.productThumbnailName
               : cart.productImage)
           }
           name={cart.name}
           color={cart.color}
           size={cart.size}
           quantity={cart.quantity}
           price={cart.price}
           totalPrice={cart.totalPrice}
           realTotal={cart.realTotal}
           productId={cart.productId}
           onChange={this.onChange}
         />
       );
     });
     return (
       <div style={{paddingTop : "218px"}}>
         <h2 className="cartHeader">장바구니</h2>
         <div className="cartTable">
         <table className="n-table">
           <colgroup>
             <col style={{ width: +5 + "%" }}></col>
             <col style={{ width: +20 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
           </colgroup>
           <tr>
             <th>
               <input
                 type="checkbox"
                 value="-1"
                 onChange={this.onChange}
                 style={{"transform":"scale(1.5)"}}
               ></input>
             </th>
             <th>상품정보</th>
             <th>색상</th>
             <th>사이즈</th>
             <th>수 량</th>
             <th>상품금액</th>
             <th>주문금액</th>
           </tr>
           <tbody>{cartView}</tbody>
         </table>
         </div>
         <div className ="totalCover">
         <h2 className="realTotal">총 주문금액:{this.state.realTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h2>
         </div>
         <div className="buttons">
         <button className="deleteBtn" onClick={this.handleDeleteItem}>선택상품 삭제</button>
         <Link
           onClick={this.handleOrder}
           to={{
             pathname: "/payment",
             state: {
               cartList: this.state.checkedItem
              }
            }}
         >
           <button className="orderBtn" > 주문하기</button>
         </Link></div>
         <div
           className="loginFrame"
           id="loginFrame"
           style={{ visibility: "hidden" }}
         >
           <LoginMenu onExit={this.handleExit} ></LoginMenu>
         </div>
       </div>
     );
   }
 }
export default CartView;