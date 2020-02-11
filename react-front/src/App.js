import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import OrderAnalysis from './component/admin/analysis/OrderAnalysis';
import UserAnalysis from './component/admin/analysis/UserAnalysis';
import Orders from './component/admin/orders/orders';
import ProductAdd from './component/admin/product/ProductAdd';
import ProductUpdate from './component/admin/product/ProductUpdate';
import CartView from "./component/cart/CartView";
import Footer from './component/common/footer/Footer';
import Header from './component/common/header/Header.js';
import ErrorPage from './component/common/login/ErrorPage';
import LoginPage from './component/common/login/LoginPage';
import LoginSuccess from './component/common/login/LoginSuccess';
import SignUp from './component/common/login/SignUp';
import Myorders from './component/myPage/orders/Myorders';
import OrderDetail from './component/myPage/orders/orderDetail/OrderDetail';
import RefundRequest from './component/myPage/orders/RefundRequest';
import UpdateUser from './component/myPage/user/UpdateUser';
import Withdraw from './component/myPage/user/Withdraw';
import Product from './component/productDetail/product/Product';
import ListCartComponent from'./component/pay/ListCartComponent';
import Vision from './component/vision/vision';
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import UserGrade from './component/myPage/grade/UserGrade';
import UserList from './component/admin/userList/UserList';
import MainPage from './component/main/MainPage';
import ProductListPage from './component/productList/ProductListPage';
import AdminNav from './component/common/nav/AdminNav';
import MypageNav from './component/common/nav/MypageNav';
import Map from './component/common/Map/Map';
import NewPost from './component/productDetail/review/NewPost'
import MainHeader from './component/common/header/MainHeader';
import MainFooter from './component/common/footer/MainFooter';

class App extends Component {
  render() {
    return (
      <div>

        <Switch>
          <Route path="/loginSuccess" component={LoginSuccess} />
          <Route path="/productList" component={Header} />
          <Route path="/mypage" component={Header} />
          <Route path="/admin" component={Header} />
          <Route path="/" component={MainHeader} />
        </Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/error" component={ErrorPage} />
          <Switch>
          <Route path="/productList/search" component={ProductListPage} /> 
          <Route path="/productList/category/:category" component={ProductListPage} /> 
          </Switch>
          <ProtectedRouteAdmin path="/admin" component={AdminNav} />
          <Switch>
          <ProtectedRouteAdmin path="/admin/addProduct" component={ProductAdd} />
          <ProtectedRouteAdmin path="/admin/updateProduct/:productId" component={ProductUpdate} />
          <ProtectedRouteAdmin path="/admin/userList/:userId" component={UserList} />
          <ProtectedRouteAdmin path="/admin/userList" component={UserList} />
          <ProtectedRouteAdmin path="/admin/usersAnalysis" component={UserAnalysis} />
          <ProtectedRouteAdmin path="/admin/ordersAnalysis" component={OrderAnalysis} />
          <ProtectedRouteAdmin path="/admin/orders/orderDetail/:groupId" component={OrderDetail} />
          <ProtectedRouteAdmin path="/admin/orders" component={Orders} />
          </Switch>
          <Route  path="/mypage" component={MypageNav} />
          <Switch>
          <ProtectedRoute path="/mypage/myorders/orderDetail/:groupId" component={OrderDetail} />
          <ProtectedRoute path="/mypage/refundRequest" component={RefundRequest} />
          <ProtectedRoute path="/mypage/myInfo" component={UpdateUser} />
          <ProtectedRoute path="/mypage/withdraw" component={Withdraw} />
          <ProtectedRoute path="/mypage/myGrade" component={UserGrade} />
          <ProtectedRoute exact path="/mypage/myorders" component={Myorders} />
          <ProtectedRoute exact path="/mypage/map" component={Map} />
          <ProtectedRoute exact path="/mypage/review/:orderId" component={NewPost} />
          {/* <ProtectedRoute path="/mypage/myorders" component={Myorders} /> */}
          </Switch>
          <Route path="/signUp" component={SignUp} />
          <Route path="/vision" component={Vision} />
          <Route path="/cart" component={CartView} />
          <Route path="/product/:productId" component={Product} />
          <ProtectedRoute path="/payment" component={ListCartComponent} />
          <Switch>
          <Route path="/productList" component={Footer} />
          <Route path="/admin" component={Footer} />
          <Route path="/mypage" component={Footer} />
          <Route path="/" component={MainFooter} />
          </Switch>
      </div>
    );
  }
}

export default App;
