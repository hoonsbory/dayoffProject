import React, { Component } from 'react';
import axios from 'axios';

class LoginSuccess extends Component {

    getUser = async () => {
        const response = await axios.get("/getUser");
        const users=response.data;
        sessionStorage.setItem("userId", users.id);
        sessionStorage.setItem("userRole", users.role);
        sessionStorage.setItem("userName", users.name);
        const cart=JSON.parse(localStorage.getItem("cart1"));
        if(cart&&users.role==="user"){
            const finalCart=cart.map(c=>c={...c,users:{id:users.id}});
            await axios.post("/addCartList",finalCart).then((res)=>{
                localStorage.removeItem("cart1");
          })
        }
        console.log(sessionStorage.getItem("currentUrl"))
        this.props.history.push(sessionStorage.getItem("currentUrl"));
    }


    componentDidMount() {
        this.getUser();
    }
    render() {
        return (
            <div></div >
        );

    }
}

export default LoginSuccess;