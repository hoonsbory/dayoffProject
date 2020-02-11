import React, { Component } from 'react';
import axios from 'axios';
import SignUpForm from './SignUpForm';
import { Button, Row, Container } from 'react-bootstrap';

class SignUp extends Component {

    state = {
        users: null,
        signUp: false,
        error: ''
    }


    componentDidMount() {
        window.scrollTo(0, 0);
        this.signUp();
    }

    signUp = async () => {
        await axios({
            method: 'get',
            url: '/signUp'
        }).then(success => {

            let users = success.data;

            users = {
                socialId: users.socialId,
                name: users.name,
                phone: users.phone,
                birth: users.birth,
                sex: !users.sex ? 'f' : users.sex,
                height: users.height,
                weight: users.weight,
                accessToken: users.accessToken,
                refreshToken: users.refreshToken
            }
            for (let u of Object.keys(users)) {
                users[u] = users[u]!==null ? users[u] : '';
            }
            this.setState({
                users: users
            });

        });

    }

    handleChange = (e) => {
        this.setState({
            users: {
                ...this.state.users,
                [e.target.name]: e.target.value
            },
            error:''
        })
    }

    handleClick = async () => {
        let flag = true;
        const users = {...this.state.users};
        for (let key of Object.keys(users)) {
            users[key]=users[key]!==''?users[key]:null;
            if (!(key === 'height' || key === 'weight' || key === 'refreshToken') && !(users[key])) {
                flag = false;
            }
        }
        if (flag) {
            
            await axios.post('/signUpProcess', users)
                .then(success => {
                    this.setState({
                        users: null,
                        signUp: true
                    });
                    sessionStorage.setItem("userId", users.id);
                    sessionStorage.setItem("userRole", users.role);

                });

        } else {
            this.setState({
                error: '모든 항목을 입력해주세요.'
            });
        }
    }

    handleExit = (e) => {
        // const socialId=this.state.users.socialId;
        // sessionStorage.setItem("userId", socialId.subString(socialId.indexOf("_")+1));
        // sessionStorage.setItem("userRole", "");
        //this.props.history.push(sessionStorage.getItem("currentUrl"));

        this.props.history.push("/loginSuccess");
    }


    render() {
        const { users, signUp, error } = this.state;
        const { handleChange, handleClick, handleExit } = this;
        const message = signUp ? (<div><div className="completeTitle">가입을 환영합니다!</div><div>회원가입 기념 적립금 1000원이 지급되었습니다.</div><Button variant="outline-dark" onClick={handleExit}>확인</Button></div>) : undefined;

        if (!users) {
            return (
                <div className="signUpCompleteMessage">
                    {message}
                </div>
            );
        } else {
            return (
                <Container className="SignUp">
                <Row className="signUpTitle justify-content-center">추가 정보 입력</Row>
                <SignUpForm users={users} onChange={handleChange} onClick={handleClick} error={error} button="확인"></SignUpForm>
                </Container>
            );
        }
    }
}

export default SignUp;

