import React, { Component } from 'react';

class SocialLogin extends Component {
    onClick = (e) => {
        const name = e.target.getAttribute("name");
        sessionStorage.setItem("currentUrl",this.props.currentUrl)
         switch (name) {
            case "google":
                window.location.href = 'https://jaehoon-dayoff.ml:8443/oauth2/authorization/google'
                break;
            case "facebook":
                window.location.href = 'https://jaehoon-dayoff.ml:8443/oauth2/authorization/facebook'
                break;
            case "kakao":
                window.location.href = 'https://jaehoon-dayoff.ml:8443/oauth2/authorization/kakao'
                break;
        }
    }

    render() {
        const { onClick } = this;
        const style = {
            display: 'block'
        }
        return (
            <div className="social-login">
                <div style={style} className="btn btn-block social-btn google" onClick={onClick}>
                    <img alt="google" src="/images/btn_google_signin_light_normal_web@2x.png" name="google"></img></div>
                <div style={style} className="btn btn-block social-btn facebook" onClick={onClick}>
                <img alt="facebook" src="/images/facebook.png" name="facebook" ></img>
                </div>
                <div className="btn btn-block social-btn kakao" onClick={onClick}>
                <img alt="kakao" src="/images/kakao_account_login_btn_large_wide.png" name="kakao" />

                </div>
                
                
            </div>
        );
    }

}

export default SocialLogin;