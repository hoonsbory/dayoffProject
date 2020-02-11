import React from 'react';
import '../css/login.css';
import SocialLogin from './SocialLogin';

const LoginMenu = ({onExit}) => {
    return (
        <div className="login-container">
            <div className="login-content">
                <span className="login-exit" onClick={onExit}>&times;</span>
                <h1 className="login-title">소셜 계정으로 로그인</h1>
                
                <SocialLogin currentUrl={document.location.href.substring(document.location.href.lastIndexOf(".")+3)}></SocialLogin>
                <div className="or-separator">
                </div>
            </div>
            <span className="login-blank">

            </span>
        </div>
    );
}




export default LoginMenu;




