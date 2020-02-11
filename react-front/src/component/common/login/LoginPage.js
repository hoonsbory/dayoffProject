import React, { Component } from 'react';
import SocialLogin from './SocialLogin';

class LoginPage extends Component {
    render() {
        return (
            <div className="LoginPage">
            
            <div className="login-content">
                <h1 className="login-title">소셜 계정으로 로그인</h1>
                <SocialLogin currentUrl={"/"}></SocialLogin>
                <div className="or-separator">
                </div>
            </div>
            <span className="login-blank">

            </span>
            </div>
        );
    }
}

export default LoginPage;