import axios from 'axios';
import React, { Component } from 'react';
import LoginMenu from '../../common/login/LoginMenu';
import './login.css';
import cookie from 'react-cookies';

class Login extends Component {
    state={
        login:false
    }


    componentDidMount(){
        if(cookie.load("userinfo")){
            this.setState({
                login:true
            })
        }
        else{
            this.setState({
                login:false
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.login!==this.state.login){
            if(!nextState.login)
            this.props.history.push("/");
        };

        return true;
    }


    handleLogin = (e) => {
        switch (e.target.innerHTML) {
            case '로그아웃':
                this.logout();
                break;
            case '로그인':
                document.getElementById("loginFrame").style.visibility = "visible";
                break;
        }
    }

    logout=async ()=>{
        const res = await axios.get("/logoutaa")
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
	cookie.remove('userinfo', {path : '/'})

        this.setState({
            login:false
        })
	console.log(res)
        if(res.data===1){
            this.props.history.push("/")
        }
    }
    
    handleExit=(e)=>{
        document.getElementById("loginFrame").style.visibility = "hidden";
    }

    render() {
        const login=cookie.load("userinfo")?'로그아웃':'로그인';
        return (
            <span className='logSpan'>
                    <span onClick={this.handleLogin}>{login}</span>
                <div className="loginFrame" id="loginFrame" style={{ visibility: "hidden" }}>
                    <LoginMenu onExit={this.handleExit}></LoginMenu>
                </div>

            </span>

        );
    }
}

export default Login;