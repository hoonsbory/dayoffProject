import axios from 'axios';
import React, { Component } from 'react';
import LoginMenu from '../../common/login/LoginMenu';
import './login.css';

class Login extends Component {
    state={
        login:false
    }


    componentDidMount(){
        if(sessionStorage.getItem("userId")){
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
        const res = await axios.get("/logout")
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("userName");

        this.setState({
            login:false
        })

        if(res.data===1){
            this.props.history.push("/")
        }
    }
    
    handleExit=(e)=>{
        document.getElementById("loginFrame").style.visibility = "hidden";
    }

    render() {
        const login=sessionStorage.getItem("userId")?'로그아웃':'로그인';
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